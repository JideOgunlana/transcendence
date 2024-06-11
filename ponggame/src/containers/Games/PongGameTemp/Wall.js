import * as THREE from 'three';

export default class Wall {
    
    constructor(scene, x, y, z, width, height, depth, color) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.body = undefined;
        this.material = new THREE.MeshStandardMaterial({color: this.color, metalness: 1, roughness: 0.5});
        this.geometry = new THREE.BoxGeometry(this.width, this.height,this.depth);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.initWall(x, y, z)
    }

    initWall(x, y, z) {
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true; 
        this.mesh.position.set(x, y, z);
        /* this.paddle.rotation.y = -0.5 * Math.PI;
        this.paddle.rotation.z = -0.5 * Math.PI; */

        this.scene.add(this.mesh);
    }

    X() { return this.mesh.position.x; }
    Y() { return this.mesh.position.y; }
    Z() { return this.mesh.position.z; }
}