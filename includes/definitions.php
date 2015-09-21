<?php

/*
$site_uri = $_SERVER["SCRIPT_NAME"];
$identify = strpos(strrev($site_uri),'/');
$site_uri = substr($site_uri,0,strlen($site_uri)-$identify);
$site_url = "http://$_SERVER[HTTP_HOST]$site_uri";

*/



#Message Codes:
define('MSG_SUCCESS'  ,1);
define('MSG_INFO'     ,2);
define('MSG_ALERT'    ,3);
define('MSG_ERROR'    ,4);
define('MSG_FATAL'    ,5);

define('retCode'    ,'retCode');
define('retText'    ,'retText');

#Permissions
define('admin_permission' ,'1');
define('moderator_permission' ,'2');
define('user_permission' ,'5');



#Registration Errors :
define('err_fill_all_fields'  ,'err_fill_all_fields');
define('err_bad_username_length'  ,'err_bad_username_length');
define('err_bad_password'  ,'err_bad_password');
define('err_bad_email_address'  ,'err_bad_email_address');
define('err_password_and_confirm_dont_match'  ,'err_password_and_confirm_dont_match');
define('err_username_already_exists'  ,'err_username_already_exists');
define('err_email_already_exists'  ,'err_email_already_exists');

#Settings :
define('site_desc', 'site_desc');
define('site_title', 'site_title');
define('site_url', 'site_url');
define('min_password_length', 'min_password_length');
define('min_username_length', 'min_username_length');
define('max_username_length', 'max_username_length');
define('cookie_name', 'cookie_name');
define('current_date', 'current_date');
define('default_lang', 'default_lang');


#user:
define('logged_in', 'logged_in');
define('id', 'id');
define('username', 'username');
define('password', 'password');
define('repassword', 'repassword');
define('created_time', 'created_time');
define('email', 'email');
define('fullname', 'fullname');
define('last_login', 'last_login');
define('ip', 'ip');
define('last_ip', 'last_ip');
define('created_ip', 'created_ip');
define('agent', 'agent');
define('last_agent', 'last_agent');
define('created_agent', 'created_agent');
define('permission', 'permission');


#Misc.:
define('DEFAULT_AVATAR' , 'images/noavatar.jpg');
define('URL_FORGOT' , 'admin/forgot.php');
define('A_DAY_LONG'     , '86400');
define('ITEMS_PER_PAGE' , 15);
define('IS_AJAX'        , isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
define('EJ_DEBUG_MODE'  , ($_SERVER['HTTP_HOST']=='127.0.0.1'));

define('ROOT_PATH'  , getcwd().'/');
define('EJ_PATH'  , ROOT_PATH.'includes/');


define('IMG_THUMB_PATH'  , 'imagesUpload/thumbs/');
define('IMG_PATH'  , 'imagesUpload/');
define('FILE_PATH'  , 'filesUpload/');

define('IMG_THUMB_PATH_MAIN'  , 'pictures/thumbs/');
define('IMG_PATH_MAIN'  , 'pictures/');
define('FILE_PATH_MAIN'  , 'filesUpload/');



?>