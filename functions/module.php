<?php
namespace api;

use functions;
use mysqli_wrapper;
use responses;
use encryption;

function module(mysqli_wrapper $c_con, $program_key, $file_name, $username, $password, $hwid){
    $login_response = login($c_con, $program_key, $username, $password, $hwid);

    if(!is_array($login_response))
        return $login_response;

    $module_data = fetch\fetch_module_with_name($c_con, $program_key, $file_name);

    if(!is_array($module_data))
        return $module_data;

    $encrypted_content = file_get_contents($module_data['c_file_location']);

    $content = encryption::static_decrypt($encrypted_content, $module_data['c_enc_key']);

    return $content;
}

