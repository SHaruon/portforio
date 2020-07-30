/*let menu = document.getElementsByClassName("menu");
document.addEventListener('mousemove', function (e) {
    menu[0].style.transform = 'rotateY(' +(24+ (e.clientX/100)) + 'deg) rotateX(' +(10- (e.clientY/100)) + 'deg)';
});*/

let sc = document.getElementById("sc");
let scbody = document.getElementById("scbody");
let sctext = document.getElementById("sctext");
let sc_width = window.getComputedStyle(sc, null).getPropertyValue('width');

let scene_flag = 0;


/*スクリーン以外をクリックすると戻る*/
let scback = document.getElementById("screenback");
scback.addEventListener('click', function(){
    sctext.innerHTML = 'Touch the screen';

    sc.style=`
    background-color:#555555;
    border-radius:20px;
    width:700px;
    height:500px;

    transform:translateX(30%) translateY(15%) rotateY(24deg) rotateX(10deg);
    transition:0.8s;`;

    scene_flag=0;
    console.log(scene_flag);
    
});
/*スクリーンをクリックすると拡大し、文字を見せる */
scbody.addEventListener('click', function(){
    
    sc.style = `
    transform: translateX(20%) translateY(0) rotateY(0deg);
    height: 714px;
    width: 1000px;
    `;
    
    sctext.innerHTML = '<div id="to_gallery"></div> <div id="to_about"></div>';

    scene_flag=1;
    console.log(scene_flag);
});

    /*マウスに追従してフィルターが動く */
let filter = document.getElementById("filter");
document.addEventListener('mousemove',function (e) {
    filter.style = "background: radial-gradient(circle at " + e.clientX + "px " + e.clientY + "px " + ",#ffffff10 , #00000099 )";
});
console.log(filter.style);

