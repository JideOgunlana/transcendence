import {
    CapsuleGeometry,
    Mesh,
    MeshNormalMaterial,
    MeshStandardMaterial,
} from 'three'

export default class Paddle {
    constructor(scene, boundaries, position, color) {
        this.scene = scene
        this.boundaries = boundaries

        const geometry = new CapsuleGeometry(0.5, 5, 20, 20);
        const helperGeometry = new CapsuleGeometry(0.5 + 0.5, 5, 20, 8);
        helperGeometry.rotateZ(Math.PI * 0.5);
        helperGeometry.rotateX(Math.PI / 8);
        geometry.rotateZ(Math.PI * 0.5);

        const material = new MeshStandardMaterial({ color });

        this.mesh = new Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        const collisionHelper = new Mesh(
            helperGeometry,
            new MeshNormalMaterial({
                transparent: true,
                opacity: 0.5,
                visible: false,
            })
        );

        this.mesh.add(collisionHelper);

        this.mesh.position.copy(position);
        this.scene.add(this.mesh);
    }

    setX(x) {
        if (x > this.boundaries.x - 3) {
            x = this.boundaries.x - 3;
        } else if (x < -this.boundaries.x + 3) {
            x = -this.boundaries.x + 3;
        }

        this.mesh.position.x = x;
    }
}
