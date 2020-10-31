<?php
namespace api\admin;

use api\general;
use mysqli_wrapper;
use c_functions;
use c_responses;

function gen_token(mysqli_wrapper $c_con, $program_key, $token_amount, $token_days, $token_level, $token_type = 0, $custom_mask = null){
    $limit = general\is_premium($c_con, $program_key) ? 7500 : 75;

    if($c_con->query("SELECT * FROM c_program_tokens WHERE c_program=?", [$program_key])->num_rows >= $limit)
        return "maximum_tokens_reached";

    $token_amount = filter_var($token_amount, FILTER_SANITIZE_NUMBER_INT);

    if (($limit === 7500 && $token_amount >= 500) || ($limit === 75 && $token_amount >= 75))
        return "only_500_tokens_per_time";

    if($token_type === 4 && !(strpos($custom_mask, "X") !== false) )
        return "mask_issue";

    $var_to_return = array();

    for ($x = 0; $x < $token_amount; $x++) {
        $token = c_functions::xss_clean(c_functions::generate_license($token_type, $custom_mask));

        $c_con->query("INSERT INTO c_program_tokens (c_program, c_token, c_days, c_rank) VALUES(?, ?, ?, ?)", array(
            $program_key,
            $token,
            $token_days,
            $token_level
        ), 'ssii');

        $var_to_return[] = $token;
    }

    return $var_to_return;
}

function delete_token(mysqli_wrapper $c_con, $program_key, $token, $all = false) {
    $token_is_valid = $c_con->query("SELECT * FROM c_program_tokens WHERE c_token=? AND c_program=?", [$token, $program_key])->num_rows !== 0;

    if (!$token_is_valid && !$all)
        return c_responses::token_isnt_valid;

    if($all)
        $c_con->query("DELETE FROM c_program_tokens WHERE c_program=?", [$program_key]);
    else
        $c_con->query("DELETE FROM c_program_tokens WHERE c_token=? AND c_program=?", [$token, $program_key]);

    return c_responses::success;
}