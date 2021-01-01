<?php
namespace api\fetch;

use mysqli_wrapper;
use responses;
use encryption;

function fetch_var(mysqli_wrapper $c_con, $program_key, $var_name) {
    $v_query = $c_con->query('SELECT * FROM c_program_vars WHERE c_program=? AND c_name=?', [$program_key, $var_name]);

    if ($v_query->num_rows === 0)
        return responses::not_valid_var;

    return $v_query->fetch_assoc();
}

function fetch_all_vars(mysqli_wrapper $c_con, $program_key) {
    $v_query = $c_con->query('SELECT * FROM c_program_vars WHERE c_program=?', [$program_key]);

    return $v_query->fetch_all(1);
}

function fetch_and_decrypt_all_vars(mysqli_wrapper $c_con, $program_key){
    $all_vars = fetch_all_vars($c_con, $program_key);

    foreach($all_vars as &$var){
        if($var['c_enc_key'] == '0')
            continue;
        
        $var['c_value'] = encryption::static_decrypt($var['c_value'], $var['c_enc_key']);
    }

    return $all_vars;
}
