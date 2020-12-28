<?php
namespace api;

use mysqli_wrapper;
use encryption;
use responses;

function file(mysqli_wrapper $c_con, $session_id, $file_name){
    $session_data = fetch\fetch_session($c_con, $session_id);

    if($session_data === responses::not_valid_session)
        return $session_data;

    $session_validation = validation\validate_session($session_data, true);

    if($session_validation !== responses::success)
        return $session_validation;

    $file_data = fetch\fetch_file_with_name($c_con, $session_data['c_program'], $file_name);

    if(!is_array($file_data))
        return $file_data;

    $encrypted_content = file_get_contents($file_data['c_file_location']);

    $content = encryption::static_decrypt($encrypted_content, $file_data['c_enc_key']);

    return array(responses::success, $content);
}

