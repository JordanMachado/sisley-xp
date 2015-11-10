
export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

  	this.mat = new THREE.MeshBasicMaterial({
      //depthWrite: false,
      side: THREE.BackSide,
      map:THREE.ImageUtils.loadTexture("assets/negx.jpg")
  	});


  	// build the skybox Mesh
  	this.mesh	= new THREE.Mesh(
      new THREE.SphereGeometry( 500, 500, 500),
      this.mat );
  	// add it to the scene
  	this.add( this.mesh );
  }

  update() {
    //this.rotation.x += 0.01;
    //this.rotation.z += 0.01;
  }
}
