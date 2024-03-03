import * as THREE from 'three';
import GameManager from './GameManager';
export default class Paddle {
    
    constructor(x, y, z, width, height, depth, color, name) {
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
        this.initPaddle(x, y, z)
        this.speed = 0;
    }

    initPaddle(x, y, z) {
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true; 
        this.mesh.position.set(x, y, z);
        /* this.paddle.rotation.y = -0.5 * Math.PI;
        this.paddle.rotation.z = -0.5 * Math.PI; */

        GameManager.scene.add(this.mesh);
    }

    moveUp() {
        this.speed = 0.3
        //this.z += this.speed;
        
    
    }
    moveDown() {
        this.speed = -0.3

        //this.z += this.speed;
       // this.mesh.position.z += this.speed;//(this.x, this.y, this.z);
    }

    resetSpeed() {
        this.speed = 0
    }

    update()
    {
        if ((this.mesh.position.z >= 10 - this.depth / 2 && this.speed > 0) || (this.mesh.position.z <= -10 + this.depth / 2 && this.speed < 0))
            this.speed = 0
        this.mesh.position.z += this.speed;
    }

    X() { return this.mesh.position.x; }
    Y() { return this.mesh.position.y; }
    Z() { return this.mesh.position.z; }
    Name() { return this.name; }
}