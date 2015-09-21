<?php
require_once 'header.php';

if(isset($_SESSION['score_increase']))
{
    $_SESSION['score_increase'] = 0; //set empty value for restart game.
}

?>


    <div id="animation-div"><canvas height="602" width="602" id="animation-canvas"> your browser not support</canvas></div>
    <div id="high-score-container">
        <input id="high-score-btn" type="button" value="Rate">
    </div>
    <div id="start_btn_container">
      <select id="intensity_select">
          <option value="100">Easy</option>
          <option value="50">Medium</option>
          <option value="30">Hard</option>
      </select>
      <div id="Start_game_btn">Start Game</div>
    </div>

<div id="title_initial">
   <svg  height="200" width="600" >
      <text  x="1" y="125" style=" font-family: sans-serif; font-size:74px; stroke:red; stroke-width:4px;  stroke-linecap:round; stroke-dasharray:1;  fill:none;" >
        Online Dart Game
      </text>
    </svg>
</div>


    <div id="right-menu">

        <h1>Online Dart Game</h1>

        <h3>Instructions</h3>
        use dart to pop the balloons <br>
        move the mouse to control the direction of the dart, press the mouse button to shoot the dart.  <br>

        <div class="separator"></div>
        <div id="author">
        Developed By : <br>Ehsan Jelodar
        </div>
        <div class="separator"></div>

    </div>

    <div id="left-menu">
        <div id="right-menu-header">
            <h3>Info</h3>
        </div>

This game created with Artificial Intelligence (GA algorithm), balloons location need a algorithm for best performance and passable in all level of game, and prevent impossible state for continue game.<br>
        I find a GA algorithm  with 100% passable for pass all level of game.



    </div>



<?php
require_once 'footer.php';
?>