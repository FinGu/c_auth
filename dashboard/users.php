<?php
require '../functions/includes.php';

require '../session.php';

session::check();

$c_con = get_connection();

$username = session::username();

$app_to_manage = session::program_key();

if(!$app_to_manage)
    header('Location: index.php');

if(isset($_POST['mng_submit'])) {
    $query = static function($to_update) { return "UPDATE c_program_users SET {$to_update}=? WHERE c_program=? AND c_username=?"; };

    $user_to_manage = encryption::static_decrypt($_POST['manage_user']);

    if (isset($_POST['reset_hwid']))
        api\admin\reset_user_hwid($c_con, $app_to_manage, $user_to_manage);

    if (!empty($_POST['rank_value'])){
        $rank = filter_var($_POST['rank_value'], FILTER_SANITIZE_NUMBER_INT);

        $c_con->query($query('c_rank'), [$rank, $app_to_manage, $user_to_manage]);
    }

    if (!empty($_POST['variable_value']))
        api\admin\edit_user_var($c_con, $app_to_manage, $_POST['variable_value'], $user_to_manage);

    if (!empty($_POST['password_value'])) {
        $hashed_password = password_hash($_POST['password_value'], PASSWORD_BCRYPT);

        $c_con->query($query('c_password'), [$hashed_password, $app_to_manage, $user_to_manage]);
    }

    if (!empty($_POST['timestamp_value'])) {
        $new_timestamp = $_POST['timestamp_value'];

        if(functions::is_valid_timestamp($new_timestamp))
            $c_con->query($query('c_expires'), [$new_timestamp, $app_to_manage, $user_to_manage]);
    }

    if (isset($_POST['pause_user'])) //pause/unpause user
        api\admin\pause_user($c_con, $app_to_manage, $user_to_manage);
    else
        api\admin\unpause_user($c_con, $app_to_manage, $user_to_manage);

    api\admin\ban_user($c_con, $app_to_manage, $user_to_manage, !isset($_POST['ban_user']));

    unset($_POST['manage_user']);

    functions::box('Updated the user data successfully', 2);
}

if(isset($_POST['pause_all_users']) || isset($_POST['unpause_all_users'])){
    $users = $c_con->query('SELECT c_username FROM c_program_users WHERE c_program=?', [$app_to_manage])->fetch_all(1);

    $pause = isset($_POST['pause_all_users']);

    foreach($users as $user){
        $username = $user['c_username'];
        
        if($pause)
            api\admin\pause_user($c_con, $app_to_manage, $username);
        else
            api\admin\unpause_user($c_con, $app_to_manage, $username);    
    }
}

if(isset($_POST['purge_all_users'])) {
    $c_con->query('DELETE FROM c_program_users WHERE c_program=?', [$app_to_manage]);

    functions::box('Users deleted successfully', 2);
}

if(isset($_POST['reset_all_users_hwid'])){
    api\admin\reset_user_hwid($c_con, $app_to_manage, '.', true);

    functions::box('Reseted all users hwid successfully', 2);
}

if(isset($_POST['delete_user'])){
    $user_to_delete = encryption::static_decrypt($_POST['delete_user']);

    api\admin\delete_user($c_con, $app_to_manage, $user_to_delete);

    functions::box('User deleted successfully', 2);
}

if(isset($_POST['ucf_button'])) {
    $resp = api\register($c_con, $app_to_manage, $_POST['ucf_username'], $_POST['ucf_email'], $_POST['ucf_password'], $_POST['ucf_token'], 0);

    $to_show = responses::switcher($resp);

    functions::box($to_show);
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

    <link rel="stylesheet" type="text/css" href="../plugins/datatables.net-bs4/css/dataTables.bootstrap4.css" media="all" />

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
            word-wrap: break-word;
        }
    </style>

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

                            functions::display_user_data($username, session::premium(), session::admin() ); 
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

                        <li class="dt-side-nav__item dt-side-nav__header">
                            <span class="dt-side-nav__text">Management</span>
                        </li>

                        <?php functions::display_pr_tabs(); ?>

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
                        <h1 class="dt-page__title">Dashboard - Users</h1>
                    </div>
                    <!-- /page header -->

                    <form method="post">
                        <div class="row">
                            <div class="col-xl-12 col-sm-10 col-2">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">Users Creating Form : </h3>
                                            <h5 class="card-subtitle mb-0">Here is where you can manually create users for your program</h5>
                                        </div>
                                    </div>
                                    <div class="dt-card__body">
                                        <div class="form-group">
                                            <label for="ucf_username">Username</label>
                                            <input type="text" class="form-control" id="ucf_username" name="ucf_username" placeholder="Username">
                                        </div>
                                        <div class="form-group">
                                            <label for="ucf_email">Email</label>
                                            <input type="email" class="form-control" id="ucf_email" name="ucf_email" placeholder="Email">
                                        </div>
                                        <div class="form-group">
                                            <label for="ucf_password">Password</label>
                                            <input type="password" class="form-control" id="ucf_password" name="ucf_password" placeholder="Password">
                                        </div>
                                        <div class="form-group">
                                            <label for="ucf_token">Token</label>
                                            <input type="text" class="form-control" id="ucf_token" name="ucf_token" placeholder="Token">
                                        </div>
                                        <button type="submit" name="ucf_button" class="btn btn-primary text-uppercase">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <br>

                    <form method="post">
                        <div class="row">
                            <div class="col-xl-12 col-sm-10 col-1">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">All Users Managing : </h3>
                                            <h5 class="card-subtitle mb-0">These buttons will do actions with all your users, be careful</h5>
                                        </div>
                                    </div>
                                    <div class="dt-card__body">
                                        <button type="submit" name="pause_all_users" class="btn btn-primary text-uppercase">Pause all users sub</button>
                                    </div>
                                    <div class="dt-card__body">
                                        <button type="submit" name="unpause_all_users" class="btn btn-primary text-uppercase">Unpause all users sub</button>
                                    </div>
                                    <div class="dt-card__body">
                                        <button type="submit" name="purge_all_users" class="btn btn-primary text-uppercase" onclick="return confirm('Are you sure you want to purge all the users?');">Purge all users</button>
                                    </div>
                                    <div class="dt-card__body">
                                        <button type="submit" name="reset_all_users_hwid" class="btn btn-primary text-uppercase">Reset all users hwid</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <br>

                    <form style="display: inline;" method="post">
                        <div class="row">
                            <div class="col-xl-12 col-sm-10 col-2">
                                <div class="dt-card">
                                    <div class="dt-card__header">
                                        <div class="card-header bg-transparent">
                                            <h3 class="card-title">Users Management : </h3>
                                            <h5 class="card-subtitle mb-0">Here is where all the users are listed, and here you can manage them</h5>
                                        </div>
                                    </div>
                                    <div class="dt-card__body">
                                        <div class="card-body mb-1 pt-0" style="overflow-y:hidden;">
                                            <div class="table-responsive mb-0 pt-0"> <!-- style="height:400px; width:950px;" !-->
                                                <table id="data_table" class="table table-dark mb-0 pt-5" style="background-color: #23293f;">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-uppercase" scope="col">Username</th>
                                                        <th class="text-uppercase" scope="col">Email</th>
                                                        <th class="text-uppercase" scope="col">Expires At</th>
                                                        <th class="text-uppercase" scope="col">User Variable</th>
                                                        <th class="text-uppercase" scope="col">Hardware ID</th>
                                                        <th class="text-uppercase" scope="col">Rank</th>
                                                        <th class="text-uppercase" scope="col">Sub Paused</th>
                                                        <th class="text-uppercase" scope="col">Banned</th>
                                                        <th class="text-uppercase" scope="col">IP</th>
                                                        <th class="text-uppercase" scope="col">Manage</th>
                                                        <th class="text-uppercase" scope="col">Delete</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <?php
                                                    $all_p_values = api\fetch\fetch_all_users($c_con, $app_to_manage);
                                                    foreach($all_p_values as $single_p_value) { ?>
                                                                <tr>
                                                                    <td><?php echo $single_p_value['c_username']; ?></td>
                                                                    <td><?php echo $single_p_value['c_email']; ?></td>
                                                                    <td><?php echo date('m/d/Y', strip_tags($single_p_value['c_expires'])); ?></td>
                                                                    <td><?php echo $single_p_value['c_var']; ?></td>
                                                                    <td><?php echo $single_p_value['c_hwid']; ?></td>
                                                                    <td><?php echo $single_p_value['c_rank']; ?></td>
                                                                    <td><?php echo $single_p_value['c_paused'] ? 'true' : 'false'; ?></td>
                                                                    <td><?php echo $single_p_value['c_banned'] ? 'true' : 'false' ?></td>
                                                                    <td><?php echo $single_p_value['c_ip']; ?></td>
                                                                    <td><button class="btn btn-primary text-uppercase" name="manage_user" value="<?php echo encryption::static_encrypt($single_p_value['c_username']) . '|' . (($single_p_value['c_paused'] != '0') ? 'true' : 'false') . '|' . (($single_p_value['c_banned'] == '1') ? 'true' : 'false');
                                                                    //the reason of this mess is to know if the key is banned/paused or not, to display it correctly on the manage user form ^ ?>"> Manage</button></td>
                                                                    <td><button class="btn btn-primary text-uppercase" name="delete_user" value="<?php echo encryption::static_encrypt($single_p_value['c_username']); ?>"> Remove</button>
                                                                    </td>
                                                                </tr>
                                                            <?php } ?>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <?php if(isset($_POST['manage_user'])) {
                                                $us_split = explode('|', $_POST['manage_user']); //split the manage_user data
                                                ?>
                                            <div class="form-group">
                                                <label for="password_value">Change the user's password</label>
                                                <input class="form-control" type="password" placeholder="if blank, the data isnt updated" name="password_value" id="password_value">
                                            </div>
                                            <div class="form-group">
                                                <label for="timestamp_value">Change the user's expiration time (in timestamp format)</label>
                                                <input class="form-control" type="text" placeholder="if blank, the data isnt updated" name="timestamp_value" id="timestamp_value">
                                            </div>
                                             <div class="form-group">
                                                 <label for="variable_value">Change the user's variable</label>
                                                 <input class="form-control" type="text" placeholder="if blank, the data isnt updated" name="variable_value" id="variable_value">
                                             </div>
                                            <div class="form-group">
                                                <label for="rank_value">Change the user's level</label>
                                                <input class="form-control" type="text" placeholder="if blank, the data isnt updated" name="rank_value" id="rank_value">
                                            </div>
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="reset_hwid" name="reset_hwid">
                                                <label class="custom-control-label" for="reset_hwid">Reset the user's Hardware ID</label>
                                            </div>
                                            <div class="form-group custom-control custom-checkbox">
                                                 <input type="checkbox" class="custom-control-input" id="pause_user" name="pause_user"
                                                        <?php if($us_split[1] === 'true') echo 'checked="checked"'; ?>
                                                 >
                                                 <label class="custom-control-label" for="pause_user">Pause the user's sub</label>
                                            </div>
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="ban_user" name="ban_user"
                                                    <?php if($us_split[2] === 'true') echo 'checked="checked"'; ?>
                                                >
                                                <label class="custom-control-label" for="ban_user">Ban/Unban the user </label>
                                            </div>
                                            <input type="hidden" name="manage_user" value="<?php echo functions::xss_clean($us_split[0]); ?>"/>
                                            <button class="btn btn-primary text-uppercase" name="mng_submit"><span class="glyphicon glyphicon-check"></span> change </button> <br> <br>
                                            <?php } ?>
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
<script>        $(document).ready(function() {
        $('#data_table').DataTable( {
            "scrollY": "400px",
            "scrollX": true,
            "scrollCollapse": true,
            "autoWidth": true,
            "paging":   true,
            "ordering": false,
            "info":     false,
            "fixedColumns": true
        } );
    }
    );</script>
</body>

</html>
