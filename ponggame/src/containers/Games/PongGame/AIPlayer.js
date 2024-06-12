//import Player from './Player';
import * as THREE from 'three';
import Events from './Events';
import defaults from '../../../utils/defaults';



export default class AIPlayer {
    constructor(paddle, ball, gameField) {
        //super(paddle, name)
        this.paddle = paddle
        this.ball = ball
        this.speed = 0
        this.prediction = false
        this.gameField = gameField

		this.accuracy = 1
		this.intervalId = undefined

		this.endGame = false;
		this.predictionPoint = null
    }

    HandleMovement() {
        // let predictionPoint = this.Predict()
        // if (predictionPoint !== null && this.prediction === false) {
        //     //this.paddle.moveTowardsPoint(predictionPoint.z)
        //     let e = Events["AIPrediction"]
        //     e.detail = {
        //         point: predictionPoint,
        //     }
        //     dispatchEvent(e)
        //     console.log("event has been dispatched")
        //     this.prediction = true
        //     this.TogglePrediction()
        // } else if (predictionPoint === null && this.prediction === true) {
        //     this.prediction = false
        // }
		this.TogglePrediction()

    }
	ClearInterval()
	{
		if (this.intervalId !== undefined)
			clearInterval(this.intervalId);
	}

    TogglePrediction () {
        this.intervalId = setInterval(() => {
			this.predictionPoint = this.Predict()
			if (this.predictionPoint !== null) {
				let e = Events["AIPrediction"]
				e.detail = {
					point: this.predictionPoint,
				}
				dispatchEvent(e)
			}
        }, 1000);
    }
	AdjustAccuracy(scoreDiff)
	{
        let maxScoreDiff = defaults.PONG_WIN_POINT - 1
		if (scoreDiff <= -maxScoreDiff)
			this.accuracy = 0.01
		else if (scoreDiff >= maxScoreDiff) {
			this.endGame = true;
			this.accuracy = 0.99
		} else {
			let r = (0.9 - 0.1) / (maxScoreDiff * 2)
			let val = (scoreDiff + maxScoreDiff) * r + 0.1
			this.accuracy = val
            // console.log("r: ", r, " val: ", val, " maxScoreDiff: ", maxScoreDiff)
		}
        console.log("acc: ", this.accuracy)
	}

	GenerateRandom() {
		let range = 8 - 8 * this.accuracy
		let toggle = Math.floor(Math.random() * 2)
		return toggle > 0 ? range : -range
		// return Math.random() * range - range
	}

    Predict()
    {
		let paddleConstX = -9;
        if (this.ball.direction.x < 0) {
            let r = (paddleConstX - this.ball.X()) / this.ball.direction.x;
            let zValue  = this.ball.Z() + r * this.ball.direction.z
			let randValue = 0//this.GenerateRandom()
            // console.log("real value: ", zValue, " prediction: ", zValue + randValue)
            let sz = new THREE.Vector3(10, 0, zValue + randValue)
            if (sz.z <= this.gameField.z / 2 && sz.z >= -this.gameField.z / 2) {
				sz.z += this.GenerateRandom();
				console.log("no further prediction, real value: ", zValue, " prediction: ", sz.z)
                return sz
            } 
			else {
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
				
				r = ( paddleConstX - sx.x) / this.ball.direction.x
				zValue = sx.z + r * this.ball.direction.z * -1
				sz.z = zValue + this.GenerateRandom()
				console.log("real value: ", zValue, " prediction: ", sz.z)
				if (sz.z < this.gameField.z / 2 && sz.z > -this.gameField.z / 2)
					return sz
			}

			// if (this.endGame) {
			// }
			return zValue > this.gameField.z / 2 ? new THREE.Vector3(10, 0, this.gameField.z / 2) : new THREE.Vector3(10, 0, -this.gameField.z / 2)
            // return zValue > this.gameField.z / 2 ? new THREE.Vector3(10, 0, 8 + Math.random() * 4 - 2) : new THREE.Vector3(10, 0, -8 + Math.random() * 4 - 2)
        


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