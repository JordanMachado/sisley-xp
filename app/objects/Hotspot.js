import PlanView from './../views/PlantView'

export default class Hotspot {
  constructor(datas) {



    var element = document.createElement( 'div' );
    element.innerHTML = "<svg width='100' height='100'><circle cx='50' cy='50' r='40' stroke='green' stroke-width='4' fill='yellow' /></svg>"
		element.id = datas.id;
		element.className = 'hotspot';
		// element.style.opacity = 0.5;
    element.style.width = "20px";
    element.style.height = "20px";

		this.objectCss = new THREE.CSS3DObject( element );
		this.objectCss.position.x = 160 *Math.cos(datas.position.angle);
		this.objectCss.position.y = datas.position.y;
		this.objectCss.position.z = 160 *Math.sin(datas.position.angle);
    this.objectCss.element.parent = this.objectCss;



    this.objectCss.element.onclick = function() {
      let plantView = new PlanView({
        el:'.plantView',
        datas:datas.product
      });
      plantView.render();
      plantView.show();
    }
  }
  add(scene) {
    scene.add(this.objectCss);
  }
  update() {

  }
  check() {
    let boundingBox = this.objectCss.element.getBoundingClientRect()
    // check center x
    let dist = Math.sqrt(Math.pow(window.innerWidth/2-boundingBox.left-50,2));

    if(dist<150) {
      if(this.objectCss.element.classList.contains('active')) return;
      this.objectCss.element.classList.add('active')
    } else {
      this.objectCss.element.classList.remove('active');
    }
  }

}
