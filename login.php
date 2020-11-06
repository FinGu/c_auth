<?php
include_once("general/includes.php");

if(isset($_SESSION["panel_access"], $_SESSION["username"]))
    header("Location: dashboard");

if(isset($_POST["login"])) {
    $login_result = api\main\login(get_connection(), $_POST["username"], $_POST["password"]);

    if($login_result !== c_responses::success)
        c_functions::info_a($login_result, 3);
    else
        header("Location: dashboard");
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
<title> cAuth - Login Page</title>

<!-- Font Icon Styles -->
<link rel="stylesheet" href="assets/fonts/noir-pro/styles.css">
<link rel="stylesheet" href="plugins/flag-icon-css/css/flag-icon.min.css">
<link rel="stylesheet" href="assets/vendor/gaxon-icon/styles.css">
<!-- /font icon Styles -->

<!-- Perfect Scrollbar stylesheet -->
<link rel="stylesheet" href="plugins/perfect-scrollbar/css/perfect-scrollbar.css">
<!-- /perfect scrollbar stylesheet -->

<link rel="stylesheet" href="assets/css/default/theme-semidark.min.css">

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
                <h1 class="dt-login__title">Login</h1>
                <!-- /login title -->

                <p class="f-16">Sign in to manage your cAuth account and manage your applications.</p>
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

            <!-- Login Content Inner -->
            <div class="dt-login__content-inner">

                <!-- Form -->
                <form method="post">

                    <!-- Form Group -->
                    <div class="form-group">
                        <label class="sr-only" for="username">Username</label>
                        <input type="text" class="form-control" id="username" name="username" aria-describedby="email-1"
                               placeholder="Username">
                    </div>
                    <!-- /form group -->

                    <!-- Form Group -->
                    <div class="form-group">
                        <label class="sr-only" for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    </div>
                    <!-- /form group -->

                    <!-- Form Group -->
                    <div class="form-group">
                        <button type="submit" name="login" class="btn btn-primary text-uppercase">Login</button>
                        <span class="d-inline-block ml-4">Or
                            <a class="d-inline-block font-weight-500 ml-3" href="register.php">Create New Account</a>
                        </span>
                    </div>
                    <!-- /form group -->

                </form>
                <!-- /form -->

            </div>
            <!-- /login content inner -->

            <!-- Login Content Footer -->
            <div class="dt-login__content-footer">
                <a href="reset_password.php">Can't access your account?</a>
            </div>
            <!-- /login content footer -->

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
<script src="assets/js/global/notification-alert.js"></script>
</body>

</html>
