import * as THREE from 'three';
import Events from './Events';
import defaults from '../../../utils/defaults';



export default class AIPlayer {
    constructor(paddle, ball, gameField) {
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
		}
        // console.log("acc: ", this.accuracy)
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
            let sz = new THREE.Vector3(10, 0, zValue)
            if (sz.z <= this.gameField.z / 2 && sz.z >= -this.gameField.z / 2) {
				sz.z += this.GenerateRandom();
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
				if (sz.z < this.gameField.z / 2 && sz.z > -this.gameField.z / 2)
					return sz
			}
			return zValue > this.gameField.z / 2 ? new THREE.Vector3(10, 0, this.gameField.z / 2) : new THREE.Vector3(10, 0, -this.gameField.z / 2)
        }
        return null
    }
}