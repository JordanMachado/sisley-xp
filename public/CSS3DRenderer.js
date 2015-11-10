/**
 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CSS3DObject = function(element) {

	THREE.Object3D.call(this);

	this.element = element;
	this.element.style.position = 'absolute';

	this.addEventListener('removed', function(event) {

		if (this.element.parentNode !== null) {

			this.element.parentNode.removeChild(this.element);

		}

	});

};



THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.CSS3DObject.prototype.constructor = THREE.CSS3DObject;
THREE.CSS3DObject.prototype.raycast = (function() {

	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();
	var sphere = new THREE.Sphere();

	var vA = new THREE.Vector3();
	var vB = new THREE.Vector3();
	var vC = new THREE.Vector3();

	var tempA = new THREE.Vector3();
	var tempB = new THREE.Vector3();
	var tempC = new THREE.Vector3();

	var uvA = new THREE.Vector2();
	var uvB = new THREE.Vector2();
	var uvC = new THREE.Vector2();

	var barycoord = new THREE.Vector3();

	var intersectionPoint = new THREE.Vector3();
	var intersectionPointWorld = new THREE.Vector3();

	function uvIntersection(point, p1, p2, p3, uv1, uv2, uv3) {

		THREE.Triangle.barycoordFromPoint(point, p1, p2, p3, barycoord);

		uv1.multiplyScalar(barycoord.x);
		uv2.multiplyScalar(barycoord.y);
		uv3.multiplyScalar(barycoord.z);

		uv1.add(uv2).add(uv3);

		return uv1.clone();

	}

	return function raycast(raycaster, intersects) {

		var geometry = this.geometry;

		// Checking boundingSphere distance to ray

		if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

		sphere.copy(geometry.boundingSphere);
		sphere.applyMatrix4(this.matrixWorld);

		if (raycaster.ray.isIntersectionSphere(sphere) === false) {

			return;

		}

		// Check boundingBox before continuing

		inverseMatrix.getInverse(this.matrixWorld);
		ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

		if (geometry.boundingBox !== null) {

			if (ray.isIntersectionBox(geometry.boundingBox) === false) {

				return;

			}

		}

		var a, b, c;

		if (geometry instanceof THREE.BufferGeometry) {

			var index = geometry.index;
			var attributes = geometry.attributes;

			if (index !== null) {

				var indices = index.array;
				var positions = attributes.position.array;

				for (var i = 0, l = indices.length; i < l; i += 3) {

					a = indices[i];
					b = indices[i + 1];
					c = indices[i + 2];

					vA.fromArray(positions, a * 3);
					vB.fromArray(positions, b * 3);
					vC.fromArray(positions, c * 3);


					if (ray.intersectTriangle(vA, vB, vC, true, intersectionPoint) === null) continue;

					intersectionPointWorld.copy(intersectionPoint);
					intersectionPointWorld.applyMatrix4(this.matrixWorld);

					var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

					if (distance < raycaster.near || distance > raycaster.far) continue;

					var uv;

					if (attributes.uv !== undefined) {

						var uvs = attributes.uv.array;
						uvA.fromArray(uvs, a * 2);
						uvB.fromArray(uvs, b * 2);
						uvC.fromArray(uvs, c * 2);
						uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);

					}

					intersects.push({

						distance: distance,
						point: intersectionPointWorld.clone(),
						uv: uv,
						face: new THREE.Face3(a, b, c, THREE.Triangle.normal(vA, vB, vC)),
						faceIndex: Math.floor(i / 3), // triangle number in indices buffer semantics
						object: this

					});

				}

			} else {

				var positions = attributes.position.array;

				for (var i = 0, l = positions.length; i < l; i += 9) {

					vA.fromArray(positions, i);
					vB.fromArray(positions, i + 3);
					vC.fromArray(positions, i + 6);


					if (ray.intersectTriangle(vA, vB, vC, true, intersectionPoint) === null) continue;


					intersectionPointWorld.copy(intersectionPoint);
					intersectionPointWorld.applyMatrix4(this.matrixWorld);

					var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

					if (distance < raycaster.near || distance > raycaster.far) continue;

					var uv;

					if (attributes.uv !== undefined) {

						var uvs = attributes.uv.array;
						uvA.fromArray(uvs, i);
						uvB.fromArray(uvs, i + 2);
						uvC.fromArray(uvs, i + 4);
						uv = uvIntersection(intersectionPoint, vA, vB, vC, uvA, uvB, uvC);

					}

					a = i / 3;
					b = a + 1;
					c = a + 2;

					intersects.push({

						distance: distance,
						point: intersectionPointWorld.clone(),
						uv: uv,
						face: new THREE.Face3(a, b, c, THREE.Triangle.normal(vA, vB, vC)),
						index: a, // triangle number in positions buffer semantics
						object: this

					});

				}

			}

		} else if (geometry instanceof THREE.Geometry) {


			var vertices = geometry.vertices;
			var faces = geometry.faces;

			for (var f = 0, fl = faces.length; f < fl; f++) {

				var face = faces[f];

				a = vertices[face.a];
				b = vertices[face.b];
				c = vertices[face.c];


				if (ray.intersectTriangle(a, b, c, true, intersectionPoint) === null) continue;


				intersectionPointWorld.copy(intersectionPoint);
				intersectionPointWorld.applyMatrix4(this.matrixWorld);

				var distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

				if (distance < raycaster.near || distance > raycaster.far) continue;

				var uv;

				if (geometry.faceVertexUvs[0].length > 0) {

					var uvs = geometry.faceVertexUvs[0][f];
					uvA.copy(uvs[0]);
					uvB.copy(uvs[1]);
					uvC.copy(uvs[2]);
					uv = uvIntersection(intersectionPoint, a, b, c, uvA, uvB, uvC);

				}

				intersects.push({

					distance: distance,
					point: intersectionPointWorld.clone(),
					uv: uv,
					face: face,
					faceIndex: f,
					object: this

				});

			}

		}

	};

}());

THREE.CSS3DSprite = function(element) {

	THREE.CSS3DObject.call(this, element);

};

THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype);
THREE.CSS3DSprite.prototype.constructor = THREE.CSS3DSprite;

// detect support for transfor-style: preserve-3d
var hasPreserve3d = (function() {

	// apply prefixed styles to dom element
	var setStyle = function(el, name, value, prefixes) {

		prefixes = prefixes || ["Webkit", "Moz", "O", "Ms"];
		var n = prefixes.length;

		while (n--) {
			var prefix = prefixes[n];
			el.style[prefix + name.charAt(0).toUpperCase() + name.slice(1)] = value;
			el.style[name] = value;
		}

	};

	// get prefixed computed css property
	var getComputedProperty = function(element, property_name) {

		var computedStyle = window.getComputedStyle(element, null);

		return computedStyle.getPropertyValue(property_name) ||
			computedStyle.getPropertyValue('-webkit-' + property_name) ||
			computedStyle.getPropertyValue('-moz-' + property_name) ||
			computedStyle.getPropertyValue('-o-' + property_name) ||
			computedStyle.getPropertyValue('-ms-' + property_name);

	};

	// create test element
	var test_el = document.createElement('div');
	test_el.style.display = 'none';
	setStyle(test_el, 'transformStyle', 'preserve-3d');

	// add to body so we can get computed style
	document.getElementsByTagName('body')[0].appendChild(test_el);
	var val = getComputedProperty(test_el, 'transform-style');
	test_el.parentElement.removeChild(test_el);

	return val == 'preserve-3d';

})();

THREE.CSS3DRenderer = function() {

	console.log('THREE.CSS3DRenderer', THREE.REVISION);

	var _width, _height;
	var _widthHalf, _heightHalf;

	var matrix = new THREE.Matrix4();

	var cache = {
		camera: {
			fov: 0,
			style: ''
		},
		objects: {}
	};

	var _needsDepthSorting = false;


	var domElement = document.createElement('div');
	domElement.style.overflow = 'hidden';
	this.domElement = domElement;

	var cameraElement;

	if (hasPreserve3d) {

		domElement.style.WebkitTransformStyle = 'preserve-3d';
		domElement.style.MozTransformStyle = 'preserve-3d';
		domElement.style.oTransformStyle = 'preserve-3d';
		domElement.style.transformStyle = 'preserve-3d';

		cameraElement = document.createElement('div');

		cameraElement.style.WebkitTransformStyle = 'preserve-3d';
		cameraElement.style.MozTransformStyle = 'preserve-3d';
		cameraElement.style.oTransformStyle = 'preserve-3d';
		cameraElement.style.transformStyle = 'preserve-3d';

		domElement.appendChild(cameraElement);

		_needsDepthSorting = false;

	} else {

		domElement.style.WebkitPerspectiveOrigin = '50% 50% 0';
		domElement.style.MozPerspectiveOrigin = '50% 50% 0';
		domElement.style.MsPerspectiveOrigin = '50% 50% 0';
		domElement.style.oPerspectiveOrigin = '50% 50% 0';
		domElement.style.perspectiveOrigin = '50% 50% 0';

		domElement.style.WebkitTransformOrigin = '50% 50% 0';
		domElement.style.MozTransformOrigin = '50% 50% 0';
		domElement.style.MsTransformOrigin = '50% 50% 0';
		domElement.style.oTransformOrigin = '50% 50% 0';
		domElement.style.transformOrigin = '50% 50% 0';

		cameraElement = domElement;

		_needsDepthSorting = true;
	}



	this.setClearColor = function() {

	};

	this.setSize = function(width, height) {

		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

		cameraElement.style.width = width + 'px';
		cameraElement.style.height = height + 'px';

	};

	var epsilon = function(value) {

		return Math.abs(value) < 0.000001 ? 0 : value;

	};

	var getCameraCSSMatrix = function(matrix) {

		// matrix = matrix.clone();
		// matrix.multiply(SCALE);

		var elements = matrix.elements;

		return 'matrix3d(' +
			epsilon(elements[0]) + ',' +
			epsilon(-elements[1]) + ',' +
			epsilon(elements[2]) + ',' +
			epsilon(elements[3]) + ',' +
			epsilon(elements[4]) + ',' +
			epsilon(-elements[5]) + ',' +
			epsilon(elements[6]) + ',' +
			epsilon(elements[7]) + ',' +
			epsilon(elements[8]) + ',' +
			epsilon(-elements[9]) + ',' +
			epsilon(elements[10]) + ',' +
			epsilon(elements[11]) + ',' +
			epsilon(elements[12]) + ',' +
			epsilon(-elements[13]) + ',' +
			epsilon(elements[14]) + ',' +
			epsilon(elements[15]) +
			')';

	};

	var getObjectCSSMatrix = function(matrix) {

		var elements = matrix.elements;

		return 'matrix3d(' +
			epsilon(elements[0]) + ',' +
			epsilon(elements[1]) + ',' +
			epsilon(elements[2]) + ',' +
			epsilon(elements[3]) + ',' +
			epsilon(-elements[4]) + ',' +
			epsilon(-elements[5]) + ',' +
			epsilon(-elements[6]) + ',' +
			epsilon(-elements[7]) + ',' +
			epsilon(elements[8]) + ',' +
			epsilon(elements[9]) + ',' +
			epsilon(elements[10]) + ',' +
			epsilon(elements[11]) + ',' +
			epsilon(elements[12]) + ',' +
			epsilon(elements[13]) + ',' +
			epsilon(elements[14]) + ',' +
			epsilon(elements[15]) +
			')';

	};

	var renderObject = function(object, camera, view_matrix) {

		if (!object.visible) {

			if (object instanceof THREE.CSS3DObject) object.element.style.visibility = 'hidden';

		} else {



			if (object instanceof THREE.CSS3DObject) {

				var element = object.element;
				var style;
				element.style.visibility = 'visible';


				if (object instanceof THREE.CSS3DSprite) {

					// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

					matrix.copy(camera.matrixWorldInverse);
					matrix.transpose();
					matrix.copyPosition(object.matrixWorld);
					matrix.scale(object.scale);

					matrix.elements[3] = 0;
					matrix.elements[7] = 0;
					matrix.elements[11] = 0;
					matrix.elements[15] = 1;

					style = view_matrix + " " + getObjectCSSMatrix(matrix);

				} else {

					style = view_matrix + " " + getObjectCSSMatrix(object.matrixWorld);


				}

				var cachedStyle = cache.objects[object.id];

				if (cachedStyle === undefined || cachedStyle !== style) {

					element.style.WebkitTransform = style;
					element.style.MozTransform = style;
					element.style.oTransform = style;
					element.style.transform = style;

					cache.objects[object.id] = style;

					// TODO: depth sorting for IE 10
					if (_needsDepthSorting) {

						// sort by z position
						element.style.zIndex = Math.round(object.matrixWorld.elements[14] * 1000);

					}

				}



				if (element.parentNode !== cameraElement) {

					cameraElement.appendChild(element);

				}
			}

		}



		for (var i = 0, l = object.children.length; i < l; i++) {

			renderObject(object.children[i], camera, view_matrix);

		}

	};

	this.render = function(scene, camera) {

		var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;

		if (cache.camera.fov !== fov) {

			domElement.style.WebkitPerspective = fov + "px";
			domElement.style.MozPerspective = fov + "px";
			domElement.style.oPerspective = fov + "px";
			domElement.style.perspective = fov + "px";

			cache.camera.fov = fov;

		}

		scene.updateMatrixWorld();

		if (camera.parent === undefined) camera.updateMatrixWorld();

		camera.matrixWorldInverse.getInverse(camera.matrixWorld);

		if (hasPreserve3d) {

			var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) +
				" translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";


			if (cache.camera.style !== style) {

				cameraElement.style.WebkitTransform = style;
				cameraElement.style.MozTransform = style;
				cameraElement.style.oTransform = style;
				cameraElement.style.transform = style;

				cache.camera.style = style;

			}

			renderObject(scene, camera, "translate3d(-50%, -50%, 0)");

		} else {
			var view_matrix =
				"translate3d(-50%, -50%, 0) " +
				"translate3d(" + _widthHalf + "px," + _heightHalf + "px, " + fov + "px) " +
				getCameraCSSMatrix(camera.matrixWorldInverse);

			renderObject(scene, camera, view_matrix);

		}


	};


};
