function Circle(position) {

	var material = new THREE.MeshBasicMaterial({
		color: 0xff0000
	});

	var radius = 5;
	var segments = 32;

	var circleGeometry = new THREE.CircleGeometry( radius, segments );
	var circle = new THREE.Mesh( circleGeometry, material );
	circle.position.set(position.x, position.y, position.z);

	this.position = circle.position;
	this.mesh = circle;

	return this;
}

Circle.prototype = {
	
	constructor: Circle,

	move: function (vector) {
		this.mesh.position.add(vector);
	}

}