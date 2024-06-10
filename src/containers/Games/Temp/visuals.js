/* const boundGeometry = new RoundedBoxGeometry(1, 2, boundaries.y * 2, 5, 0.5);
    const leftBoundMaterial = new THREE.MeshStandardMaterial({ color: defaults.PARAMS.paddleColor });
    const leftBound = new THREE.Mesh(boundGeometry, leftBoundMaterial);
    leftBound.position.x = -boundaries.x - 0.5;

    const rightBoundMaterial = new THREE.MeshStandardMaterial({ color: defaults.PARAMS.opponentPaddleColor });
    const rightBound = new THREE.Mesh(boundGeometry, rightBoundMaterial);
    rightBound.position.x = boundaries.x + 0.5;

    scene.add(leftBound, rightBound); */

     /* const boundaries = new THREE.Vector2(20, 25);
    const planeGeometry = new THREE.PlaneGeometry(
      boundaries.x * 5,
      boundaries.y * 5,
      boundaries.x * 5,
      boundaries.y * 5
    );
    planeGeometry.rotateX(-Math.PI * 0.5);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: defaults.PARAMS.planeColor,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane); */