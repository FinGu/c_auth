<?php

class c_globals {
    public static function get_username() : string {
        return isset($_SESSION["username"])
            ? encryption::static_decrypt($_SESSION["username"]) : "not_defined";
    }
    public static function get_program_key(){
        return isset($_SESSION["app_to_manage"])
            ? encryption::static_decrypt($_SESSION["app_to_manage"]) : false;
    }
    public static function get_premium() : bool {
        return isset($_SESSION['premium']) ?
            encryption::static_decrypt($_SESSION["premium"]) == '1' : false;
    }
}
