"use strict";
//python -m SimpleHTTPServer
//localhost:8000

var Missile = function (geomMissile, matRed,xPos,yPos) {
    this.missile = new THREE.Mesh(geomMissile, matRed);
    this.missile.position.x = xPos;
    this.missile.position.y = yPos;
    this.missile.position.z = 3;

    this.moveAndCheck = function () {
        var actualX = this.missile.position.x;
        var actualY = this.missile.position.y;
        if (actualY>0.9) {
            return false;
        } else {
            this.missile.position.y +=0.05;
            return true;
        }
    }
}

//this object will manage enemies, they creation, destruction, movements, updates and collision
var BattleManager = function (scene) {
    this.playerMissileIsLive = false;
    this.playerMissile = undefined;
    this.geomEnemy = new THREE.BoxGeometry(0.1, 0.1, 0.03);
    this.matDarkGreen = new THREE.MeshBasicMaterial({color: 0x005500});
    this.meshEnemy = new THREE.Mesh(this.geomEnemy, this.matDarkGreen);
    this.geomMissile = new THREE.BoxGeometry(0.01, 0.05, 0.01);
    this.matRed = new THREE.MeshBasicMaterial({color: 0xff0000});
    this.meshMissile = new THREE.Mesh(this.geomMissile, this.matRed);
    this.enemyNumber = 80;
    this.enemyArray = new Array(this.enemyNumber);
    for (var i = 0; i < this.enemyNumber; i++){
        var dynPosX = (i%10 - 5)*0.16;
        var dynPosY = 0.7 - (0.14*(i-i%10)/10);
        this.enemyArray[i] = new Enemy(scene, this.geomEnemy, this.matDarkGreen, dynPosX , dynPosY);
        scene.add(this.enemyArray[i].enemy);
    }
    this.enemyWay = 1;
    this.changingWay = false;
    this.difficultySpeed = 0.002;

    this.playerFireMissile = function (xPos,yPos) {
        this.playerMissile = new Missile(this.geomMissile,this.matRed,xPos,yPos);
        scene.add(this.playerMissile.missile);
        this.playerMissileIsLive = true;
    }

    this.checkPlayerMissileCollision = function (scene) {
        //for each enemy
        for (var i = 0; i < this.enemyNumber ; i++) {
            //first we check if both the enemy and missile still exist
            if (this.playerMissileIsLive && this.enemyArray[i] != null) {
                //then we calculate the difference on the Y axis between the missile and the enemy
                var diffY = this.enemyArray[i].enemy.position.y - this.playerMissile.missile.position.y;
                //and then we check if this is withing collision range (Y axis)
                if ( diffY < 0.05 && diffY > -0.05) {
                    //then this time, we calculate the difference on the X axis between the missile and the enemy
                    var diffX = this.enemyArray[i].enemy.position.x - this.playerMissile.missile.position.x;
                    //and then we check if this is withing collision range (X axis), thus a real collision
                    if ( diffX < 0.05 && diffX > -0.05) {
                        scene.remove(this.enemyArray[i].enemy);
                        this.enemyArray[i] = null;
                        scene.remove(this.playerMissile.missile);
                        this.playerMissileIsLive = false;
                        console.log("hit");
                    }
                }
            }
        }
    }

    //update enemies, missiles, and then check for collision if needed
    this.update = function () {
        //if the missile is still alive
        if (this.playerMissileIsLive){
            //if the missile is still on the game zone then move the missile and
            if (this.playerMissile.moveAndCheck()){
                //check for enemy collision
                this.checkPlayerMissileCollision(scene);
            } else {
                //destroy the missile to allow player to shoot the next one
                scene.remove(this.playerMissile.missile);
                this.playerMissileIsLive = false;
            }


        }

        //Moving enemies: for each enemy created
        for (var i = 0; i < this.enemyNumber; i++) {
            //store the way they should move, +1 or -1
            var theWay = this.enemyWay;
            //if the enemy hasn't been destroyed
            if (this.enemyArray[i] != null) {
                //if no other enemy has already hit one side of the game zone
                if (!this.changingWay){
                    //if enemies should go toward x, did they hit the limit?
                    if (theWay > 0 && this.enemyArray[i].enemy.position.x > 1) {
                        this.changingWay = true
                    //then if enemies should go toward -x, did they hit the limit?
                    } else if (theWay < 0 && this.enemyArray[i].enemy.position.x < -1) {
                        this.changingWay = true
                    }
                }
                //move enemies
                this.enemyArray[i].enemy.position.x += (theWay * this.difficultySpeed);
            }
        }
        //if one enemies hit the limit, change the way for the next turn
        if (this.changingWay){
            this.enemyWay = -this.enemyWay;
            this.changingWay = false;
        }
    }

}

var Enemy = function (scene, geomEnemy, matDarkGreen, xPos,yPos) {
    this.enemy = new THREE.Mesh(geomEnemy, matDarkGreen);
    this.enemy.position.x = xPos;
    this.enemy.position.y = yPos;
    this.enemy.position.z = 3;
}

var main = function () {
    //engine variables
    var playerMissile = null;
    var marsRotate = true;
    var marsRotation = 0;
    var maxAnisotropy;
    var sufficientAnisotropy;
    var textureLoader;
    var battleManager;

    //loading screen
    var manager;
    var textManager;
    var loadingGroup;

    //trinity of scene, camera and renderer
    var scene;
    var camera;
    var renderer;

    //lights
    var sunlight;

    //stats overlay
    var stats;

    //regular controls
    var keyLeft = false;
    var keyRight = false;
    var keyShoot = false;
    //camera controls
    //var orbitalControls;

    //geometry
    var vertexMult = null;
    var textGeometry;
    var geomSegBar = new THREE.BoxGeometry(0.98, 0.2, 0.1);
    var geomBar = new THREE.BoxGeometry(5, 0.05, 0.1);
    var geomSkybox = new THREE.SphereGeometry (1,24,16);
    var geomShip = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    //materials
    var matMars;
    var matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
    var matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});

    //global objects
    var ship;
    var mars;
    var skybox;

    //we can call them in this precise order
    if ( !init() ) {
        if ( !loadingScene() ) {
            initGUI();
        }
    }

    function init() {

        //initialisation of the scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        camera.position.z = 4.5;

        //renderer settings
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true	// to allow screenshot
        });

        maxAnisotropy = renderer.capabilities.getMaxAnisotropy(); //Anisotrop filtering, setting to the max possible
        if (maxAnisotropy > 8) {
            //And adjusting it to a sensible value. 16x is overdoing it.
            sufficientAnisotropy = 8;
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        //orbitalControls = new THREE.OrbitControls( camera );

        // add Stats.js - https://github.com/mrdoob/stats.js
        stats = new Stats();
        stats.domElement.style.position	= 'absolute';
        stats.domElement.style.bottom	= '0px';
        document.body.appendChild( stats.domElement );

        // allow 'f' to go fullscreen where this feature is supported
        if( THREEx.FullScreen.available() ){
            THREEx.FullScreen.bindKey();
        }

        //manager
        manager = new THREE.LoadingManager();
        textManager = new THREE.LoadingManager();

        //images and textures
        textureLoader = new THREE.TextureLoader(manager);



        //loadingscreen items
        loadingGroup = new THREE.Group();
        scene.add(loadingGroup);

        loadingScreen( 0 );
    }

    //Loading screen
    function loadingScreen( stage ) {
        //each time a texture is loaded, the load manager call this function, updating the loading screen.
        //Loading screen objects are then added to the loadingGroup.
        switch (stage) {
            case 0:{
                var loader = new THREE.FontLoader(textManager);
                loader.load( "../lib/font/CyberspaceRacewayBack.json", function ( font ) {
                	textGeometry = new THREE.TextGeometry( "LOADING...", {
                		font: font,
                		size: 0.4,
                		height: 0.15,
                		curveSegments: 12
                	} );
                } );
                textManager.onLoad = function ( ) {
                    var loadingText = new THREE.Mesh(textGeometry, matMetal);
                    loadingText.position.x = -2;
                    loadingText.position.y = 0.3;
                    loadingText.position.z = 1;
                    var loadingBlock1 = new THREE.Mesh(geomSegBar, matMetal);
                    loadingBlock1.position.x = -2;
                    loadingBlock1.position.z = 1.2;
                    var loadingBar = new THREE.Mesh(geomBar, matMetal);
                    loadingBar.position.x = 0;
                    loadingBar.position.y = -0.15;
                    loadingBar.position.z = 1.2;
                    loadingGroup.add( loadingText );
                    loadingGroup.add( loadingBar );
                    loadingGroup.add( loadingBlock1 );
                    renderer.render(scene, camera);
                };
            } break;
            case 1:{
                var loadingBlock2 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock2.position.x = -1;
                loadingBlock2.position.z = 1.2;
                loadingGroup.add( loadingBlock2 );
            } break;
            case 2:{
                var loadingBlock3 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock3.position.x = 0;
                loadingBlock3.position.z = 1.2;
                loadingGroup.add( loadingBlock3 );
            } break;
            case 3:{
                var loadingBlock4 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock4.position.x = 1;
                loadingBlock4.position.z = 1.2;
                loadingGroup.add( loadingBlock4 );
            } break;
            case 4:{
                var loadingBlock5 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock5.position.x = 2;
                loadingBlock5.position.z = 1.2;
                loadingGroup.add( loadingBlock5 );
                loadingGroup.visible = false;
            } break;
            default: {console.log("Loading Switch Case hit an exception!");}
            break;
        }
        renderer.render(scene, camera);
    }

    function loadingScene() {
        var colorMapMars = textureLoader.load("../medias/maps/mars/mars.jpg");
        colorMapMars.anisotropy = sufficientAnisotropy;
        var normalMapMars = textureLoader.load("../medias/maps/mars/Blended_NRM_4K.png");
        //due to GitHub limitation of 25Mo per file, had to downsize the normal map. Original map was 8192x4096px.
        //var normalMapMars = textureLoader.load("maps/mars/Blended_NRM.png");
        colorMapMars.anisotropy = sufficientAnisotropy;
        var displacementMapMars = textureLoader.load("../medias/maps/mars/Blended_DISP.jpg");

        var colorMapSkybox = textureLoader.load("../medias/maps/milkyway.jpg");
        colorMapSkybox.anisotropy = sufficientAnisotropy;

        matMars = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x000000,
            shininess: 0,
            map: colorMapMars,
            normalMap: normalMapMars,
            displacementMap: displacementMapMars
        });

        var matSkybox = new THREE.MeshBasicMaterial({
            map: colorMapSkybox,
            side: THREE.BackSide
        });

    //ship
        ship = new THREE.Mesh(geomShip, matMetal);
        scene.add(ship);
        ship.position.x = 0;
        ship.position.y = -0.7;
        ship.position.z = 3;

    //mesh positioning
        skybox = new THREE.Mesh(geomSkybox, matSkybox);
        skybox.material.depthWrite = false;
        skybox.renderOrder = -999;
        scene.add(skybox);

    //light
        //increase exposure and color vibrance to simulate a higher color definition range (behave badly on firefox tho)
        //default is 1
        renderer.toneMappingExposure = 1.5;
        sunlight = new THREE.PointLight( 0xffffff, 5, 200, 2 );
        sunlight.position.x = 75;
        sunlight.position.z = 50;
        scene.add( sunlight );

        battleManager = new BattleManager(scene);

    //Event called on window resizing
        window.addEventListener( "resize", onWindowResize, false );

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            loadingScreen( itemsLoaded );
       };

        manager.onLoad = function ( ) {
           console.log("Ressources loading complete!");
           animate();
        };
    }

    function animate() {
        //free orbital controls:
        //orbitalControls.update();

        //update regular controls:
        window.onkeydown = function(keyPressed){
            switch (keyPressed.keyCode){
                case 80:
                    //take a screenshot and open a new tab
                    //solution working on both Chrome and firefox, thank to user Joyston: https://stackoverflow.com/a/45789588
                    var dataUrl = renderer.domElement.toDataURL("image/jpeg");
                    var iframe = "<iframe width='100%' height='100%' src='" + dataUrl + "'></iframe>";
                    var x = window.open();
                    x.document.write(iframe);
                    x.document.close();
                    break;
                case 37:
                    keyLeft = true;
                    break;
                case 39:
                    keyRight = true;
                    break;
                case 32:
                    //player ship fire a missile
                    if (!battleManager.playerMissileIsLive){
                        battleManager.playerFireMissile(ship.position.x,ship.position.y);
                    }
                    break;
                default:
            }
        };

        window.onkeyup = function(keyReleased){
            switch (keyReleased.keyCode){
                case 37:
                    keyLeft = false;
                    break;
                case 39:
                   keyRight = false;
                   break;
                default:
            }
        };

        //ship control
        if ((keyLeft == true) && (ship.position.x > -1)){
            ship.position.x -= 0.02;
        }else if ((keyRight == true) && (ship.position.x < 1)){
            ship.position.x += 0.02;
        }

        battleManager.update();


        if (marsRotate) {
            marsRotation += 0.003;
            mars.rotation.y = marsRotation;
        }

        skybox.position.x = camera.position.x;
        skybox.position.y = camera.position.y;
        skybox.position.z = camera.position.z;

        // update stats
        stats.update();

        //render the scene
        renderer.render(scene, camera);

        //call next rendering
        requestAnimationFrame(animate);
    }

//Dat GUI section
    function initGUI() {
        var gui = new dat.GUI( { width: 350 } );
        var effectController = {
            "NormalMapScale": 0.55,
            "DisplacementMapScale": 0.05,
            "VertexMultiplier": 6, //Mars sphere vertex multiplier (the icosahedron have 20 faces, each subdivision then increase this number by 4, thus final number of faces is 20*4^VertexMultiplier)
            "AnisotropicFiltering": sufficientAnisotropy,
            "Reset":function(){ resetOptions() },
            "RotationMars":function(){ toggleRotation() }
            };

        function resetOptions() {
            effectController.NormalMapScale = 0.55;
            effectController.DisplacementMapScale = 0.05;
            effectController.VertexMultiplier = 6;
            createMars();
            normalMapScaleChanged();
            displacementMapScaleChanged();
        }

        function toggleRotation() {
            if (marsRotate) {
                marsRotate = false;
            } else {
                marsRotate = true;
            }
        }

        function normalMapScaleChanged() { matMars.normalScale.set ( effectController.NormalMapScale, effectController.NormalMapScale ); }
        gui.add( effectController, "NormalMapScale", 0.0, 1.0, 0.01 ).onChange( normalMapScaleChanged ).name("Normal Map Scale").listen();
        function displacementMapScaleChanged() { matMars.displacementScale = effectController.DisplacementMapScale; }
        gui.add( effectController, "DisplacementMapScale", 0.0, 0.15, 0.005 ).onChange( displacementMapScaleChanged ).name("Displacement Map Scale").listen();
        function createMars () {
            if (vertexMult !== effectController.VertexMultiplier) {
                vertexMult = effectController.VertexMultiplier;
                scene.remove(mars);
                mars = new THREE.Mesh(new THREE.IcosahedronGeometry( 1, vertexMult ), matMars);
                mars.position.x = 0;
                mars.position.y = 0;
                mars.rotation.y = marsRotation;
                scene.add(mars);
            }
        }
        gui.add( effectController, "VertexMultiplier", 0, 8, 1 ).onChange( createMars ).name("Polygon Count Multiplier").listen();
        gui.add( effectController, "Reset" ).name("RESET");
        gui.add( effectController, "RotationMars" ).name("Rotation ON/OFF");
        function changeAnisotropy() {
            console.log(skybox.material.map.anisotropy);
            skybox.material.map.anisotropy = effectController.AnisotropicFiltering;
            mars.material.normalMap.anisotropy = effectController.AnisotropicFiltering;
            mars.material.map.anisotropy = effectController.AnisotropicFiltering;
            skybox.material.map.needsUpdate = true;
            mars.material.normalMap.needsUpdate = true;
            mars.material.map.needsUpdate = true;
        }
        gui.add( effectController, "AnisotropicFiltering", 1, maxAnisotropy, 1 ).onChange( changeAnisotropy ).listen();
        //initialize all parameters
        resetOptions();
        dat.GUI.toggleHide(); //hide GUI, press 'h' to show
    }

    //when window is resized, event listenner call this function
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
};
