/*let menu = document.getElementsByClassName("menu");
document.addEventListener('mousemove', function (e) {
    menu[0].style.transform = 'rotateY(' +(24+ (e.clientX/100)) + 'deg) rotateX(' +(10- (e.clientY/100)) + 'deg)';
});*/



/*3d処理　3dの部分 */



let detail_message='';

window.addEventListener('DOMContentLoaded', init);

function init() {

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas'),alpha:true
    });

    
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    //const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();


    const urls = [
    'https://sharuon.github.io/portforio/obj/guitar.glb',
    'https://sharuon.github.io/portforio/obj/chair.glb',
    'https://sharuon.github.io/portforio/obj/tank.glb',
    'https://sharuon.github.io/portforio/obj/chara.glb',
    'https://sharuon.github.io/portforio/obj/rakiga.glb'
];

let models = [null,null,null,null,null];
let nowmodel = null;
    
//シーンを作成
let scene = new THREE.Scene();
var load_flag=0;
        
Object.keys(urls).forEach(key => {
    loader.load(
        
        urls[key],
        function (gltf) {
            scene.add( camera );
            models[key] = gltf.scene;
            // model.name = "model_with_cloth";
            models[key].scale.set(100.0, 100.0, 100.0);
            models[key].position.set(0, 0, 0);
            scene.add(models[key]);
            // model["test"] = 100;

            //全部読み込んだら画面を見せる
            
            if(models[4] != null){
                load_flag++;
                console.log("added here !! "+ load_flag);
            }
            if(load_flag == 1){
                /*見せる */
                document.getElementById('loading').innerHTML=``;
                document.getElementById('loading').style=``;
                document.getElementsByClassName("space")[0].style = `
                opacity: 1; pointer-events:auto; visibility: visible;`;
                document.getElementsByClassName("space")[0].animate({opacity: [0,1]},2000);
                console.log("okkkk"+ load_flag);
            }else if(load_flag == 0){
                //最初は真っ暗に"Loading"
                
                document.getElementById('loading').style=`
                 position:absolute; left:45%; top:45%;`;
            }
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }

    );
    

});


//renderer.gammaOutput = true;
//renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
    
   // 平行光源
const light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set(0, 1, 0);
light.intensity = 1; // 光の強さを倍に
const light2 = new THREE.AmbientLight(0xffffff,0.1);
   // シーンに追加
scene.add(light);
scene.add(light2);

    /*!!!!メインウィンドウ部分ここから */

let sc = document.getElementById("sc");
let scbody = document.getElementById("scbody");
let sc_width = window.getComputedStyle(sc, null).getPropertyValue('width');
let table = document.getElementById("table");
let gallery = document.getElementById("gallery");
let menu = document.getElementById("menu");

let scene_flag = 0;

//開始部分



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
    <h3>Welcome</h3>
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
    scbody.innerHTML = `<div id="to_gallery"><h3>Arts</h3><br>\>\></div> <div id="to_about"><h3>About</h3><br>\>\></div>`;
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
            


            document.getElementById("art_a").addEventListener('click',function(){
                document.getElementById("detail").innerHTML=`
                <h1>GUITAR</h1><br>
                
                <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp自由制作。制作時間5時間<br><br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                使用ソフト:&nbspMAYA</h4>
                `;
                nowmodel = '0';
                if(nowmodel == '0'){
                    openThree();
                }
            });

            document.getElementById("art_b").addEventListener('click',function(){
                document.getElementById("detail").innerHTML=`
                <h1>MAYA&nbspCLUB</h1><br>
                
                <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp3DCGサークルの紹介動画。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                サークル内を再現した。制作期間3ヶ月<br><br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                使用ソフト:&nbspMAYA,imovie,<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                Adobe After Effects CC 2018</h4>
                <img src = "img/contents/2_1.png">
                `;
                nowmodel = '1';
                if(nowmodel == '1'){
                    openThree();
                }
            });

            document.getElementById("art_c").addEventListener('click',function(){
                document.getElementById("detail").innerHTML=`
                <h1>Tiger&nbspTANK</h1><br>
                
                <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                戦車。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                制作期間2日<br><br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                使用ソフト:&nbspBlender<br></h4>
                `;
                nowmodel = '2';
                if(nowmodel == '2'){
                    openThree();
                }
            });

            document.getElementById("art_d").addEventListener('click',function(){
                document.getElementById("detail").innerHTML=`
                <h1>AIT&nbspCharacter</h1><br>
                
                <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                大学のマスコットキャラクターの提案。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                大学に様々な学科がある中、<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                食堂のカレーラーメンをモチーフに<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                工業大学のイメージを統一した。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                制作期間1日<br><br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                使用ソフト:&nbspAdobe Illustrator,Blender<br></h4>
                `;
                nowmodel = '3';
                if(nowmodel == '3'){
                    openThree();
                }
            });

            document.getElementById("art_e").addEventListener('click',function(){
                document.getElementById("detail").innerHTML=`
                <h1>Imaginary&nbspWeapon</h1><br>
                
                <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                自由制作。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                ゲームの武器を参考にした。<br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                制作期間2日<br><br>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                使用ソフト:&nbspAdobe MAYA<br></h4>
                `;
                nowmodel = '4';
                if(nowmodel == '4'){
                    openThree();
                }
            });

            function openThree(){
                /*指定したオブジェクトのみ表示 */
                models.forEach(m =>{m.visible = false});
                models[nowmodel].visible = true;

                document.getElementById('main_canvas').style=`
                pointer-events:auto;
                visibility: visible;
                `;
                document.getElementById('main_canvas').animate({opacity: [0,1]},1000);

                document.getElementById('menuback').addEventListener('click',function(){
                    
                    document.getElementById('main_canvas').animate({opacity: [1,0]},200)
                    document.getElementById('main_canvas').style=`
                    pointer-events:none;
                    visibility: hidden;
                    transition:0.2s;
                    `;
                });
            }
           

            /*シーンフラグ */
            scene_flag = 2;
        });

        toabout.addEventListener('click', function(){
            scbody.innerHTML = `
            <p>
            
            <b>NAME</b><br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Saito_Haruki<br><br>
            
            <b>SYNOPSIS</b><br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            愛知県生まれ温室育ち<br><br>
            
            <b>DESCRIPTION</b>    <br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            CGを勉強する大学生。<br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            MAYA&nbsp&nbsp&nbspプラグインの作成など可能です<br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Blender&nbsp&nbsp&nbsp主にキャラクタモデリングをします<br><br>
            <b>BUGS</b>    <br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            グミを爆速で消費します<br><br>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            Jul 31 ,2020<br>
            </p>
            `;
            scbody.style=`

            `;
            scene_flag = 3;
        });
    }
});



    /*マウスに追従して光のフィルターが動く */
let filter = document.getElementById("filter");
document.addEventListener('mousemove',function (e) {
    filter.style = "background: radial-gradient(circle at " + e.clientX + "px " + e.clientY + "px " + ",#ffffff10 , #00000099 )";
});

/*!!!!メインウィンドウ部分ここまで */

/*以下、3d描画処理 */


tick();
    

let click_flag=0;
let x=0;
let y=0;

    function tick() {
        //controls.update();
        if (models[nowmodel] != null){

            
             document.onmousedown = function(){
                 click_flag = 1;
            };
             document.onmouseup = function(e){
                 click_flag = 0;
            };
            document.addEventListener('mousemove',function(e){
                
                if(click_flag == 1 ){
                    x = e.movementX/200;
                    y = e.movementY/200;
                    
                }
                
           });
           
           models[nowmodel].rotation.y += x;
           models[nowmodel].rotation.x -= y;
           x = x/1.1;
            y = y/1.1;
        }

        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }


}