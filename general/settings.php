<?php
if (!isset($_SESSION))
    session_start(array(
        'name' => 'cAuth-SessionID'
    ));

date_default_timezone_set('UTC');

function get_connection() { //local connection
    return new mysqli_wrapper(
        'localhost', 'root', '', 'c_auth'
    );
}