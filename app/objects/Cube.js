import THREE from 'three';

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.urlPrefix	= "assets/";
  	this.urls = [ this.urlPrefix + "posx.jpg", this.urlPrefix + "negx.jpg",
  			this.urlPrefix + "posy.jpg", this.urlPrefix + "negy.jpg",
  			this.urlPrefix + "posz.jpg", this.urlPrefix + "negz.jpg" ];

  	this.textureCube	= THREE.ImageUtils.loadTextureCube(this.urls);
    this.textureCube.format = THREE.RGBFormat;

  	// init the cube shadder
    var shader	= THREE.ShaderLib['cube'];
  	shader.uniforms['tCube'].value= this.textureCube;

  	var material = new THREE.ShaderMaterial({
  		fragmentShader	: shader.fragmentShader,
  		vertexShader	: shader.vertexShader,
  		uniforms	: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
  	});

    var texture = THREE.ImageUtils.loadTexture( "assets/full.jpg" );
    var materialTest = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });

  	// build the skybox Mesh
  	this.skyboxMesh	= new THREE.Mesh(
      //new THREE.CubeGeometry( 100, 100, 100,  1, 1, 1, null, true ),
      new THREE.CylinderGeometry( 500, 500, 500, 60 ),
      materialTest );
  	// add it to the scene
  	this.add( this.skyboxMesh );
  }

  update() {
    //this.rotation.x += 0.01;
    //this.rotation.z += 0.01;
  }
}
