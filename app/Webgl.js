
var OrbitControls = require('three-orbit-controls')(THREE)
var DeviceOrientationControls = require('three.orientation')
import Cylinder from './objects/Cylinder';
import Sphere from './objects/Sphere';
import Hotspot from './objects/Hotspot';
import Datas from './datas/datas.json'
import PlanView from './views/PlantView';

let isTouch = ("ontouchstart" in document.documentElement) ? true : false;

let hotspot = document.querySelector('#hotspot');

let gammaRotation = 0;

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };
    this.hotspotsPosition = {
      angle:0,
      y:0
    };
    this.datas = Datas;
    this.hotspots = [];

    // scene settings
    this.scene = new THREE.Scene();
    this.sceneCss = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.001, 1000);

    this.camera.position.set(0,0,1);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.rendererCss = new THREE.CSS3DRenderer();
		this.rendererCss.setSize( width, height );
		this.rendererCss.domElement.style.position = 'absolute';
		this.rendererCss.domElement.style.pointerEvents = 'none';
		this.rendererCss.domElement.style.top = 0;

    this.buildHotspot();

    this.initIntro()
    this.initTuto()
    this.initMenu();
    this.initSearch();

    this.composer = null;
    this.initPostprocessing();

    this.cylinder = new Cylinder();
    this.cylinder.add(this.scene);

    window.addEventListener('deviceorientation', function(e) {
      gammaRotation = e.gamma ? e.gamma * (Math.PI / 360) : 0;
    });

    window.webgl = this;

    //if(isTouch)
      //this.controls = new DeviceOrientationControls( this.camera );
    //else
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      //
      //
      this.controls.minPolarAngle = Math.PI/180*90;
      this.controls.maxPolarAngle = Math.PI/180*90;
      this.controls.minDistance =150;
      this.controls.maxDistance = 150;
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

  initIntro(){
    this.nextIntro = document.querySelector('._intro.next');
    this.wrapperText = document.querySelector('._intro.text');
    this.intro = document.querySelector('.intro');
    this.tuto = document.querySelector('.tuto');

    this.textSecond = document.querySelector('._intro.text.second');
    this.textFirst = document.querySelector('._intro.text.first');

    var index = 0;
    var self = this;

    this.nextIntro.onclick =()=> {
      this.nextIntro.classList.add('animate');

      this.textSecond.classList.add('show');
      this.textFirst.classList.add('hide');

      index +=1;
      if (index  == 2 ) {
        TweenLite.to(this.intro, 0.4,{
          marginLeft: '-100vw',
          delay: 1
        })
        TweenLite.to(this.tuto, 0.4,{
          marginLeft: '-100vw',
          delay: 1
        })
      }
    }
  }

  initTuto(){
    this.next = document.querySelector('.tuto .next');
    this.wrapper = document.querySelector('.tuto .main-wrapper');
    this.tuto = document.querySelector('.tuto');
    var index = 0;
    var self = this;

    this.next.onclick =()=> {
      index +=100;
      this.next.classList.add('animate');

      if (index <= 300) {
        TweenLite.to(this.wrapper, 0.6,{
          marginLeft: -index+'vw',
          delay: 1,
          onComplete: function(){
            self.next.classList.remove('animate');
          }
        })
      } else {
        TweenLite.to(this.tuto, 0.6,{
          opacity: 0,
          delay: 1,
          onComplete: function(){
            self.tuto.classList.add('delete');
          }
        })
      }
    }
  }

  initMenu(){
    this.closeBtn = document.querySelector('.close');
    this.showBtn = document.querySelector('.left');
    this.menu = document.querySelector('.full-menu');
    this.mainBtn = document.querySelector('.main-button');

    this.showBtn.onclick =()=> {
      this.menu.classList.toggle('active');
      this.mainBtn.classList.toggle('hide');
    }
    this.closeBtn.onclick =()=> {
      this.menu.classList.toggle('active');
      this.mainBtn.classList.toggle('hide');
    }
  }

  initSearch(){
    this.closeBtnC = document.querySelector('.close');
    this.showBtnR = document.querySelector('.right');
    this.menuS = document.querySelector('.full-search');

    this.showBtnR.onclick =()=> {
      this.menuS.classList.toggle('active');
    }
    // this.closeBtnC.onclick =()=> {
    //   this.menuS.classList.toggle('active');
    // }
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

  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
      this.rendererCss.render( this.sceneCss, this.camera );

      for (var i = 0; i < this.hotspots.length; i++) {

          this.hotspots[i].check();

            // this.hotspots[i].objectCss.position.x = 160 * Math.cos(this.hotspotsPosition.angle);
            // this.hotspots[i].objectCss.position.y = this.hotspotsPosition.y;
            // this.hotspots[i].objectCss.position.z = 160 * Math.sin(this.hotspotsPosition.angle);
          this.hotspots[i].objectCss.lookAt( this.camera.position );
          this.hotspots[i].objectCss2.lookAt( this.camera.position );
      }
    }

    this.cylinder.update();
    //this.cylinder.cylinderMesh.rotation.y = gammaRotation;
    this.controls.update();
  }
}
