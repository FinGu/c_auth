<?php
include("../general/includes.php");
include("c_globals.php");

c_functions::validate_session();

$c_con = get_connection();
$username = c_globals::get_username();
$app_to_manage = c_globals::get_program_key();

if(!$app_to_manage)
    header("Location: index.php");

$generated_tokens = '';

if(isset($_POST["create_token"])) {

    $csmask = $_POST["custom_mask"] ?? null;

    $token_resp = api\admin\gen_token($c_con, $app_to_manage, $_POST["token_amount"], $_POST["token_days"], $_POST["token_level"], $_POST["token_type"], $csmask);

    switch ($token_resp) {
        case "maximum_tokens_reached":
            c_functions::info_a("Maximum tokens reached", 3);
            break;

        case "only_500_tokens_per_time":
            c_functions::info_a("You can gen only 500 tokens per time ( 75 if you're free )", 3);
            break;

        case "mask_issue":
            c_functions::info_a("No X found in the mask", 3);
            break;

        default:
            c_functions::info_a("Created tokens", 2);
    }
}

if(isset($_POST["delete_token"])) {
    api\admin\delete_token($c_con, $app_to_manage, encryption::static_decrypt($_POST["delete_token"]));

    c_functions::info_a("Deleted token", 2);
}

if(isset($_POST["purge_all_tokens"])) {
    api\admin\delete_token($c_con, $app_to_manage, '', true);

    c_functions::info_a("Tokens purged", 2);
}

$DRY = static function($arg) { return "DELETE FROM c_program_tokens WHERE c_program=? AND c_used='{$arg}'"; };

if(isset($_POST["purge_used_tokens"])) {
    $c_con->query($DRY(1), [$app_to_manage]);

    c_functions::info_a("Tokens purged", 2);
}

if(isset($_POST["purge_unused_tokens"])) {
    $c_con->query($DRY(0), [$app_to_manage]);

    c_functions::info_a("Tokens purged", 2);
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
    <style>
        th, td {
            white-space: nowrap;
        }
    </style>

    <script src="../plugins/jquery/js/jquery.min.js"></script>
    <script src="../plugins/moment/js/moment.min.js"></script>
    <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Perfect Scrollbar jQuery -->
    <script src="../plugins/perfect-scrollbar/js/perfect-scrollbar.min.js"></script>
    <!-- /perfect scrollbar jQuery -->

    <link rel="stylesheet" type="text/css" href="../plugins/datatables.net-bs4/css/dataTables.bootstrap4.css" media="all" />

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
                        <h1 class="dt-page__title">Dashboard - Tokens</h1>
                    </div>
                    <!-- /page header -->

                    <form method="post">
                        <div class="row">
                            <div class="col-xl-10 col-sm-10 col-2">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">Tokens Creating Form : </h3>
                                            <h5 class="card-subtitle mb-0">Here is where you can create tokens to the user register/activate </h5>
                                        </div>
                                    </div>
                                    <div class="dt-card__body">
                                        <div class="form-group">
                                            <label for="token_amount">Tokens Amount</label>
                                            <input type="text" class="form-control" id="token_amount" name="token_amount" placeholder="Tokens Amount">
                                        </div>
                                        <div class="form-group">
                                            <label for="token_days">Token Days</label>
                                            <input type="text" class="form-control" id="token_days" name="token_days" placeholder="Token Days">
                                        </div>
                                        <div class="form-group">
                                            <label for="token_level">Token Level</label>
                                            <input type="text" class="form-control" id="token_level" name="token_level" placeholder="Token Level">
                                        </div>
                                        <div class="form-group">
                                            <label for="token_type">Token Type</label>
                                            <select class="custom-select" id="token_type" name="token_type" onchange="if(this.options[this.selectedIndex].value == '4'){ custom_mask.disabled=false; custom_mask.style.display='inline'; } else { custom_mask.disabled = true; custom_mask.style.display='none'; }">
                                                <option value="1" selected> Normal ( XXXXX-XXXXX-XXXXX-XXXXX )</option>
                                                <option value="2"> Big Normal ( XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX )</option>
                                                <option value="3"> GUID ( XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX )</option>
                                                <option value="4"> Custom Mask ( X = random char )</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="custom_mask" placeholder="The custom mask" value="XXXX-XXXX-XXXX-XXXX" name="custom_mask" style="display:none;" disabled="disabled">
                                        </div>
                                        <button type="submit" name="create_token" class="btn btn-primary text-uppercase">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <br>

                    <form method="post">
                        <div class="row">
                            <div class="col-xl-10 col-sm-10 col-1">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">Tokens Purging : </h3>
                                            <h5 class="card-subtitle mb-0">Here are buttons that mass delete tokens, be careful</h5>
                                        </div>
                                    </div>
                                    <div class="dt-card__body">
                                        <button type="submit" name="purge_all_tokens" class="btn btn-primary text-uppercase">Purge all tokens</button> <br> <br>
                                        <button type="submit" name="purge_used_tokens" class="btn btn-primary text-uppercase">Purge used tokens</button> <br> <br>
                                        <button type="submit" name="purge_unused_tokens" class="btn btn-primary text-uppercase">Purge unused tokens</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <br>

                    <form method="post">
                    <div class="row">
                        <div class="col-xl-12 col-sm-10 col-2">
                            <div class="dt-card">
                                <div class="dt-card__header">
                                    <div class="card-header bg-transparent">
                                        <h3 class="card-title">Tokens Management : </h3>
                                        <h5 class="card-subtitle mb-0">Here is where all the tokens generated are listed</h5>
                                    </div>
                                </div>
                                <div class="dt-card__body">
                                    <div class="card-body mb-1 pt-0">
                                        <div class="table-responsive mb-0 pt-0">
                                            <table id="data_table" class="table table-dark mb-0 pt-5" style="background-color: #23293f;">
                                                <thead>
                                                <tr>
                                                    <th class="text-uppercase" scope="col">Token</th>
                                                    <th class="text-uppercase" scope="col">Days</th>
                                                    <th class="text-uppercase" scope="col">Rank</th>
                                                    <th class="text-uppercase" scope="col">Used</th>
                                                    <th class="text-uppercase" scope="col">Used by</th>
                                                    <th class="text-uppercase" scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <?php
                                                $all_t_values = api\fetch\fetch_all_tokens($c_con, $app_to_manage);
                                                foreach($all_t_values as $t_value){ ?>
                                                <tr>
                                                    <td><?php echo c_functions::xss_clean($t_value["c_token"]); ?></td>
                                                    <td><?php echo $t_value["c_days"]; ?></td>
                                                    <td><?php echo $t_value["c_rank"]; ?></td>
                                                    <td><?php echo (bool)$t_value["c_used"] ? 'true' : 'false'; ?></td>
                                                    <td><?php echo c_functions::xss_clean($t_value["c_used_by"]); ?></td>
                                                    <td><button class="btn btn-primary text-uppercase" name="delete_token" value="<?php echo encryption::static_encrypt(c_functions::xss_clean($t_value['c_token'])); ?>"> Delete</button></td>
                                                </tr>
                                                <?php } ?>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!-- /tables -->

                                    </div>
                                </div>
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
<script src="../plugins/datatables.net/js/jquery.dataTables.js"></script>
<script src="../plugins/datatables.net-bs4/js/dataTables.bootstrap4.js"></script>
<script>
    $(document).ready(function() {
            $('#data_table').DataTable( {
                "autoWidth": true,
                "paging":   true,
                "ordering": false,
                "info":     false,
                "bFilter": false
            } );
        }
    );</script>
</body>

</html>