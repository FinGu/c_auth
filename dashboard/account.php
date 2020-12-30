<?php
include '../general/includes.php';

include '../session.php';

session::check();

$c_con = get_connection();

$username = session::username();

function submit_premium(mysqli_wrapper $c_con, $username, $premium_token){
    $token_query = $c_con->query('SELECT c_used FROM c_tokens WHERE c_token=?', [$premium_token]);

    if($token_query->num_rows === 0 || $token_query->fetch_assoc()['c_used'] == '1'){
        functions::box("Inexistent or used token", 3);

        return;
    }

    $c_con->query("UPDATE c_tokens SET c_used='1', c_used_by=? WHERE c_token=?", [$username, $premium_token]);

    $c_con->query("UPDATE c_users SET c_premium='1' WHERE c_username=?", [$username]);

    $_SESSION["premium"] = encryption::static_encrypt(1);

    functions::box("Premium activated", 2);
}

if (isset($_POST["submit_password"])) {
    $result = api\main\change_password($c_con, $username, $_POST["old_password"], $_POST["new_password"]);

    functions::box(responses::switcher($result));
}

if (isset($_POST["submit_premium"]))
    submit_premium($c_con, $username, $_POST['token']);

if (isset($_POST["generate_token"])) {
    $c_con->query("UPDATE c_users SET c_admin_token=? WHERE c_username=?", [md5(functions::random_string()), $username]);

    functions::box("Generated successfully", 2);
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
<title> cAuth - Dashboard</title>

<!-- Font Icon Styles -->
<link rel="stylesheet" href="../assets/fonts/noir-pro/styles.css">
<link rel="stylesheet" href="../plugins/flag-icon-css/css/flag-icon.min.css">
<link rel="stylesheet" href="../assets/vendor/gaxon-icon/styles.css">
<!-- /font icon Styles -->

<!-- Perfect Scrollbar stylesheet -->
<link rel="stylesheet" href="../plugins/perfect-scrollbar/css/perfect-scrollbar.css">
<!-- /perfect scrollbar stylesheet -->

<link rel="stylesheet" type="text/css" href="../plugins/owl.carousel/css/owl.carousel.min.css" media="all" />
<link rel="stylesheet" type="text/css" href="../plugins/chartist/css/chartist.min.css" media="all" />

<link rel="stylesheet" href="../assets/css/default/theme-semidark.min.css">

    <script>
        var rtlEnable = '';
        var $mediaUrl = window.location.origin + '/';
        var $baseUrl = window.location.origin + '/';
        var current_path = window.location.href.split(window.location.origin + '/').pop();
        if (current_path == '') {
            current_path = 'index.php';
        }
    </script>

<script src="../plugins/jquery/js/jquery.min.js"></script>
<script src="../plugins/moment/js/moment.min.js"></script>
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- Perfect Scrollbar jQuery -->
<script src="../plugins/perfect-scrollbar/js/perfect-scrollbar.min.js"></script>
<!-- /perfect scrollbar jQuery -->

</head>
<body class="dt-layout--default dt-sidebar--fixed dt-header--fixed">
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
            <!-- Header -->
<header class="dt-header">

  <!-- Header container -->
  <div class="dt-header__container">

    <!-- Brand -->
    <div class="dt-brand">

      <!-- Brand tool -->
      <div class="dt-brand__tool" data-toggle="main-sidebar">
        <div class="hamburger-inner"></div>
      </div>
      <!-- /brand tool -->

        <span class="dt-brand__logo">
        <a class="dt-brand__logo-link" href="index.php">
          <img class="dt-brand__logo-img d-none d-sm-inline-block" src="../assets/images/logo-white.png" alt="cAuth">
          <img class="dt-brand__logo-symbol d-sm-none" src="../assets/images/logo-white.png" alt="cAuth">
        </a>
      </span>

    </div>
    <!-- /brand -->

    <!-- Header toolbar-->
    <div class="dt-header__toolbar">

      <!-- Header Menu Wrapper -->
      <div class="dt-nav-wrapper">
        <!-- Header Menu -->
        <ul class="dt-nav d-lg-none">
          <li class="dt-nav__item dt-notification-search dropdown">

            <!-- Dropdown Link -->
            <a href="#" class="dt-nav__link dropdown-toggle no-arrow" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false"> <i class="icon icon-search icon-fw icon-lg"></i> </a>
            <!-- /dropdown link -->

            <!-- Dropdown Option -->
            <div class="dropdown-menu">

            </div>
            <!-- /dropdown option -->

          </li>
        </ul>
        <!-- /header menu -->

        <!-- Header Menu -->
        <?php 
            functions::display_news();

            functions::display_user_data($username, session::premium(), session::admin()); 
        ?>

        <!-- /header menu -->
      </div>
      <!-- Header Menu Wrapper -->

    </div>
    <!-- /header toolbar -->

  </div>
  <!-- /header container -->

</header>
<!-- /header -->
            <!-- Site Main -->
            <main class="dt-main">
                <!-- Sidebar -->
<aside id="main-sidebar" class="dt-sidebar">
    <div class="dt-sidebar__container">

        <!-- Sidebar Navigation -->
        <ul class="dt-side-nav">

            <!-- Menu Header -->
            <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">main</span>
            </li>
            <!-- /menu header -->

            <li class="dt-side-nav__item">
                <a href="index.php" class="dt-side-nav__link">
                    <i class="icon icon-dashboard icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Dashboard</span>
                </a>
            </li>

            <?php functions::display_classes(); ?>

            <li class="dt-side-nav__item">
                <a href="https://discord.gg/DCcCgFZ" class="dt-side-nav__link">
                    <i class="icon icon-layout icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Help</span>
                </a>
            </li>

        </ul>
        <!-- /sidebar navigation -->

    </div>
</aside>
<!-- /sidebar -->
                <!-- Site Content Wrapper -->
                <div class="dt-content-wrapper">

                    <!-- Site Content -->
                    <div class="dt-content">
                        <!-- Page Header -->
<div class="dt-page__header">
    <h1 class="dt-page__title">Dashboard - Account</h1>
</div>
<!-- /page header -->

<!-- Grid -->
<div class="row">

    <!-- Grid Item -->
    <div class="col-xl-10 col-sm-10 col-2">

        <div class="dt-card">
            <div class="dt-card__header">
                <div class="dt-card__heading">
                    <h3 class="dt-card__title">Change your password</h3>
                </div>
            </div>
            <div class="dt-card__body">
                <form method="post">
                    <div class="form-group">
                        <label for="old_password">Old Password</label>
                        <input type="password" class="form-control" id="old_password" name="old_password" placeholder="Old Password">
                    </div>
                    <div class="form-group">
                        <label for="new_password">New Password</label>
                        <input type="password" class="form-control" id="new_password" name="new_password" placeholder="New Password">
                    </div>
                    <button type="submit" name="submit_password" class="btn btn-primary text-uppercase">Change</button>
                </form>
            </div>
        </div>
        <br>
        <?php
            $user_row = $c_con->query("SELECT c_premium, c_admin_token FROM c_users WHERE c_username=?", [$username])->fetch_assoc();
            if ($user_row["c_premium"] != '1') {
	?>
                <div class="dt-card">
                    <div class="dt-card__header">
                        <div class="dt-card__heading">
                            <h3 class="dt-card__title">Activate Premium</h3>
                        </div>
                    </div>
                    <div class="dt-card__body">
                        <form method="post">
                            <div class="form-group">
                                <label for="token">Token</label>
                                <input type="text" class="form-control" id="token" name="token" placeholder="Token">
                            </div>
                            <button type="submit" name="submit_premium" class="btn btn-primary text-uppercase">Submit
                            </button>
                        </form>
                    </div>
                </div>
            <?php } else { ?>
                <div class="dt-card">
                    <div class="dt-card__header">
                        <div class="dt-card__heading">
                            <h3 class="dt-card__title">Premium Management</h3>
                        </div>
                    </div>
                    <div class="dt-card__body">
                        <form method="post">
                            <label>Your admin token :
                                <?php echo ($user_row["c_admin_token"] != '0') ? $user_row["c_admin_token"] . " | " . "<a href=\"../documentation/admin/\"> api info </a>" : "token not generated yet"; ?>
                            </label>
                                <br> <br>
                                <button type="submit" name="generate_token" class="btn btn-primary text-uppercase">
                                    Generate a new token
                                </button>
                        </form>
                    </div>
                </div>
            <?php } ?>
    </div>
    <!-- /grid item -->


    </div>

</div>
<!-- /grid -->

                </div>
            </main>
        </div>
    </div>
    <!-- /root -->

<!-- /contact user information -->    <!-- masonry script -->
<script src="../plugins/masonry-layout/js/masonry.pkgd.min.js"></script>
<script src="../plugins/sweetalert2/js/sweetalert2.js"></script>
<script src="../assets/js/default/functions.js"></script>
<script src="../assets/js/default/customizer.js"></script>

<script src="../assets/js/default/script.js"></script>
<script src="../plugins/chartist/js/chartist.min.js"></script>
<script src="../plugins/owl.carousel/js/owl.carousel.min.js"></script>
<script src="../assets/js/global/charts/dashboard-listing.js"></script>
</body>

</html>
