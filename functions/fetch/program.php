<?php
namespace api\fetch;

use mysqli_wrapper;
use responses;

function program_exists(mysqli_wrapper $c_con, $program_key){ //if the program exists
    return $c_con->query("SELECT c_program_key FROM c_programs WHERE c_program_key=?", [$program_key])->num_rows !== 0;
}

function fetch_program(mysqli_wrapper $c_con, $program_key, $ks_check = true) { //fetch program data using the program key
    $p_query = $c_con->query("SELECT * FROM c_programs WHERE c_program_key=?", [$program_key]);

    if ($p_query->num_rows === 0)
        return responses::program_doesnt_exist;

    $program_data = $p_query->fetch_assoc();

    if ( (bool)$program_data['c_killswitch'] && $ks_check )
        return responses::killswitch_is_enabled;

    return $program_data;
}

function fetch_all_programs(mysqli_wrapper $c_con, $program_owner) {
    $p_r = $c_con->query("SELECT * FROM c_programs WHERE c_owner=?", [$program_owner]);

    return $p_r->fetch_all(1);
}
