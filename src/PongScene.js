import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
//import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'

import Paddle from './Paddle.js';
import Light from './Light.js';
import { LightTypes } from './Enums.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import GameManager from './GameManager.js';


export default class PongScene {
    constructor(canvasId, ground, ball, paddleLeft, paddleRight, playerLeft, playerRight) {
        this.fov = 45;
        this.maxScores = 1;
        this.canvasId = canvasId;

        this.stats = undefined;
        this.camera = undefined;
        this.controls = undefined;
        this.renderer = undefined;
        this.clock = undefined;

        this.ground = ground;
        this.ball = ball;
        this.timeStep = 1/60;

        //lights
        this.paddleLeft = paddleLeft;
        this.paddleRight = paddleRight;
        this.playerLeft = playerLeft;
        this.playerRight = playerRight;
        this.light1 = new Light(LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(10, 20, 0), 1, 1)
        this.light2 = new Light(LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(-10, 20, 0), 1, 1)
    }


   /*  initContacts() {
        const planeSphereContactMat = new CANNON.ContactMaterial(this.ground.physicMaterial, this.ball.physicMaterial, {restitution: 0.5});
        this.world.addContactMaterial(planeSphereContactMat);
    } */

    initControls()
    {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initHelpers()
    {
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors(0xff0000,0x0000ff,0x5dff00);
        GameManager.scene.add(axesHelper);
    }

    initialize() {
        this.clock = new THREE.Clock();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 20, -20);
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            shadow: true
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        
        this.initControls();
        this.initHelpers();
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        let animationId = window.requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.playerLeft.HitWall(this.ball)
        this.playerRight.HitWall(this.ball)
        if (this.playerLeft.Won(this.maxScores) || this.playerRight.Won(this.maxScores)) {
            GameManager.StopGame(animationId)
        }
        
        this.render();

    }

    render() {

        this.ball.update();
        this.paddleLeft.update();
        this.paddleRight.update();
        this.renderer.render(GameManager.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


    




    

    