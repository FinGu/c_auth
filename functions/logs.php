<?php
namespace api;

use functions;
use responses;

use api\general;
use api\validation;
use api\fetch;
use mysqli_wrapper;

function create_log(mysqli_wrapper $c_con, $program_key, $username, $message){
    $logs_amount = $c_con->query("SELECT * FROM c_program_logs WHERE c_program=?", [$program_key])->num_rows;

    $max_amount = general\is_premium($c_con, $program_key) ? 10000 : 500;

    if ($max_amount > $logs_amount)
        $c_con->query("INSERT INTO c_program_logs(c_program, c_username, c_message, c_time, c_ip) VALUES(?, ?, ?, ?, ?)", [$program_key, $username, $message, date("Y-m-d H:i:s"), functions::get_ip()]);

    return responses::success;
}

function log(mysqli_wrapper $c_con, $program_key, $username, $message) {
    $program_validation = validation\validate_program($c_con, $program_key);

    if ($program_validation !== responses::success)
        return $program_validation;

    if ($username === "NONE")
        return create_log($c_con, $program_key, $username, $message);

    $user_data = fetch\fetch_user($c_con, $program_key, $username);

    if (is_array($user_data))
        return create_log($c_con, $program_key, $username, $message);

    return responses::not_valid_username;
}
