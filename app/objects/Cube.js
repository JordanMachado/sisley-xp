

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.urlPrefix	= "assets/";
  	this.urls = [ this.urlPrefix + "posx.jpg", this.urlPrefix + "negx.jpg",
  			this.urlPrefix + "posy.jpg", this.urlPrefix + "negy.jpg",
  			this.urlPrefix + "posz.jpg", this.urlPrefix + "negz.jpg" ];
  	this.textureCube	= THREE.CubeTextureLoader( this.urls );

  	// init the cube shadder
    var shader	= THREE.ShaderLib["cube"];
  	//uniforms	= THREE.UniformsUtils.clone( shader.uniforms );
  	shader.uniforms['tCube'].value= this.textureCube;

  	var material = new THREE.ShaderMaterial({
  		fragmentShader	: shader.fragmentShader,
  		vertexShader	: shader.vertexShader,
  		uniforms	: shader.uniforms,
      //depthWrite: false,
      //side: THREE.BackSide
  	});
    // var material = new THREE.MeshBasicMaterial({
    //   color:0xFF0000
    //
    // });

  	// build the skybox Mesh
  	this.skyboxMesh	= new THREE.Mesh(
      new THREE.CubeGeometry( 10, 100, 10,  1, 1, 1, null, true ),
      material );
  	// add it to the scene
  	this.add( this.skyboxMesh );
  }

  update() {
    //this.rotation.x += 0.01;
    //this.rotation.z += 0.01;
  }
}
