<?php
require 'functions/includes.php';

$c_con = get_connection();

$code = $_GET['code'] ?? null;

if(isset($_POST['submit_email'])) {
    if(functions::captcha_check('secret key', $_POST['g-recaptcha-response'])) {
        $reset_result = api\main\send_reset_email($c_con, $_POST['username']);

        if($reset_result !== responses::success)
            functions::box($reset_result, 3);
        else
            functions::box($reset_result, 2);
    }
    else
        functions::box('The captcha is wrong', 3);
}

if(isset($_POST['reset_pass'])) {
    $reset_result = api\main\reset_password_with_code($c_con, $code, $_POST['new_password']);

    if ($reset_result !== responses::success)
        functions::box($reset_result, 3);
    else
        header('Location: login.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="cAuth - A secure authentication system for C#, C++ and PHP">
    <meta name="keywords" content="licensing, auth system, hwid lock, secure, licensing solution, easy to setup">

    <meta property="og:title" content="cAuth Authentication System" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://cauth.me/assets/images/logo-white.png" />
    <meta property="og:description" content="cAuth - A secure authentication system for C#, C++ and PHP" />
    <meta property="og:site_name" content="cAuth Authentication System" />
    <meta property="og:url" content="https://cauth.me"/>
    <link rel="icon" href="https://cauth.me/assets/images/logo-white.png" type="image/gif" sizes="16x16">
    <!-- /meta tags -->
    <title> cAuth - Register Page</title>

    <!-- Font Icon Styles -->
    <link rel="stylesheet" href="assets/fonts/noir-pro/styles.css">
    <link rel="stylesheet" href="plugins/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="assets/vendor/gaxon-icon/styles.css">
    <!-- /font icon Styles -->

    <!-- Perfect Scrollbar stylesheet -->
    <link rel="stylesheet" href="plugins/perfect-scrollbar/css/perfect-scrollbar.css">
    <!-- /perfect scrollbar stylesheet -->

    <link rel="stylesheet" href="assets/css/default/theme-semidark.min.css">

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <script src="plugins/jquery/js/jquery.min.js"></script>
    <script src="plugins/moment/js/moment.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Perfect Scrollbar jQuery -->
    <script src="plugins/perfect-scrollbar/js/perfect-scrollbar.min.js"></script>
    <!-- /perfect scrollbar jQuery -->

</head>
<body>
<!-- Loader -->
<div class="dt-loader-container">
    <div class="dt-loader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
        </svg>
    </div>
</div>
<!-- /loader -->
<!-- Root -->
<div class="dt-root">
    <div class="dt-root__inner">
        <div class="dt-login--container">

            <!-- Login Content -->
            <div class="dt-login__content-wrapper">

                <!-- Login Background Section -->
                <div class="dt-login__bg-section">

                    <div class="dt-login__bg-content">
                        <!-- Login Title -->
                        <h1 class="dt-login__title">Reset Password</h1>
                        <!-- /login title -->
                        <?php if($code === null) { ?>
                        <p class="f-16">This page is used to send a email to reset your password</p>
                        <?php } else { ?>
                        <p class="f-16">Change you password using the code</p>
                        <?php } ?>
                    </div>


                    <!-- Brand logo -->
                    <!--<div class="dt-login__logo">
                        <a class="dt-brand__logo-link" href="index.php">
                            <img class="dt-brand__logo-img" src="assets/images/logo-white.png" alt="cAuth">
                        </a>
                    </div> -->
                    <!-- /brand logo -->

                </div>
                <!-- /login background section -->

                <!-- Login Content Section -->
                <div class="dt-login__content">
                    <form method="post">
                        <!-- Login Content Inner -->
                        <div class="dt-login__content-inner">

                            <!-- Form -->
                            <?php if($code === null) { ?>
                                <div class="form-group">
                                    <label class="sr-only" for="username">Username</label>
                                    <input type="text" class="form-control" id="username" name="username" aria-describedby="username"
                                           placeholder="Username">
                                </div>

                                <div class="captcha_wrapper">
                                    <div class="g-recaptcha" data-sitekey="6LeL7PEUAAAAAMHudPafIEmRc-m5b5L8aD9SsBdk"></div>
                                </div> <br>

                                <div class="form-group">
                                    <button type="submit" name="submit_email" class="btn btn-primary text-uppercase">Send email</button>
                                </div>
                            <?php } else { ?>

                                <div class="form-group">
                                    <label class="sr-only" for="new_password">New Password</label>
                                    <input type="password" class="form-control" id="new_password" name="new_password" aria-describedby="new_password"
                                           placeholder="New Password">
                                </div>

                            <!-- Form Group -->
                            <div class="form-group">
                                <button type="submit" name="reset_pass" class="btn btn-primary text-uppercase">Reset password</button>
                            </div>
                            <!-- /form group -->
                            <?php } ?>

                            <!-- /form -->

                        </div>
                        <!-- /login content inner -->

                        <!-- Login Content Footer -->
                        <!--<div class="dt-login__content-footer">
                            <a href="page-forgot-password.html">Can’t access your account?</a>
                        </div> -->
                        <!-- /login content footer -->
                    </form>
                </div>
                <!-- /login content section -->

            </div>
            <!-- /login content -->

        </div>        </div>
</div>
<!-- /root -->

<!-- masonry script -->
<script src="plugins/masonry-layout/js/masonry.pkgd.min.js"></script>
<script src="plugins/sweetalert2/js/sweetalert2.js"></script>
<script src="assets/js/default/functions.js"></script>
<script src="assets/js/default/customizer.js"></script>

<script src="assets/js/default/script.js"></script>
</body>

</html>
