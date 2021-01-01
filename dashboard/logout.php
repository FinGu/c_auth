<?php
session_start(array(
    'name' => 'cAuth-SessionID'
));

session_destroy();

header('Location: ../login.php');
