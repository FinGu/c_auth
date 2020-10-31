<?php
error_reporting(0);
include_once("../general/includes.php");

//handler for the admin api

$c_con = get_connection();

$program_key = $_POST['program_key'] ?? 'null';

$adm_result = api\admin\admin_authenticate($c_con, $_POST["admin_token"], $program_key);

if($adm_result !== c_responses::success)
    die($adm_result);

switch ($_GET["type"]) {
    case "reset_user_hwid":
        die(api\admin\reset_user_hwid($c_con, $program_key, $_POST['username'], $_POST['username'] === "*"));

    case "edit_user_var":
        die(api\admin\edit_user_var($c_con, $program_key, $_POST["new_var_value"], $_POST["username"]));

    case "pause_user_sub":
        if ($_POST["username"] !== "*")
            die(api\admin\pause_user($c_con, $program_key, $_POST["username"]));

        $u_all = $c_con->query("SELECT c_username FROM c_program_users WHERE c_program=?", [$_POST['program_key']])->fetch_all(1);

        foreach ($u_all as $u_row)
            api\admin\pause_user($c_con, $program_key, $u_row["c_username"]);

        die(c_responses::success);

    case "unpause_user_sub":
        if ($_POST['username'] !== "*")
            die(api\admin\unpause_user($c_con, $program_key, $_POST['username']));

        $u_all = $c_con->query("SELECT c_username FROM c_program_users WHERE c_program=?", [$_POST['program_key']])->fetch_all(1);

        foreach ($u_all as $u_row)
            api\admin\unpause_user($c_con, $program_key, $u_row["c_username"]);

        die(c_responses::success);

    case "ban_user":
        die(api\admin\ban_user($c_con, $program_key, $_POST['username']));

    case "unban_user":
        die(api\admin\ban_user($c_con, $program_key, $_POST['username'], true));

    case "delete_user":
        die(api\admin\delete_user($c_con, $program_key, $_POST['username']));

    case "fetch_single_user":
        $user_data = api\fetch\fetch_user($c_con, $program_key, $_POST['username']);

        if (!is_array($user_data))
            die($user_data);

        $output = api\general\fencode(array(
            $user_data["c_username"],
            $user_data["c_email"],
            $user_data["c_expires"],
            $user_data["c_var"],
            $user_data["c_hwid"],
            $user_data["c_rank"],
            ((bool)$user_data["c_paused"]) ? 'true' : 'false',
            ((bool)$user_data["c_banned"]) ? 'true' : 'false',
            $user_data["c_ip"]
        ));

        die($output);

    case "fetch_all_users":
        $output = '';
        $user_all = api\fetch\fetch_all_users($c_con, $program_key);

        foreach ($user_all as $each)
            $output .= api\general\fencode(array(
                    $each["c_username"],
                    $each["c_email"],
                    $each["c_expires"],
                    $each["c_var"],
                    $each["c_hwid"],
                    $each["c_rank"],
                    ((bool)$each["c_paused"]) ? 'true' : 'false',
                    ((bool)$each["c_banned"]) ? 'true' : 'false',
                    $each["c_ip"]
                )) . '&'; //other delimiter

        /*
         * output example :
         * fingu|fingu@gmail.com|1213121|none|S-1-5-21-4153206125-3562099328-1982163726-1001|1337|false|false&
        */

        die(substr($output, 0, -1));

    case "gen_token":
        $token_type = $_POST["token_type"] ?? 1;
        $custom_mask = $_POST["custom_mask"] ?? null;

        $generated_tokens = api\admin\gen_token($c_con, $program_key, $_POST["token_amount"], $_POST["token_days"], $_POST["token_level"], $token_type, $custom_mask);

        if (!is_array($generated_tokens))
            die($generated_tokens);

        die(api\general\fencode($generated_tokens));

    case "delete_token":
        $tk_dl_val = api\admin\delete_token($c_con, $program_key, $_POST["token"], $_POST['token'] === '*');

        if ($tk_dl_val === c_responses::token_isnt_valid)
            die($tk_dl_val);

        die(c_responses::success);

    case "fetch_single_token":
        $token_data = api\fetch\fetch_token($c_con, $program_key, $_POST['token']);

        if ($token_data === c_responses::token_isnt_valid)
            die($token_data);

        $var_to_return = api\general\fencode(array(
            $token_data["c_token"],
            $token_data["c_days"],
            $token_data["c_rank"],
            ((bool)$token_data["c_used"]) ? 'true' : 'false',
            $token_data["c_used_by"]
        ));

        die($var_to_return);

    case "fetch_all_tokens":
        $output = '';
        $all_values = api\fetch\fetch_all_tokens($c_con, $program_key);

        foreach ($all_values as $each)
            $output .= api\general\fencode(array(
                    $each["c_token"],
                    $each["c_days"],
                    $each["c_rank"],
                    ((bool)$each["c_used"]) ? 'true' : 'false',
                    $each["c_used_by"]
                )) . '&';

        /*
         * output example :
         * HUSJA-KOPNS-KLAQP-UHBFV|30|1337|false|none&
         */

        die(substr($output, 0, -1));

    case "fetch_all_logs":
        $all_logs = api\fetch\fetch_all_logs($c_con, $_POST["program_key"]);

        if (!is_array($all_logs))
            die($all_logs);

        $output = '';

        foreach ($all_logs as $log_row)
            $output .= api\general\fencode(array(
                    $log_row["c_username"],
                    $log_row["c_message"],
                    $log_row["c_time"],
                    $log_row["c_ip"]
                )) . '&';

        die($output);

    case "delete_all_logs":
        die(api\admin\delete_all_logs($c_con, $_POST["program_key"]));
}