import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import GameManager from './GameManager';
import { Constants } from './Constants';
import Events from './Events';

export default class Ball {
    
    constructor(radius, widthSeg, heightSeg, color, pos, speed, direction, paddleLeft, paddleRight) {
        this.radius = radius;
        this.widthSeg = widthSeg;
        this.heightSeg = heightSeg;
        this.color = color;
        this.speed = speed;
        //Constants.gameField = Constants.gameField;
        this.direction = new THREE.Vector3(direction.x * speed, direction.y * speed, direction.z * speed);//Constants.ballStartDirection.multiplyScalar(speed);
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
        Constants.scene.add(this.mesh);
        console.log("in here");
        //this.world.addBody(this.physicBody);
    }

    SetPosition(pos)
    {
        this.mesh.position.set(pos.x, pos.y, pos.z);
        console.log("whowhowwohwohwohw")
    }

    SetDirection(dir)
    {
        this.direction = new THREE.Vector3(dir.x * this.speed, dir.y * this.speed, dir.z * this.speed);
    }

    CollisionXLeft()
    {
        if (this.mesh.position.x + this.radius >= Constants.gameField.x / 2)
            return true
        return false
    }

    CollisionXRight()
    {
        if (this.mesh.position.x - this.radius <= -Constants.gameField.x / 2)
            return true
        return false
    }

    /* CollisionX()
    {
        if (this.mesh.position.x + this.radius >= Constants.gameField.x / 2 || this.mesh.position.x - this.radius <= -Constants.gameField.x / 2)
            return true
    } */

    CollisionZ()
    {
        if (this.mesh.position.z + this.radius >= Constants.gameField.z / 2 || this.mesh.position.z - this.radius <= -Constants.gameField.z / 2) {
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
        //!(this.hitMask & 2) && 
        if (!(this.hitMask & 2) && this.mesh.position.x - this.radius <= this.paddleRight.X() + this.paddleRight.width / 2) {
            if (this.direction.z > 0 && (this.mesh.position.z + this.radius) >= (this.paddleRight.Z() - this.paddleRight.depth / 2) && (this.mesh.position.z + this.radius) < (this.paddleRight.Z() + this.paddleRight.depth / 2) )
                return true
            if (this.direction.z < 0 && (this.mesh.position.z - this.radius) <= (this.paddleRight.Z() + this.paddleRight.depth / 2) && (this.mesh.position.z - this.radius) > (this.paddleRight.Z() - this.paddleRight.depth / 2))
                return true
            console.log("in here but not in the other functions")
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
        else if (this.CollisionXLeft()) {
            dispatchEvent(Events["hitLeftWall"])
            this.direction.x *= -1;
        }
        else if (this.CollisionXRight()) {
            dispatchEvent(Events["hitRightWall"])
            this.direction.x *= -1;
        }
        else if (this.CollisionZ())
            this.direction.z *= -1;
    }

    translate()
    {
        this.mesh.position.add(this.direction);

    }
    IsMovingUp() { return this.direction.z > 0}
    IsMovingDown() { return this.direction.z < 0 }
    IsMovingLeft() { return this.direction.x > 0 }
    IsMovingRight() { return this.direction.x < 0}
    X() { return this.mesh.position.x; }
    Y() { return this.mesh.position.y; }
    Z() { return this.mesh.position.z; }
    async update() {
        this.Collision()
        this.translate()
    }
}