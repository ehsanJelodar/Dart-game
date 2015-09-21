<?php

class db
{

 private $fetch_mode = PDO::FETCH_ASSOC;

    function setFetchMode($mode)
    {
        $this->fetch_mode = $mode;
    }

    function getAll($query, $parameter_array = array())
    {
        global $con;
        $stmt = $con->prepare($query);
        $stmt->execute($parameter_array);
        $rows = $stmt->fetchAll($this->fetch_mode);
        $stmt = null;
        return $rows;
    }

    function getRow($query, $parameter_array = array())
    {
        global $con;
        $stmt = $con->prepare($query);
        $stmt->execute($parameter_array);
        $row = $stmt->fetch($this->fetch_mode);
        $stmt = null;
        return $row;
    }

    function getOne($query, $parameter_array = array(), $column = 0)
    {
        global $con;
        $stmt = $con->prepare($query);
        $stmt->execute($parameter_array);
        $one = $stmt->fetchColumn($column);
        $stmt = null;
        return $one;
    }

    function raw_execute($query)//highly not aloww usage with user parameter.
    {
        global $con;
        try
        {
           return $con->exec($query);
        }
        catch(Exception $e)
        {
           die("Error Occur");
        }
    }

    function idu_queries($query, $parameter_array)
    {
        global $con;
        $stmt = $con->prepare($query);
        $stmt->execute($parameter_array);
        $affected_rows = $stmt->rowCount();
        $stmt = null;
        return  $affected_rows;
    }

    function lastInsertId()
    {
        global $con;
        return  $con->lastInsertId();
    }

///----------------------------------------------- custom functions -------------------------------------------------------------


    function get_all_score()
    {
        $result = $this->getAll("SELECT * FROM `score` ORDER  BY `score` DESC ");
        return $result;
    }
    function set_score($name, $score, $lose, $level)
    {
        $item_id = 0;
        $result = $this->idu_queries("INSERT INTO `score`(`name`,`score`,`lose`,`level`) VALUES(:name,:score,:lose,:level) ", array(':name'=>$name,':score'=>$score, ':lose'=>$lose,':level'=>$level));
        if($result)
           $item_id = $this->lastInsertId();
        return $item_id;
    }


}

?>