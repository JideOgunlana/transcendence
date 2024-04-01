import * as THREE from 'three'

export default class Constants {
    static scene = new THREE.Scene();
    static gameField = new THREE.Vector3(20, 0, 20)
    static winningScore = 3
    static buttonStart = window.document.getElementById("btn-start");
    static ballStartPosition = new THREE.Vector3(0, 0.2, 0);
    static ballStartDir = new THREE.Vector3(1, 0, 2).normalize();
}