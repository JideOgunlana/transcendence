import * as THREE from 'three';
//import Globals from './Globals';

export default class Paddle {
    
    constructor(scene, x, y, z, width, height, depth, color, name, ai) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.isAI = ai
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name
        this.body = undefined;
        this.material = new THREE.MeshStandardMaterial({color: this.color, metalness: 1, roughness: 0.5});
        this.geometry = new THREE.BoxGeometry(this.width, this.height,this.depth);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.speed = 0.1;
        this.AIPredictionPoint = undefined
        this.direction = new THREE.Vector3(0,0,0)
        this.scene = scene
        this.initPaddle(x, y, z)
    }

    initPaddle(x, y, z) {
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true; 
        this.mesh.position.set(x, y, z);
        /* this.paddle.rotation.y = -0.5 * Math.PI;
        this.paddle.rotation.z = -0.5 * Math.PI; */

        this.scene.add(this.mesh);
    }
    moveAlongVector(zDirection, speed)
    {
        if ((this.mesh.position.z >= 10 - this.depth / 2 && zDirection > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && zDirection < 0))
            zDirection = 0
        this.mesh.position.z += zDirection * speed;
    }

    SetPredictionPoint(point) {
        this.AIPredictionPoint = point
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

    updateAI()
    {
        if (this.AIPredictionPoint != undefined) {
            this.setAIMovingDirection()
            if ((this.mesh.position.z >= 10 - this.depth / 2 && this.direction.z > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && this.direction.z < 0))
                this.direction.z = 0
            this.mesh.position.z += this.direction.z * this.speed;
        }
    }
    update()
    {
        if ((this.mesh.position.z >= 10 - this.depth / 2 && this.direction.z > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && this.direction.z < 0))
            this.direction.z = 0
        this.mesh.position.z += this.direction.z * this.speed;
    }

    X() { return this.mesh.position.x; }
    Y() { return this.mesh.position.y; }
    Z() { return this.mesh.position.z; }
    Name() { return this.name; }
}