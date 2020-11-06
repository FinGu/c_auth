<?php
namespace api\admin;

use api\validation;
use c_functions;
use c_responses;
use mysqli_wrapper;

function get_all_program_amount(mysqli_wrapper $c_con, $program_owner){
    $p_q = $c_con->query("SELECT c_owner FROM c_programs WHERE c_owner=?", [$program_owner]);

    return $p_q->num_rows;
}

function program_already_exists(mysqli_wrapper $c_con, $program_name){
    $p_q = $c_con->query("SELECT c_program_name FROM c_programs WHERE c_program_name=?", [$program_name]);

    return $p_q->num_rows > 0;
}

function is_owner_premium(mysqli_wrapper $c_con, $program_owner){
    $u_q = $c_con->query("SELECT c_premium FROM c_users WHERE c_username=?", [$program_owner]);

    return ( (int)$u_q->fetch_assoc()["c_premium"] > 0 );
}

function create_program(mysqli_wrapper $c_con, $program_owner, $program_name, $program_api_key) {
    if (empty($program_name) || empty($program_api_key))
        return "empty_data";

    $max_program_value = is_owner_premium($c_con, $program_owner) ? 15 : 2;

    $all_program_amount = get_all_program_amount($c_con, $program_owner);

    if ($all_program_amount >= $max_program_value)
        return "maximum_programs_reached";

    if (program_already_exists($c_con, $program_name))
        return "program_already_exists";

    $c_con->query("INSERT INTO c_programs (c_owner, c_program_name, c_program_key, c_encryption_key) VALUES(?, ?, ?, ?)",
        array($program_owner, $program_name, c_functions::random_string(43,
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"), $program_api_key));

    return c_responses::success;
}

function delete_program(mysqli_wrapper $c_con, $program_owner, $program_key){
    if(!validation\program_valid_under_name($c_con, $program_owner, $program_key))
        return c_responses::program_doesnt_exist;

    $all_sqls[] = 'DELETE FROM c_programs WHERE c_program_key=?';
    $all_sqls[] = 'DELETE FROM c_program_tokens WHERE c_program=?';
    $all_sqls[] = 'DELETE FROM c_program_users WHERE c_program=?';
    $all_sqls[] = 'DELETE FROM c_program_vars WHERE c_program=?';
    $all_sqls[] = 'DELETE FROM c_program_sessions WHERE c_program=?';

    foreach($all_sqls as $sql)
        $c_con->query($sql, [$program_key]);

    return c_responses::success;
}

function update_program_data(mysqli_wrapper $c_con, array $data){
    $query = static function($arg){ return "UPDATE c_programs SET {$arg}=? WHERE c_program_key=?"; };

    $program_key = $data['program_key'];

    if(isset($data['api_key']))
        $c_con->query($query('c_encryption_key'), [$data['api_key'], $program_key]);

    if(isset($data['expiration_minutes']))
        $c_con->query($query('c_sem'), [$data['expiration_minutes'], $program_key]);

    if(isset($data['version']))
        $c_con->query($query('c_version'), [$data['version'], $program_key]);

    if(isset($data['download_link']))
        $c_con->query($query('c_dl'), [$data['download_link'], $program_key]);

    $c_con->query($query('c_killswitch'), [isset($data['killswitch']) ? '1' : '0', $program_key]);

    $c_con->query($query('c_hwide'), [isset($data['hwid']) ? '1' : '0' , $program_key]);

    return c_responses::success;
}
