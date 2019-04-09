
// this class puts together all other, a scene consists in a space3D, a camera
// and maybe later a light source

function scene(myCam, myLight) {
	this.innerSpace = new space3D();
	var innerCamera = myCam;
	this.lightSource = myLight;

	this.render = function() {
		var sc = innerCamera.takePicture();
		sc.draw();
	}

	this.addCamera = function(origin, direction, definition) {
		innerCamera = new customCamera(origin, direction, definition);
	}

	this.littleAnimation = function() {
		this.innerSpace.move1Circle(frameCount/30);
	}
}