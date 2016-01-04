import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let gui;

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.renderer.domElement);
document.body.appendChild(webgl.rendererCss.domElement);

// GUI settings
gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');
gui.add(webgl.hotspotsPosition, 'angle').min(0).max(360);
gui.add(webgl.hotspotsPosition, 'y').min(-200).max(200);



// handle resize
window.addEventListener('resize', resizeHandler);


// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}
function mouseDownHandler() {
  webgl.mousedown();
}
function mouseUpHandler() {
  webgl.mouseup();
}

function animate() {
  raf(animate);

  webgl.render();
}
