<?php
namespace api\fetch;

use mysqli_wrapper;
use responses;

function fetch_session(mysqli_wrapper $c_con, $session_id){
    $sq = $c_con->query('SELECT * FROM c_program_sessions WHERE c_session=?', [$session_id]);

    if($sq->num_rows === 0)
        return responses::not_valid_session;

    return $sq->fetch_assoc();
}

