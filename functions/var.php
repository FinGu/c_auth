<?php
namespace api;

use c_responses;
use mysqli_wrapper;
use api\validation;
use api\fetch;

function variable(mysqli_wrapper $c_con, $program_key, $var_name, $username, $password, $hwid){
    $program_data = fetch\fetch_program($c_con, $program_key);

    if (!is_array($program_data))
        return $program_data;

    $user_data = fetch\fetch_user($c_con, $program_key, $username);

    if (!is_array($user_data))
        return $user_data;

    if (!password_verify($password, $user_data["c_password"]))
        return c_responses::password_is_wrong;

    $user_data_validation = validation\validate_user_data($user_data);

    if ($user_data_validation !== c_responses::success)
        return $user_data_validation;

    $user_hwid_validation = validation\validate_user_hwid($c_con, $program_data, $user_data, $hwid);

    if ($user_hwid_validation !== c_responses::success)
        return $user_hwid_validation;

    $var_data = fetch\fetch_var($c_con, $program_key, $var_name);

    return ($var_data !== "invalid_var")
        ? $var_data["c_value"]
        : "invalid_var";
}