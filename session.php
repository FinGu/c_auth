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
        return $_SESSION['username'] ?? 'not_defined';
    }

    public static function program_key(){
        return $_SESSION['app_to_manage'] ?? false;
    }

    public static function premium() : bool {
        return $_SESSION['premium'] ?? false;
    }

    public static function admin() : bool{
        return $_SESSION['admin'] ?? false;
    }
}
