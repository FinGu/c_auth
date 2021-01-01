<?php
namespace api\general;

use responses;
use mysqli_wrapper;
use api\fetch;

//program api/encryption key
function validate_api_key(mysqli_wrapper $c_con, $program_key, $api_key) { //if the api/enc key's right
    $program_data = fetch\fetch_program($c_con, $program_key, false);

    if($program_data === responses::program_doesnt_exist)
        return $program_data;

    if($program_data['c_encryption_key'] !== $api_key)
        return 'api_key_is_wrong';

    return responses::success;
}

function is_premium(mysqli_wrapper $c_con, $program_key) { //check if the user is premium
    $program_check = $c_con->query('SELECT c_owner FROM c_programs WHERE c_program_key=?', [$program_key]);

    if ($program_check->num_rows === 0)
        return false;

    $user_check = $c_con->query('SELECT c_premium FROM c_users WHERE c_username=?', [$program_check->fetch_assoc()['c_owner']]);

    if ($user_check->num_rows === 0)
        return false;

    return (bool)$user_check->fetch_assoc()['c_premium'];
}

function get_admin_token(mysqli_wrapper $c_con, $program_key) { //fetch the admin token
    $program_query = $c_con->query('SELECT c_owner FROM c_programs WHERE c_program_key=?', [$program_key]); //do not handle invalid entries

    $user_query = $c_con->query('SELECT c_admin_token FROM c_users WHERE c_username=?', [$program_query->fetch_assoc()['c_owner']]);

    $adm_token = $user_query->fetch_assoc()['c_admin_token'];

    return ($adm_token !== '0') ? $adm_token : 'generate_a_token';
}

