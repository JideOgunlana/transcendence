class Ball {
    constructor(pos, direction, speed, color, radius) {
        this.pos = pos
        this.direction = direction
        this.speed = speed
        this.color = color
        this.radius = radius
        this.hitMask = 0b0000
        ctx.fillStyle = this.color
        this.direction.multSkalar(speed)
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        ctx.fillStyle = "red"
        ctx.fill();
        ctx.fillStyle = "blue"
    }
    

    translate() {
        this.pos = vector2Add(this.pos, this.direction)
    }

    async toggleHitMask(num) {
        setTimeout(() => {
            this.hitMask ^= num
        }, 300);
    }
    adjustDirection() {
        if (!(this.hitMask & 1) && this.direction.y > 0 && this.pos.y + this.radius >= canvas.height) {
            //getIntersetion(new Ray(this.pos, this.direction), new Ray(new Vector2(0, canvas.height), new Vector2(1, 0)))
            //this.direction.multSkalar(-1)
            this.direction.y *= -1
            this.hitMask |= 1
            this.toggleHitMask(1)
        } else if (!(this.hitMask & 2) && this.direction.y < 0 && this.pos.y - this.radius <= 0) {
            this.direction.y *= -1
            this.hitMask |= 2
            this.toggleHitMask(2)
        }
        else if (!(this.hitMask & 4) && this.direction.x > 0 && this.pos.x + this.radius >= canvas.width) {
            this.direction.x *= -1
            this.hitMask |= 4
            this.toggleHitMask(4)
        }
        else if (!(this.hitMask & 8) && this.direction.x < 0 && this.pos.x - this.radius <= 0) {
            this.direction.x *= -1
            this.hitMask |= 8
            this.toggleHitMask(8)
        }
    }

    resetPos() {
        this.pos.x = canvas.width / 2
        this.pos.y = canvas.height / 2
    }
    update() {
        //this.adjustDirection()
        this.translate()
        this.draw()
    }
}