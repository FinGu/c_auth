<?php
require '../functions/includes.php';

require '../session.php';

session::check();

$c_con = get_connection();

$username = session::username();

if(isset($_POST['create_app'])) {
    $program_resp = api\admin\create_program($c_con, $username, $_POST['app_name'], $_POST['app_enc_key']);

    switch($program_resp){
        case 'empty_data':
            functions::box('Program name or the api/enc key is empty', 3);
            break;

        case 'maximum_programs_reached':
            functions::box('Maximum programs reached', 3);
            break;

        case 'program_already_exists':
            functions::box('Program already exists', 3);
            break;

        case responses::success:
            functions::box('Created the program successfully', 2);
            break;

        default:
            functions::box('Unknown response', 3);
            break;
    }
}

if(isset($_POST['remove_app'])) {
    $app_to_remove = encryption::static_decrypt($_POST['remove_app']);

    $del_resp = api\admin\delete_program($c_con, $username, $app_to_remove);

    switch($del_resp){
        case responses::program_doesnt_exist:
            functions::box('The program you\'re trying to delete isn\'t yours');
            break;

        case responses::success:
            unset($_SESSION['app_to_manage']);
            functions::box('Removed the program successfuly', 2);
            break;
    }
}

if(isset($_POST['manage_app'])) {
    $app_to_manage = encryption::static_decrypt($_POST['manage_app']);

    if(api\validation\program_valid_under_name($c_con, $username, $app_to_manage)){
        $_SESSION['app_to_manage'] = $app_to_manage;

        header('Location: manage.php');
    }

    functions::box('The program you tried to manage is not yours', 3);
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
    <h1 class="dt-page__title">Dashboard - Main</h1>
</div>
<!-- /page header -->

<form style="display: inline-block;" method="post">
<div class="row">
    <!-- Grid Item -->
    <div class="col-xl-10 col-sm-10 col-2">
        <div class="dt-card">
            <div class="card table-dark overflow-hidden" style="background-color: #23293f;">
                <div class="card-header bg-transparent">
                    <h3 class="card-title">Program Management : </h3>
                    <h5 class="card-subtitle mb-0">Here is where you select the program you want to manage</h5>
                </div>
                <div class="card-body mb-0 pt-0">
                    <div class="table-responsive mb-0 pt-0">
                        <table class="table table-dark mb-0 pt-5" style="background-color: #23293f;">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th class="text-uppercase" scope="col">Owner</th>
                                <th class="text-uppercase" scope="col">Program Name</th>
                                <th class="text-uppercase" scope="col">Program Key</th>
                                <th class="text-uppercase" scope="col">Program API/Encryption key</th>
                                <th class="text-uppercase" scope="col">Version</th>
                                <th class="text-uppercase" scope="col">HWID Enabled</th>
                                <th class="text-uppercase" scope="col">Manage</th>
                                <th class="text-uppercase" scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php
                            $all_p_values = api\fetch\fetch_all_programs($c_con, $username);
                            foreach($all_p_values as $pro_row){
                                $enc_pkey = encryption::static_encrypt($pro_row['c_program_key']);
                                ?>
                            <tr>
                                <th scope="row"><?php echo $pro_row['c_id']; ?></th>
                                <td><?php echo $pro_row['c_owner']; ?></td>
                                <td><?php echo $pro_row['c_program_name']; ?></td>
                                <td><?php echo $pro_row['c_program_key']; ?></td>
                                <td><?php echo $pro_row['c_encryption_key']; ?></td>
                                <td><?php echo sprintf('%.1f', $pro_row['c_version']);  ?></td>
                                <td><?php echo $pro_row['c_hwide'] ? 'true' : 'false'; ?></td>
                                <td><button type="submit" class="btn btn-primary text-uppercase" name="manage_app" value="<?php echo $enc_pkey; ?>">Manage</button></td>
                                <td><button type="submit" class="btn btn-primary text-uppercase" name="remove_app" value="<?php echo $enc_pkey; ?>" onclick="return confirm('Are you sure you want to delete this program?');">Delete</button></td>
                            </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                    <!-- /tables -->

                </div>
                <!-- /card body -->

            </div>
            <!-- /bard body -->

        </div>
        <!-- /card -->
        <br>
        <div class="dt-card">
            <div class="dt-card__header">
                <div class="dt-card__heading">
                    <h3 class="dt-card__title">Create a Program</h3>
                </div>
            </div>
            <div class="dt-card__body">
                    <div class="form-group">
                        <label for="app_name">Application Name</label>
                        <input type="text" class="form-control" id="app_name" name="app_name" aria-describedby="app_name_id" placeholder="App Name">
                        <small id="app_name_id" class="form-text">Note: this is the definite name of your application, you cant change it if you want</small>
                    </div>
                    <div class="form-group">
                        <label for="app_enc_key">Application API/Encryption key</label>
                        <input type="text" class="form-control" id="app_enc_key" name="app_enc_key" aria-describedby="help_enc" placeholder="App API/Enc Key"
                        value="<?php echo md5(functions::random_string()); //by default md5'd random string ?>">
                        <small id="help_enc" class="form-text">Note: this must be a random string, its used as the encryption key of your client-sided requests, you can change it if you want</small>
                    </div>
                    <button type="submit" name="create_app" class="btn btn-primary text-uppercase">Create</button>
            </div>
        </div>

    </div>
    <!-- /grid item -->


    </div>
</form>
    <!-- /grid item -->

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
