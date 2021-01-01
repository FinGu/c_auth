<?php

//include all the necessary api files

$dmp = __DIR__ . '/../functions/';

$all_dirs = array(
    $dmp . 'general/*.php',
    $dmp . 'api/*.php',
    $dmp . 'api/general/*.php',
    $dmp . 'api/fetch/*.php',
    $dmp . 'api/validate/*.php',
    $dmp . 'api/admin/*.php'
);

foreach($all_dirs as $dir)
    foreach(glob($dir) as $php_file)
        require_once $php_file;
