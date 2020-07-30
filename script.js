/*let menu = document.getElementsByClassName("menu");
document.addEventListener('mousemove', function (e) {
    menu[0].style.transform = 'rotateY(' +(24+ (e.clientX/100)) + 'deg) rotateX(' +(10- (e.clientY/100)) + 'deg)';
});*/

let sc = document.getElementById("sc");
let scbody = document.getElementById("scbody");
let sc_width = window.getComputedStyle(sc, null).getPropertyValue('width');

let scene_flag = 0;


let promise = new Promise((resolve, reject) => { // #1
})


/*スクリーン以外をクリックすると戻る*/
let scback = document.getElementById("screenback");
scback.addEventListener('click', function(){

    if(scene_flag == 1){
        let togallery = document.getElementById("to_gallery");
        let toabout = document.getElementById("to_about");
        togallery.animate({opacity: [1,0]},1000);
        toabout.animate({opacity: [1,0]},1000);
    }
    scbody.innerHTML = `
    <div class="text" id="sctext">
           Touch The Screen
    </div>`;

    sc.style=`
    background-color:#555555;
    border-radius:20px;
    width:700px;
    height:500px;

    transform:translateX(200px) translateY(120px) rotateY(24deg) rotateX(10deg);
    transition:0.8s
    position: absolute;
    Z-index:2;;`;
    
    scene_flag=0;
    
});

/*スクリーンをクリックすると拡大し、文字を見せる */
scbody.addEventListener('click', function(){
    if(scene_flag == 0){
    sc.style = `
    transform: translateX(200px) translateY(0) rotateY(0) rotateX(0);
    height: 714px;
    width: 1000px;
    position: absolute;
    Z-index:2;
    `;
    
    scbody.innerHTML = `<div id="to_gallery">gallery<br>\>\></div> <div id="to_about">about<br>\>\></div>`;
    scene_flag = 1;
    let togallery = document.getElementById("to_gallery");
    let toabout = document.getElementById("to_about");
    togallery.animate({opacity: [0,1]},1000);
    toabout.animate({opacity: [0,1]},1000);
    }
    if(scene_flag == 1){
        console.log("1");
        let togallery = document.getElementById("to_gallery");
        let toabout = document.getElementById("to_about");
        togallery.addEventListener('click', function(){
            window.location.href = "style.css";
            console.log("gone");
        });
        toabout.addEventListener('click', function(){
            window.location.href = "script.js";
        });
    }
});



    /*マウスに追従してフィルターが動く */
let filter = document.getElementById("filter");
document.addEventListener('mousemove',function (e) {
    filter.style = "background: radial-gradient(circle at " + e.clientX + "px " + e.clientY + "px " + ",#ffffff10 , #00000099 )";
});





/*to_gallery,to_aboutのタッチ判定 */

