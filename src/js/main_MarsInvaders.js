"use strict";
//python -m SimpleHTTPServer
//localhost:8000

const main = function () {
    //engine variables
    let marsRotate = true;
    let marsRotation = 0;
    let maxAnisotropy;
    let sufficientAnisotropy;
    let textureLoader;
    let battleManager;
    let levelPopUpLocalTimer;

    //loading screen
    let manager;
    let textManager;
    let loadingGroup;

    //trinity of scene, camera and renderer
    let scene;
    let camera;
    let renderer;

    //lights
    let sunlight;

    //stats overlay
    let stats;

    //regular controls
    let keyLeft = false;
    let keyRight = false;

    //geometry
    let vertexMult = null;
    let textGeometry;
    let geomSegBar = new THREE.BoxGeometry(0.98, 0.2, 0.1);
    let geomBar = new THREE.BoxGeometry(5, 0.05, 0.1);
    let geomSkybox = new THREE.SphereGeometry (1,24,16);

    //materials
    let matMars;

    //global objects
    let mars;
    let skybox;

    //we can call them in this precise order
    if ( !init() && !loadingScene() ) {
        initGUI();
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

        //creating the Battle Manager
        battleManager = new BattleManager(scene);

        loadingScreen( 0, battleManager );
    }

    //Loading screen
    function loadingScreen( stage, battleManager ) {
        //each time a texture is loaded, the load manager call this function, updating the loading screen.
        //Loading screen objects are then added to the loadingGroup.
        const matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
        switch (stage) {
            case 0:
                const loadingBar = new THREE.Mesh(geomBar, matMetal);
                loadingBar.position.x = 0;
                loadingBar.position.y = -0.15;
                loadingBar.position.z = 1.2;
                loadingGroup.add( loadingBar );
                renderer.render(scene, camera);
                const loader = new THREE.FontLoader(textManager);
                loader.load( "../lib/font/CyberspaceRacewayBack.json", function ( font ) {
                	textGeometry = new THREE.TextGeometry( "LOADING...", {
                		font: font,
                		size: 0.4,
                		height: 0.15,
                		curveSegments: 12
                	} );
                    battleManager.setFont(font);
                } );
                textManager.onLoad = function ( ) {
                    const loadingText = new THREE.Mesh(textGeometry, matMetal);
                    loadingText.position.x = -2;
                    loadingText.position.y = 0.3;
                    loadingText.position.z = 1;
                    const loadingBlock1 = new THREE.Mesh(geomSegBar, matMetal);
                    loadingBlock1.position.x = -2;
                    loadingBlock1.position.z = 1.2;
                    loadingGroup.add( loadingText );
                    loadingGroup.add( loadingBlock1 );
                    renderer.render(scene, camera);
                };
            break;
            case 1:
                const loadingBlock2 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock2.position.x = -1;
                loadingBlock2.position.z = 1.2;
                loadingGroup.add( loadingBlock2 );
            break;
            case 2:
                const loadingBlock3 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock3.position.x = 0;
                loadingBlock3.position.z = 1.2;
                loadingGroup.add( loadingBlock3 );
            break;
            case 3:
                const loadingBlock4 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock4.position.x = 1;
                loadingBlock4.position.z = 1.2;
                loadingGroup.add( loadingBlock4 );
            break;
            case 4:
                const loadingBlock5 = new THREE.Mesh(geomSegBar, matMetal);
                loadingBlock5.position.x = 2;
                loadingBlock5.position.z = 1.2;
                loadingGroup.add( loadingBlock5 );
                loadingGroup.visible = false;
            break;
            default:
                console.log("Loading Switch Case hit an exception!");
        }
        renderer.render(scene, camera);
    }

    function loadingScene() {
        const normalMapMars = textureLoader.load("../medias/maps/mars/Blended_NRM.png");
        //due to GitHub limitation of 25Mo per file, had to downsize the normal map. Original map was 8192x4096px.
        //const normalMapMars = textureLoader.load("maps/mars/Blended_NRM.png");
        normalMapMars.anisotropy = sufficientAnisotropy;
        const colorMapSkybox = textureLoader.load("../medias/maps/milkyway.jpg");
        colorMapSkybox.anisotropy = sufficientAnisotropy;
        const displacementMapMars = textureLoader.load("../medias/maps/mars/Blended_DISP.jpg");
        displacementMapMars.anisotropy = sufficientAnisotropy;
        const colorMapMars = textureLoader.load("../medias/maps/mars/mars.jpg");
        colorMapMars.anisotropy = sufficientAnisotropy;

        matMars = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x000000,
            shininess: 0,
            map: colorMapMars,
            normalMap: normalMapMars,
            displacementMap: displacementMapMars
        });

        const matSkybox = new THREE.MeshBasicMaterial({
            map: colorMapSkybox,
            side: THREE.BackSide
        });

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

    //Event called on window resizing
        window.addEventListener( "resize", onWindowResize, false );

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            loadingScreen( itemsLoaded, battleManager );
        };

        manager.onLoad = function ( ) {
           console.log("Ressources loading complete!");
           battleManager.init();
           levelPopUpLocalTimer = battleManager.levelPopUpTimer;
           animate();
        };
    }

    function animate() {
        //free orbital controls:
        //orbitalControls.update();

        //if the game is fully loaded
        if (battleManager.initiated){
            //if the game just launched and we need to animate the press space prompt

            //update regular controls:
            //if a key is pressed...
            window.onkeydown = function(keyPressed){
                switch (keyPressed.keyCode){
                    case 32: //SPACE
                        //player ship fire a missile
                        if (battleManager.startScreen){
                            battleManager.beginGame();
                        } else if (!battleManager.playerMissileIsLive){
                            battleManager.playerFireMissile();
                        }
                        break;

                    case 37: //LEFT
                        keyLeft = true;
                        break;

                    case 39: //RIGHT
                        keyRight = true;
                        break;

                    case 73: //I
                        //Invincible Mode
                        if (!battleManager.gameOverScreen && ! battleManager.startScreen){
                            battleManager.toggleInvincible();
                        }
                        break;

                    case 75: //K
                        //Kill them ALL
                        if (!battleManager.gameOverScreen && ! battleManager.startScreen){
                            battleManager.killAllEnemies();
                        }
                        break;

                    case 76: //L
                        //Instant Game Over (for Test purposes)
                        if (!battleManager.gameOverScreen)
                        battleManager.gameOver();
                        break;

                    case 80: //F
                        //take a screenshot and open a new tab
                        //solution working on both Chrome and firefox, thank to user Joyston: https://stackoverflow.com/a/45789588
                        const dataUrl = renderer.domElement.toDataURL("image/jpeg");
                        const iframe = "<iframe width='100%' height='100%' src='" + dataUrl + "'></iframe>";
                        const x = window.open();
                        x.document.write(iframe);
                        x.document.close();
                        break;

                    case 82: //R
                        if (battleManager.gameOverScreen){
                            battleManager.restart();
                        }
                        break;
                    default:
                }
            };

            //if a key is released...
            window.onkeyup = function(keyReleased){
                switch (keyReleased.keyCode){
                    case 37: //LEFT
                        keyLeft = false;
                        break;
                    case 39: //RIGHT
                       keyRight = false;
                       break;
                    default:
                }
            };

            if (!battleManager.startScreen){
                //ship control
                if ((keyLeft === true) && (battleManager.playerShip.shipMesh.position.x > -1)){
                    battleManager.playerShip.moveLeft();
                }else if ((keyRight === true) && (battleManager.playerShip.shipMesh.position.x < 1)){
                    battleManager.playerShip.moveRight();
                }
                if (battleManager.levelPopUp){
                    if (levelPopUpLocalTimer <= 0){
                        levelPopUpLocalTimer = battleManager.levelPopUpTimer;
                        battleManager.startNextLevel();
                    } else {
                        levelPopUpLocalTimer--;
                    }
                }
                battleManager.updateBattle();
            } else if (battleManager.hudManager.startScreenIsLive) {
                battleManager.hudManager.animateStartScreen();
            }
        }

        if (marsRotate) {
            marsRotation += 0.0005;
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
        const gui = new dat.GUI( { width: 350 } );
        const effectController = {
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
            marsRotate = !marsRotate;
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
                mars.position.z = 2.4;
                mars.rotation.y = marsRotation;
                mars.material.depthWrite = false;
                mars.renderOrder = -900;
                scene.add(mars);
            }
        }
        gui.add( effectController, "VertexMultiplier", 0, 8, 1 ).onChange( createMars ).name("Polygon Count Multiplier").listen();
        gui.add( effectController, "Reset" ).name("RESET");
        gui.add( effectController, "RotationMars" ).name("Rotation ON/OFF");
        function changeAnisotropy() {
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
