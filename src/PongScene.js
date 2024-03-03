import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
//import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'

import Paddle from './Paddle.js';
import Light from './Light.js';
import { LightTypes } from './Enums.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'


export default class PongScene {
    constructor(canvasId, scene, gameField, world, ground, ball, paddleLeft, paddleRight, playerLeft, playerRight, scoreBoard) {
        this.fov = 45;
        this.canvasId = canvasId;

        this.gameField = gameField;

        this.scene = scene;
        this.stats = undefined;
        this.camera = undefined;
        this.controls = undefined;
        this.renderer = undefined;
        this.clock = undefined;
        this.scoreBoard = scoreBoard;
        /* this.labelRenderer = undefined;
        this.htmlElemObject = undefined; */

        this.ground = ground;
        this.ball = ball;
        this.world = world;
        this.timeStep = 1/60;
        //lights
        this.paddleLeft = paddleLeft;
        this.paddleRight = paddleRight;
        this.playerLeft = playerLeft;
        this.playerRight = playerRight;
        this.light1 = new Light(this.scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(10, 20, 0), 1, 1)
        this.light2 = new Light(this.scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(-10, 20, 0), 1, 1)
    }


    initContacts() {
        const planeSphereContactMat = new CANNON.ContactMaterial(this.ground.physicMaterial, this.ball.physicMaterial, {restitution: 0.5});
        this.world.addContactMaterial(planeSphereContactMat);
    }

    initControls()
    {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initHelpers()
    {
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors(0xff0000,0x0000ff,0x5dff00);
        this.scene.add(axesHelper);
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

        /* this.labelRenderer = new CSS2DRenderer();
        console.log(this.labelRenderer);
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        this.labelRenderer.domElement.style.border = "5px solid red";
        this.labelRenderer.domElement.innerHTML = "hello?";
        document.body.appendChild(this.labelRenderer.domElement);

        const p = document.createElement('p');
        p.textContent = "0";
        p.style.fontSize = "32px";
        this.htmlElemObject = new CSS2DObject(p);
        this.scene.add(this.htmlElemObject);
        this.htmlElemObject.position.set(0, 2, 0);
        this.htmlElemObject.castShadow = true; */


        
        this.initControls();
        this.initHelpers();
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.playerLeft.HitWall(this.ball)
        this.playerRight.HitWall(this.ball)
        if (this.playerLeft.Won(3))
            console.log("Player Left Won")
        else if (this.playerRight.Won(3))
            console.log("Player Right Won")
        
        this.render();

    }

    render() {
        /* this.world.step(this.timeStep);
        
        
        this.ground.mesh.position.copy(this.ground.physicBody.position);
        this.ground.mesh.quaternion.copy(this.ground.physicBody.quaternion);
        
        this.ball.mesh.position.copy(this.ball.physicBody.position);
        this.ball.mesh.quaternion.copy(this.ball.physicBody.quaternion); */


        //this.paddle.position.copy(this.paddleBody.position);
        //this.paddle.quaternion.copy(this.paddleBody.quaternion);
        this.ball.update();
        this.paddleLeft.update();
        this.paddleRight.update();
        this.scoreBoard.labelRenderer.render(this.scene, this.camera);
        //this.labelRenderer.render(this.scene, this.camera);
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scoreBoard.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        //this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }
}


    




    

    