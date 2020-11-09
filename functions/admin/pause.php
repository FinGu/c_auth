<?php
namespace api\admin;

use functions;
use responses;

use api\fetch;
use mysqli_wrapper;

function pause_user(mysqli_wrapper $c_con, $program_key, $username) {
    if (!fetch\program_exists($c_con, $program_key))
        return responses::program_doesnt_exist;

    $user_data = fetch\fetch_user($c_con, $program_key, $username);

    if ($user_data === responses::not_valid_username)
        return $user_data;

    if ($user_data['c_paused'] != '0')
        return "user_already_paused";

    $user_timestamp = $user_data['c_expires'];

    if (time() > $user_timestamp)
        return responses::no_valid_subscription;

    $time_to_be_added = functions::get_time_to_add(c_functions::get_days_date_dif($user_timestamp));

    $c_con->query("UPDATE c_program_users SET c_paused=? WHERE c_username=? AND c_program=?", [$time_to_be_added, $username, $program_key]);

    return responses::success;
}

function unpause_user(mysqli_wrapper $c_con, $program_key, $username) {
    if (!fetch\program_exists($c_con, $program_key))
        return responses::program_doesnt_exist;

    $user_data = fetch\fetch_user($c_con, $program_key, $username);
    //get the user data ^

    if ($user_data === responses::not_valid_username)
        return $user_data;

    if ($user_data['c_paused'] == '0')
        return "user_isnt_paused";

    $new_expiry_value = strtotime($user_data['c_paused']);

    $c_con->query("UPDATE c_program_users SET c_expires=?, c_paused=? WHERE c_username=? AND c_program=?", [$new_expiry_value, '0', $username, $program_key]);

    return responses::success;
}
