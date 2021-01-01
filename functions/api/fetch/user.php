<?php
namespace api\fetch;

use responses;
use mysqli_wrapper;

function user_already_exists(mysqli_wrapper $c_con, $program_key, $username) {
    return $c_con->query('SELECT c_username FROM c_program_users WHERE c_program=? AND c_username=?', [$program_key, $username])->num_rows > 0;
}

function email_already_exists(mysqli_wrapper $c_con, $program_key, $email) {
    return $c_con->query('SELECT c_email FROM c_program_users WHERE c_program=? AND c_email=?', [$program_key, $email])->num_rows > 0;
}

function fetch_user(mysqli_wrapper $c_con, $program_key, $username){ 
    $u_query = $c_con->query('SELECT * FROM c_program_users WHERE c_program=? AND c_username=?', [$program_key, $username]);

    if ($u_query->num_rows === 0)
        return responses::not_valid_username;

    return $u_query->fetch_assoc();
}

function fetch_all_users(mysqli_wrapper $c_con, $program_key) {
    $all_u_q = $c_con->query('SELECT * FROM c_program_users WHERE c_program=?', [$program_key]);

    return $all_u_q->fetch_all(1);
}
