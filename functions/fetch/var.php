<?php
namespace api\fetch;

use mysqli_wrapper;

function fetch_var(mysqli_wrapper $c_con, $program_key, $var_name) {
    $v_query = $c_con->query("SELECT * FROM c_program_vars WHERE c_program=? AND c_name=?", [$program_key, $var_name]);

    if ($v_query->num_rows === 0)
        return "invalid_var";

    return $v_query->fetch_assoc();
}

function fetch_all_vars(mysqli_wrapper $c_con, $program_key) {
    $v_query = $c_con->query("SELECT * FROM c_program_vars WHERE c_program=?", [$program_key]);

    return $v_query->fetch_all(1);
}