<?php
namespace api;

use c_functions;
use c_responses;
use api\fetch;
use api\validation;
use mysqli_wrapper;

function get_time_to_update($token_data, $user_data){
    $format = c_functions::get_time_to_add($token_data["c_days"]); //example : +5 days

    $user_expiry = $user_data["c_expires"];

    if ($user_expiry == '0' || time() > $user_expiry)
        return strtotime($format);

    return strtotime($format, $user_expiry);
}

function activate(mysqli_wrapper $c_con, $program_key, $username, $token) {
    $program_data = fetch\fetch_program($c_con, $program_key);

    if (!is_array($program_data))
        return $program_data;

    $user_data = fetch\fetch_user($c_con, $program_key, $username);

    if (!is_array($user_data))
        return $user_data;

    $user_data_validation = validation\validate_user_data($user_data);

    if ($user_data_validation !== c_responses::success && $user_data_validation !== c_responses::no_valid_subscription)
        return $user_data_validation;

    $token_data = fetch\fetch_token($c_con, $program_key, $token);

    if (!is_array($token_data))
        return $token_data;

    if ($token_data["c_used"] == '1')
        return c_responses::already_used_token;

    $time_to_update = get_time_to_update($token_data, $user_data);

    $c_con->query("UPDATE c_program_users SET c_expires=?, c_rank=? WHERE c_program=? AND c_username=?", [$time_to_update, $token_data["c_rank"], $program_key, $username]);

    $c_con->query("UPDATE c_program_tokens SET c_used='1', c_used_by=? WHERE c_program=? AND c_token=?", [$username, $program_key, $token]);

    return c_responses::success;

}