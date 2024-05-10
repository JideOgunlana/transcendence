import * as THREE from 'three';
import { Constants } from './Constants';
import Globals from './Globals';

export default class Paddle {
    
    constructor(x, y, z, width, height, depth, color, name, obj) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name
        this.body = undefined;
        this.material = new THREE.MeshStandardMaterial({color: this.color, metalness: 1, roughness: 0.5});
        this.geometry = new THREE.BoxGeometry(this.width, this.height,this.depth);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.obj = obj;
        this.initPaddle(x, y, z)
        this.speed = 0.3;
        //this.AIMovingTowardsZ = undefined
        this.AIPredictionPoint = undefined
        this.direction = new THREE.Vector3(0,0,0)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.moveTowardsPoint = this.moveTowardsPoint.bind(this)
        this.setUpListeners()
    }

    setUpListeners()
    {
        window.addEventListener("startGame", (e) => {
            window.addEventListener('keydown', this.handleKeyDown ,false);
            window.addEventListener('keyup',this.handleKeyUp,false);
            window.addEventListener("AIPrediction", this.moveTowardsPoint, false)
        }, false)

        window.addEventListener("stopGame", (e) => {
            window.removeEventListener('keydown', this.handleKeyDown);
            window.removeEventListener('keyup', this.handleKeyUp);
            window.removeEventListener("AIPrediction", this.moveTowardsPoint)
        }, false)

    }

    handleKeyDown(e) {
        let key = e.key
        if (key == "ArrowUp" && Globals.AIPlayerActive == false && this.name == "right") {
            this.moveUp()
        } else if (key == "ArrowDown" && Globals.AIPlayerActive == false && this.name == "right" ) {
            this.moveDown()
        } 
        if (key == "w" && this.name == "left" ) {
            this.moveUp()
        } else if (key == "s" && this.name == "left") {
            this.moveDown()
        }
    }
    handleKeyUp(e) {
        let key = e.key
        if ((key == "ArrowUp" || key == "ArrowDown") && Globals.AIPlayerActive == false && this.name == "right") {
            this.resetDirection()
        } else if ((key == "w" || key == "s") && this.name == "left") {
            this.resetDirection()
        }
    }

    initPaddle(x, y, z) {
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true; 
        this.mesh.position.set(x, y, z);
        /* this.paddle.rotation.y = -0.5 * Math.PI;
        this.paddle.rotation.z = -0.5 * Math.PI; */

        Constants.scene.add(this.mesh);
    }
    moveAlongVector(zDirection, speed)
    {
        if ((this.mesh.position.z >= 10 - this.depth / 2 && zDirection > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && zDirection < 0))
            zDirection = 0
        this.mesh.position.z += zDirection * speed;
    }

    moveTowardsPoint(e)
    {
        if (this.name == "right" && Globals.AIPlayerActive == true) {
            console.log("in here the fuck why doesnt it work")
            //let zValue = e.detail.zValue
            this.AIPredictionPoint = e.detail.point

            //this.AIMovingTowardsZ = zValue - this.mesh.position.z
            /* if (movingZDir == 0 || (movingZDir > 0 && this.mesh.position.z >= zValue) || (movingZDir < 0 && this.mesh.position.z <= zValue)) {
                this.direction.z = 0
            } else {
                this.direction.z = movingZDir > 0 ? 1 : -1
            } */
        }
    }
    moveUp() {
        this.direction.z = 1
    }
    moveDown() {
        this.direction.z = -1
    }
    SetSpeed(speed)
    {
        this.speed = speed
    }
    resetDirection() {
        this.direction.z = 0
    }
    setAIMovingDirection()
    {
        let upperBound = this.AIPredictionPoint.z + 0.5
        let lowerBound = this.AIPredictionPoint.z - 0.5
        let movingZDir = this.AIPredictionPoint.z - this.mesh.position.z
        if (this.mesh.position.z < upperBound && this.mesh.position.z > lowerBound)
            this.direction.z = 0
        else if (movingZDir > 0)
            this.direction.z = 1
        else if (movingZDir < 0)
            this.direction.z = -1
    }
    update()
    {
        if (Globals.AIPlayerActive && this.name == "right" && this.AIPredictionPoint != undefined)
            this.setAIMovingDirection()
        if ((this.mesh.position.z >= 10 - this.depth / 2 && this.direction.z > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && this.direction.z < 0))
            this.direction.z = 0
        this.mesh.position.z += this.direction.z * this.speed;
    }

    X() { return this.mesh.position.x; }
    Y() { return this.mesh.position.y; }
    Z() { return this.mesh.position.z; }
    Name() { return this.name; }
}