<?php
namespace api\admin;

use api\general;
use api\fetch;
use mysqli_wrapper;
use responses;
use encryption;
use functions;

function var_already_exists(mysqli_wrapper $c_con, $program_key, $var_name){
    $var_q = $c_con->query("SELECT c_name FROM c_program_vars WHERE c_program=? AND c_name=?", [$program_key, $var_name]);

    return $var_q->num_rows > 0;
}

function get_all_vars_amount(mysqli_wrapper $c_con, $program_key){
    $var_q = $c_con->query("SELECT c_program FROM c_program_vars WHERE c_program=?", [$program_key]);

    return $var_q->num_rows;
}

function create_var(mysqli_wrapper $c_con, $program_key, $var_name, $var_value){
    if(empty($var_name) || empty($var_value))
        return "empty_data";

    $max_var_value = general\is_premium($c_con, $program_key) ? 300 : 5;

    $all_vars_amount = get_all_vars_amount($c_con, $program_key);

    if($all_vars_amount >= $max_var_value)
        return "maximum_vars_reached";

    if(var_already_exists($c_con, $program_key, $var_name))
        return "var_already_exists";

    $enc_key = functions::random_string(16);

    $var_value = encryption::static_encrypt($var_value, $enc_key);

    $c_con->query("INSERT INTO c_program_vars (c_program, c_name, c_value, c_enc_key) VALUES(?, ?, ?, ?)", [$program_key, $var_name, $var_value, $enc_key]);

    return responses::success;
}
    
function update_var(mysqli_wrapper $c_con, $program_key, $var_name, $new_var_value){ //TODO : encrypt non encrypted vars while updating
    if(empty($new_var_value))
        return "empty_data";

    $var_data = fetch\fetch_var($c_con, $program_key, $var_name);

    $new_var_value = $var_data['c_enc_key'] != '0' ? encryption::static_encrypt($new_var_value, $var_data['c_enc_key']) : $new_var_value;

    $c_con->query('UPDATE c_program_vars SET c_value=? WHERE c_program=? AND c_name=?', [$new_var_value, $program_key, $var_name]);

    return responses::success;
}

function delete_var(mysqli_wrapper $c_con, $program_key, $var_name){
    $c_con->query("DELETE FROM c_program_vars WHERE c_program=? AND c_name=?", [$program_key, $var_name]);

    return responses::success;
}

//TODO : add this stuff to the admin api
