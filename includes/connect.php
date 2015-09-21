<?php

session_start();

/*
* EJ framework
* Programmer: Ehsan Jelodar
* Email: Ehsan.Jolodar@gmail.com
*/

//error_reporting(0);

require_once 'conf.php';
require_once 'definitions.php';


$dsn = "mysql:dbname=$databaseName;host=$databaseHost;charset=UTF8";

try {
    $con = new PDO($dsn, $databaseUser, $databasePass);
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    //ERRMODE_SILENT
    $con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

 //  mysql_query("SET NAMES 'UTF8'");
    $con->exec("SET NAMES 'UTF8'");
   date_default_timezone_set("Asia/Tehran");

require_once "db/index.php";
$db = new db();
require_once 'settings.php';

?>