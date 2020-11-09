<?php
namespace api\general;

use responses;
use mysqli_wrapper;

function get_enc_data(mysqli_wrapper $c_con, $program_key) { //function used to get the encryption key
    $program_check = $c_con->query("SELECT c_encryption_key FROM c_programs WHERE c_program_key=?", [$program_key]);

    if ($program_check->num_rows === 0)
        return responses::program_doesnt_exist;

    return $program_check->fetch_assoc()["c_encryption_key"];
}

function get_pk_from_session(mysqli_wrapper $c_con, /*int|string*/ $session) { //function used to fetch the program key from a session ID
    $session_check = $c_con->query("SELECT c_program FROM c_program_sessions WHERE c_session=?", [$session]);

    if ($session_check->num_rows === 0)
        return responses::program_doesnt_exist;

    return $session_check->fetch_assoc()["c_program"];
}

function get_iv_data(mysqli_wrapper $c_con, $program_key, /*int|string*/ $input_session) { //get the iv from a specific pk and session id
    $program_session_check = $c_con->query("SELECT * FROM c_program_sessions WHERE c_program=? AND c_session=?", [$program_key, $input_session]);

    if ($program_session_check->num_rows === 0)
        return responses::program_doesnt_exist;

    $p_row = $program_session_check->fetch_assoc();

    if (time() > (int)$p_row["c_expires"]) {
        $c_con->query("DELETE FROM c_program_sessions WHERE c_program=? AND c_session=?", [$program_key, $input_session]);
        return "expired";
    }

    return $p_row["c_iv"];
}

//program api/encryption key
function validate_api_key(mysqli_wrapper $c_con, $program_key, $api_key) { //if the api/enc key's right
    $p_check = $c_con->query("SELECT c_encryption_key FROM c_programs WHERE c_program_key=?", [$program_key]);

    if ($p_check->num_rows === 0)
        return responses::program_doesnt_exist;

    if ($p_check->fetch_assoc()["c_encryption_key"] !== $api_key)
        return "api_key_is_wrong";

    return responses::success;
}

function is_premium(mysqli_wrapper $c_con, $program_key) { //check if the user is premium
    $program_check = $c_con->query("SELECT c_owner FROM c_programs WHERE c_program_key=?", [$program_key]);

    if ($program_check->num_rows === 0)
        return false;

    $user_check = $c_con->query("SELECT c_premium FROM c_users WHERE c_username=?", [$program_check->fetch_assoc()["c_owner"]]);

    if ($user_check->num_rows === 0)
        return false;

    return (bool)$user_check->fetch_assoc()["c_premium"];
}

function get_admin_token(mysqli_wrapper $c_con, $program_key) { //fetch the admin token
    $program_query = $c_con->query("SELECT c_owner FROM c_programs WHERE c_program_key=?", [$program_key]);

    $user_query = $c_con->query("SELECT c_admin_token FROM c_users WHERE c_username=?", [$program_query->fetch_assoc()["c_owner"]]);

    $adm_token = $user_query->fetch_assoc()["c_admin_token"];

    return ($adm_token !== '0') ? $adm_token : "generate_a_token";
}

function is_killswitch_enabled(mysqli_wrapper $c_con, $program_key){ //check if the program killswitch is enabled
    $program_query = $c_con->query("SELECT c_killswitch FROM c_programs WHERE c_program_key=?", [$program_key]);

    return (bool)$program_query->fetch_assoc()["c_killswitch"];
}
