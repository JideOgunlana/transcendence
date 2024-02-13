

/* function getDirection(vecA, vecB) {
    return new Vector2(vecB.x - vecA.x, vecB.y - vecA.y).normalize();
}

function getIntersetion(ray1, ray2) {
    let dx = ray2.origin.x - ray1.origin.x
    let dy_rev = ray1.origin.y - ray2.origin.x
    let det = (ray2.direction.y * ray1.direction.x - ray1.direction.y * ray2.direction.x)
    if (det != 0) {
        let v = (dy_rev * ray1.direction.x + ray1.direction.y * dx) / det
        let u = (ray2.origin.x - ray1.origin.x + ray2.direction.x * v) / ray1.direction.x
        let S = vector2Add(ray1.origin, vector2MultSkalar(ray1.direction, u))
        console.log(S)
        return true
    }
    return false
} */