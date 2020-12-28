<?php
namespace api;

use responses;
use mysqli_wrapper;
use api\fetch;

function variable(mysqli_wrapper $c_con, $session_id, $var_name){
    $session_data = fetch\fetch_session($c_con, $session_id);

    if($session_data === responses::not_valid_session)
        return $session_data;

    $session_validation = validation\validate_session($session_data, true);

    if($session_validation !== responses::success)
        return $session_validation;

    $var_data = fetch\fetch_var($c_con, $session_data['c_program'], $var_name);

    if($var_data === responses::not_valid_var)
        return $var_data;

    return array(responses::success, $var_data['c_value']);
}
