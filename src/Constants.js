import * as THREE from 'three'

//todo..make real constants not static --> done below
/* export default class Constants2 {
    static scene = new THREE.Scene();
    static gameField = new THREE.Vector3(20, 0, 20)
    static winningScore = 1
    static buttonStart = window.document.getElementById("btn-start");
    static ballStartPosition = new THREE.Vector3(0, 0.2, 0);
    static ballStartDir = new THREE.Vector3(1, 0, 2).normalize();
    static maxNumberOfPlayers = 12
} */

export const Constants = {
    scene : new THREE.Scene(),
    gameField : new THREE.Vector3(20, 0, 20),
    winningScore : 1,
    buttonStart : window.document.getElementById("btn-start"),
    ballStartPosition : new THREE.Vector3(0, 0.2, 0),
    ballStartDir : new THREE.Vector3(1, 0, 2).normalize(),
    maxNumberOfPlayers : 12
}
