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

function wrap_init(mysqli_wrapper $c_con, $version, $api_version, $program_key, $session_iv){       
    $result = api\init($c_con, $version, $api_version, $program_key, $session_iv);

    if(!is_array($result))
        return responses::wrapper($result);

    $rsp = $result[0];
     
    $vl = ''; 

    foreach($result as $value)
        $vl .= $value . '|';

    $vl = substr($vl, 0, -1);

    return responses::wrapper( 
        $vl,
        responses::switcher($rsp),
        $rsp === "started_program"
    );
}

function wrap_login(mysqli_wrapper $c_con, $program_key, $username, $password, $hwid){
    $result = api\login($c_con, $program_key, $username, $password, $hwid);

    if(!is_array($result))
        return responses::wrapper($result);

    $rsp = $result[0];

    return json_encode(array(
        "success" => $rsp === responses::logged_in,
        "response" => $rsp,
        "message" => responses::switcher($rsp),
        "user_data" => $result[1]
    ));
}
