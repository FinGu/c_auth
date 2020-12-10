<?php
namespace api\admin;

use api\fetch;
use responses;
use mysqli_wrapper;
use functions;
use encryption;

function module_already_exists(mysqli_wrapper $c_con, $file_name){
    $ma_q = $c_con->query('SELECT c_file_name FROM c_program_modules WHERE c_file_name=?', [$file_name]);

    return $ma_q->num_rows > 0;
}

function add_module(mysqli_wrapper $c_con, $program_key, $file_name, $file){
    //$file_name = htmlentities($file_name);

    if($c_con->query("SELECT c_program FROM c_program_modules WHERE c_program=?", [$program_key])->num_rows >= 15)
        return "maximum_modules_reached";

    $rnd_data = fetch\fetch_module_rand_data(); 

    if(!move_uploaded_file($file['tmp_name'], $rnd_data['new_location'])){
        return 'bad_upload'; 
    }

    $file_data = file_get_contents($rnd_data['new_location']);

    $encrypted_data = encryption::static_encrypt($file_data, $rnd_data['enc_key']);

    file_put_contents($rnd_data['new_location'], $encrypted_data);

    $c_con->query('INSERT INTO c_program_modules(c_program, c_file_id, c_file_name, c_file_location, c_enc_key) VALUES(?, ?, ?, ?, ?)', [$program_key, $rnd_data['file_id'], $file_name, $rnd_data['new_location'], $rnd_data['enc_key']]);

    return responses::success;
}

function delete_module(mysqli_wrapper $c_con, $program_key, $file_id){
    if($c_con->query('SELECT c_file_id FROM c_program_modules WHERE c_program=? AND c_file_id=?', [$program_key, $file_id])->num_rows > 0)
        return responses::not_valid_module;

    $module_location = fetch\fetch_module($c_con, $program_key, $file_id)['c_file_location'];

    $c_con->query('DELETE FROM c_program_modules WHERE c_program=? AND c_file_id=?', [$program_key, $file_id]);

    unlink($module_location);

    return responses::success;
}

