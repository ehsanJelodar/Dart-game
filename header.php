<?php

/*
* EJ framework
* Programmer: Ehsan Jelodar
* Email: Ehsan.Jolodar@gmail.com
*/

include_once "includes/connect.php";


header('Content-Encoding: UTF-8');
header("Content-Type: text/html; charset=utf-8");

if (isset($_SERVER['HTTP_ACUNETIX_PRODUCT']) ||
    isset($_SERVER['HTTP_ACUNETIX_SCANNING_AGREEMENT']) ||
    isset($_SERVER['HTTP_ACUNETIX_USER_AGREEMENT'])) { exit; }

$_GET = array_map('trim', $_GET);
$_POST = array_map('trim', $_POST);
$_COOKIE = array_map('trim', $_COOKIE);
$_REQUEST = array_map('trim', $_REQUEST);

if(get_magic_quotes_gpc()):
    $_GET = array_map('stripslashes', $_GET);
    $_POST = array_map('stripslashes', $_POST);
    $_COOKIE = array_map('stripslashes', $_COOKIE);
    $_REQUEST = array_map('stripslashes', $_REQUEST);
endif;


$title = (!isset($page_title))? $page_title = $_SETTINGS[site_title] : $page_title;

/*-----gets----*/
require_once "gets.php";
/*---------*/
?><!DOCTYPE html>
<html>
<head>
    <TITLE>Online Dart Game ,Developed By Ehsan Jelodar   </TITLE>
    <META charset="utf-8" />
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="Game, Dart, Dart Game">
    <meta name="description" content="Dart Game Developed by Ehsan Jelodar">
    <meta name="author" content="Ehsan Jelodar, Mail: Ehsan.Jolodar(-at-)gmail.com">

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="style.min.css" >

    <script src="js/jq.js"></script>
    <script src="js/main.min.js"></script>

    <meta name="viewport" content="width=device-width,initial-scale=1">


    <!--[if lt IE 10]>
    <script>
        document.location.href = 'IE';
    </script>
    <![endif]-->

</head>
<body>
<div id="ej-popup-container"></div>
<div id="ej-popup" >
    <span id="ej-popup-close-btn"></span>
    <div id="ej-popup-html"></div>
</div>

