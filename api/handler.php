<?php

error_reporting(0);

require_once '../general/includes.php';

require_once 'handler_helper.php';

$c_con = get_connection();

$session_data = isset($_POST['sessid']) ? api\fetch\fetch_session($c_con, hex2bin($_POST['sessid'])) : 'null';

if($session_data === responses::not_valid_session)
    die($session_data); // TODO : message for not_valid_session

$program_key = is_array($session_data) ? $session_data['c_program'] : hex2bin($_POST['program_key']);

$program_data = api\fetch\fetch_program($c_con, $program_key, false);

if($program_data === responses::program_doesnt_exist)
    die($program_data);

$api_key = $program_data['c_encryption_key'];

$session_iv = get_sess_iv($c_con, $session_data); //not checked cuz i'm too lazy to update every class

$enc_instance = new encryption($api_key, $session_iv, true);

$user_data = static function(encryption $enc_instance) /* use($_POST) */ {
    $username = $enc_instance->decrypt($_POST['username']);

    $email = isset($_POST['email']) ? $enc_instance->decrypt($_POST['email']) : 'null'; 

    $password = isset($_POST['password']) ? $enc_instance->decrypt($_POST['password']) : 'null';

    $hwid = isset($_POST['hwid']) ? $enc_instance->decrypt($_POST['hwid']) : 'null';

    return array(
        'username' => $username,
        'email' => $email,
        'password' => $password,
        'hwid' => $hwid
    );
};

switch($_GET['type'] ?? '?'){
    case 'init':
        $init_enc = new encryption($api_key, hash('sha256', $_POST['init_iv'])); 

        $version = $init_enc->decrypt($_POST['version']); 
        
        $api_version = $init_enc->decrypt($_POST['api_version']);

        $session_iv = $init_enc->decrypt($_POST['session_iv']);

        $init_out = wrap_init($c_con, $version, $api_version, $program_key, $session_iv);

        die($init_enc->encrypt($init_out));

    case 'login':
        $ud = $user_data($enc_instance);

        $success = false;

        $login_out = wrap_login($success, $c_con, $program_key, $ud['username'], $ud['password'], $ud['hwid']);

        if($success)
            update_sess_li($c_con, $session_data);

        die($enc_instance->encrypt($login_out));

    case 'register':
        $token = $enc_instance->decrypt($_POST['token']);

        $ud = $user_data($enc_instance);

        $rout = api\register($c_con, $program_key, $ud['username'], $ud['email'], $ud['password'], $token, $ud['hwid']);

        $wr = responses::wrapper($rout);

        die($enc_instance->encrypt($wr));

    case 'activate':
        $token = $enc_instance->decrypt($_POST['token']);

        $ud = $user_data($enc_instance);

        $aout = api\activate($c_con, $program_key, $ud['username'], $token);

        $aw = responses::wrapper($aout);

        die($enc_instance->encrypt($aw));

    case 'var':
        $var_name = $enc_instance->decrypt($_POST['var_name']);

        $vout = api\variable($c_con, $session_data['c_session'], $var_name);

        $vw = is_array($vout) ? responses::wrapper($vout[1], 'Var was retrieved successfully', true) : responses::wrapper($vout);

        die($enc_instance->encrypt($vw));

    case 'file':
        $file_name = $enc_instance->decrypt($_POST['file_name']); 

        $fout = api\file($c_con, $session_data['c_session'], $file_name);

        $fw = is_array($fout) ? responses::wrapper(bin2hex($fout[1]), 'File was retrieved successfully', true) : responses::wrapper($fout);

        die($enc_instance->encrypt($fw));

    case 'log':
        $message = $enc_instance->decrypt($_POST['message']);

        $ud = $user_data($enc_instance);

        $lv = api\log($c_con, $program_key, $ud['username'], $message);

        $wl = responses::wrapper($lv);

        die($enc_instance->encrypt($wl));

    default:
        die('unknown type');
}
