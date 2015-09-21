<?php



if(isset($_GET['get_rate_detail']))
{
    $scores = $db->get_all_score();
    $data_json = json_encode($scores);
    die($data_json);
}

if(isset($_POST['set_rate_detail']))
{
    $data = $_POST['set_rate_detail'];
    $data = preg_replace("([^\w{:'\", }])", '', $data);//just allow "A-Za-z0-9 : ' \" { , } ".  || preg_replace("([^A-Za-z0-9:'\" {, }])", '', $data)
    $result = '';
    $data = json_decode($data, true);
    if(isset($data)) {
            if (isset($data['name']) && isset($data['score']) && isset($data['lose']) && isset($data['level']) ) {
                $name = $data['name'];
                $score = $data['score'];
                $lose = $data['lose'];
                $level = $data['level'];
                if(isset($_SESSION['score_increase']))//check user send fake score.
                {
                    if(abs($score - $_SESSION['score_increase']) > 255)//user set fake score.
                    {
                        $score = 0;
                    }
                }
                else{
                    if($score > 255)
                        $score = 0;
                }
                $res_id = $db->set_score($name, $score, $lose, $level);
                $result = $res_id;
            }
    }
    die($result);
}

if(isset($_GET['score_ratio_set']))
{
    $score = intval($_GET['score_ratio_set']);
    $current_time = time();

    if(isset($_SESSION['Get_time']))//prevent send multi Get request.
    {
        if(($current_time - $_SESSION['Get_time']) < 2)//minimum send get 2 sec.
        {
            $_SESSION['Get_time'] = time();//set new start time
            die('false');
        }
        if(abs($score - $_SESSION['score_increase']) < 255)//just when change <255
            $_SESSION['score_increase'] = $score;
    }
    else
    {
        if($score < 255)
        {
            $_SESSION['score_increase'] = $score;
        }
    }
    $_SESSION['Get_time'] = time();
    die('true');
}


?>