<?php

    $_SETTINGS[site_title] = 'Dart Game';
    $_SETTINGS[site_desc] = 'ehsan.jeloar.com/dart_game';

    $_SETTINGS[site_url] = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . "{$_SERVER['HTTP_HOST']}/";
    $_SETTINGS[min_password_length] = 6;
    $_SETTINGS[min_username_length] = 4;
    $_SETTINGS[max_username_length] = 30;
    $_SETTINGS[cookie_name] = 'dart_game_site';
    $_SETTINGS[current_date] = date("U");
    $_SETTINGS[default_lang] = 'en';

 ?>