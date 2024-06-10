//import Player from './Player';
import * as THREE from 'three';
import Events from './Events';



export default class AIPlayer {
    constructor(paddle, ball, gameField) {
        //super(paddle, name)
        this.paddle = paddle
        this.ball = ball
        this.speed = 0
        this.prediction = false
        this.gameField = gameField
    }

    HandleMovement() {
        //this.paddle.moveAlongVector(this.ball.direction.z, 0.9)
        let predictionPoint = this.Predict()
        if (predictionPoint !== null && this.prediction === false) {
            //this.paddle.moveTowardsPoint(predictionPoint.z)
            let e = Events["AIPrediction"]
            e.detail = {
                point: predictionPoint,
            }
            dispatchEvent(e)
            console.log("event has been dispatched")
            this.prediction = true
            this.TogglePrediction()
        } else if (predictionPoint === null && this.prediction === true) {
            this.prediction = false
        }

    }

    TogglePrediction () {
        setTimeout(() => {
            this.prediction = !this.prediction
        }, 1000);
    }

    Predict()
    {
        if (this.ball.direction.x < 0) {
            let r = (- 9 - this.ball.X()) / this.ball.direction.x;
            let zValue  = this.ball.Z() + r * this.ball.direction.z //+ Math.random() * 2 - 2;
            let sz = new THREE.Vector3(10, 0, zValue)
            if (sz.z <= this.gameField.z / 2 && sz.z >= -this.gameField.z / 2) {
                return sz
            }
            return zValue > this.gameField.z / 2 ? new THREE.Vector3(10, 0, 8 + Math.random() * 4 - 2) : new THREE.Vector3(10, 0, -8 + Math.random() * 4 - 2)
        
            /*
            let zConstAxisValue = undefined
            if (this.ball.IsMovingUp()) {
                zConstAxisValue = 10
                r = ( zConstAxisValue - this.ball.Z()) / this.ball.direction.z
            } else {
                zConstAxisValue = -10
                r = ( zConstAxisValue - this.ball.Z()) / this.ball.direction.z
            }
            let xValue = this.ball.X() + r * this.ball.direction.x;
            let sx = new THREE.Vector3(xValue, 0, zConstAxisValue)
            return sx
            
            r = ( -9 - sx.x) / this.ball.direction.x
            zValue = sx.z + r * this.ball.direction.z * -1
            sz.z = zValue
    
            if (sz.z < this.gameField.z / 2 && sz.z > -this.gameField.z / 2)
                return sz
            else {
                console.log("wtf doesnt hit")
            } */
        }
        return null
    }
}