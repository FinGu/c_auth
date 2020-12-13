<?php
error_reporting(0);
include_once("../general/includes.php");
include_once('handler_helper.php');

$c_con = get_connection();

$type = $_GET["type"] ?? 'null';

$session_id = (isset($_POST['sessid']))
    ? hex2bin($_POST["sessid"]) : 'null';

$program_key = isset($_POST['program_key'])
    ? hex2bin($_POST['program_key']) : api\general\get_pk_from_session($c_con, $session_id);

$api_key = api\general\get_enc_data($c_con, $program_key);

if ($api_key === responses::program_doesnt_exist)
    die($api_key);

$session_iv = ($session_id !== 'null') ? api\general\get_iv_data($c_con, $program_key, $session_id) : '1234567891234567';

$enc_instance = new encryption($api_key, $session_iv, true);

#region var_defs
$username = $enc_instance->decrypt($_POST['username']);

$email = $enc_instance->decrypt($_POST['email']);

$password = $enc_instance->decrypt($_POST['password']);

$hwid = $enc_instance->decrypt($_POST['hwid']);

$token = $enc_instance->decrypt($_POST['token']);

//var, files & logs
$var_name = $enc_instance->decrypt($_POST['var_name']);

$message = $enc_instance->decrypt($_POST['message']);

$file_name = $enc_instance->decrypt($_POST['file_name']);
#endregion

switch($type){
    case 'init':
        $init_enc = new encryption($api_key, hash('sha256', $_POST['init_iv']));

        #region var_defs
        $version = $init_enc->decrypt($_POST["version"]);

        $api_version = $init_enc->decrypt($_POST["api_version"]);

        $session_iv = $init_enc->decrypt($_POST["session_iv"]);
        #endregion

        $init_out = wrap_init($c_con, $version, $api_version, $program_key, $session_iv);

        die($init_enc->encrypt($init_out));

    case 'login':
        $login_out = wrap_login($c_con, $program_key, $username, $password, $hwid);

        die($enc_instance->encrypt($login_out));

    case 'register':
        $register_out = api\register($c_con, $program_key, $username, $email, $password, $token, $hwid);

        $wrapped_register = responses::wrapper($register_out);

        die($enc_instance->encrypt($wrapped_register));

    case 'activate':
        $activate_out = api\activate($c_con, $program_key, $username, $token);

        $wrapped_activate = responses::wrapper($activate_out);

        die($enc_instance->encrypt($wrapped_activate));

    case 'var':
        $var_value = api\variable($c_con, $program_key, $var_name, $username, $password, $hwid);

        $var_out = is_array($var_value) ? responses::wrapper($var_value[1], 'Var was retrieved successfully', true) : responses::wrapper($var_value); 

        die($enc_instance->encrypt($var_out));

    case 'file':
        $file_value = api\file($c_con, $program_key, $file_name, $username, $password, $hwid);
        
        $file_out = is_array($file_value) ? responses::wrapper(bin2hex($file_value[1]), 'File was retrieved successfully', true) : responses::wrapper($file_value);

        die($enc_instance->encrypt($file_out));

    case 'log':
        $log_value = api\log($c_con, $program_key, $username, $message);

        $wrapped_log = responses::wrapper($log_value);

        die($enc_instance->encrypt($wrapped_log));

    default:
        die('unknown type');

}
