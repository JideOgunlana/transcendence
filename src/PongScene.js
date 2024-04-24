import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import GameManager from './GameManager.js';
import Constants from './Constants.js';
import { inGameObjects } from './InGameObjects.js';
import Globals from './Globals.js';
import { GameModes } from './Enums.js';

export default class PongScene {
    constructor(canvasId, playerLeft, playerRight, tournamentLogic) {
        this.fov = 45;
        this.canvasId = canvasId;

        this.stats = undefined;
        this.camera = undefined;
        this.controls = undefined;
        this.renderer = undefined;
        this.clock = undefined;
        this.timeStep = 1/60;

        //this.playerLeft = playerLeft;
        //this.playerRight = playerRight;
        this.tournamentLogic = tournamentLogic
        
    }

    initControls()
    {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initHelpers()
    {
        const axesHelper = new THREE.AxesHelper(50);
        axesHelper.setColors(0xff0000,0x0000ff,0x5dff00);
        Constants.scene.add(axesHelper);
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
        //this.playerLeft.HitWall(inGameObjects.ball)
        //this.playerRight.HitWall(inGameObjects.ball)
        if (Globals.currentPlayerLeft.Won(Constants.winningScore) || Globals.currentPlayerRight.Won(Constants.winningScore)) {
            GameManager.StopGame(animationId)
        }
        this.render();
    }

    render() {

        inGameObjects.ball.update();
        Globals.currentPlayerLeft.paddle.update();
        Globals.currentPlayerRight.paddle.update();
        this.renderer.render(Constants.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


    




    

    