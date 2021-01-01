<?php
namespace api;

use functions;
use responses;

use mysqli_wrapper;
use api\validation;
use api\fetch;

function login(mysqli_wrapper $c_con, $program_key, $username, $password, $hwid = null) {
    $program_data = fetch\fetch_program($c_con, $program_key);

    if (!is_array($program_data))
        return $program_data;

    $user_data = fetch\fetch_user($c_con, $program_key, $username); //get the user data

    if (!is_array($user_data))
        return $user_data;

    if (!password_verify($password, $user_data['c_password']))
        return responses::password_is_wrong;

    $user_data_validation = validation\validate_user_data($user_data);

    if ($user_data_validation !== responses::success)
        return $user_data_validation;

    $user_hwid_validation = validation\validate_user_hwid($c_con, $program_data, $user_data, $hwid);

    if ($hwid !== null && $user_hwid_validation !== responses::success)
        return $user_hwid_validation;

    $usr_data_arr = array(
        'username' => $user_data['c_username'],
        'email' => $user_data['c_email'],
        'expires' => $user_data['c_expires'],
        'var' => $user_data['c_var'],
        'rank' => $user_data['c_rank']
    );

    $c_con->query('UPDATE c_program_users SET c_ip=? WHERE c_program=? AND c_username=?', [functions::get_ip(), $program_key, $username]);

    return array(responses::logged_in, $usr_data_arr);
}
