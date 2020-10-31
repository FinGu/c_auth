<?php

//include all the necessary api files

$dmp = __DIR__ . '/../';

$all_dirs = array(
    $dmp . "general/*.php",
    $dmp . "functions/*.php",
    $dmp . "functions/fetch/*.php",
    $dmp . "functions/validate/*.php",
    $dmp . "functions/admin/*.php"
);

foreach($all_dirs as $dir)
    foreach(glob($dir) as $php_file)
        include_once $php_file;
