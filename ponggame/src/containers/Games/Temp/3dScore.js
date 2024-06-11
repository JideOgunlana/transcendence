let pcScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, aiNameMesh;

    const scoreMaterial = new THREE.MeshStandardMaterial({
      color: defaults.PARAMS.ballColor,
    });

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });


    const fontLoader = new FontLoader();
    fontLoader.load(srcFont, function (font) {
      loadedFont = font;
      const geometry = new TextGeometry('0', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      geometry.center();

      pcScoreMesh = new THREE.Mesh(geometry, scoreMaterial);
      playerScoreMesh = pcScoreMesh.clone();
      pcScoreMesh.scale.setScalar(1.5);
      pcScoreMesh.position.set(0, 2, -boundaries.y - 4);
      playerScoreMesh.position.set(0, 2, boundaries.y + 4);
      pcScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      playerScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(pcScoreMesh, playerScoreMesh);


      // Player Name Mesh
      const playerNameGeometry = new TextGeometry(selectedPlayers[0].username, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(0, 7, boundaries.y + 4);
      playerNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(playerNameMesh);

      // AI Name Mesh
      const aiNameGeometry = new TextGeometry('AI', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      aiNameGeometry.center();
      aiNameMesh = new THREE.Mesh(aiNameGeometry, nameMaterial);
      aiNameMesh.position.set(0, 7, -boundaries.y - 4);
      aiNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      scene.add(aiNameMesh);
    });

    function getScoreGeometry(score) {
      const geometry = new TextGeometry(`${score}`, {
        font: loadedFont,
        ...defaults.TEXT_PARAMS,
      });

      geometry.center();

      return geometry;
    }