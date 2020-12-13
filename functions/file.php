<?php
namespace api;

use mysqli_wrapper;
use encryption;
use responses;

function file(mysqli_wrapper $c_con, $program_key, $file_name, $username, $password, $hwid){
    $login_response = login($c_con, $program_key, $username, $password, $hwid);

    if(!is_array($login_response))
        return $login_response;

    $file_data = fetch\fetch_file_with_name($c_con, $program_key, $file_name);

    if(!is_array($file_data))
        return $file_data;

    $encrypted_content = file_get_contents($file_data['c_file_location']);

    $content = encryption::static_decrypt($encrypted_content, $file_data['c_enc_key']);

    return array(responses::success, $content);
}

