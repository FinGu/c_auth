<?php

function wrap_init(mysqli_wrapper $c_con, $version, $api_version, $program_key, $session_iv){       
    $result = api\init($c_con, $version, $api_version, $program_key, $session_iv);

    if(!is_array($result))
        return c_responses::wrapper($result);

    $rsp = $result[0];
     
    $vl = ''; 

    foreach($result as $value)
        $vl .= $value . '|';

    $vl = substr($vl, 0, -1);

    return c_responses::wrapper( 
        $vl,
        c_responses::switcher($rsp),
        $rsp === "started_program"
    );
}

function wrap_login(mysqli_wrapper $c_con, $program_key, $username, $password, $hwid){
    $result = api\login($c_con, $program_key, $username, $password, $hwid);

    if(!is_array($result))
        return c_responses::wrapper($result);

    $rsp = $result[0];

    return json_encode(array(
        "success" => $rsp === c_responses::logged_in,
        "response" => $rsp,
        "message" => c_responses::switcher($rsp),
        "user_data" => $result[1]
    ));
}
