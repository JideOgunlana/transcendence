import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class Ball {
    
    constructor(scene, world, radius, widthSeg, heightSeg, color, pos, speed, gameField, direction, paddleLeft, paddleRight) {
        this.scene = scene;
        this.world = world;
        this.radius = radius;
        this.widthSeg = widthSeg;
        this.heightSeg = heightSeg;
        this.color = color;
        this.speed = speed;
        this.gameField = gameField;
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
        //this.hitLeftPaddle = false
        //this.hitRightPaddle = false
        this.hitMask = 0b00;
        //this.toggleHit = (hitValue) => { hitValue != hitValue}
        this.initBall(pos)
    }

    initBall(pos) {
        this.mesh.position.set(pos.x, pos.y, pos.z); //x=-2, y=5, z=0
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
        //this.world.addBody(this.physicBody);
    }

    CollisionXLeft()
    {
        if (this.mesh.position.x + this.radius >= this.gameField.x / 2)
            return true
        return false
    }

    CollisionXRight()
    {
        if (this.mesh.position.x - this.radius <= -this.gameField.x / 2)
            return true
        return false
    }

    CollisionX()
    {
        if (this.mesh.position.x + this.radius >= this.gameField.x / 2 || this.mesh.position.x - this.radius <= -this.gameField.x / 2)
            return true
    }

    CollisionZ()
    {
        if (this.mesh.position.z + this.radius >= this.gameField.z / 2 || this.mesh.position.z - this.radius <= -this.gameField.z / 2) {
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
        //this.mesh.position.x += this.direction.x;
        //this.mesh.position.z += this.direction.z;

    }
    async update() {
        //console.log(this.mesh.position)
        this.Collision()
        this.translate()
        /* this.mesh.position.x += this.speed;
        if (this.Collision())
            this.speed *= -1 */
    }
}