//The Battle Manager manage the whole battle, and is also in charge of loading:
//the player, missiles, enemies, their, destruction, movements, updates and collision

const BattleManager = function (scene) {
    //wether all entities are loaded or not
    this.initiated = false;

    //wether we are on the Game Over screen or not
    this.gameOverScreen = false;
    this.startScreen = true;

    //the Hud Manager
    this.hudManager;
    //the font used to write everything
    this.cyberFont;
    this.setFont = function(font){
        this.cyberFont = font;
    };

    this.objLoader = new THREE.OBJLoader();

    this.loadObj = function (){
        const _this = this;
        this.objLoader.load( "../medias/models/ships.obj", function(object){
            _this.playerShip = new PlayerShip(scene, _this.hudManager, object.children[1].geometry);
            _this.spawnEnemies(object.children[0].geometry);
            _this.hudManager.drawLives(object.children[1].geometry);
            _this.initiated = true;
        });
    };

    //the player Ship
    this.playerShip;

    //the player Missile
    this.playerMissileIsLive = false;
    this.playerMissile = undefined;
    this.geomMissile = new THREE.BoxGeometry(0.01, 0.04, 0.01);
    this.matRed = new THREE.MeshBasicMaterial({color: 0xff0000});

    //wether the next level pop up is here or not
    this.levelPopUp = false;
    this.levelPopUpTimer = 120;
    this.currentLevel = 1;

    this.nextLevel = function (){
        this.levelPopUp = true;
        this.hudManager.displayLevelUp(this.currentLevel);
        this.currentLevel++;
        this.removeAllEnemies();
        this.difficultySpeed += 0.001;
    };

    this.startNextLevel = function (){
        this.levelPopUp = false;
        //this.spawnEnemies(this.currentLevel) /*crash the game!*/
        this.hudManager.removeLevelUp();
        this.resetEnemiesPosition();
        this.setEnemiesVisible();
        this.enemiesAlive = this.enemyNumber;
    };

    this.playerFireMissile = function () {
        this.playerMissile = new PlayerMissile(this.geomMissile, this.matRed,
                                        this.playerShip.shipMesh.position.x,
                                        this.playerShip.shipMesh.position.y);
        scene.add(this.playerMissile.missile);
        this.playerMissileIsLive = true;
    };
    this.checkPlayerMissileCollision = function () {
        //for each enemy
        for (let i = 0; i < this.enemyNumber ; i++) {
            //first we check if both the enemy and missile still exist
            if (this.playerMissileIsLive && this.enemyArray[i].enemy.visible) {
                //then we calculate the difference on the Y axis between the missile and the enemy
                const diffY = this.enemyArray[i].enemy.position.y - this.playerMissile.missile.position.y;
                //and then we check if this is withing collision range (Y axis)
                if ( diffY < 0.05 && diffY > -0.05) {
                    //then this time, we calculate the difference on the X axis between the missile and the enemy
                    const diffX = this.enemyArray[i].enemy.position.x - this.playerMissile.missile.position.x;
                    //and then we check if this is withing collision range (X axis), thus a real collision
                    if ( diffX < 0.05 && diffX > -0.05) {
                        this.enemyArray[i].enemy.visible = false;
                        this.enemiesAlive--;
                        scene.remove(this.playerMissile.missile);
                        this.playerMissileIsLive = false;
                        this.hudManager.increaseScore(100);
                        this.difficultySpeed += 0.00003;
                        if (this.enemiesAlive <= 0){
                            this.nextLevel();
                        }
                    }
                }
            }
        }
    };

    this.checkEnemyMissileCollision = function () {
        //first we check if both the game is live and the missile still exist
        if (this.enemyMissileIsLive && !this.gameOverScreen) {
            //then we calculate the difference on the Y axis between the missile and the enemy
            let diffY = this.playerShip.shipMesh.position.y - this.enemyMissile.missile.position.y;
            if (diffY < 0){
                diffY = -diffY;
            }
            //and then we check if this is withing collision range (Y axis)
            if ( diffY < 0.05) {
                //then this time, we calculate the difference on the X axis between the missile and the enemy
                let diffX = this.playerShip.shipMesh.position.x - this.enemyMissile.missile.position.x;
                if (diffX < 0){
                    diffX = -diffX;
                }
                //and then we check if this is withing collision range (X axis), thus a real collision
                if ( diffX < 0.05-diffY) {
                    scene.remove(this.enemyMissile.missile);
                    this.enemyMissileIsLive = false;
                    if (this.invinciblePlayer){
                        //bouncing off sound?
                    } else {
                        this.hudManager.decreaseLives();
                        if (this.hudManager.livesValue <= 0){
                            this.gameOver();
                        }
                    }
                }
            }
        }
    };

    //enemies
    this.geomEnemy;
    this.matDarkGreen = new THREE.MeshStandardMaterial({color: 0x005500});
    this.framesBetweenEachEnemyFire;
    this.framesBeforeEnemyFire;
    this.lowestEnemyYPos;
    this.distanceTraveledByEnemies;
    this.enemyNumber;
    this.enemiesAlive = 0;
    this.enemyArray;
    //enemies functions
    this.spawnEnemies = function(geomEnemy, level){
        this.geomEnemy = geomEnemy;
        this.framesBetweenEachEnemyFire = 80;
        this.framesBeforeEnemyFire = this.framesBetweenEachEnemyFire;
        this.enemyNumber = 50;
        this.enemiesAlive = this.enemyNumber;
        this.enemyArray = new Array(this.enemyNumber);
        this.enemyWay = 1;
        this.changingWay = false;
        this.difficultySpeed = 0.002;
        this.distanceTraveledByEnemies = 0;
        for (let i = 0; i < this.enemyNumber; i++){
            const dynPosX = (i%10 - 5)*0.16;
            const dynPosY = 0.7 - (0.14*(i-i%10)/10);
            this.enemyArray[i] = new Enemy(this.geomEnemy, this.matDarkGreen, dynPosX , dynPosY);
            this.enemyArray[i].enemy.visible = false;
            scene.add(this.enemyArray[i].enemy);
            if (i === (this.enemyNumber - 1)) {
                this.lowestEnemyYPos = dynPosY;
            }
        }
    };
    this.matGreen = new THREE.MeshBasicMaterial({color: 0x00ff00});
    this.enemyMissile;
    this.enemyMissileIsLive = false;
    this.targetAcquired = false;
    this.enemiesFireMissile = function (numberEnemy) {
        this.enemyMissile = new EnemyMissile(this.geomMissile, this.matGreen,
                                        this.enemyArray[numberEnemy].enemy.position.x,
                                        this.enemyArray[numberEnemy].enemy.position.y - 0.05);
        scene.add(this.enemyMissile.missile);
        this.enemyMissileIsLive = true;
        this.targetAcquired = false;
        this.framesBeforeEnemyFire = this.framesBetweenEachEnemyFire;
    };

    this.moveEnemies = function () {
        //checking if enemies can fire
        let numberClosest;
        let diffXClosest;
        if (!this.enemyMissileIsLive && !this.gameOverScreen && !this.levelPopUp){
            if (this.framesBeforeEnemyFire > 0){
                this.framesBeforeEnemyFire--;
            } else {
                this.targetAcquired = true;
                diffXClosest = 99;
                numberClosest = 0;
            }
        }
        //Moving enemies: for each enemy created
        for (let i = this.enemyNumber-1; i >= 0; i--) {
            //store the way they should move, +1 or -1
            const theWay = this.enemyWay;
            //if the enemy hasn't been destroyed
            if (this.enemyArray[i].enemy.visible) {
                //checking which enemy is the closest to the plyaer, on the X axis
                const posXEnemy = this.enemyArray[i].enemy.position.x;
                let actualDiffX = posXEnemy - this.playerShip.shipMesh.position.x;
                if (actualDiffX < 0) {
                    actualDiffX = - actualDiffX;
                }
                if (actualDiffX < diffXClosest){
                    diffXClosest = actualDiffX;
                    numberClosest = i;
                }
                //if no other enemy has already hit one side of the game zone
                if (!this.changingWay){
                    //if enemies should go toward x, did they hit the limit?
                    if (theWay > 0 && posXEnemy > 1) {
                        this.changingWay = true;
                    //then if enemies should go toward -x, did they hit the limit?
                    } else if (theWay < 0 && posXEnemy < -1) {
                        this.changingWay = true;
                    }
                }
            }
            //move enemies
            this.enemyArray[i].enemy.position.x += (theWay * this.difficultySpeed);
        }
        //if enemies should fire a missile, select enemy i
        if (this.targetAcquired){
            this.enemiesFireMissile(numberClosest);
        }
    };

    this.resetEnemiesPosition = function () {
        for (let i = 0; i < this.enemyNumber; i++) {
            //if the enemy hasn't been destroyed
            this.enemyArray[i].enemy.position.y += this.distanceTraveledByEnemies;
        }
        this.distanceTraveledByEnemies = 0;
    };

    this.killAllEnemies = function(){
        this.nextLevel();
    };

    this.removeAllEnemies = function (){
        for (let i = 0; i < this.enemyNumber; i++) {
            this.enemyArray[i].enemy.visible = false;
        }
    };

    this.updatePlayerMissile = function () {
        //if the missile is still on the game zone then move the missile and
        if (this.playerMissile.moveAndCheck()){
            //if the missile CAN reach the lowest enemy
            if (this.playerMissile.missile.position.y >= this.lowestEnemyYPos){
                //check for enemy collision
                this.checkPlayerMissileCollision(scene);
            }
        } else {
            //destroy the missile to allow player to shoot the next one
            scene.remove(this.playerMissile.missile);
            this.playerMissileIsLive = false;
        }
    };

    this.updateEnemyMissile = function () {
        //if the missile is still on the game zone then move the missile and
        if (this.enemyMissile.moveAndCheck(this.difficultySpeed)){
            //if the missile CAN reach the player
            if (this.enemyMissile.missile.position.y <= -0.65){
                //check for player collision
                this.checkEnemyMissileCollision(scene);
            }
        } else {
            //destroy the missile to allow enemies to shoot the next one
            scene.remove(this.enemyMissile.missile);
            this.enemyMissileIsLive = false;
        }
    };

    this.lowerEnemies = function () {
        this.enemyWay = -this.enemyWay;
        this.changingWay = false;
        this.distanceTraveledByEnemies += 0.03;
        for (let i = 0; i < this.enemyNumber; i++) {
            this.enemyArray[i].enemy.position.y -= 0.03;
            if (this.lowestEnemyYPos > this.enemyArray[i].enemy.position.y){
                this.lowestEnemyYPos = this.enemyArray[i].enemy.position.y;
                if (!this.gameOverScreen && (this.lowestEnemyYPos <= -0.55)){
                    //player loose a life, enemies go back to high position
                    this.resetEnemiesPosition();
                    this.gameOver();
                }
            }
        }
    };

    this.setEnemiesVisible = function (){
        for (let i = 0; i < this.enemyNumber; i++) {
            this.enemyArray[i].enemy.visible = true;
        }
    };

    //update enemies, missiles, and then check for collision if needed
    this.updateBattle = function () {
        //if the game is still going on
        if (!this.gameOverScreen){
            //animate the lives
            this.hudManager.rotateLives();
            //if the missile is still alive
            if (this.playerMissileIsLive){
                this.updatePlayerMissile();
            }
            if (this.enemyMissileIsLive){
                this.updateEnemyMissile();
            }
        }
        this.moveEnemies();
        //if one enemies hit the limit, change the way for the next turn
        //and make them a little closer to you...
        if (this.changingWay){
            this.lowerEnemies();
        }
    };

    this.invinciblePlayer = false;
    this.toggleInvincible = function (){
        if (this.invinciblePlayer){
            this.invinciblePlayer = false;
            this.playerShip.shipMesh.material = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
        } else {
            this.invinciblePlayer = true;
            this.playerShip.shipMesh.material = new THREE.MeshStandardMaterial({color: 0xaaaa00});
        }
    };

    this.gameOver = function(){
        this.playerShip.removePlayerShip();
        this.hudManager.fromGameToGameOverScreen();
        if (this.playerMissileIsLive){
            scene.remove(this.playerMissile.missile);
        }
        if (this.enemyMissileIsLive){
            scene.remove(this.enemyMissile.missile);
        }
        this.gameOverScreen = true;
    };

    this.restart = function (){
        this.removeAllEnemies();
        this.hudManager.removeHud();
        this.currentLevel = 1;
        this.init();
    };

    this.init = function (){
        this.gameOverScreen = false;
        this.startScreen = true;
        this.initiated = false;
        this.hudManager = new HudManager(scene,this.cyberFont);
        this.hudManager.startScreen();
        this.loadObj();
    };

    this.beginGame = function(){
        this.startScreen = false;
        this.levelPopUp = true;
        this.hudManager.displayLevelUp(this.currentLevel);
        this.currentLevel++;
        this.hudManager.fromStartToGameTransition();
        this.playerShip.setPlayerVisible();
    };

};
