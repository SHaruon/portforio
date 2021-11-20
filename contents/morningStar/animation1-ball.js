//ボールに棒人間の体を追従させて、棒人間を弾くゲームにする

//ボールに追従させる？
// ボールの位置 - 追従させる物体の位置 + オフセット ぶんだけ物体を動かしつつ、ボールとはオフセットの分一定の距離を保つようにする


var canvas;
var cc;
var r=5; //半径
var interval=0.01; //描画間隔：10s
var timer; //タイマーIDを格納する変数
var x=100; //x座表
var y=100; //y座表
var dx=1.0; //x方向の移動量
var dy=1.0; //y方向の移動量
var g = 9.0; //重力加速度 px/s^2
var e=0.4; //壁の反発係数

var count=0; //クリックの回数を数える
var drag = false;

var reflectCount = 0;
var gameTimer;
var gameTime = 10;
var timeBar = 0;
var gameFlag = 1;



//2の位置
var x2 = 130;
var y2 = 100; 

var r2=15;
var r_touch = 60;

var dx2 = -1.0;
var dy2 = 1.0;

var power=0;

class HitEffect{
    constructor(posX,posY){
        this.time=0;
        this.x=posX;
        this.y=posY;
    }
    
}

var HitEffects = new Array();

var countFontSize = 100;






function init(){
    canvas = document.getElementById("canvas");
    cc = canvas.getContext("2d");

    //時間を設定。 setInterval(function,second)
    //setInterval は繰り返し function を呼び出す。
    //setTimeout は時間が来たら一回だけ function 呼び出す。
    canvas.addEventListener('click',onMouseClick);
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',onMouseDown);
    canvas.addEventListener('mouseup',onMouseUp);
    canvas.addEventListener('mouseout',onMouseOut);

    timer = setInterval(draw,interval * 1000);
    gameTimer = setTimeout(gameOver,gameTime * 1000);

    timeBar = 0;
    reflectCount = 0;

    power = 0;
    drag = false;

    gameFlag = 0;

    HitEffects = new Array();

}

//このコードはhtmlの方で　deferが同じことをしているので必要ない。 
//htmlの要素が全て読み込まれてから、javascriptを実行する　こうすることで、
//javascriptが探しているhtml要素がまだ読み込まれてない、見つかりません、となることを防ぐ
window.addEventListener('DOMContentLoaded' ,function(){init()})

function draw(){
    //canvas クリア
    cc.clearRect(0,0,canvas.width,canvas.height);
    
    var ball_dist_calc = (100-Math.sqrt(Math.pow(x-x2,2) + Math.pow(y-y2,2)));
    drawTimeBar("rgba(200,100,0,0.1)");
    drawCount("rgba(200,100,0,0.3)");

    drawLine(x,y,x2,y2,"#9ac",ball_dist_calc*0.15);
    drawCircle(x,y,"#9ac",r);
    drawMorning(x2,y2,"#f53",r2);
    
    updateCoordinate();
    updateHitEffects();
}

function updateCoordinate(){

     //---------------<改変

     isHit = false;

     dy2 = dy2+g*interval;
    //壁にぶつかった時の判定
    if((x2+dx2 > canvas.width - r2) || (x2+dx2 < r2)){
        dx2 = (dx2*-1) * e;　//逆方向*反発係数
        if(power >5){
            reflectCount++;
            addHitEffect(x2,y2);
            countFontSize+=10;
        }
    }

    if(y2 + dy2 > canvas.height - r2 || (y2+dy2 < r2)){
        dy2 = (dy2*-1) * e;
        if(power > 5){
            reflectCount++;
            addHitEffect(x2,y2);
            countFontSize+=10;
        }
        dx2 *= 0.6; //擬似的な摩擦
    }

    var ball_dist = Math.sqrt(Math.pow(x-x2,2) + Math.pow(y-y2,2));
    var line_dist = 70;

    if(ball_dist > line_dist){
        //1
        if(! drag){
            x = x+(x2-x)*(ball_dist-line_dist)/(ball_dist);
            y = y+(y2-y)*(ball_dist-line_dist)/(ball_dist);

            dx = dx+(x2-x)*(ball_dist-line_dist)/(ball_dist);
            dy = dy+(y2-y)*(ball_dist-line_dist)/(ball_dist);

        }
        
        //2
        x2 = x2+(x-x2)*(ball_dist-line_dist)/(ball_dist);
        y2 = y2+(y-y2)*(ball_dist-line_dist)/(ball_dist);

        dx2 = dx2+(x-x2)*(ball_dist-line_dist)/(ball_dist)*0.6;
        dy2 = dy2+(y-y2)*(ball_dist-line_dist)/(ball_dist)*0.6;

    }

    x2 = x2+ dx2 ;
    y2 = y2+ dy2 ;
    
    //ドラッグしていなければ 取手をシミュレーションする
    if(! drag){
        dy = dy+g*interval; //重力加速度*描画間隔 = 重力加速度に基づいて１回の更新で動く距離


        if((x+dx > canvas.width - r) || (x+dx < r)){
            dx = (dx*-1) * e;　//逆方向*反発係数
            
        }
        if(y + dy > canvas.height - r || (y+dy < r)){
            dy = (dy*-1) * e;
        }

        x = x+dx;
        y = y+dy;
    }


    power = Math.abs(dx2+dy2);



}

function addHitEffect(x,y){
    //var f = );
    HitEffects.push(new HitEffect(x,y));
    console.log(HitEffects);
}

function updateHitEffects(){
    var index = 0;
    HitEffects.forEach((element) => {
        drawHitEffect(element.x,element.y,element.time);
        element.time++;
        index++;
    })
}

function drawHitEffect(x,y,time){
    cc.save();
    cc.beginPath();
    cc.fillStyle = "rgba("+(230+time)+","+(255-time*5)+","+(0)+","+(0.8-time*0.02)+")";
    cc.arc(x,y,time*(2+power/6),0,Math.PI*2,true);
    cc.closePath();
    cc.fill();
    cc.restore();
}

function drawCircle(x,y,color,size){
    cc.save();
    cc.beginPath();
    cc.fillStyle = color;
    cc.arc(x,y,size,0,Math.PI*2,true);
    cc.closePath();
    cc.fill();
    cc.restore();
}

function drawMorning(x,y,color,size){
    cc.save();
    cc.beginPath();
    cc.fillStyle = color;
    cc.arc(x,y,size,0,Math.PI*2,true);
    cc.closePath();
    cc.fill();
    cc.restore();

    cc.save();
    cc.beginPath();
    cc.translate(x,y);
    cc.rotate(10*(dx*dy)/180*Math.PI);
    
    cc.fillStyle = color;
    //cc.fillRect(x-size*0.9,y-size*0.9,size*1.8,size*1.8);
    cc.fillRect(-size*0.85,-size*0.85,size*1.7,size*1.7);
    cc.closePath();
    cc.fill();
    cc.restore();
}

function drawLine(x,y,ex,ey,color,width){
    cc.save();
    cc.beginPath();
    cc.strokeStyle = color;
    cc.lineWidth = width;
    cc.moveTo(x,y);
    cc.lineTo(ex,ey);
    cc.stroke();
    cc.restore();
}


//「ボールをクリックした時」「マウスとボールの動きが追従するようにする」
//1. マウスでボールがクリックされたことがわかる関数
//2. ボールを動かす関数で自然落下からマウスに追従させるように切り替える


//この一文に判定を全て書かず、isBallClickedという判定用の関数を用意して
//コードを見やすく、抽象化して表現する
function onMouseClick(e){
    var mx,my;
    //ページ外をクリックした時、判定に渡すための座表(mx,my)をページの端の値にする
    if( e.pageX || e.pageY){
        mx = e.pageX;
        my = e.pageY;
    }else{
        mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    //クリックした要素 の座標系に変換 (ここではcanvasがクリックされることを想定している)
    mx -= e.target.getBoundingClientRect().left;
    my -= e.target.getBoundingClientRect().top;


    if(gameFlag == -1){
        restart();
    }
}

//ボールがクリックされているかどうか、を判定する。
function isBallClicked(mx,my){
    //マウス位置の値 - ボールの位置の値 = 差分
    var distance = Math.sqrt(Math.pow(mx-x,2) + Math.pow(my - y,2));
    if(distance <= r_touch){
        return true;
    }
    return false;
}

function onMouseMove(e){
    if (!drag) return; //ドラッグ中でなければ以下の処理はしない

    //マウス位置(ビューポート座表)をボールのための位置(キャンバス座表)に
    var mx = e.clientX - canvas.offsetLeft;
    var my = e.clientY - canvas.offsetTop;

    //移動量の更新
    //dx = mx - x;
    //dy = my - y;
    x = mx;
    y = my;
}

function onMouseDown(e){

    
    var mx,my;
    if(e.pageX || e.pageY){
        mx = e.pageX;
        my = e.pageY;
    }else{
        mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mx -= e.target.getBoundingClientRect().left;
    my -= e.target.getBoundingClientRect().top;

    if(isBallClicked(mx,my)){
        drag = true;
        x = mx;
        y = my;
        dx = 0;
        dy = 0;
    }
}

function drawCount(color){
    cc.save();
    cc.beginPath();
    cc.fillStyle = color;
    cc.font = (countFontSize)+"px sans-serif";
    
    cc.textAlign = "center";
    cc.fillText(reflectCount, 150,240);
    cc.closePath();
    cc.fill();
    cc.restore();

    if(countFontSize > 100){
        countFontSize -= 1;
    }
}

function drawTimeBar(color){
    cc.save();
    cc.beginPath();
    cc.fillStyle = color;
    cc.fillRect(0,(400-timeBar),300,(0+timeBar));
    cc.closePath();
    cc.fill();
    cc.restore();
    
    timeBar+=400/gameTime/100;
}

function onMouseUp(e){
    drag = false;
}

//現在カーソルがあっている要素からカーソルが外に出ると起爆
function onMouseOut(e){
    drag = false;
}

function gameOver(){
    gameFlag = 0;
    clearInterval(timer);
    gameOverEffect();
    canvas.removeEventListener("mousemove",onMouseMove);
    canvas.removeEventListener("mousedown",onMouseDown);
    canvas.removeEventListener("mouseup",onMouseUp);
    canvas.removeEventListener("mouseout",onMouseOut);
    
}

function gameOverEffect(){

    var ef_brake_time = 0;
    var ef_brake = setInterval(function(){
        if(ef_brake_time > 40){
            clearInterval(ef_brake);
        }
        drawMorning(x2,y2,"#f53",ef_brake_time*15);
        ef_brake_time++;
    },20);

    var ef_result = setTimeout(function(){
        cc.save();
        cc.beginPath();
        cc.fillStyle = "white";
        cc.font = "20px sans-serif";
        cc.textAlign = "center";
        cc.fillText("R E S U L T", 150,100);
        cc.closePath();
        cc.fill();
        cc.restore();
    
        drawCount("white");

        cc.save();
        cc.beginPath();
        cc.fillStyle = "white";
        cc.font = "20px sans-serif";
        cc.textAlign = "center";
        cc.fillText("H I T", 150,280);
        cc.closePath();
        cc.fill();
        cc.restore();

    },1000);

    var ef_retry = setTimeout(function(){
        cc.save();
        cc.beginPath();
        cc.fillStyle = "white";
        cc.font = "15px sans-serif";
        cc.textAlign = "center";
        cc.fillText("T R Y   A G A I N", 150,350);
        cc.closePath();
        cc.fill();
        cc.restore();
        gameFlag = -1;
    },2000);


}

function restart(){

    x = 100;
    y = 100;
    x2 = 120;
    y2 = 100;

    dx = 1;
    dy = 1;
    dx2 = -1;
    dx2 = 1;


    var ef_restart_time = 0;
    var ef_restart = setInterval(function(){
        if(ef_restart_time > 40){
            clearInterval(ef_restart);
        }
        cc.clearRect(0,0,300,400);
        drawMorning(x2,y2,"#f53",400-ef_restart_time*10+r2);
        ef_restart_time++;
    },20)

    var ef_init = setTimeout(function(){
        init();
    },800);
}