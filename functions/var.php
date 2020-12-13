<?php
namespace api;

use responses;
use mysqli_wrapper;
use api\validation;
use api\fetch;

function variable(mysqli_wrapper $c_con, $program_key, $var_name, $username, $password, $hwid){
    $login_response = login($c_con, $program_key, $username, $password, $hwid); 

    if(!is_array($login_response))
        return $login_response;

    $var_data = fetch\fetch_var($c_con, $program_key, $var_name);

    if($var_data === responses::not_valid_var)
        return $var_data;

    return array(responses::success, $var_data['c_value']);
}
