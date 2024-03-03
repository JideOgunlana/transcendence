/* initLights() {
        //lights
        this.ambientLight = new THREE.AmbientLight(0x333333);
        //this.ambientLight.castShadow = true;
        //this.scene.add(this.ambientLight);
        
        var dist = 10;
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.directionalLight.shadow.camera.top = dist;
        this.directionalLight.shadow.camera.bottom = -dist;
        this.directionalLight.shadow.camera.left = -dist
        this.directionalLight.shadow.camera.right = dist
        this.directionalLight.position.set(10, 20, 0);
        
        
        this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight2.castShadow = true;
        this.directionalLight2.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.directionalLight2.shadow.camera.top = dist;
        this.directionalLight2.shadow.camera.bottom = -dist;
        this.directionalLight2.shadow.camera.left = -dist
        this.directionalLight2.shadow.camera.right = dist
        this.directionalLight2.position.set(-10, 20, 0);
        
        
        
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight2);



        const dLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        
        const dLightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);

        const dLightHelper2 = new THREE.DirectionalLightHelper(this.directionalLight2);
        
        const dLightShadowHelper2 = new THREE.CameraHelper(this.directionalLight2.shadow.camera);

        this.scene.add(dLightHelper);
        this.scene.add(dLightShadowHelper);
        this.scene.add(dLightHelper2);
        this.scene.add(dLightShadowHelper2);
    } */