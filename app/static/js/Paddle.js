class Paddle {
    constructor(pos, speed, color, width, height) {
        this.pos = pos
        this.speed = 0
        this.color = color
        this.width = width
        this.height = height
        //ctx.fillStyle = this.color
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        ctx.fillStyle = "blue"
    }
    moveUp() {
        this.speed = -10
    }
    moveDown() {
        this.speed = 10
    }

    resetSpeed() {
        this.speed = 0
    }

    collisionUp() {
        if (this.pos.y <= 0)
            return true;
        return false;
    }

    collisionDown() {
        if (this.pos.y >= canvas.height)
            return true;
        return false;
    }

    collision() {
        if (this.pos.y <= 0)
            return true;
        else if (this.pos.y + this.height >= canvas.height)
            return true;
        return false;
    }

    update() {
        if (this.collision())
            this.pos.y -= this.speed * 2;
        else
            this.pos.y += this.speed
        this.draw()
    }
}