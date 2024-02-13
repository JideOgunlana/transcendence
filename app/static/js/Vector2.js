class Vector2 {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    
    add(vec) {
        this.x += vec.x
        this.y += vec.y
    }

    multSkalar(num) {
        this.x *= num
        this.y *= num
    }

    addSkalar(num) {
        this.x += num
        this.y += num
    }

    subSkalar(num) {
        this.x -= num
        this.y -= num
    }

    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    normalize() {
        this.x /= this.length()
        this.y /= this.length()
    }
}

function vector2Add(vec1, vec2) {
    return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y)
}

function vector2MultSkalar(vec1, num) {
    return new Vector2(vec1.x * num, vec1.y * num)
}