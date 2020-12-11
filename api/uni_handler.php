<?php
include_once("../general/includes.php");

include_once('handler_helper.php');

//handler for the universal api
$c_con = get_connection();

$api_val = api\general\validate_api_key($c_con, $_POST["program_key"], $_POST["api_key"]);

if($api_val !== c_responses::success)
    die(c_responses::wrapper($api_val));

switch($_GET["type"]) {
    case "login":
        $login_out = wrap_login($c_con, $_POST["program_key"], $_POST["username"], $_POST["password"], null);

        die($login_out);

    case "register":
        $register_out = api\register($c_con, $_POST["program_key"], $_POST["username"], $_POST["email"], $_POST["password"], $_POST["token"], 0);

        $wrapped_register = c_responses::wrapper($register_out);

        die($wrapped_register);

    case "activate":
        $activate_out = api\activate($c_con, $_POST["program_key"], $_POST["username"], $_POST["token"]);

        $wrapped_activate = c_responses::wrapper($activate_out);

        die($wrapped_activate);

    case "log":
        $log_out = api\log($c_con, $_POST["program_key"], $_POST["username"], $_POST["message"]);

        $wrapped_log = c_responses::wrapper($log_out);

        die($wrapped_log);

    default:
        die("unknown type");
}

