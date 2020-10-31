<?php
namespace api\admin;

use api\fetch;
use c_responses;
use mysqli_wrapper;

function delete_all_logs(mysqli_wrapper $c_con, $program_key){
    if(!fetch\program_exists($c_con, $program_key))
        return c_responses::program_doesnt_exist;

    $c_con->query("DELETE FROM c_program_logs WHERE c_program=?", [$program_key]);

    return c_responses::success;
}