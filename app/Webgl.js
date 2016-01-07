
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

    window.webgl = this;

    // if(isTouch)
    //   this.controls = new DeviceOrientationControls( this.camera );
    // else
    
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
    this.next = document.querySelector('.intro .next');
    this.wrapper = document.querySelector('.intro .text');
    this.tuto = document.querySelector('.intro');
    var index = 0;
    var self = this;

    this.next.onclick =()=> {
      this.wrapper.innerHTML = "Votre découverte à travers l’univers phytotérpique, vous invite à collecter les plantes qui vous intéressent. Prenez en un des boutures et plantez les dans votre serre. Vos recolte vous ressemble, nous sommes à l’ecoute de vos recherches et vous proposerons un produit.";

      if (index <= 300) {
        // TweenLite.to(this.wrapper, 0.6,{
        //   marginLeft: -index+'vw',
        //   delay: 1,
        //   onComplete: function(){
        //     self.next.classList.remove('animate');
        //   }
        // })
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
          this.hotspots[i].objectCss.lookAt( this.camera.position );
          this.hotspots[i].objectCss2.lookAt( this.camera.position );
      }
    }
    this.cylinder.update();
    this.controls.update();
  }
}
