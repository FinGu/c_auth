<?php

function get_sess_iv(mysqli_wrapper $c_con, $session_data){
    if($session_data === 'null')
        return '1234567891234567';

    $result = api\validation\validate_session($session_data, false);

    if($result !== responses::success) {
        $c_con->query('DELETE FROM c_program_sessions WHERE c_session=?', [$session_data['c_session']]);

        return $result;
    }

    return $session_data['c_iv'];
}

function update_sess_li(mysqli_wrapper $c_con, $session_data){ //session_data instead of session_id bcs of the func above
    $c_con->query('UPDATE c_program_sessions SET c_logged_in=? WHERE c_session=?', [1, $session_data['c_session']]);
    return responses::success;
}

function wrap_init(mysqli_wrapper $c_con, $version, $api_version, $program_key, $session_iv){       
    $vl = '';

    $result = api\init($c_con, $version, $api_version, $program_key, $session_iv);

    if(!is_array($result))
        return responses::wrapper($result);

    $rsp = $result[0];

    foreach($result as $value)
        $vl .= $value . '|';

    $vl = substr($vl, 0, -1);

    return responses::wrapper( 
        $vl,
        responses::switcher($rsp),
        $rsp === 'started_program'
    );
}

function wrap_login(&$success, mysqli_wrapper $c_con, $program_key, $username, $password, $hwid){
    $result = api\login($c_con, $program_key, $username, $password, $hwid);

    if(!is_array($result))
        return responses::wrapper($result);

    $rsp = $result[0];

    $success = $rsp === responses::logged_in;

    return json_encode(array(
        'success' => $success,
        'response' => $rsp,
        'message' => responses::switcher($rsp),
        'user_data' => $result[1]
    ));
}
