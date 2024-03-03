import * as THREE from 'three';
import { LightTypes } from './Enums';

import GameManager from './GameManager';

export default class Light {
    
    constructor(type, distance, color, shadow = true, position = new THREE.Vector3(0,0,0), intensity=1, power=1) {
        this.type = type;
        this.ambientLight = undefined;
        this.directionalLight = undefined;
        this.pointLight = undefined;
        this.spotLight = undefined;
        this.distance = distance
        this.color = color
        this.position = position
        this.intensity = intensity
        this.power = power
        this.shadow = shadow
        this.initLight()
        
    }
    initAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(this.color);
        this.ambientLight.castShadow = this.shadow;
        GameManager.scene.add(this.ambientLight);
    }
    initSpotLight()
    {
        this.spotLight = new THREE.SpotLight({color: this.color, intensity: this.intensity, power: this.power});
        this.spotLight.castShadow = this.shadow;
        this.spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.spotLight.position.set(this.position.x, this.position.y, this.position.z); //10,20,0
        GameManager.scene.add(this.spotLight)
    }
    initPointLight()
    {
        this.pointLight = new THREE.PointLight(this.color, this.intensity);
        this.pointLight.castShadow = this.shadow;
        this.pointLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
        /* this.pointLight.shadow.camera.top = this.distance;
        this.pointLight.shadow.camera.bottom = -this.distance;
        this.pointLight.shadow.camera.left = -this.distance
        this.pointLight.shadow.camera.right = this.distance */
        this.pointLight.position.set(this.position.x, this.position.y, this.position.z); //10,20,0
        GameManager.scene.add(this.pointLight)
    }
    initDirectionalLight()
    {
        this.directionalLight = new THREE.DirectionalLight(this.color, this.intensity);
        this.directionalLight.castShadow = this.shadow;
        this.directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.directionalLight.shadow.camera.top = this.distance;
        this.directionalLight.shadow.camera.bottom = -this.distance;
        this.directionalLight.shadow.camera.left = -this.distance
        this.directionalLight.shadow.camera.right = this.distance
        this.directionalLight.position.set(this.position.x, this.position.y, this.position.z); //10,20,0
        GameManager.scene.add(this.directionalLight)
    }
    initLight() {
        if (this.type === LightTypes.Ambient)
            this.initAmbientLight()
        else if (this.type === LightTypes.Directional)
            this.initDirectionalLight()
        else if (this.type === LightTypes.Spot)
            this.initSpotLight()
        else if (this.type === LightTypes.Point)
            this.initPointLight()
    }

    LightSource() {
        switch (type) {
            case LightTypes.Ambient:
                return this.ambientLight
            case LightTypes.Directional:
                return this.directionalLight
            case LightTypes.Spot:
                return this.spotLight
            case LightTypes.Point:
                return this.pointLight;
            default:
                return null
        }
    }
}