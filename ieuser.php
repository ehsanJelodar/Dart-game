<!DOCTYPE HTML>
<html dir="rtl">
<head>
    <title>Sorry...</title>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <base target="_blank" />
    <style>

    body,html{
        margin:0;
        padding: 0;
        overflow: hidden;
    }

        body
        {
            font-family: helvetica, Trebuchet MS, Tahoma;
            font-size: 14px;
            color:      #202020;
            background: #E8E8E8;
            direction: ltr;
            padding: 20px 65px;
        }

        #article
        {
            display: block;
            padding: 30px 60px;
        }

        #article-body
        {
            margin-top: -130px;
        }

        #ie-bug
        {
            position: relative;
            z-index: 5;
            background: url(images/fox-to-ie.png) no-repeat;
            width: 550px;
            height: 220px;
            margin-top: -60px;
            margin-left: 366px;
        }

        #footer
        {
            text-align: center;
            position: absolute;
            height: 25px;
            display: block;
            width: 100%;
            margin-top: -24px;
            top: 100%;
            left: 0;
            background: #D2D2D2;
            font-size: 13px;
            padding: 5px 0;
        }

        a,img
        {
            color: #227ACA;
            border: none;
            text-decoration: none;
        }

        a:hover
        {
            color: #030C14;
        }

        #resolve
        {
            padding-right: 150px;
            height: 400px;

        }
        #resolve-img
        {
            position: relative;
            z-index: 5;
            background: url(images/ie6trash.gif) no-repeat;
            width: 550px;
            height: 360px;
            margin: -350px 1px 1px 510px;

        }

        #resolve h1
        {
            font-size: 20px;
        }

        #resolve div
        {
            padding: 10px;
        }

        .icon
        {
            text-align: center;
            display: inline-block;
            float: left;
            width: 100px;
        }

    </style>
</head>
<body>
    <script>
       var redirection = setTimeout("document.location.href='index.php';",10);
    </script>
    <!--[if lt IE 11]>
        <script>
            clearTimeout(redirection);
        </script>
    <![endif]-->
    
    <div id="article">
        <h1>Sorry...</h1>
        <div id="ie-bug"></div>
        <div id="article-body">

you are using IE<br />
this browser is very old and have serious bugs<br /><br />
for use this site you may update or change your browser</b>

        </div>

    </div>

    <div id="resolve">
        <h1>Once and for all rid of problems caused by Internet Explorer!</h1>
        <div>
            <div class="icon">
            <a href="http://www.mozilla.com/en-US/firefox/">
            <img src="images/firefox.gif" alt="Firefox" /><br />
            Mozilla Firefox</a>
            </div>
            <div class="icon">
                <a href="http://www.opera.com/"><img src="images/opera.gif" alt="Opera" /><br />
                Opera</a>
            </div>

            <div class="icon">
                <a href="http://www.google.com/chrome/"><img src="images/chrome.gif" alt="Chrome" /><br />
                Google Chrome</a>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <h1>We recommended Firefox</h1>
            <a href="http://www.mozilla.com/en-US/firefox/">download Firefox</a>
            <div id="resolve-img"></div>
        </div>
    </div>

<div id="footer">
    &copy; <?php echo date('Y'); ?> - <b></b>All rights reserved by  <a target="_self" href="index.php">Ehsan Jelodar</a></div>
</body>
</html>