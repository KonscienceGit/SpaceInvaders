var PlayerMissile = function (geomMissile, matRed,xPos,yPos) {
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

var EnemyMissile = function (geomMissile, matGreen,xPos,yPos) {
    this.missile = new THREE.Mesh(geomMissile, matGreen);
    this.missile.position.x = xPos;
    this.missile.position.y = yPos;
    this.missile.position.z = 3;

    this.moveAndCheck = function (difficultySpeed) {
        var actualX = this.missile.position.x;
        var actualY = this.missile.position.y;
        if (actualY< -0.8) {
            return false;
        } else {
            this.missile.position.y -= 5*difficultySpeed;
            return true;
        }
    }
}

var PlayerShip = function (scene,hudManager,geomShip){
    this.matShip = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
    this.geomShip = geomShip;
    this.shipMesh = new THREE.Mesh(this.geomShip, this.matShip);
    scene.add(this.shipMesh);
    this.shipMesh.position.x = 0;
    this.shipMesh.position.y = -0.7;
    this.shipMesh.position.z = 3;
    this.shipMesh.visible = false;
    this.setPlayerVisible = function(){
        this.shipMesh.visible = true;
    }
    this.moveLeft = function(){
        this.shipMesh.position.x -= 0.015;
    }
    this.moveRight = function(){
        this.shipMesh.position.x += 0.015;
    }
    this.removePlayerShip = function(){
        scene.remove(this.shipMesh);
    }
}

var Enemy = function (geomEnemy, matDarkGreen, xPos,yPos) {
    this.enemy = new THREE.Mesh(geomEnemy, matDarkGreen);
    this.enemy.position.x = xPos;
    this.enemy.position.y = yPos;
    this.enemy.position.z = 3;
    this.enemy.visible = true;
}
