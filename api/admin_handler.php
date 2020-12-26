<?php
error_reporting(0);

include '../general/includes.php';

//handler for the admin api

$c_con = get_connection();

$program_key = $_POST['program_key'] ?? 'null';

$adm_result = api\admin\admin_authenticate($c_con, $_POST["admin_token"], $program_key);

if($adm_result !== responses::success)
    die($adm_result);

$fetch_message = 'The data was fetched successfully';

switch ($_GET["type"]) {
    case "reset_user_hwid":
        $out = api\admin\reset_user_hwid($c_con, $program_key, $_POST['username'], $_POST['username'] === '*');

        die(responses::wrapper($out));

    case "edit_user_var":
        $out = api\admin\reset_user_hwid($c_con, $program_key, $_POST["new_var_value"], $_POST["username"]);

        die(responses::wrapper($out));

    case "pause_user_sub":
        if ($_POST["username"] !== "*") {
            $out = api\admin\pause_user($c_con, $program_key, $_POST['username']);

            die(responses::wrapper($out));
        }

        $query = $c_con->query("SELECT c_username FROM c_program_users WHERE c_program=?", [$_POST['program_key']]);;

        $rows = $query->fetch_all(1);

        foreach ($rows as $row)
            api\admin\pause_user($c_con, $program_key, $rws["c_username"]);

        die(responses::wrapper(responses::success));

    case "unpause_user_sub":
        if ($_POST['username'] !== "*"){
            $out = api\admin\unpause_user($c_con, $program_key, $_POST['username']);

            die(responses::wrapper($out));
        }

        $query = $c_con->query("SELECT c_username FROM c_program_users WHERE c_program=?", [$_POST['program_key']]);

        $rows = $query->fetch_all(1);

        foreach ($rows as $row)
            api\admin\unpause_user($c_con, $program_key, $row["c_username"]);

        die(responses::wrapper(responses::success));

    case "ban_user":
        $out = api\admin\ban_user($c_con, $program_key, $_POST['username']);

        die(responses::wrapper($out));

    case "unban_user":
        $out = api\admin\ban_user($c_con, $program_key, $_POST['username'], true);

        die(responses::wrapper($out));

    case "delete_user":
        $out = api\admin\delete_user($c_con, $program_key, $_POST['username']);

        die(responses::wrapper($out));

    case "fetch_single_user":
        $user_data = api\fetch\fetch_user($c_con, $program_key, $_POST['username']);
                                    
        if (!is_array($user_data))
            die(responses::wrapper($user_data));

        $output_array = array(
            'username' => $user_data['c_username'],
            'email' => $user_data['c_email'],
            'expires' => $user_data['c_expires'],
            'variable' => $user_data['c_var'],
            'hwid' => $user_data['c_hwid'],
            'rank' => $user_data['c_rank'],
            'paused' => $user_data['c_paused'] ? 'true' : 'false',
            'banned' => $user_data['c_banned'] ? 'true' : 'false',
            'ip_address' => $user_data['c_ip']
        );

        die(responses::wrapper($output_array, $fetch_message, true));

    case "fetch_all_users":
        $output_array = [];

        $rows = api\fetch\fetch_all_users($c_con, $program_key);

        foreach($rows as $row)
            $output_array[] = array(
                'username' => $row['c_username'],
                'email' => $row['c_email'],
                'expires' => $row['c_expires'],
                'variable' => $row['c_var'],
                'hwid' => $row['c_hwid'],
                'rank' => $row['c_rank'],
                'paused' => $row['c_paused'] ? 'true' : 'false',
                'banned' => $row['c_banned'] ? 'true' : 'false',
                'ip_address' => $row['c_ip']
            );

        die(responses::wrapper($output_array, $fetch_message, true));

    case "gen_token":
        $token_type = $_POST["token_type"] ?? 1;
        $custom_mask = $_POST["custom_mask"] ?? null;

        $generated_tokens = api\admin\gen_token($c_con, $program_key, $_POST["token_amount"], $_POST["token_days"], $_POST["token_level"], $token_type, $custom_mask);

        if (!is_array($generated_tokens))
            die(responses::wrapper($generated_tokens));

        die(responses::wrapper($generated_tokens, $fetch_message, true));

    case "delete_token":
        $out = api\admin\delete_token($c_con, $program_key, $_POST["token"], $_POST['token'] === '*');

        die(responses::wrapper($out));

    case "fetch_single_token":
        $token_data = api\fetch\fetch_token($c_con, $program_key, $_POST['token']);

        if (!is_array($token_data))
            die(responses::wrapper($token_data));

        $output_array = array(
            'token' => $token_data['c_token'],
            'days' => $token_data['c_days'],
            'rank' => $token_data['c_rank'],
            'used' => $token_data['c_used'] ? 'true' : 'false',
            'used_by' => $token_data['c_used_by']
        );

        die(responses::wrapper($output_array, $fetch_message, true));

    case "fetch_all_tokens":
        $output_array = [];

        $rows = api\fetch\fetch_all_tokens($c_con, $program_key);

        foreach($rows as $row)
            $output_array[] = array(
                'token' => $row['c_token'],
                'days' => $row['c_days'],
                'rank' => $row['c_rank'],
                'used' => $row['c_used'] ? 'true' : 'false',
                'used_by' => $row['c_used_by']
            );

        die(responses::wrapper($output_array, $fetch_message, true));

    case "fetch_all_logs":
        $rows = api\fetch\fetch_all_logs($c_con, $_POST["program_key"]);

        if (!is_array($rows))
            die(responses::wrapper($rows));

        $output_array = [];

        foreach($rows as $row)
            $output_array[] = array(
                'username' => $row['c_username'],
                'message' => $row['c_message'],
                'time' => $row['c_time'],
                'ip_address' => $row['c_ip']
            );

        die(responses::wrapper($output_array, $fetch_message, true));

    case "delete_all_logs":
        $out = api\admin\delete_all_logs($c_con, $_POST['program_key']);

        die(responses::wrapper($out));
}
