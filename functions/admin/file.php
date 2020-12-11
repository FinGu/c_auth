<?php
namespace api\admin;

use api\fetch;
use responses;
use mysqli_wrapper;
use encryption;

function file_already_exists(mysqli_wrapper $c_con, $program_key, $file_name){
    $query = $c_con->query('SELECT c_file_name FROM c_program_files WHERE c_program=? AND c_file_name=?', [$program_key, $file_name]);

    return $query->num_rows > 0;
}

function add_file(mysqli_wrapper $c_con, $program_key, $file_name, $file){
    if($c_con->query("SELECT c_program FROM c_program_files WHERE c_program=?", [$program_key])->num_rows >= 15)
        return "maximum_files_reached";

    if(file_already_exists($c_con, $program_key, $file_name))
        return 'file_already_exists';

    $rnd_data = fetch\fetch_file_rand_data();

    if(!move_uploaded_file($file['tmp_name'], $rnd_data['new_location']))
        return 'bad_upload';  

    $file_content = file_get_contents($rnd_data['new_location']);

    $encrypted_content = encryption::static_encrypt($file_content, $rnd_data['enc_key']);

    file_put_contents($rnd_data['new_location'], $encrypted_content);

    $c_con->query('INSERT INTO c_program_files(c_program, c_file_id, c_file_name, c_file_location, c_enc_key) VALUES(?, ?, ?, ?, ?)', [$program_key, $rnd_data['file_id'], $file_name, $rnd_data['new_location'], $rnd_data['enc_key']]);

    return responses::success;
}

function update_file(mysqli_wrapper $c_con, $program_key, $file_id, $file){
     $file_data = fetch\fetch_file($c_con, $program_key, $file_id);
         
     if(!move_uploaded_file($file['tmp_name'], $file_data['c_file_location']))
         return 'bad_upload';

     $file_content = file_get_contents($file_data['c_file_location']);

     $encrypted_content = encryption::static_encrypt($file_content, $file_data['c_enc_key']);

     file_put_contents($file_data['c_file_location'], $encrypted_content);

     return responses::success; 
}

function delete_file(mysqli_wrapper $c_con, $program_key, $file_id){
    if($c_con->query('SELECT c_file_id FROM c_program_files WHERE c_program=? AND c_file_id=?', [$program_key, $file_id])->num_rows === 0)
        return responses::not_valid_file;

    $file_location = fetch\fetch_file($c_con, $program_key, $file_id)['c_file_location'];

    $c_con->query('DELETE FROM c_program_files WHERE c_program=? AND c_file_id=?', [$program_key, $file_id]);

    unlink($file_location);

    return responses::success;
}

