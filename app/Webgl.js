
var OrbitControls = require('three-orbit-controls')(THREE)
var DeviceOrientationControls = require('three.orientation')
import Cube from './objects/Cube';
import Sphere from './objects/Sphere';
let isTouch = ("ontouchstart" in document.documentElement) ? true : false;

let hotspot = document.querySelector('#hotspot');

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };
    this.hotspots = [];
    this.scene = new THREE.Scene();
    this.sceneCss = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.001, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.rendererCss = new THREE.CSS3DRenderer();
		this.rendererCss.setSize( window.innerWidth, window.innerHeight );
		this.rendererCss.domElement.style.position = 'absolute';
		this.rendererCss.domElement.style.pointerEvents = 'none';
		this.rendererCss.domElement.style.top = 0;


    this.composer = null;
    this.initPostprocessing();

    // this.cube = new Cube();
    // this.cube.position.set(0, 0, 100);
    // this.scene.add(this.cube);
    // this.hotspots.push(this.cube)

    this.sphere = new Sphere();
    this.sphere.position.set(0, 0, 0);
    this.scene.add(this.sphere);

    window.webgl = this;



		var element = document.createElement( 'div' );
		element.id = 'hotspot';
		element.style.opacity = 0.5;
    element.style.width = "20px";
    element.style.height = "20px"

		this.objectCss = new THREE.CSS3DObject( element );
		this.objectCss.position.x = 10;
		this.objectCss.position.y = 10;
		this.objectCss.position.z = 100;

		this.objectCss.scale.x = Math.random() + 0.5;
		this.objectCss.scale.y = Math.random() + 0.5;
		this.sceneCss.add( this.objectCss );



    if(isTouch)
      this.controls = new DeviceOrientationControls( this.camera );
    else
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    /* Add the effect composer of your choice */
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
  checkHotSpot() {
    let hotspot = document.querySelector('#hotspot');
    let boundingBox = hotspot.getBoundingClientRect();
    let dist = Math.sqrt(Math.pow(window.innerWidth/2-boundingBox.left-50,2)+Math.pow(window.innerHeight/2-boundingBox.top-50,2));

    if(dist<150) {
      if(hotspot.classList.contains('active')) return;

      hotspot.classList.add('active')

    } else {
      hotspot.classList.remove('active');
    }

  }
  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
      this.rendererCss.render( this.sceneCss, this.camera );


      this.checkHotSpot();



    }

    this.controls.update();
    // this.cube.update();
  }
}
