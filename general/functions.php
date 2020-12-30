<?php

class functions {

	public static function generate_license($type = 1, $mask = null) {
	    $to_return = '';

	    switch($type){
            case 1:
                for($i = 0; $i < 4; $i++)
                    $to_return .= self::random_string(5) . '-';

                return substr($to_return, 0, -1);

            case 2:
                for($i = 0; $i < 6; $i++)
                    $to_return .= self::random_string(5) . '-';

                return substr($to_return, 0, -1);

            case 3:
                return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', random_int(0, 65535), random_int(0, 65535), random_int(0, 65535), random_int(16384, 20479), random_int(32768, 49151), random_int(0, 65535), random_int(0, 65535), random_int(0, 65535));

            case 4:
                //key masks
                //123-XXXX turns into 123-UJKL (example)

                $mask_arr = str_split($mask);

                $size_of_mask = count($mask_arr);

                for($i = 0; $i < $size_of_mask; $i++)
                    if($mask_arr[$i] === 'X')
                        $mask_arr[$i] = self::random_string(1);

                return implode($mask_arr);

            default:
                return 'unknown';
        }
	}

	public static function is_valid_timestamp($timestamp) : bool {
        try{
            new DateTime('@'.(string)$timestamp);
        }
        catch(Exception $ex){
            return false;
        }

        return true;
	}

	public static function random_string($length = 10, $keyspace = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"): string {
        $out = '';

        for($i = 0; $i < $length; $i++){
            $rand_index = random_int(0, strlen($keyspace) - 1);

            $out .= $keyspace[$rand_index];
        }

        return $out;
	}

	static function get_ip() { //headers used by fluxcdn
        if (isset($_SERVER["HTTP_X_REAL_IP"]))
            return $_SERVER["HTTP_X_REAL_IP"];
        else if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        else
            return "unknown";
    }

	public static function captcha_check($secret, $response) {
        $curl_inst = curl_init('https://www.google.com/recaptcha/api/siteverify');

        curl_setopt($curl_inst, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl_inst, CURLOPT_POST, true);

        curl_setopt($curl_inst, CURLOPT_POSTFIELDS, array(
            'secret' => $secret,
            'response' => $response
        ));

		$response = curl_exec($curl_inst);

		curl_close($curl_inst);

		$response = json_decode($response);

		return $response->success; //bool ?
	}

    public static function get_days_date_dif($timestamp , $local_time = null) : int {
        if($local_time === null)
            $local_time = time();

        $first = new DateTime("@$timestamp");

        $second = new DateTime("@$local_time");

        return (int)$first->diff($second)->format("%d") + 1;
        //1 is added because the result is one day less than the original time
    }

    public static function get_time_to_add($days): string {
        return "+" . $days . " days"; // Lol, useless right?
    }

	public static function xss_clean($s) : string {
		return htmlentities($s, ENT_QUOTES, 'UTF-8');
	}

    public static function box($str, $type = 0) : void {
		$str_type = static function($type){
            switch($type){
                case 0:
                    return 'info';
                case 1:
                    return 'warning';
                case 2:
                    return 'success';
                case 3:
                    return 'error';
            }
            return null;
        };
		?><script src="https://code.jquery.com/jquery-3.5.0.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script><script type="text/javascript">$(document).ready(function(){ const toast = swal.mixin({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000}); toast({type: "<?php echo $str_type($type); ?>", title: "<?php echo self::xss_clean($str); ?>"})});</script>
    <?php }

	public static function display_user_data($username, $is_premium, $is_admin) : void {
    ?><ul class="dt-nav"><li class="dt-nav__item dropdown"><a href="#" class="dt-nav__link dropdown-toggle no-arrow dt-avatar-wrapper" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="dt-avatar size-30" src="../assets/images/user-avatar/default.png" alt="default"><span class="dt-avatar-info d-none d-sm-block"><span class="dt-avatar-name"><?= $username; ?></span></span></a><div class="dropdown-menu dropdown-menu-right"><div class="dt-avatar-wrapper flex-nowrap p-6 mt-n2 bg-gradient-purple text-white rounded-top"><img class="dt-avatar" src="../assets/images/user-avatar/default.png" alt="default"><span class="dt-avatar-info"><span class="dt-avatar-name"><?= $username; ?></span><span class="f-12"><?= ($is_premium) ? 'Premium User' : 'Free User'; ?></span></span></div><?php if($is_admin){ ?><a class="dropdown-item" href="../admin/"><i class="icon icon-attach-v icon-fw mr-2 mr-sm-1"></i>Admin</a><?php } ?><a class="dropdown-item" href="account.php"><i class="icon icon-user icon-fw mr-2 mr-sm-1"></i>Account</a><a class="dropdown-item" href="logout.php"><i class="icon icon-editors icon-fw mr-2 mr-sm-1"></i>Logout</a></div></li></ul><?php
    }

    public static function display_classes() : void{
        //class name + location
        $classes_folder = '../classes/';

        $classes = array(
            'C#' => $classes_folder.'c%23.zip',
            'C++' => $classes_folder.'c++.zip',
            'Java' => $classes_folder.'java.zip',
            'Python' => $classes_folder.'python.zip',
            'PHP' => $classes_folder.'php.zip'
        );

        ?><li class="dt-side-nav__item"><a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow"><i class="icon icon-listing-dbrd icon-fw icon-lg"></i><span class="dt-side-nav__text">Classes</span></a><ul class="dt-side-nav__sub-menu"><?php foreach($classes as $class => $location){ ?><li class="dt-side-nav__item"><a href="<?php echo $location; ?>" class="dt-side-nav__link"><i class="icon icon-charts icon-fw icon-lg"></i><span class="dt-side-nav__text"><?php echo $class; ?></span></a></li><?php } ?></ul></li><?php
    }

	public static function display_news() : void {
		$values = array(
		    "Added Python and Java support for cAuth" => "javascript:void(0)",
			"Updated the api version to 1.1" => "changelog.txt",
            "Updated the api version to 1.0 ( not beta )" => "changelog.txt"
		);
		?><ul class="dt-nav"><li class="dt-nav__item dt-notification dropdown"><a href="#" class="dt-nav__link dropdown-toggle no-arrow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="icon icon-notification2 icon-fw dt-icon-alert"></i></a><div class="dropdown-menu dropdown-menu-right dropdown-menu-media"><div class="dropdown-menu-header"><h4 class="title">Notifications (<?php echo count($values); ?>)</h4></div><div class="dropdown-menu-body ps-custom-scrollbar"><div class="h-auto"><?php foreach ($values as $name => $link) {?><a href="<?php echo $link; ?>" class="media"><span class="media-body"><span class="message"><?php echo $name; ?></span></span></a><?php }?></div></div></div></li></ul><?php
    }

    public static function display_pr_tabs() : void { 
        $tabs = array(
            ['Users', 'users.php', 'icon-contacts-app'],
            ['Tokens', 'tokens.php', 'icon-editors'],
            ['Vars', 'vars.php', 'icon-forms-basic'],
            ['Files', 'files.php', 'icon-addnew'],
            ['Logs', 'logs.php', 'icon-editor-code'],
            ['Settings', 'settings.php', 'icon-profilepage']
        );
        foreach($tabs as $tab){ ?>
            <li class="dt-side-nav__item">
                <a href="<?= $tab[1] ?>" class="dt-side-nav__link">
                    <i class="icon <?= $tab[2] ?> icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text"><?= $tab[0] ?></span>
                </a>
            </li>
        <?php } 
    }
}

class encryption{
    private $enc_key, $iv_key;

    public function __construct($enc_key, $iv_key = null, $sha_mode = true){
        $this->enc_key = ($sha_mode) ?
            substr(hash('sha256', $enc_key), 0, 32) : $enc_key;

        if(strlen($this->enc_key) !== 32)
            throw new Exception('wrong key length');

        $this->iv_key = substr($iv_key, 0, 16);
    }

    public function encrypt($message, $custom_iv = null) : string {
        if($custom_iv === null && strlen($this->iv_key) !== 16)
            throw new Exception('not valid iv length');

        $used_iv = $custom_iv ?? $this->iv_key; //custom iv has priority

        $encrypted_string = openssl_encrypt($message, $this->method, $this->enc_key, true, $used_iv);

        return bin2hex($encrypted_string);
    }

    public function decrypt($message, $custom_iv = null){
        $message = hex2bin($message);

        if($custom_iv === null && strlen($this->iv_key) !== 16)
            throw new Exception('not valid iv length');

        $used_iv = $custom_iv ?? $this->iv_key; //custom iv has priority

        return openssl_decrypt($message, $this->method, $this->enc_key, true, $used_iv);
    }

    #region static_b64_deprecated

    public static function static_encrypt($text, $key = "c_auth_project") : string {
        $iv = random_bytes(16);

        return base64_encode( openssl_encrypt($text, 'aes-256-cbc', md5($key), true, $iv) . '{c_auth}' . $iv);
    }

    public static function static_decrypt($text, $key = "c_auth_project") {
        $data = explode('{c_auth}', base64_decode($text));

        return openssl_decrypt($data[0], 'aes-256-cbc', md5($key), true, $data[1]);
    }
    #endregion

    private string $method = 'aes-256-cbc';
}
