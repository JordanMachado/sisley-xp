import PlanView from './../views/PlantView'

export default class Hotspot {
  constructor(datas) {

    var element = document.createElement('div');
    element.innerHTML = "<div class='shadow'></div><svg><circle cx='5' cy='5' r='10' fill='white'/></svg>"
		element.id = datas.id;
		element.className = 'hotspot';
    element.style.width = "10px";
    element.style.height = "10px";

    var element2 = document.createElement('div');
    element2.innerHTML = "<div>Jojo pidi</div>"
		element2.id = datas.title;
		element2.className = 'text-hotspot';

    this.objectCss = new THREE.CSS3DObject(element);
		this.objectCss2 = new THREE.CSS3DObject(element2);
		this.objectCss.position.x = 160 * Math.cos(datas.position.angle);
		this.objectCss.position.y = datas.position.y;
		this.objectCss.position.z = 160 * Math.sin(datas.position.angle);
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
    scene.add(this.objectCss2);
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
