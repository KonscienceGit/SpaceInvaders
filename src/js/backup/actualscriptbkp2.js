"use strict";
// https://stackoverflow.com/questions/26193702/three-js-how-can-i-make-a-2d-snapshot-of-a-scene-as-a-jpg-image 

var main = function () {
    //engine variables
    var time = 0;
    var marsRotate = true;
    var marsRotation = 0;
    var maxAnisotropy;
    var sufficientAnisotropy;
    var textureLoader;

    //loading screen
    var manager;
    var textManager;
    var loadingGroup;

    //trinity of scene, camera and renderer
    var scene;
    var camera;
    var renderer;

    //camera controls
    var controls;

    //lights
    var sunlight;

    //geometry
    var geomSphere;
    var geomCube;
    var geomBar;
    var oldVM = 0;
    var textGeometry;

    //mesh objects
    var mars;
    var skybox;

    //materials
    var matMars;
    var matWhite;
    var matMetal;

    //stats overlay
    var stats;

    init();

    loadingScene();
    initGUI();

    function init() {

        //initialisation of the scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        camera.position.z = 4.5;

        renderer = new THREE.WebGLRenderer({
            antialias		: true,	// to get smoother output
            preserveDrawingBuffer	: true	// to allow screenshot
        });

        maxAnisotropy = renderer.capabilities.getMaxAnisotropy(); //Anisotrop filtering, setting to the max possible
        if (maxAnisotropy > 8) {
            //And adjusting it to a sensible value. 16x is overdoing it.
            sufficientAnisotropy = 8;
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls( camera );

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
        matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
        matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
        geomCube = new THREE.BoxGeometry(0.98, 0.2, 0.1);
        geomBar = new THREE.BoxGeometry(5, 0.05, 0.1);

        loadingScreen( 0 );
    }

    //Loading screen
    function loadingScreen( stage ) {
        //each time a texture is loaded, the load manager call this function, updating the loading screen.
        //Loading screen objects are then added to the loadingGroup.
        switch (stage) {
            case 0:{
                var loader = new THREE.FontLoader(textManager);
                loader.load( "src/font/CyberspaceRacewayBack.json", function ( font ) {
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
                    var loadingBlock1 = new THREE.Mesh(geomCube, matMetal);
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
                var loadingBlock2 = new THREE.Mesh(geomCube, matMetal);
                loadingBlock2.position.x = -1;
                loadingBlock2.position.z = 1.2;
                loadingGroup.add( loadingBlock2 );
            } break;
            case 2:{
                var loadingBlock3 = new THREE.Mesh(geomCube, matMetal);
                loadingBlock3.position.x = 0;
                loadingBlock3.position.z = 1.2;
                loadingGroup.add( loadingBlock3 );
            } break;
            case 3:{
                var loadingBlock4 = new THREE.Mesh(geomCube, matMetal);
                loadingBlock4.position.x = 1;
                loadingBlock4.position.z = 1.2;
                loadingGroup.add( loadingBlock4 );
            } break;
            case 4:{
                var loadingBlock5 = new THREE.Mesh(geomCube, matMetal);
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
        var colorMapMars = textureLoader.load("src/medias/maps/mars/mars.jpg");
        colorMapMars.anisotropy = sufficientAnisotropy;
        var normalMapMars = textureLoader.load("src/medias/maps/mars/Blended_NRM_4K.png");
        //due to GitHub limitation of 25Mo per file, had to downsize the normal map. Original map was 8192x4096px.
        //var normalMapMars = textureLoader.load("maps/mars/Blended_NRM.png");
        colorMapMars.anisotropy = sufficientAnisotropy;
        var displacementMapMars = textureLoader.load("src/medias/maps/mars/Blended_DISP.jpg");

        var colorMapSkybox = textureLoader.load("src/medias/maps/milkyway.jpg");
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

    //geometry
        var geomSkybox = new THREE.SphereGeometry (10,24,16);
        geomSphere = new THREE.SphereGeometry (1,300,200); // not local in order to be modified by dat gui
        var geomIcoSphere = new THREE.IcosahedronGeometry(1, 4);

    //mesh positioning
        skybox = new THREE.Mesh(geomSkybox, matSkybox);
        skybox.material.depthWrite = false;
        skybox.renderOrder = -999;
        scene.add(skybox);

    //light
        renderer.toneMappingExposure = 2; //increase exposure and color vibrance to simulate a higher color definition range
        sunlight = new THREE.PointLight( 0xffffff, 5, 200, 2 );
        sunlight.position.x=75;
        sunlight.position.z=50;
        scene.add( sunlight );

    //Event called on window resizing
        window.addEventListener( "resize", onWindowResize, false );

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            loadingScreen( itemsLoaded );
       };

        manager.onLoad = function ( ) {
           console.log("Finished");
           animate();
        };
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        time += 1;

        if (marsRotate) {
            marsRotation += 0.003;
            mars.rotation.y = marsRotation;
        }

        skybox.position.x = camera.position.x;
        skybox.position.y = camera.position.y;
        skybox.position.z = camera.position.z;

        renderer.render(scene, camera);

        // update stats
        stats.update();
    }

//Dat GUI initialisation
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
            if (oldVM !== effectController.VertexMultiplier) {
                oldVM = effectController.VertexMultiplier;
                scene.remove(mars);
                mars = new THREE.Mesh(new THREE.IcosahedronGeometry( 1,  effectController.VertexMultiplier ), matMars);
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
            console.log("updated!");
        }
        gui.add( effectController, "AnisotropicFiltering", 1, maxAnisotropy, 1 ).onChange( changeAnisotropy ).listen();
        //initialize all parameters
        resetOptions();
    }

    //when window is resized, event listenner call this function
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
};