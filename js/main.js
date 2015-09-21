/*
* Dart Game
* Developed by: Ehsan Jelodar
*/
var power = 1;
var power_dir = 1;
var power_fps = 100;
var gameIsReady = false;
var balloonsCreated = false;
var dartJaculation = false;
var all_width;
var all_height;
var canvas_width;
var canvas_height;
var canvas;
var context;
var main_frame_interval = false;
var power_interval;
var hover_interval;
var dart_location_x; //canvas.width/2
var dart_location_y; //canvas.height/2
var image_count = 7;
var image_loaded_count = 0;
var balloon_width=65;
var balloon_height=87;
var Level=1;
var Lose=0;
var Score=0;
var Score_time=0;
var canvas_offset_left;
var canvas_offset_top;
var isWin;
var dart_degree=0;
var dart_movement_speed =0;
var initial_jaculation_cycle=false;
var gravity=1;
var jaculation_degree=0;
var dart_location_tmp_x=0;
var dart_location_tmp_y=0;
var Gravity_ratio = 0.6;
var server_error_text = 'Unable to connect server';
var Const_value_ratio = 250;
var Score_value_ratio = 1;


var FPS = 30;

function ResetValue()
{
    initial_jaculation_cycle=false;
    dartJaculation = false;
    isHovered_btn = false;
    gravity=1;
    SetPower();
    Start_Level();
    }




var balloons = [];
var dart;
var next_btn ;
var refresh_btn;

function Start_Level()
{
    dart_location_x = dart_Location_Created[0];
    dart_location_y = dart_Location_Created[1];
    for(var i=0; i<balloons_Location_Created.length; i++)
    {
    var bl = balloons_Location_Created[i];
    balloons[i] = new balloon(bl.x - (balloon_width/2), bl.y - (balloon_height/2), 'images/b'+(i+1)+'.png',false);
    }

    // set images src --------------
    dart = new Image();
    dart.src = 'images/d5.png';

    next_btn = new Image();
    next_btn.src = 'images/next.png';

    refresh_btn = new Image();
    refresh_btn.src = 'images/refresh.png';
    }




//handle mouse event ---------------
var cursor_x=0;
var cursor_y=0;

function move(e)
{
    e=e||event;
    cursor_x=e.pageX;
    cursor_y=e.pageY;
    }
document.onmousemove=move;
//---------------------------------

function refresh_black()
{

    context.beginPath();
    // context.fillStyle = "#000000";
    context.fillStyle='rgba(0,0,0,1)';
    context.rect(0, 0, canvas_width, canvas_height);
    context.fill();
    context.closePath();


    }

function balloon(x,y,img,pop)
{
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = img;
    this.pop = pop;

    this.changePop = function(pop)
    {
    this.pop = pop;
    }
    }




$().ready (function(){


    all_width = Math.max($(document).width(), $(window).width());
    all_height = Math.max($(document).height(), $(window).height());

    canvas = document.getElementById("animation-canvas");
    context = canvas.getContext("2d");

    canvas_width = canvas.width;
    canvas_height = canvas.width;
    canvas_offset_left = canvas.offsetLeft;
    canvas_offset_top = canvas.offsetTop;

    $("#Start_game_btn").click(function(){ // Start Btn Click

    //var elm = document.getElementById("intensity_select");
    // var item = elm.options[elm.selectedIndex].value;
    var item = $("#intensity_select").val();
    power_fps = item;
    $("#start_btn_container").fadeOut(500);
    $("#title_initial").fadeOut(500);
    $("#high-score-container").fadeIn(500);

    Enter_game();
    });


    $("#stop").click(function(){
    StopRendering();
    });

    $("#animation-canvas").click(function(){
    if(main_frame_interval != false)
    {
    dartJaculation = true;
    clearInterval(power_interval);
    }
    });



    /*----- end ready -------*/
    });

function Enter_game()
{
    Start_creation_with_GA();// start Creation balloons
    check_Creation();
    function check_Creation()
    {
    if(balloonsCreated)
    {
    ResetValue();
    initial();
    Start_game();
    }
    else
    {
    WaitForGameReady();
    setTimeout(check_Creation, 50);
    }

    }
    }




function Start_game()
{
    Score_time = new Date().getTime();

    main_frame_interval = setInterval(function(){

    if(gameIsReady) // ----------------------- starting Game ---------------------------
    {
    refresh_black();
    powerAnimation();
    showInfo();
    DrawBalloon();
    dartAnimation();
    }
    else
    {
    WaitForGameReady();
    }

    },FPS);

//------------- game Started -----------------
    }







function powerAnimation()
{
    var x = 10;
    var y = canvas_height-110;
    var breadth = 5;
    var length = 100;

    context.beginPath();
    context.strokeStyle = "#BDC7D1";
    context.lineWidth = 1;
    context.rect(x,y,breadth,length);
    context.stroke();
    context.closePath();

    for(var i=0;i<power; i++)
    {
    var ratio = canvas_height-20-(i*10);
    context.beginPath();
    context.fillStyle = "rgb("+100+parseInt(i*20)+","+Math.abs(200-parseInt(i*20))+",0)";
    context.fillRect(x,ratio,4,9);
    context.closePath();
    }
    }



function DrawBalloon()
{
    for(var i=0; i<balloons.length; i++)
    {
    var balloon = balloons[i];
    if(!balloon.pop)
    {
    context.beginPath();
    context.drawImage(balloon.img, balloon.x, balloon.y);
    context.closePath();
    }
    }
    }


function dartAnimation()
{
    var dart_accelerator = 2.6;
    if(!dartJaculation)
    {

    var offset_x = (dart_location_x)+canvas_offset_left;
    var offset_y = (dart_location_y)+canvas_offset_top;

    dart_degree = Math.atan2( cursor_x - offset_x ,  -(cursor_y - offset_y) )/* *(180/Math.PI)*/ ;
    }
    else// dart jaculation
    {

    gravity += Gravity_ratio; // set gravity ratio

    if(!initial_jaculation_cycle)
    {
    //console.log(Math.sin(dart_degree));
    jaculation_degree = dart_degree;
    dart_movement_speed = Math.max(power*dart_accelerator,2);
    }

    dart_location_x -= Math.cos(jaculation_degree)*(dart_movement_speed);
    dart_location_y -= Math.sin(jaculation_degree)*(dart_movement_speed);
    dart_location_y += gravity;

    //for set dart peak to front
    dart_degree = Math.atan2( dart_location_x - dart_location_tmp_x  ,  -(dart_location_y - dart_location_tmp_y ) )/* *(180/Math.PI)*/ ;


    checkBalloonPop();//check impact dart to ballon.
    checkGameOver();



    initial_jaculation_cycle = true;
    }

    dart_degree = dart_degree-130.45;//for adjust dart

    context.save();
    context.translate(dart_location_x,dart_location_y);
    context.rotate(dart_degree /* * Math.PI/180*/);
    context.drawImage(dart,-40,-12);
    context.restore();

    dart_location_tmp_x = dart_location_x;
    dart_location_tmp_y = dart_location_y;
    }



function initial()
{
    //  Start_Level();
    // SetPower();

    dart.onload = function(){
        image_loaded_count++;
    };
    next_btn.onload = function(){
    image_loaded_count++;
    };
    refresh_btn.onload = function(){
    image_loaded_count++;
    };

    for(var i=0; i<balloons.length; i++)
    {
    balloons[i].img.onload = function(){
    image_loaded_count++;
    }
    }

    check_ready_game();
    function check_ready_game(){
    if(image_count == image_loaded_count)
    {
    gameIsReady = true;
    }
    else
    {
    setTimeout(check_ready_game,500);
    }
    }

    }



function checkBalloonPop()
{
    for(var i=0; i<balloons.length; i++)
    {
    var ballon = balloons[i];
    if(ballon.pop == false)
    {
    var bound_start_x = ballon.x;
    var bound_end_x = ballon.x + balloon_width;
    var bound_start_y = ballon.y;
    var bound_end_y = ballon.y + balloon_height;
    if(
    dart_location_x > bound_start_x &&
    dart_location_x < bound_end_x   &&
    dart_location_y > bound_start_y &&
    dart_location_y < bound_end_y
    )
    {
    ballon.pop = true;
    }

    }
    }

    }

function checkGameOver()
{
    if(dart_location_y > canvas_height)
    {
    isWin = true;
    for(var i=0; i<balloons.length; i++)
    {
    var ballon = balloons[i];
    if(ballon.pop == false)//balloon exist;
    {
    isWin = false;
    break;
    }
    }

    EndLevel();
    }

    }



//100 ms for ever change
function SetPower()
{
    power_interval = setInterval(function(){
        if(power==10||power==0)
            power_dir = -power_dir;
        power += power_dir;
    },power_fps);
    }




function WaitForGameReady()
{
    refresh_black();// remove last frame
    context.beginPath();
    context.fillStyle = "#CC210E";
    context.font='30px sans-serif';
    context.fillText("Waiting For Game Ready ...", canvas_width/5, (canvas_height/2)-20);
    context.closePath();
    }
function showInfo()
{
    context.beginPath();
    context.fillStyle = "#33C72E";
    context.font='20px sans-serif';
    context.fillText("Level "+Level, 10, 25);
    context.fillStyle = "#E0DD10";
    context.fillText("Lose : "+Lose, (canvas_width/2)-50, 25);
    context.fillStyle = "#1FC4E5";
    var score_width = (Score<1000) ? canvas_width-110 : canvas_width-130;
    context.fillText("Score : "+Score,score_width , 25);
    context.fillStyle = "#FF341A";
    context.font='12px sans-serif';
    var tmp_Score_time = new Date().getTime();
    var Time = parseInt((tmp_Score_time - Score_time)/1000);
    context.fillText("Time Elapsed : "+Time, canvas_width-110, canvas_height-15);
    context.closePath();
    }


function EndLevel()
{


    var action = "You Lose";
    var color = "#E60000";//lose color
    var image = refresh_btn;

    if(isWin)
    {
    action = "You Win";
    color = "#4BE642";
    image = next_btn;

    }

    var x = (canvas_width/3)+35;
    var y = (canvas_height/2)-20;
    var rect_x = x-38;
    var rect_y = y-31;


    context.beginPath();

    if(!isHovered_btn)//just once
    {
    StopRendering();

    context.fillStyle='rgba(0,0,0,0.3)';
    context.fillRect(0, 0, canvas_width, canvas_height);

    /* context.lineWidth=1;
     context.strokeStyle='#CFCFCF';
     context.strokeRect(rect_x, rect_y, 200, 100);
     */
    hover_interval = setInterval(function(){
    checkBtnHover(rect_x, rect_y, 200, 100);
    },100);

    if(isWin) // set score
    {
    var tmp_Score_time = new Date().getTime();
    Score += parseInt(50000/(tmp_Score_time - Score_time));

        if(Score > (250))//Check Real Score
        {
            $.get('', {score_ratio_set : Const_value_ratio})
                .done(function (data) {
                    Const_value_ratio *=2;
                })
                .fail(function () {
                  //  alert(server_error_text);
                });
        }

    }



    }

    context.fillStyle = '#000000';
    context.fillRect(rect_x, rect_y, 200, 100);

    context.fillStyle = color;
    context.font='30px sans-serif';
    context.fillText(action, x, y);
    context.drawImage(image, x+40, y+20);
    context.closePath();
    }

function StopRendering()
{
    clearInterval(main_frame_interval);
    main_frame_interval = false;
    }


var checkEndLevelAction = function()
{
    clearInterval(hover_interval);  //stop hover interval
    checkBtnHover(); //for remove canvas Event Listener
    if(isWin)
    {
    Level++;
    balloonsCreated = false;
    Enter_game();// Restart and go to new level
    }
    else
    {
    Lose++;
    ResetValue();
    Start_game(); // Restart game
    }
};


var isHovered_btn = false
function checkBtnHover(x,y,width,height)
{
    if(
    cursor_x-canvas_offset_left > x &&
    cursor_x-canvas_offset_left < x+width &&
    cursor_y-canvas_offset_top > y &&
    cursor_y-canvas_offset_top < y+height
    )
    {
    if(!isHovered_btn)
    {

    if (canvas.addEventListener)
    {                    // For all major browsers, except IE 8 and earlier
    canvas.addEventListener("click", checkEndLevelAction,false);
    } else if (canvas.attachEvent)
    {                  // For IE 8 and earlier versions
    canvas.attachEvent("onclick", checkEndLevelAction);
    }

    context.beginPath();
    context.fillStyle='rgba(255, 255, 255, 0.09)';
    context.fillRect(x, y, width, height);
    context.closePath();

    isHovered_btn = true;
    }

    }
    else
    {
    if(isHovered_btn)
    {
    EndLevel();  //redraw button image and text

    if(canvas.removeEventListener)
    {
    canvas.removeEventListener("click", checkEndLevelAction,false);
    } else if (canvas.detachEvent)
    {
    canvas.detachEvent("onclick", checkEndLevelAction);
    }
    isHovered_btn = false;
    }

    }
    }

//---------------------- Create balloons location with intelligence ----------------------------------


var Creation_FPS = 50; // ms
var dart_location = [];
var Create_balloons_interval;
var balloons_location = [];
var costs = [];
var dart_location_num = 20;
var max_ballon_buffer = 1000;
var parent_1;
var parent_2;
var balloon_tmp;
var balloons_Location_Created = [];
var dart_Location_Created = [];

function Create_dart_location()
{
    for(var i=0; i<dart_location_num; i++)// create initial dart locations
    {
    dart_location.push(Random_dart_location());
    }
    }

function Create_population()
{
    balloons_location = [];
    balloons_location[0] = [new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation())];
    balloons_location[1] = [new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation())];
    balloons_location[2] = [new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation())];
    balloons_location[3] = [new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation()), new balloon_fake(getPopulation())];
}

function Random_dart_location()
{
    var dart_x = getRnd();
    var dart_y = getRnd();
    return [dart_x, dart_y];
}

function getRnd()
{
    return parseInt(Math.random()*400)+100;
    }

function getPopulation()
{
    return [getRnd(), getRnd()];
    }

function balloon_fake(rnd)
{
    this.x = parseInt(rnd[0]);
    this.y = parseInt(rnd[1]);
    }


function Start_creation_with_GA()// -------------------- start creation game with GA algorithm --------------------------
{
    Create_dart_location();
    Create_population();
    Create_balloons_interval = setInterval(function(){

    for(var i=0; i< dart_location.length; i++)
    {
    if(checkItem(dart_location[i]))
    break;
    }

    if(balloons_location.length > max_ballon_buffer)// reset population when buffer overload.
    {
    Create_population();
    // console.log("reset");
    }

    },Creation_FPS);
    }    // ---------------------------------------- ///////////////////////////////// --------------------------------------

function checkItem(dart_location)
{
    var limit_scale = 0;
    var limit_imp = 4;//divide value for pervent impssible.// between 2 and 6 for best performance.
    costs = [];  //reset cost
    var dart_location_x =  dart_location[0];
    var dart_location_y =  dart_location[1];

    /*    context.beginPath();
     context.fillStyle = "#CC8283";
     context.arc(dart_location_x,dart_location_y,10,0,2*Math.PI);
     context.fill();
     context.closePath();
     */
    var last_angle = Math.atan2(dart_location_x -2 ,- (dart_location_y - canvas_height) )*(180/Math.PI);

    for(var i=0; i<balloons_location.length; i++)
    {
    var cs = 0;
    var limit = 0;
    var dir;
    var bl = balloons_location[i];

    for(var j=0; j<bl.length; j++)
    {
    var x = bl[j].x;
    var y = bl[j].y;
    var x_tmp = dart_location_x;
    var y_tmp = dart_location_y;
    if(j>0)
    {
    x_tmp = bl[j-1].x;
    y_tmp = bl[j-1].y;
    }

    var angle = Math.atan2(x - x_tmp,- (y - y_tmp) )*(180/Math.PI);
    if(j==0)//only once in ever balloon arraey
    {
    dir = angle < 0 ? -1 : 1;
    }

    if(j>0)
    {
    if(dir == 1)// positive
    {
    limit = Math.max(limit, last_angle);
    //---------------check for prevent impossible state
    if(angle>90)
    {
    //limit += (180-limit)/limit_imp; //a few miscue
    var dif = x - x_tmp;
    limit = dif < balloon_width ? limit :  Math.max(limit + dif - balloon_width, 180);
    }
    //---------------////////////////////------------
    if(angle < 0 || angle < limit+limit_scale) //between lastangle and 180
    cs++;
    }
    else  // negative
    {
    limit = Math.min(limit, last_angle);
    //---------------check for prevent impossible state
    if(angle<-90)
    {
    // limit -= (180+limit)/limit_imp; //a few miscue
    var dif =  x_tmp - x;
    limit = dif < balloon_width ? limit :  Math.max(limit - dif + balloon_width, -180);
    }
    //---------------////////////////////------------
    if(angle > 0 || angle > limit-limit_scale) //between lastangle and -180
    cs++;
    }

    }
    last_angle = angle;
    }

    if(cs==0) // -------------- check for detect answer -----------------------------
    {
    clearInterval(Create_balloons_interval);
    //console.log("created");
    // draw_balloons(i);
    dart_Location_Created = [dart_location_x, dart_location_y];
    balloons_Location_Created =  balloons_location[i];
    balloonsCreated = true;
    return true;
    }
    // ----------------------------///////////////////------------------------------

    costs[i] = new balloon_cost(balloons_location[i], cs);
    }

    selectParent();
    return false;
    }

function balloon_cost(balloon_fake, cost) // for handle parent cost
{
    this.balloon = balloon_fake;
    this.cost = cost;
    }

function selectParent()
{
    costs.sort(function(a, b){return a.cost - b.cost});
    parent_1 = costs[0].balloon;
    parent_2 = costs[1].balloon;

    crossover();
    }

function crossover()
{
    balloon_tmp = [];
    var half = [];
    for(var i=0; i<parent_1.length; i++)// i < count of ballons
    {
    var x = parent_1[i].x;
    var y = parent_2[i].y;
    half.push(new balloon_fake([x,y]));
    }
    balloon_tmp.push(half);
    half = [];

    for(var i=0; i<parent_2.length; i++)
    {
    var x = parent_2[i].x;
    var y = parent_1[i].y;
    half.push(new balloon_fake([x,y]));
    }
    balloon_tmp.push(half);

    mutation();
    }

function mutation()
{
    for(var i=0; i<2; i++)
    {
    var bl = balloon_tmp[i];
    for(var j=0; j<bl.length; j++)
    {
    bl[j].x = parseInt(Math.min(Math.abs((bl[j].x + Math.cos(Math.random()*Math.PI)*20)), canvas_width -10));  //mutattion value
    bl[j].y = parseInt(Math.min(Math.abs((bl[j].x + Math.cos(Math.random()*Math.PI)*20)), canvas_height -10)); //mutattion value
    }
    balloons_location.push(bl);
    }
    }
/*
function draw_balloons(i)
{
    var bl = balloons_location[i];
    for(var i=0; i<bl.length; i++)
    {
    var x = bl[i].x;
    var y = bl[i].y;
    console.log("x:"+x+"Y:"+y);

    context.beginPath();
    context.fillStyle = "#DCF740";
    context.arc(x,y,5,0,2*Math.PI);
    context.fillText(i, x+10, y);
    context.fill();
    context.closePath();
    }
    }
*/
//------------------------////////////////////////////////////////------------------------------------

/*------------------------------------Rate--------------------------------------*/
$(document).on('click', '#show-details-close-popup-btn' ,function(){
    $("#ej-popup-close-btn").click();//close popup
});


var EJ_POPUP_LAST_SCROLL_TOP = 0;
function ej_popup()
{
    this.isShow = false;

    this.loading = function(isLastScroll)
    {
        var scrollTop = $(document).scrollTop();
        //   var screenHeight = $(window).height();
        //   var popupHeight = $('#ej-popup').height();

        $("#ej-popup-html").html("<div class='ej-loading-overlay-area'></div>");
        $("#ej-popup-container").css('display','block');

        //  var popupTop = scrollTop + Math.abs((screenHeight - popupHeight)/2);
        var popupTop = isLastScroll ? EJ_POPUP_LAST_SCROLL_TOP : scrollTop + 60;
        EJ_POPUP_LAST_SCROLL_TOP = popupTop;

        $("#ej-popup").css('top', popupTop+'px').fadeIn(200);

        this.isShow = true;
    };
    this.fadeIn = function(html)
    {
        $("#ej-popup-html").html(html);
    };
    this.fadeOut = function()//not required for repeat fadeIn.
    {
        $("#ej-popup-container").css('display','none');
        $("#ej-popup").fadeOut(200);
        this.isShow = false;
    };
}
var EJ_POPUP = new ej_popup();


$().ready (function(){

    function show_ej_popup_rate(isShowInput, currentUserId)
    {
      EJ_POPUP.loading(false);
      $.get('', {get_rate_detail : 1})
            .done(function (data) {

               var history_data = "<table id='history-table'><tr><th>Rank</th><th>Name</th><th>Score</th><th>Lose</th><th>Level</th></tr>";
               var obj = JSON.parse(data);

               var r = 255, g=0, b=40;
               var _color = 255;
               var user_id = currentUserId || 0;

               var max_len = 10;
               var ratio_r = parseInt(r/max_len);
               var ratio_b = parseInt(b/max_len);
               var ratio_color = parseInt(_color/max_len);
               for(var num in obj)
               {
                   var item_name = obj[num]['name'] || "Unknown";
                   var item_score = obj[num]['score'];
                   var item_lose = obj[num]['lose'];
                   var item_level = obj[num]['level'];
                   var item_id = obj[num]['id'];//for check current user.
                   var current_user = (item_id == user_id );

                   r = Math.max(r-ratio_r, 0);
                   b = Math.max(b-ratio_b, 0);
                   _color = Math.max(_color-ratio_color, 60);

                   var item_bg = current_user ? "background: rgb(5,65,221); color: #DDD;" : "background: rgb("+r+","+g+","+b+"); color: rgb("+_color+","+_color+","+_color+");";
                   var score_bg = current_user ? "" : "color: rgb("+r+","+_color+","+b+");";
                   history_data +=  "<tr style=' "+item_bg+" '><td>"+(parseInt(num)+1)+"</td><td class='history-name'>"+item_name+"</td><td><b style='"+score_bg+"'>"+item_score+"</b></td><td>"+item_lose+"</td><td>"+item_level+"</td></tr>";
               }

               history_data +=  "</table>";


              if(isShowInput)
              {
                EJ_POPUP.fadeIn("<div id='show-rate-container'>" +
                "<div id='ej-popup-title'>Rate Details</div>" +
                     "<div id='ej-popup-text'>" +
                         "<div id='save-score-container'> " +
                              "<span id='save-score-show-score'>Your score is : <b>("+Score+")</b></span>" +
                                "<div id='save-score-input-container'>"+
                                      "<input id='save-score-name-input' type='text' class='input' placeholder='Your Name'> " +
                                      "<input id='save-score-submit-btn' class='btn' type='button' value='Submit'>" +
                                 "</div>" +
                         "</div>" +
                         "<div id='save-score-history-container'>" +
                             "<span id='save-score-history-title'>History</span>" +
                             "<div id='save-score-history'>" +
                                history_data+
                             "</div>" +
                         "</div>" +
                     "</div>"+
                "</div>");
              }
              else
              {
                EJ_POPUP.fadeIn("<div id='show-rate-container'>" +
                "<div id='ej-popup-title'>Rate Details</div>" +
                     "<div id='ej-popup-text'>" +
                         "<div id='save-score-container'> " +
                              "<span id='save-score-show-score'>Your score is : <b>("+Score+")</b></span>" +
                         "</div>" +
                         "<div id='save-score-history-container'>" +
                             "<span id='save-score-history-title'>History</span>" +
                             "<div id='save-score-history'>" +
                                history_data+
                             "</div>" +
                         "</div>" +
                     "</div>"+
                "</div>");
              }

            })
            .fail(function () {
                alert(server_error_text);
            });
    }

  $(document).on('click', '#high-score-btn',function() {

    show_ej_popup_rate(true);
  });


    $(document).on('click', '#save-score-submit-btn',function() {
        var name = $("#save-score-name-input").val() || "";
        var score = Score;
        var lose = Lose;
        var level = Level;
        var save_data = {name : name, score : score, lose : lose, level : level};
        save_data = JSON.stringify(save_data);
        EJ_POPUP.loading(false);
        $.post('', {set_rate_detail : save_data})
            .done(function (data) {
                var user_id = data;
                show_ej_popup_rate(false, user_id);
            })
            .fail(function () {
                alert(server_error_text);
            });
    });

    //--------------- Ej_popup handler -------------
    $('#ej-popup-close-btn').click(function(){
        if(EJ_POPUP.isShow)
        {
            EJ_POPUP.fadeOut();
        }

    });

    $('#ej-popup-container').click(function(e){
        var Target = e.target.id;
        if(Target == $(this).attr("id"))
        {
            if(EJ_POPUP.isShow)
                EJ_POPUP.fadeOut();
        }
    });
//----------------------------------------------


});//end ready document