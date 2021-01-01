<?php
namespace api\admin;

use mysqli_wrapper;
use api\fetch;

use responses;

function reset_user_hwid(mysqli_wrapper $c_con, $program_key, $username, $all = false){
    if (!$all && !fetch\user_already_exists($c_con, $program_key, $username))
        return responses::not_valid_username;

    $query = 'UPDATE c_program_users SET c_hwid=0 WHERE c_program=?';

    if($all)
        $c_con->query($query, [$program_key]);
    else
        $c_con->query($query . ' AND c_username=?', [$program_key, $username]);

    return responses::success;
}

function edit_user_var(mysqli_wrapper $c_con, $program_key, $new_var_value, $username){
    if (!fetch\user_already_exists($c_con, $program_key, $username))
        return responses::not_valid_username;

    $c_con->query('UPDATE c_program_users SET c_var=? WHERE c_username=? AND c_program=?', [$new_var_value, $username, $program_key]);

    return responses::success;
}

function ban_user(mysqli_wrapper $c_con, $program_key, $username, $unban = false){
    if (!fetch\user_already_exists($c_con, $program_key, $username))
        return responses::not_valid_username;

    $query = static function($i) { return "UPDATE c_program_users SET c_banned='{$i}' WHERE c_username=? AND c_program=?"; };

    if(!$unban)
        $c_con->query($query(1), [$username, $program_key]);
    else
        $c_con->query($query(0), [$username, $program_key]);

    return responses::success;
}

function delete_user(mysqli_wrapper $c_con, $program_key, $username){
    if(!fetch\user_already_exists($c_con, $program_key, $username))
        return responses::not_valid_username;

    $c_con->query('DELETE FROM c_program_users WHERE c_username=? AND c_program=?', [$username, $program_key]);

    return responses::success;
}
