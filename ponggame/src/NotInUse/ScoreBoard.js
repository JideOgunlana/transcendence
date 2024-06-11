/* import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export default class ScoreBoard {
    
    constructor(scene) {
        this.scene = scene;
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(this.labelRenderer.domElement);


        this.backgoundElem = document.createElement('div');

        
        this.scoreLeftElem = document.createElement('p');
        this.scoreRightElem = document.createElement('p');
        this.scoreLeft = this.CreateScoreLeft()
        this.scoreRight = this.CreateScoreRight()
        this.backgound = this.CreateBackground();
    }

    CreateBackground() {
        this.backgoundElem.style.backgroundColor = "rgba( 175, 122, 197, 0.2)";
        this.backgoundElem.style.width = "20%";
        this.backgoundElem.style.height = "20vh";
        this.backgoundElem.style.display = "flex";
        this.backgoundElem.style.justifyContent = "space-between";
        this.backgoundElem.style.alignItems = "center";
        this.backgoundElem.style.border = "2px solid red"

        this.backgoundElem.appendChild(this.scoreLeftElem);
        this.backgoundElem.appendChild(this.scoreRightElem);

        const htmlElemObject = new CSS2DObject(this.backgoundElem);
        htmlElemObject.position.set(0, 0, 0);
        this.scene.add(htmlElemObject);
        return htmlElemObject

    }

    CreateScoreLeft() {
        
        this.scoreLeftElem.style.fontSize = "32px";
        this.scoreLeftElem.textContent = "0";
        this.scoreLeftElem.style.border = "2px solid red";


        const htmlElemObject = new CSS2DObject(this.scoreLeftElem);
        htmlElemObject.position.set(100, 0, 0);
        //this.scene.add(htmlElemObject);
        return htmlElemObject;
    }

    CreateScoreRight() {
        
        this.scoreRightElem.style.fontSize = "32px";
        this.scoreRightElem.textContent = "0";
        this.scoreRightElem.style.border = "2px solid red";
        this.scoreRightElem.style.marginLeft = "auto"


        const htmlElemObject = new CSS2DObject(this.scoreRightElem);
        //htmlElemObject.position.set(0, 0, 0);
        //this.scene.add(htmlElemObject);
        return htmlElemObject;
    }


    LabelRenderer() { return this.LabelRenderer; }

} */