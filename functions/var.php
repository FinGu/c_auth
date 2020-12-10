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

    return ($var_data !== "invalid_var")
        ? $var_data["c_value"]
        : "invalid_var";
}
