<?php

class c_responses {
    public const program_doesnt_exist = "program_doesnt_exist";

    public const killswitch_is_enabled = "killswitch_is_enabled";

    public const not_valid_username = "invalid_username";

    public const password_is_wrong = "invalid_password";

    public const no_valid_subscription = "no_sub";

    public const user_hwid_is_wrong = "invalid_hwid";

    public const user_is_banned = "user_is_banned";

    public const user_sub_is_paused = "user_is_paused";

    public const token_isnt_valid = "invalid_token";

    public const already_used_token = "used_token";

    public const logged_in = "logged_in";

    public const success = "success";

    public static function switcher(/* c_responses|string */ $response) : ?string {
        switch ($response) {
            case self::program_doesnt_exist:
                return "The program you tried to use doesn't exist";

            case self::killswitch_is_enabled:
                return "The program killswitch is enabled";

            case self::not_valid_username:
                return "The username isn't valid";

            case self::password_is_wrong:
                return "The user's password is wrong";

            case self::user_is_banned:
                return "The user is banned";

            case self::user_sub_is_paused:
                return "The user's subscription is paused";

            case self::no_valid_subscription:
                return "The user doesn't have an active subscription";

            case self::token_isnt_valid:
                return "The token you tried to use isn't valid";

            case self::already_used_token:
                return "The token you tried to use was already used";

            case self::user_hwid_is_wrong:
                return "The user's hwid is wrong";

            #region not_c_response
            case "user_already_exists":
                return "The user already exists in the dB";

            case "invalid_email_format":
                return "The email format doesn't correspond to a valid email";

            case "email_already_exists":
                return "The email already exists in the dB";

            case "maximum_users_reached":
                return "The maximum users amount of the program was reached, contact the program owner";

            case "api_key_is_wrong":
                return "The api/encryption key is wrong";

            case "started_program":
                return "The program was started successfully!";

            case "old_api_version":
                return "Old api version being used, please upgrade to the newest one";

            case "wrong_version":
                return "Old version of the program is being used, please upgrade to the newest one";

            #endregion

            case self::logged_in:
                return "Logged in successfully!";

            case self::success:
                return "The request was successfull!";

            default:
                return "Unknown message";
        }
    }

    public static function wrapper(/* c_responses|string */ $response, $message = null, $force_success = false){
        $success = ($response === self::success || $force_success);

        $message = $message ?? self::switcher($response);

        return json_encode(array(
            "success" => $success,
            "response" => $response,
            "message" => $message
        ));
    }
}
