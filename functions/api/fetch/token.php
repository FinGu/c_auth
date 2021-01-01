<?php
namespace api\fetch;

use responses;
use mysqli_wrapper;

function fetch_token(mysqli_wrapper $c_con, $program_key, $token) { //fetch the token data using the program key and token
    $token_query = $c_con->query('SELECT * FROM c_program_tokens WHERE c_program=? AND c_token=?', [$program_key, $token]);

    if ($token_query->num_rows === 0)
        return responses::token_isnt_valid;

    return $token_query->fetch_assoc();
}

function fetch_all_tokens(mysqli_wrapper $c_con, $program_key) {
    $all_tokens_query = $c_con->query('SELECT * FROM c_program_tokens WHERE c_program=?', [$program_key]);

    return $all_tokens_query->fetch_all(1);
}
