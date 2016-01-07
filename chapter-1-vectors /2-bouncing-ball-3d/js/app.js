var example = (function() {

		"use strict";

		var scene = new THREE.Scene();
		var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		var light = new THREE.DirectionalLight(0xffffff);
		var fov = 35;
		var aspectRatio = window.innerWidth / window.innerHeight;
		var cameraZDist = 100;
		var boxSize = 30;
		var camera;
		var box;
		var ball;

		var location = new THREE.Vector3(0, 0, 0);
		var velocity = new THREE.Vector3(0.3, 0.2, 0.1);

		function initScene() {
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.getElementById('webgl-container').appendChild(renderer.domElement);
			scene.add(light);
			camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 1000);
			camera.position.z = cameraZDist;
			scene.add(camera);

			initBox();
			initBall();

			render();
		}

		function initBox() {
			var subdivisionCount = 4;
			box = new THREE.Mesh(
        new THREE.BoxGeometry(boxSize, boxSize, boxSize, subdivisionCount, subdivisionCount, subdivisionCount),
        new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } )
    	);
			scene.add(box);
		}

		function initBall() {
			var geometry = new THREE.SphereGeometry(3, 20, 12);
			var material = new THREE.MeshPhongMaterial({
				color: 0xffff00, 
				specular:0x333333,
        shininess: 100
      });
			ball = new THREE.Mesh( geometry, material );
			ball.position.set(location.x, location.y, location.z);
			scene.add( ball );
		}

		function setVelocity() {
			if (ball.position.x > boxSize/2 || ball.position.x < -boxSize/2) {
				velocity.x = velocity.x * -1;
			}
			if (ball.position.y > boxSize/2 || ball.position.y < -boxSize/2) {
				velocity.y = velocity.y * -1;
			}
			if (ball.position.z > boxSize/2 || ball.position.z < -boxSize/2) {
				velocity.z = velocity.z * -1;
			}
		}

		function render() {
			setVelocity();
			ball.position.add(velocity);
			renderer.render(scene, camera);
			requestAnimationFrame(render);
		}

		window.onload = initScene;
		

		return {
			scene: scene
		};


	})();