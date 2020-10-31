<?php
include("../general/includes.php");
include("c_globals.php");

c_functions::validate_session();

$c_con = get_connection();

$username = c_globals::get_username();

$app_to_manage = c_globals::get_program_key();

if(!$app_to_manage)
    header("Location: index.php");

if(isset($_POST["update_settings"])){
    $api_key = !empty($_POST['enc_key']) ? $_POST['enc_key'] : null;

    $expiration_minutes = (!empty($_POST['session_expiry_minutes']) && $_POST["session_expiry_minutes"] <= 50)
        ? $_POST["session_expiry_minutes"] : null;

    $version = !empty($_POST['version']) ? $_POST['version'] : null;

    $download_link = !empty($_POST["download_link"]) ? $_POST["download_link"] : null;

    api\admin\update_program_data($c_con, array(
        'program_key' => $app_to_manage,
        'api_key' => $api_key,
        'expiration_minutes' => $expiration_minutes,
        'version' => $version,
        'download_link' => $download_link,
        'killswitch' => $_POST["killswitch_enabled"] ?? null,
        'hwid' => $_POST["hwid_enabled"] ?? null
    ));

    c_functions::info_a("Settings updated", 2);
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
                        <?php c_functions::display_news(); ?>

                        <?php c_functions::display_user_data($username, c_globals::get_premium()); ?>
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

                        <?php c_functions::display_classes(); ?>

                        <li class="dt-side-nav__item">
                            <a href="https://discord.gg/DCcCgFZ" class="dt-side-nav__link">
                                <i class="icon icon-layout icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Help</span>
                            </a>
                        </li>

                        <li class="dt-side-nav__item dt-side-nav__header">
                            <span class="dt-side-nav__text">Management</span>
                        </li>

                        <li class="dt-side-nav__item">
                            <a href="users.php" class="dt-side-nav__link">
                                <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Users</span>
                            </a>
                        </li>

                        <li class="dt-side-nav__item">
                            <a href="tokens.php" class="dt-side-nav__link">
                                <i class="icon icon-editors icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Tokens</span>
                            </a>
                        </li>

                        <li class="dt-side-nav__item">
                            <a href="vars.php" class="dt-side-nav__link">
                                <i class="icon icon-forms-basic icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Vars</span>
                            </a>
                        </li>

                        <li class="dt-side-nav__item">
                            <a href="logs.php" class="dt-side-nav__link">
                                <i class="icon icon-editor-code icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Logs</span>
                            </a>
                        </li>

                        <li class="dt-side-nav__item">
                            <a href="settings.php" class="dt-side-nav__link">
                                <i class="icon icon-profilepage icon-fw icon-lg"></i>
                                <span class="dt-side-nav__text">Settings</span>
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
                        <h1 class="dt-page__title">Dashboard - Settings</h1>
                    </div>
                    <!-- /page header -->

                    <form method="post">
                        <div class="row">
                            <div class="col-xl-10 col-sm-10 col-2">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">Update Settings : </h3>
                                            <h5 class="card-subtitle mb-0">Here you can change your program settings</h5>
                                        </div>
                                    </div>
                                    <?php
                                    $program_data = api\fetch\fetch_program($c_con, $app_to_manage, false);

                                    if(is_array($program_data)){
                                    ?>
                                            <div class="dt-card__body">
                                                <div class="form-group">
                                                    <label for="enc_key">API/Encryption Key</label>
                                                    <input type="text" class="form-control" id="enc_key" name="enc_key" aria-describedby="help_enc"
                                                           value="<?php echo c_functions::xss_clean($program_data["c_encryption_key"]); ?>"
                                                           placeholder="API/Encryption Key">
                                                    <small id="help_enc" class="form-text">This is the API/Encryption key of your requests.</small>
                                                </div>
                                                <div class="form-group">
                                                    <label for="version">Version</label>
                                                    <input type="text" class="form-control" id="version" name="version" aria-describedby="help_version"
                                                           value="<?php echo sprintf("%.1f", $program_data["c_version"]); ?>"
                                                           placeholder="Version">
                                                    <small id="help_version" class="form-text">This is the version of the application you're managing</small>
                                                </div>
                                                <div class="form-group">
                                                    <label for="download_link">Download Link</label>
                                                    <input type="text" class="form-control" id="download_link" name="download_link" aria-describedby="help_dl"
                                                           value="<?php echo c_functions::xss_clean($program_data["c_dl"]); ?>"
                                                           placeholder="Download Link">
                                                    <small id="help_dl" class="form-text">This is the link that will be opened if the version is wrong</small>
                                                </div>
                                                <div class="form-group">
                                                    <label for="session_expiry_minutes">Session Expiration Minutes</label>
                                                    <input type="text" class="form-control" id="session_expiry_minutes" name="session_expiry_minutes" aria-describedby="help_sem"
                                                           value="<?php echo c_functions::xss_clean($program_data["c_sem"]); ?>"
                                                           placeholder="Session Expiration Minutes">
                                                    <small id="help_sem" class="form-text">This is the number of minutes that the session will last ( maximum value is 50 minutes )</small>
                                                </div>
                                                <div class="form-group custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" aria-describedby="help_kills"
                                                        <?php if( (bool)$program_data["c_killswitch"] ) echo 'checked="checked"'; ?>
                                                           id="killswitch_enabled" name="killswitch_enabled">
                                                    <label class="custom-control-label" for="killswitch_enabled">KillSwitch Enabled</label>
                                                    <small id="help_kills" class="form-text">if this option is enabled, the API functions for the program you're managing will be disabled</small>
                                                </div>
                                                <div class="form-group custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" aria-describedby="help_hwide"
                                                           <?php if( (bool)$program_data["c_hwide"]) echo 'checked="checked"'; ?>
                                                           id="hwid_enabled" name="hwid_enabled">
                                                    <label class="custom-control-label" for="hwid_enabled">Hardware ID
                                                        Checks Enabled</label>
                                                    <small id="help_hwide" class="form-text">the option to disable or enable the HWID checks</small>
                                                </div>
                                                <button type="submit" name="update_settings"
                                                        class="btn btn-primary text-uppercase">Update
                                                </button>
                                            </div>
                                    <?php } else echo $program_data; ?>
                                </div>
                            </div>
                        </div>
                    </form>

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