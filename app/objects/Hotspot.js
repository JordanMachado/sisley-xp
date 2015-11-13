import PlanView from './../views/PlantView'
import Datas from './../datas/datas.json'

export default class Hotspot {
  constructor(datas) {

    var element = document.createElement( 'div' );
    element.innerHTML = "<svg width='100' height='100'><circle cx='50' cy='50' r='40' stroke='green' stroke-width='4' fill='yellow' /></svg>"
		element.id = 'hotspot';
		// element.style.opacity = 0.5;
    element.style.width = "20px";
    element.style.height = "20px";

		this.objectCss = new THREE.CSS3DObject( element );
		this.objectCss.position.x = 10;
		this.objectCss.position.y = 10;
		this.objectCss.position.z = 500;
    this.objectCss.element.parent = this.objectCss;

    this.objectCss.element.onclick = function() {
      let plantView = new PlanView({
        el:'.plantView',
        datas:Datas.hotspots[0].product
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
}
