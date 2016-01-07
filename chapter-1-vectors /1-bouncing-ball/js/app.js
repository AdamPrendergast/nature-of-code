var example = (function() {

		"use strict";

		var scene = new THREE.Scene();
		var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		var light = new THREE.AmbientLight(0xffffff);
		var fov = 35;
		var aspectRatio = window.innerWidth / window.innerHeight;
		var cameraZDist = 100;
		var camera;
		var width;
		var height;

		var location = new THREE.Vector3(0, 0, 0);
		var velocity = new THREE.Vector3(1, 1, 0);
		var circle = new Circle(location);

		function initScene() {
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.getElementById('webgl-container').appendChild(renderer.domElement);

			init2DPlane();

			scene.add(light);
			camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 1000);
			camera.position.z = cameraZDist;
			scene.add(camera);
			scene.add(circle.mesh);

			render();
		}

		function init2DPlane() {
			var vFOV = fov * Math.PI / 180;        // convert vertical fov to radians
			height = 2 * Math.tan( vFOV / 2 ) * cameraZDist; // visible height
			width = height * aspectRatio;  
		}

		function setVelocity() {
			if (circle.position.x > width/2 || circle.position.x < -width/2) {
				velocity.x = velocity.x * -1;
			}
			if (circle.position.y > height/2 || circle.position.y < -height/2) {
				velocity.y = velocity.y * -1;
			}
		}

		function render() {
			setVelocity();
			circle.move(velocity);
			renderer.render(scene, camera);
			requestAnimationFrame(render);
		} 

		window.onload = initScene;


		return {
			scene: scene
		};


	})();