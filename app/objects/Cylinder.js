

export default class Cylinder  {
  constructor() {

    var texture = THREE.ImageUtils.loadTexture( "assets/sky.jpg" );
    // texture.wrapS = texture.wrapT = THREE.RepeatWrappinp;
    var material = new THREE.MeshBasicMaterial({
    color: 0x3d262e,
    depthTest:true,
    map: texture,
    side: THREE.DoubleSide
    });

    var circleGeometry = new THREE.CircleGeometry( 130, 32 );
    this.sky = new THREE.Mesh( circleGeometry, material );
    this.sky.position.y =45;
    this.sky.rotation.x = Math.PI/180 *90;

    this.floor = new THREE.Mesh( circleGeometry, material );
    this.floor.position.y =-110;
    this.floor.rotation.x = Math.PI/180 *90;
    window.floor = this.floor


    var texture = THREE.ImageUtils.loadTexture( "assets/full2.jpg" );
    var materialTest = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });

  	// build the skybox Mesh
  	this.cylinderMesh	= new THREE.Mesh(
      //new THREE.CubeGeometry( 100, 100, 100,  1, 1, 1, null, true ),
      new THREE.CylinderGeometry( 250, 250, 350, 60 ),
      materialTest );

      this.cylinderMesh.position.set(0,0,0)
  	// add it to the scene




  	// this.add( this.mesh  );
  	// this.add( xp );
  }
  add(scene) {
    scene.add(this.cylinderMesh);
    // scene.add(this.sky);
    // scene.add(this.floor);
  }

  update() {
    //this.rotation.x += 0.01;
    //this.rotation.z += 0.01;
  }
}
