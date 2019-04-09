
var myScene;

function setup() {
	createCanvas(500,500);

	// construct camera
	var cameraOrigin = new point3D(0, 0, 100);
	var cameraDirection = new point3D(0, 0, -1);
	var screenDirection = new point3D(1, 0, 0);
	var cameraDefinition = width/10;
	var camZoom = 2/cameraDefinition;
	var myCamera = new customCamera(cameraOrigin, cameraDirection, cameraDefinition, 
									screenDirection, camZoom);

	// construct light source
	var myLight = new point3D(200, 200, 70);
	
	// construct scene
	myScene = new scene(myCamera, myLight);

	// construct sample space inside myScene
	var sphCenter = new point3D(0,0,0);
	var sphRadius = 40;
	var sphColor = new customColor(255, 0, 0, 1);
	myScene.innerSpace.addSphere(sphCenter, sphRadius, sphColor)
	
	sphCenter = new point3D(50,0,0);
	sphRadius = 10;
	sphColor = new customColor(0, 255, 0, 0.4);
	myScene.innerSpace.addSphere(sphCenter, sphRadius, sphColor)
	
}

function draw() {
	myScene.render();
	//console.log(frameRate())

	myScene.littleAnimation();
	
}
