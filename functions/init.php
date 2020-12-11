<?php
namespace api;

use functions;

use api\fetch;
use mysqli_wrapper;

function create_session(mysqli_wrapper $c_con, $program_key, $session_iv, $expiry) {
    $session_id = functions::random_string(14); //session ID

    if ($c_con->query("SELECT * FROM c_program_sessions WHERE c_program=?", [$program_key])->num_rows >= 300)
        $c_con->query("DELETE FROM c_program_sessions WHERE c_program=?", [$program_key]);

    $c_con->query("INSERT INTO c_program_sessions(c_program, c_session, c_expires, c_iv) VALUES(?, ?, ?, ?)", [$program_key, $session_id, time() + $expiry, $session_iv]);

    return $session_id;
}

function init(mysqli_wrapper $c_con, $version, $api_version, $program_key, $session_iv) {
    $api_version_value = '1.1';

    $program_data = fetch\fetch_program($c_con, $program_key);

    if (!is_array($program_data))
        return $program_data;

    if ($api_version != $api_version_value)
        return "old_api_version";

    if ($version != $program_data["c_version"])
        return array("wrong_version", $program_data["c_dl"]);

    $iv_to_be_added = functions::random_string(6); // i append this string to the session_iv

    $o_hash = substr(hash("sha256", $session_iv . $iv_to_be_added), 0, 16);
    //i hash the session iv + the random string to be added and get only 16 chars of the hex output

    $session_id = create_session($c_con, $program_key, $o_hash, ($program_data["c_sem"] * 60));

    return array("started_program", $iv_to_be_added, $session_id);
    //return the success code with the iv that will be appended with the session id
}
