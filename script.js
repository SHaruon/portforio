/*let menu = document.getElementsByClassName("menu");
document.addEventListener('mousemove', function (e) {
    menu[0].style.transform = 'rotateY(' +(24+ (e.clientX/100)) + 'deg) rotateX(' +(10- (e.clientY/100)) + 'deg)';
});*/

let sc = document.getElementById("sc");
let scbody = document.getElementById("scbody");
let sc_width = window.getComputedStyle(sc, null).getPropertyValue('width');
let table = document.getElementById("table");
let gallery = document.getElementById("gallery");

let scene_flag = 0;


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
    Z-index:2;
    transition:0.8s;`;
    
    table.style =`
    width:2200px;
    transform:translateX(-150px) translateY(410px) rotateY(24deg) rotateX(90deg);
    transition:0.8s;
    `;

    gallery.style =`
        width:2200px;
        transform:translateX(-150px) translateY(600px) rotateY(24deg) rotateX(90deg);
        transition:0.8s;
    `;

    gallery.animate({opacity: [1,0]},1000);
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

    table.style = `
    width: 3300px;
    transform: translateX(-300px) translateY(590px) rotateY(0deg) rotateX(90deg);
    `;
    
    gallery.innerHTML='';
    scbody.innerHTML = `<div id="to_gallery">Arts<br>\>\></div> <div id="to_about">About<br>\>\></div>`;
    scene_flag = 1;
    let togallery = document.getElementById("to_gallery");
    let toabout = document.getElementById("to_about");
    togallery.animate({opacity: [0,1]},1000);
    toabout.animate({opacity: [0,1]},1000);
    }
    /*ボタンをクリックすると変形 */
    if(scene_flag == 1){

        let togallery = document.getElementById("to_gallery");
        let toabout = document.getElementById("to_about");

        /*ギャラリーボタンを押した時 */
        togallery.addEventListener('click', function(){
            scbody.innerHTML = `Loading...`;
            
            sc.style = `
                transform: translateX(500px) translateY(0px) rotateY(0deg) rotateX(-50deg);
                height: 285px;
                width: 400px;
                position: absolute;
                Z-index:2;
                transition: 1.5s;
            `;

            table.style = `
                width:1200px;
                transform: translateX(80px) translateY(200px) rotateY(0deg) rotateX(40deg);
                transition: 1.5s;
            `;

            gallery.style = `
                width:1200px;
                transform: translateX(80px) translateY(200px) rotateY(0deg) rotateX(40deg);
                transition: 1.5s;
            `;
            /*ギャラリーに作品のサムネを表示 */
            gallery.innerHTML = `
            <div id="art_a"><img src="img/contents/1.jpg"></div>
            <div id="art_b"><img src="img/contents/2.png"></div>
            <div id="art_c"><img src="img/contents/3.png"></div>
            <div id="art_d"><img src="img/contents/4.png"></div>
            <div id="art_e"><img src="img/contents/5.jpg"></div>
            `;
            gallery.animate({opacity: [0,1]},2000);

            /*サムネの上にマウスを載せると詳細を表示 */
            document.getElementById("art_a").addEventListener('mouseover',function(){
                scbody.innerHTML='Guitar';
            });

            document.getElementById("art_b").addEventListener('mouseover',function(){
                scbody.innerHTML='DancingMovie';
            });

            document.getElementById("art_c").addEventListener('mouseover',function(){
                scbody.innerHTML='TANK';
            });

            document.getElementById("art_d").addEventListener('mouseover',function(){
                scbody.innerHTML='character AIT';
            });

            document.getElementById("art_e").addEventListener('mouseover',function(){
                scbody.innerHTML='Imaginary Weapon';
            });
            

            /*シーンフラグ */
            scene_flag = 2;
        });

        toabout.addEventListener('click', function(){
            scene_flag = 3;
        });
    }
});



    /*マウスに追従して光のフィルターが動く */
let filter = document.getElementById("filter");
document.addEventListener('mousemove',function (e) {
    filter.style = "background: radial-gradient(circle at " + e.clientX + "px " + e.clientY + "px " + ",#ffffff10 , #00000099 )";
});


