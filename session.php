<?php

class session { // dumb global

    public static function check($auto_redirect = true) : bool{
        $username = self::username();

        if(isset($_SESSION['panel_access']) && $_SESSION['panel_access'] === md5($username . functions::get_ip()))
            return true;

        if($auto_redirect) header('Location: index.php');

        return false;
    }

    public static function username() : string {
        return isset($_SESSION["username"])
            ? encryption::static_decrypt($_SESSION["username"]) : "not_defined";
    }

    public static function program_key(){
        return isset($_SESSION["app_to_manage"])
            ? encryption::static_decrypt($_SESSION["app_to_manage"]) : false;
    }

    public static function premium() : bool {
        return isset($_SESSION['premium']) ?
            encryption::static_decrypt($_SESSION["premium"]) == '1' : false;
    }

    public static function admin() : bool{
        return isset($_SESSION['admin']) ?
            encryption::static_decrypt($_SESSION['admin']) == '1' : false; 
    }
}
