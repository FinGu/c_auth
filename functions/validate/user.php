<?php
namespace api\validation;

use mysqli_wrapper;
use c_responses;
use api\fetch;

function validate_user_data(array $user_data) {
    if ($user_data["c_banned"] == '1')
        return c_responses::user_is_banned;

    if ($user_data["c_paused"] != '0')
        return c_responses::user_sub_is_paused;

    if (time() > (int)$user_data["c_expires"])
        return c_responses::no_valid_subscription;

    return c_responses::success;
}

function validate_user_hwid(mysqli_wrapper $c_con, $program_data, $user_data, $hwid_to_check) {
    if ($program_data["c_hwide"] == '0')
        return c_responses::success;

    if ($user_data["c_hwid"] == '0')
        $c_con->query("UPDATE c_program_users SET c_hwid=? WHERE c_program=? AND c_username=?", [$hwid_to_check, $program_data["c_program_key"], $user_data["c_username"]]);

    else if ($user_data["c_hwid"] != $hwid_to_check)
        return c_responses::user_hwid_is_wrong;

    return c_responses::success;
}

function validate_registering_data(mysqli_wrapper $c_con, $program_key, $username, $email) {
    if (fetch\user_already_exists($c_con, $program_key, $username))
        return "user_already_exists";

    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        return "invalid_email_format";

    if (fetch\email_already_exists($c_con, $program_key, $username))
        return "email_already_exists";

    return c_responses::success;
}