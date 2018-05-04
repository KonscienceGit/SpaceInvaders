//Hud Manager is responsible for the display of score and lives
var HudManager = function (scene,cyberFont) {
    this.matMetal = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
    this.matNormal = new THREE.MeshNormalMaterial();

    //the bare hud (The "SCORE:" and "LIVES:" words)
    this.scoreTextGeom = new THREE.TextGeometry( "SCORE:", {
        font: cyberFont,
        size: 0.06,
        height: 0.02,
        curveSegments: 0
    } );
    this.scoreTextMesh = new THREE.Mesh(this.scoreTextGeom, this.matMetal);
    this.scoreTextMesh.position.x = -1.07;
    this.scoreTextMesh.position.y = 0.7;
    this.scoreTextMesh.position.z = 3.1;
    this.scoreTextMesh.visible = false;
    scene.add(this.scoreTextMesh);
    this.livesTextGeom = new THREE.TextGeometry( "LIVES:", {
        font: cyberFont,
        size: 0.06,
        height: 0.02,
        curveSegments: 0
    } );
    this.livesTextMesh = new THREE.Mesh(this.livesTextGeom, this.matMetal);
    this.livesTextMesh.position.x = 0.22;
    this.livesTextMesh.position.y = 0.7;
    this.livesTextMesh.position.z = 3.1;
    this.livesTextMesh.visible = false;
    scene.add(this.livesTextMesh);

    //the SCORE: Value
    this.scoreValue = 0;
    this.scoreValueGeom = new THREE.TextGeometry( this.scoreValue, {
        font: cyberFont,
        size: 0.06,
        height: 0.02,
        curveSegments: 0
    } );
    this.scoreValueMesh = new THREE.Mesh(this.scoreValueGeom, this.matMetal);
    this.scoreValueMesh.position.x = -0.6;
    this.scoreValueMesh.position.y = 0.7;
    this.scoreValueMesh.position.z = 3.1;
    this.scoreValueMesh.visible = false;
    scene.add(this.scoreValueMesh);
    this.increaseScore = function (value) {
        this.scoreValue += value;
        scene.remove(this.scoreValueMesh);
        this.scoreValueGeom = new THREE.TextGeometry( this.scoreValue, {
            font: cyberFont,
            size: 0.06,
            height: 0.02,
            curveSegments: 0
        } );
        this.scoreValueMesh = new THREE.Mesh(this.scoreValueGeom, this.matMetal);
        this.scoreValueMesh.position.x = -0.6;
        this.scoreValueMesh.position.y = 0.7;
        this.scoreValueMesh.position.z = 3.1;
        scene.add(this.scoreValueMesh);
    }

    //the LIVES: Value
    this.livesCounterMesh1;
    this.livesCounterMesh2;
    this.livesCounterMesh3;
    this.livesValue = 3;
    this.drawLives = function(shipGeom){
        this.shipGeom = shipGeom;
        this.livesCounterMesh1 = new THREE.Mesh(shipGeom, this.matNormal);
        this.livesCounterMesh2 = new THREE.Mesh(shipGeom, this.matNormal);
        this.livesCounterMesh3 = new THREE.Mesh(shipGeom, this.matNormal);
        this.livesCounterMesh1.position.x = 0.75;
        this.livesCounterMesh1.position.y = 0.8;
        this.livesCounterMesh1.position.z = 3;
        this.livesCounterMesh2.position.x = 0.9;
        this.livesCounterMesh2.position.y = 0.8;
        this.livesCounterMesh2.position.z = 3;
        this.livesCounterMesh3.position.x = 1.05;
        this.livesCounterMesh3.position.y = 0.8;
        this.livesCounterMesh3.position.z = 3;
        this.livesCounterMesh1.visible = false;
        this.livesCounterMesh2.visible = false;
        this.livesCounterMesh3.visible = false;
        scene.add(this.livesCounterMesh1);
        scene.add(this.livesCounterMesh2);
        scene.add(this.livesCounterMesh3);
    }
    this.updateLives = function(){
        switch (this.livesValue) {
            case 0:
                //Game is over !
                scene.remove(this.livesCounterMesh1);
                scene.remove(this.livesCounterMesh2);
                scene.remove(this.livesCounterMesh3);
            break;
            case 1:
                this.livesCounterMesh2.visible = false;
                this.livesCounterMesh3.visible = false;
            break;
            case 2:
                this.livesCounterMesh3.visible = false;
            break;
            case 3:

            break;
            default:
                scene.remove(this.livesCounterMesh1);
                scene.remove(this.livesCounterMesh2);
                scene.remove(this.livesCounterMesh3);
        }
    }

    this.liveRotation = 0;
    this.rotateLives = function (){
        this.liveRotation += 0.02
        this.livesCounterMesh1.rotation.y = this.livesCounterMesh2.rotation.y
                                        = this.livesCounterMesh3.rotation.y
                                        = this.liveRotation;
    }

    this.decreaseLives = function () {
        this.livesValue--;
        this.updateLives();
        if (this.livesValue == 0){
            return true;
        } else {
            return false;
        }
    }

    this.removeHud = function (){
        scene.remove(this.scoreTextMesh);
        scene.remove(this.scoreValueMesh);
        scene.remove(this.gameOverTextMesh);
        scene.remove(this.pressRTextMesh);
    }

    this.startScreenIsLive = false;
    this.startScreen = function (){
        //MARS INVADERS text
        this.marsInvadersTextGeom = new THREE.TextGeometry( "MARS INVADERS", {
            font: cyberFont,
            size: 0.06,
            height: 0.02,
            curveSegments: 0
        } );
        this.marsInvadersTextMesh = new THREE.Mesh(this.marsInvadersTextGeom, this.matMetal);
        this.marsInvadersTextMesh.position.x = -0.48;
        this.marsInvadersTextMesh.position.y = 0.1;
        this.marsInvadersTextMesh.position.z = 3.6;
        scene.add(this.marsInvadersTextMesh);
        //PRESS SPACE text
        this.pressSpaceTextGeom = new THREE.TextGeometry( "-PRESS SPACE-", {
            font: cyberFont,
            size: 0.04,
            height: 0.02,
            curveSegments: 0
        } );
        this.pressSpaceTextMesh = new THREE.Mesh(this.pressSpaceTextGeom, this.matMetal);
        this.pressSpaceTextMesh.position.x = -0.325;
        this.pressSpaceTextMesh.position.y = -0.15;
        this.pressSpaceTextMesh.position.z = 3.6;
        scene.add(this.pressSpaceTextMesh);
        this.startScreenIsLive = true;
    }

    this.blinkingTimer = 30;
    this.animateStartScreen = function(){
        if (this.blinkingTimer <= 0){
            this.blinkingTimer = 60;
            if (this.pressSpaceTextMesh.visible){
                this.pressSpaceTextMesh.visible = false;
            } else {
                this.pressSpaceTextMesh.visible = true;
            }
        } else {
            this.blinkingTimer--;
        }
    }

    this.displayLevelUp = function (level){
        //Level X text
        var stringConcat = "level "+level;
        this.levelUpTextGeom = new THREE.TextGeometry( stringConcat, {
            font: cyberFont,
            size: 0.06,
            height: 0.02,
            curveSegments: 0
        } );
        this.levelUpTextMesh = new THREE.Mesh(this.levelUpTextGeom, this.matMetal);
        this.levelUpTextMesh.position.x = -0.2;
        this.levelUpTextMesh.position.y = 0;
        this.levelUpTextMesh.position.z = 3.6;
        scene.add(this.levelUpTextMesh);
    }

    this.removeLevelUp = function (){
        scene.remove(this.levelUpTextMesh);
    }

    this.fromStartToGameTransition = function(){
        scene.remove(this.marsInvadersTextMesh);
        scene.remove(this.pressSpaceTextMesh);
        this.scoreTextMesh.visible = true;
        this.scoreValueMesh.visible = true;
        this.livesTextMesh.visible = true;
        this.livesCounterMesh1.visible = true;
        this.livesCounterMesh2.visible = true;
        this.livesCounterMesh3.visible = true;
    }

    this.fromGameToGameOverScreen = function (){
        scene.remove(this.livesCounterMesh1);
        scene.remove(this.livesCounterMesh2);
        scene.remove(this.livesCounterMesh3);
        scene.remove(this.livesTextMesh);
        //GAME OVER text
        this.gameOverTextGeom = new THREE.TextGeometry( "GAME OVER", {
            font: cyberFont,
            size: 0.06,
            height: 0.02,
            curveSegments: 0
        } );
        this.gameOverTextMesh = new THREE.Mesh(this.gameOverTextGeom, this.matMetal);
        this.gameOverTextMesh.position.x = -0.35;
        this.gameOverTextMesh.position.y = 0.18;
        this.gameOverTextMesh.position.z = 3.6;
        scene.add(this.gameOverTextMesh);
        var scoreOffset = 0;
        if (this.scoreValue > 0){
            scoreOffset = (Math.log10(this.scoreValue))/40;
        }
        //SCORE text displacement
        this.scoreTextMesh.position.x = -0.3-scoreOffset;
        this.scoreTextMesh.position.y = 0;
        this.scoreTextMesh.position.z = 3.3;
        //SCORE Value displacement
        this.scoreValueMesh.position.x = 0.15-scoreOffset;
        this.scoreValueMesh.position.y = 0;
        this.scoreValueMesh.position.z = 3.3;
        //PRESS R TO START AGAIN text
        this.pressRTextGeom = new THREE.TextGeometry( "PRESS R TO START AGAIN", {
            font: cyberFont,
            size: 0.06,
            height: 0.02,
            curveSegments: 0
        } );
        this.pressRTextMesh = new THREE.Mesh(this.pressRTextGeom, this.matMetal);
        this.pressRTextMesh.position.x = -0.75;
        this.pressRTextMesh.position.y = -0.2;
        this.pressRTextMesh.position.z = 3.4;
        scene.add(this.pressRTextMesh);
    }
}
