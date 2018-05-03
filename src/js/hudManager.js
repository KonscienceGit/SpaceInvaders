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
    scene.add(this.livesTextMesh);

    //the SCORE: Value
    this.scoreValue = 0;
    this.drawScore = function () {
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
        if (!(shipGeom == undefined)){
            this.shipGeom = shipGeom;
        } else {
            shipGeom = this.shipGeom;
        }
        switch (this.livesValue) {
            case 0:{
                //Game is over !
                scene.remove(this.livesCounterMesh1);
                scene.remove(this.livesCounterMesh2);
                scene.remove(this.livesCounterMesh3);
            } break;
            case 1:
                scene.remove(this.livesCounterMesh2);
                scene.remove(this.livesCounterMesh3);
            break;
            case 2:
                scene.remove(this.livesCounterMesh3);
            break;
            case 3:
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
                scene.add(this.livesCounterMesh1);
                scene.add(this.livesCounterMesh2);
                scene.add(this.livesCounterMesh3);
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

    this.increaseScore = function (value) {
        this.scoreValue += value;
        this.drawScore();
    }

    this.decreaseLives = function () {
        this.livesValue--;
        this.drawLives();
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

    this.gameOverScreen = function (){
        scene.remove(this.livesCounterMesh1);
        scene.remove(this.livesCounterMesh2);
        scene.remove(this.livesCounterMesh3);
        scene.remove(this.livesCounterMesh);
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
        console.log(scoreOffset);
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
