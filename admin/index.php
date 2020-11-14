<?php
include '../general/includes.php';

include '../session.php';

session::check();

if(!session::admin())
    header('Location: ../dashboard/index.php');

$c_con = get_connection();

$username = session::username();

if(isset($_POST['generate'])){
    $amount = filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_INT);

    for($i = 0; $i < $amount; $i++){
        $rand_str = functions::random_string(19);

        $c_con->query('INSERT INTO c_tokens(c_token, c_used, c_used_by) VALUES(?, ?, ?)', [$rand_str, 0, '']);
    }

}

if(isset($_POST['delete'])){
    $token_to_delete = encryption::static_decrypt($_POST['delete']);

    $c_con->query('DELETE FROM c_tokens WHERE c_token=?', [$token_to_delete]);

    functions::box('Deleted the token successfully', 2);
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
<title> cAuth - Admin</title>

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
        <a class="dt-brand__logo-link" href="../index.php">
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
        <ul class="dt-nav">
            <li class="dt-nav__item dropdown">
                <a href="#" class="dt-nav__link dropdown-toggle no-arrow dt-avatar-wrapper" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="dt-avatar size-30" src="../assets/images/user-avatar/default.png" alt="default"><span class="dt-avatar-info d-none d-sm-block">
                            <span class="dt-avatar-name">
                                <?php echo $username; ?>
                            </span>
                        </span> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <div class="dt-avatar-wrapper flex-nowrap p-6 mt-n2 bg-gradient-purple text-white rounded-top"><img class="dt-avatar" src="../assets/images/user-avatar/default.png" alt="default">
                                <span class="dt-avatar-info">
                                    <span class="dt-avatar-name">
                                        <?php echo $username; ?>
                                    </span>
                                </span>
                            </div>
                            <a class="dropdown-item" href="../dashboard/">
                                <i class="icon icon-attach-v icon-fw mr-2 mr-sm-1">
                                </i>Dashboard</a>
                            <a class="dropdown-item" href="logout.php">
                                <i class="icon icon-editors icon-fw mr-2 mr-sm-1">
                                </i>Logout</a>
                        </div>
                    </li>
                </ul>        
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
                    <span class="dt-side-nav__text">Tokens</span>
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
    <h1 class="dt-page__title">Admin Panel - Tokens</h1>
</div>
<!-- /page header -->

<form style="display: inline-block;" method="post">
<div class="row">
    <!-- Grid Item -->
    <div class="col-xl-12 col-sm-12 col-2">
        <div class="dt-card">
            <div class="card table-dark overflow-hidden" style="background-color: #23293f;">
                <div class="card-header bg-transparent">
                    <h3 class="card-title">Premium tokens : </h3>
                    <h5 class="card-subtitle mb-0"> All available premium tokens </h5>
                </div>
                <div class="card-body mb-0 pt-0">
                    <div class="table-responsive mb-0 pt-0">
                        <table class="table table-dark mb-0 pt-5" style="background-color: #23293f;">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th class="text-uppercase" scope="col">Token</th>
                                <th class="text-uppercase" scope="col">Used</th>
                                <th class="text-uppercase" scope="col">Used By</th>
                                <th class="text-uppercase" scope="col">Delete </th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php
                            $query_result = $c_con->query('SELECT * FROM c_tokens');

                            $rows = $query_result->fetch_all(1);

                            foreach($rows as $row){ ?>
                            <tr>
                                <th scope="row"><?php echo $row['c_id']; ?></th>
                                <td><?php echo functions::xss_clean($row['c_token']); ?></td>
                                <td><?php echo $row['c_used'] ? 'true' : 'false'; ?></td>
                                <td><?php echo functions::xss_clean($row['c_used_by']); ?></td>
                                <td><button type="submit" name="delete" class="btn btn-primary text-uppercase" value="<?php echo encryption::static_encrypt($row['c_token']); ?>">Delete</button></td>
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
                    <h3 class="dt-card__title">Generate a Token</h3>
                </div>
            </div>
            <div class="dt-card__body">
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <input type="number" class="form-control" id="amount" name="amount" aria-describedby="amount_help" placeholder="Amount">
                        <small id="amount_help" class="form-text">Note: the amount of tokens you want to generate</small>
                    </div>
                    <button type="submit" name="generate" class="btn btn-primary text-uppercase">Generate</button>
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
