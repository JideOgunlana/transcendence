import * as THREE from 'three';
import { EventDispatcher } from 'three';
import * as CANNON from 'cannon-es';
import { ReturnStates } from './Enums';

export default class Ball extends EventDispatcher {
    
    constructor(scene, radius, widthSeg, heightSeg, color, pos, speed, direction, paddleLeft, paddleRight, gameField) {
        super()
        this.radius = radius;
        this.scene = scene
        this.gameField = gameField
        this.widthSeg = widthSeg;
        this.heightSeg = heightSeg;
        this.color = color;
        this.speed = 0.15;
        this.direction = new THREE.Vector3(direction.x * this.speed, direction.y * this.speed, direction.z * this.speed);
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
        this.pos = pos
        this.initBall(pos)
    }

    initBall(pos) {
        this.mesh.position.set(pos.x, pos.y, pos.z); //x=-2, y=5, z=0
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
    }
    SetPosition(pos)
    {
        this.mesh.position.set(pos.x, pos.y, pos.z);
    }

    SetDirection(dir)
    {
        this.direction = new THREE.Vector3(dir.x * this.speed, dir.y * this.speed, dir.z * this.speed);
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

    CollisionZ()
    {
        if (this.mesh.position.z + this.radius >= this.gameField.z / 2 || this.mesh.position.z - this.radius <= -this.gameField.z / 2) {
            return true;
        }
    }

	FallsWithinEdgeRange(pointA, pointB, val)
	{
		return (val >= pointA && val <= pointB)
	}

    CollisionPaddleLeft()
    {
        if (!(this.hitMask & 1) && this.mesh.position.x + this.radius >= this.paddleLeft.X() - this.paddleLeft.width / 2) {
			let startValX = this.paddleLeft.X() - this.paddleLeft.width / 2 + 0.15
			let endValX = this.paddleLeft.X() + this.paddleLeft.width / 2
			let ballValX = this.mesh.position.x + this.radius

			let startValZ1 = this.paddleLeft.Z() - this.paddleLeft.depth / 2
			let endValZ1 = this.paddleLeft.Z() - this.paddleLeft.depth / 2 + 0.3

			let startValZ2 = this.paddleLeft.Z() + this.paddleLeft.depth / 2 - 0.3
			let endValZ2 = this.paddleLeft.Z() + this.paddleLeft.depth / 2

			if (this.direction.z > 0) {
				let ballVal = this.mesh.position.z + this.radius

				if (this.FallsWithinEdgeRange(startValZ1, endValZ1, ballVal) || this.FallsWithinEdgeRange(startValZ2, endValZ2, ballVal)){
					if (this.FallsWithinEdgeRange(startValX, endValX, ballValX)) {
						return ReturnStates.NONE
					}
				}
				if(this.mesh.position.z + this.radius >= this.paddleLeft.Z() - this.paddleLeft.depth / 2 && this.mesh.position.z + this.radius < this.paddleLeft.Z() + this.paddleLeft.depth / 2 ) {
					return ReturnStates.TRUE
				}
			}
			if (this.direction.z < 0) {
				let ballVal = this.mesh.position.z - this.radius

				if (this.FallsWithinEdgeRange(startValZ1, endValZ1, ballVal) || this.FallsWithinEdgeRange(startValZ2, endValZ2, ballVal)) {
					if (this.FallsWithinEdgeRange(startValX, endValX, ballValX)) {
						return ReturnStates.NONE
					}
				}
				if (this.mesh.position.z - this.radius <= this.paddleLeft.Z() + this.paddleLeft.depth / 2 && this.mesh.position.z - this.radius > this.paddleLeft.Z() - this.paddleLeft.depth / 2 ) {
					return ReturnStates.TRUE
				}
			}
        }
        return ReturnStates.FALSE
    }

    CollisionPaddleRight()
    {
        if (!(this.hitMask & 2) && this.mesh.position.x - this.radius <= this.paddleRight.X() + this.paddleRight.width / 2) {
			let startValX = this.paddleRight.X() - this.paddleRight.width / 2
			let endValX = this.paddleRight.X() + this.paddleRight.width / 2 - 0.15
			let ballValX = this.mesh.position.x - this.radius

			let startValZ1 = this.paddleRight.Z() - this.paddleRight.depth / 2
			let endValZ1 = this.paddleRight.Z() - this.paddleRight.depth / 2 + 0.3

			let startValZ2 = this.paddleRight.Z() + this.paddleRight.depth / 2 - 0.3
			let endValZ2 = this.paddleRight.Z() + this.paddleRight.depth / 2

            if (this.direction.z > 0) {
				let ballVal = this.mesh.position.z + this.radius
				if (this.FallsWithinEdgeRange(startValZ1, endValZ1, ballVal) || this.FallsWithinEdgeRange(startValZ2, endValZ2, ballVal)){
					if (this.FallsWithinEdgeRange(startValX, endValX, ballValX)) {
						return ReturnStates.NONE
					}
				}
				if ((this.mesh.position.z + this.radius) >= (this.paddleRight.Z() - this.paddleRight.depth / 2) && (this.mesh.position.z + this.radius) < (this.paddleRight.Z() + this.paddleRight.depth / 2) )
                	return ReturnStates.TRUE
			}
            if (this.direction.z < 0) {
				let ballVal = this.mesh.position.z - this.radius
				if (this.FallsWithinEdgeRange(startValZ1, endValZ1, ballVal) || this.FallsWithinEdgeRange(startValZ2, endValZ2, ballVal)) {
					if (this.FallsWithinEdgeRange(startValX, endValX, ballValX)) {
						return ReturnStates.NONE
					}
				}
				if ((this.mesh.position.z - this.radius) <= (this.paddleRight.Z() + this.paddleRight.depth / 2) && (this.mesh.position.z - this.radius) > (this.paddleRight.Z() - this.paddleRight.depth / 2))
					return ReturnStates.TRUE
			}
        }
        return ReturnStates.FALSE
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
		let collisionPaddleLeft = this.CollisionPaddleLeft()
		let collisionPaddleRight = this.CollisionPaddleRight()
        if (collisionPaddleLeft === ReturnStates.TRUE) {
            this.direction.x *= -1;
            this.hitMask |= 1
            this.ToggleHitMask(1)
        } else if (collisionPaddleRight === ReturnStates.TRUE) {
            this.direction.x *= -1;
            this.hitMask |= 2
            this.ToggleHitMask(2)
        } else if (collisionPaddleLeft === ReturnStates.NONE) {
			this.hitMask |= 1
            this.ToggleHitMask(1)
		}
		else if (collisionPaddleRight === ReturnStates.NONE) {
			this.hitMask |= 2
            this.ToggleHitMask(2)
		}
        if (this.CollisionXLeft() || this.CollisionXRight()) {
            if (this.mesh.position.x > 0)
                this.dispatchEvent({ type: 'onscore', message: "opponent" })
            else
                this.dispatchEvent({ type: 'onscore', message: "player" })
            this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
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