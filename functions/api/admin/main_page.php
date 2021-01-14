<?php
namespace api\main;

use functions;
use responses;

use mysqli_wrapper;

function update_ip(mysqli_wrapper $c_con, $username){
    $c_con->query('UPDATE c_users SET c_ip=? WHERE c_username=?', [functions::get_ip(), $username]);

    return responses::success;
}

function fetch_data(mysqli_wrapper $c_con, $username){
    $u_q = $c_con->query('SELECT * FROM c_users WHERE c_username=?', [$username]);

    if($u_q->num_rows === 0)
        return 'The user you tried to login with doesn\'t exist';

    return $u_q->fetch_assoc();
}

function verify_user(mysqli_wrapper $c_con, $username){
    return $c_con->query('SELECT c_username FROM c_users WHERE c_username=?', [$username])->num_rows > 0
        ? 'User already exists' : responses::success;
}

function verify_email(mysqli_wrapper $c_con, $email){
    if(!filter_var($email, FILTER_VALIDATE_EMAIL))
        return 'Incorrect email structure';

    if($c_con->query('SELECT c_email FROM c_users WHERE c_email=?', [$email])->num_rows > 0)
        return 'Email already exists';

    return responses::success;
}

function login(mysqli_wrapper $c_con, $username, $password){
    $main_data = fetch_data($c_con, $username);

    if(!is_array($main_data))
        return $main_data;

    if(!password_verify($password, $main_data['c_password']))
        return 'Wrong password';

    update_ip($c_con, $username);

    $_SESSION['username'] = functions::xss_clean($username);
    
    $_SESSION['panel_access'] = md5($_SESSION['username'] . functions::get_ip());

    $_SESSION['premium'] = $main_data['c_premium'];

    $_SESSION['admin'] = $main_data['c_admin']; 

    return responses::success;
}

function register(mysqli_wrapper $c_con, $username, $email, $password){
    $email_verification = verify_email($c_con, $email);

    if($email_verification !== responses::success)
        return $email_verification;

    $user_verification = verify_user($c_con, $username);

    if($user_verification !== responses::success)
        return $user_verification;

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $c_con->query('INSERT INTO c_users (c_username, c_email, c_password, c_ip) VALUES(?, ?, ?, ?)', [$username, $email, $hashed_password, functions::get_ip()]);

    return responses::success;
}

#region password_related
function send_reset_email(mysqli_wrapper $c_con, $username){
    $user_data = fetch_data($c_con, $username);

    if(!is_array($user_data))
        return 'invalid_user';

    $code = functions::random_string(10);

    $fifteen = strtotime('+15 minutes'); //15 minutes

    $c_con->query('INSERT INTO c_password_resets (c_email, c_code, c_expiry) VALUES(?, ?, ?)', [$user_data['c_email'], $code, $fifteen]);

    $mail_data = array(
        'to' => $user_data['c_email'],
        'subject' => 'password reset at cauth.me',
        'message' => "Link to reset your password at cAuth : https://cauth.me/reset_password.php?code={$code}",
        'headers' => 'From: no-reply@cauth.me' . "\r\n"
    );

    mail(
        $mail_data['to'],
        $mail_data['subject'],
        $mail_data['message'],
        $mail_data['headers']
    );

    return responses::success;
}

function reset_password_with_code(mysqli_wrapper $c_con, $code, $new_password){
    $code_query = $c_con->query('SELECT * FROM c_password_resets WHERE c_code=?', [$code]);

    if($code_query->num_rows === 0)
        return 'unknown_code';

    $code_data = $code_query->fetch_assoc();

    if(time() > $code_data['c_expiry']) {
        $c_con->query('DELETE FROM c_password_resets WHERE c_code=?', [$code]);

        return 'code_expired';
    }

    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

    $c_con->query('DELETE FROM c_password_resets WHERE c_code=?', [$code]);

    $c_con->query('UPDATE c_users SET c_password=? WHERE c_email=?', [$hashed_password, $code_data['c_email']]);

    return responses::success;
}

function change_password(mysqli_wrapper $c_con, $username, $old_password, $new_password){
    $user_data = fetch_data($c_con, $username);

   if(!is_array($user_data))
       return $user_data;

   if(!password_verify($old_password, $user_data['c_password']))
       return responses::password_is_wrong;

   $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

    $c_con->query('UPDATE c_users SET c_password=? WHERE c_username=?', [$hashed_password, $username]);

   return responses::success;
}
#endregion
