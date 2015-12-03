
var OrbitControls = require('three-orbit-controls')(THREE)
var DeviceOrientationControls = require('three.orientation')
import Cylinder from './objects/Cylinder';
import Sphere from './objects/Sphere';
import Hotspot from './objects/Hotspot';
import Datas from './datas/datas.json'
import PlanView from './views/PlantView';

let isTouch = ("ontouchstart" in document.documentElement) ? true : false;

let hotspot = document.querySelector('#hotspot');

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };
    this.datas = Datas;
    this.hotspots = [];

    // scene settings
    this.scene = new THREE.Scene();
    this.sceneCss = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.001, 10000);


    this.camera.position.set(0,0,10);
    // this.camera.position.set(0,0,500);

    this.renderer = new THREE.WebGLRenderer({
      // depthTest:true,

    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.rendererCss = new THREE.CSS3DRenderer();
		this.rendererCss.setSize( width, height );
		this.rendererCss.domElement.style.position = 'absolute';
		this.rendererCss.domElement.style.pointerEvents = 'none';
		this.rendererCss.domElement.style.top = 0;

    this.buildHotspot();


    this.composer = null;
    this.initPostprocessing();


    this.cylinder = new Cylinder();
    this.cylinder.add(this.scene);

    window.webgl = this;




    // if(isTouch)
    //   this.controls = new DeviceOrientationControls( this.camera );
    // else
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

  }
  buildHotspot() {

    for (var i = 0; i < this.datas.hotspots.length; i++) {
        let hotspot = new Hotspot(this.datas.hotspots[i]);
        hotspot.add(this.sceneCss);
        this.hotspots.push(hotspot)
    }

  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.rendererCss.setSize(width, height);
    this.renderer.setSize(width, height);
  }
  // mousedown() {
  //   // console.log('mousedown');
  //   this.rendererCss.domElement.style.pointerEvents = 'none';
  //
  // }
  // mouseup() {
  //   // this.rendererCss.domElement.style.pointerEvents = 'auto';
  //
  // }
  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
      this.rendererCss.render( this.sceneCss, this.camera );

      for (var i = 0; i < this.hotspots.length; i++) {
          this.hotspots[i].check();
      }




    }
    this.cylinder.update();
    this.controls.update();
  }
}
