<?php
namespace api\admin;

use responses;
use api\general;
use api\fetch;
use mysqli_wrapper;

function admin_authenticate(mysqli_wrapper $c_con, $admin_token, $program_key) {
    if (!fetch\program_exists($c_con, $program_key)) //if the program exists
        return responses::program_doesnt_exist;

    if (!general\is_premium($c_con, $program_key))
        return "not_a_premium_account";

    $real_key = general\get_admin_token($c_con, $program_key);

    if ($real_key === "generate_a_token")
        return $real_key;

    if ($admin_token !== $real_key)
        return "wrong_admin_token";

    return responses::success;
}
