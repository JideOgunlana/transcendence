import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import GameManager from './GameManager';

export default class Ball {
    
    constructor(radius, widthSeg, heightSeg, color, pos, speed, direction, paddleLeft, paddleRight) {
        this.radius = radius;
        this.widthSeg = widthSeg;
        this.heightSeg = heightSeg;
        this.color = color;
        this.speed = speed;
        //GameManager.gameField = GameManager.gameField;
        this.direction = direction.multiplyScalar(speed);
        this.material = new THREE.MeshStandardMaterial({color: this.color, wireframe: false, metalness: 1, roughness: 0, envMapIntensity: 1 }); //color 0xffffff
        this.physicMaterial = new CANNON.Material();
        this.geometry = new THREE.SphereGeometry(this.radius, this.widthSeg, this.heightSeg);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.physicBody = new CANNON.Body({
                                            mass: 1,
                                            shape: new CANNON.Sphere(this.radius),
                                            position: new CANNON.Vec3(pos.x, pos.y, pos.z),
                                            material: this.physicMaterial
                                        });
        this.paddleLeft = paddleLeft;
        this.paddleRight = paddleRight;
        this.hitMask = 0b00;
        this.initBall(pos)
    }

    initBall(pos) {
        this.mesh.position.set(pos.x, pos.y, pos.z); //x=-2, y=5, z=0
        this.mesh.castShadow = true;
        GameManager.scene.add(this.mesh);
        //this.world.addBody(this.physicBody);
    }

    CollisionXLeft()
    {
        if (this.mesh.position.x + this.radius >= GameManager.gameField.x / 2)
            return true
        return false
    }

    CollisionXRight()
    {
        if (this.mesh.position.x - this.radius <= -GameManager.gameField.x / 2)
            return true
        return false
    }

    CollisionX()
    {
        if (this.mesh.position.x + this.radius >= GameManager.gameField.x / 2 || this.mesh.position.x - this.radius <= -GameManager.gameField.x / 2)
            return true
    }

    CollisionZ()
    {
        if (this.mesh.position.z + this.radius >= GameManager.gameField.z / 2 || this.mesh.position.z - this.radius <= -GameManager.gameField.z / 2) {
            return true;
        }
    }

    CollisionPaddleLeft()
    {
        if (!(this.hitMask & 1) && this.mesh.position.x + this.radius >= this.paddleLeft.X() - this.paddleLeft.width / 2) {
            if (this.direction.z > 0 && this.mesh.position.z + this.radius >= this.paddleLeft.Z() - this.paddleLeft.depth / 2 && this.mesh.position.z + this.radius < this.paddleLeft.Z() + this.paddleLeft.depth / 2 ) {
                return true
            }
            if (this.direction.z < 0 && this.mesh.position.z - this.radius <= this.paddleLeft.Z() + this.paddleLeft.depth / 2 && this.mesh.position.z - this.radius > this.paddleLeft.Z() - this.paddleLeft.depth / 2 ) {
                return true
            }
        }
        return false
    }

    CollisionPaddleRight()
    {
        if (!(this.hitMask & 2) && this.mesh.position.x - this.radius <= this.paddleRight.X() + this.paddleRight.width / 2) {
            if (this.direction.z > 0 && this.mesh.position.z + this.radius >= this.paddleRight.Z() - this.paddleRight.depth / 2 && this.mesh.position.z + this.radius < this.paddleLeft.Z() + this.paddleLeft.depth / 2 )
                return true
            if (this.direction.z < 0 && this.mesh.position.z - this.radius <= this.paddleRight.Z() + this.paddleRight.depth / 2 && this.mesh.position.z - this.radius > this.paddleLeft.Z() - this.paddleLeft.depth / 2)
                return true
        }
        return false
    }

    //paddle leftvon unten -> direct > 0
    //paddle right von oben -> direction <0
    ToggleHitMask (num) {
        setTimeout(() => {
            this.hitMask ^= num
        }, 1000);
    }
    async Collision()
    {
        if (this.CollisionPaddleLeft()) {
            this.direction.x *= -1;
            this.hitMask |= 1
            this.ToggleHitMask(1)
        } else if (this.CollisionPaddleRight()) {
            this.direction.x *= -1;
            this.hitMask |= 2
            this.ToggleHitMask(2)
        }
        else if (this.CollisionXLeft() || this.CollisionXRight())
            this.direction.x *= -1;
        else if (this.CollisionZ())
            this.direction.z *= -1;
    }

    translate()
    {
        this.mesh.position.add(this.direction);

    }
    async update() {
        this.Collision()
        this.translate()
    }
}