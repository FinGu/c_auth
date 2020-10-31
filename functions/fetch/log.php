<?php
namespace api\fetch;

use mysqli_wrapper;

function fetch_all_logs(mysqli_wrapper $c_con, $program_key) {
    $data_query = $c_con->query("SELECT * FROM c_program_logs WHERE c_program=?", [$program_key]);

    return $data_query->fetch_all(1);
}