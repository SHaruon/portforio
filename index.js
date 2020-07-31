/*
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

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    //const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = "http://localhost:3000/cube.glb";

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(100.0, 100.0, 100.0);
            model.position.set(0, 0, 0);
            scene.add(gltf.scene);

            // model["test"] = 100;
            console.log("??????????????"+model);
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 1; // 光の強さを倍に
    light.position.set(0, 1, 0);
    const light2 = new THREE.AmbientLight(0xffffff,0.1);
    // シーンに追加
    scene.add(light);
    scene.add(light2);

    // 初回実行
    tick() ;

let click_flag=0;
let x=0;
let y=0;

    function tick() {
        //controls.update();
        if (model != null){

            
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
           
           model.rotation.y += x;
           model.rotation.x -= y;
           x = x/1.1;
            y = y/1.1;
        }

        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
*/