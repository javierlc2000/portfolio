var num_collision_objects = 10;
var collision_objects = [];

var myCamera = new laser('green');

var showmode = 0;

function setup() {
	createCanvas(1000,500);

	for (var i = 0; i<num_collision_objects; i++) {

		if(i%2 == 0) {
			var obj = new CollisionObject('box');
			obj.createBox( random(50,width - 150), random(50, height - 150),
						   random(20, 100), random(20, 100));
		}
		else{
			var obj = new CollisionObject('circle');
			obj.createCircle( random(50,width - 150), random(50, height - 150), 
								random(20, 50));
		}

		collision_objects.push(obj);
	}

	myCamera.createLaser();
}

function draw() {
	background(0);

	if (showmode) for (x in collision_objects) collision_objects[x].draw();
	
	tryMove();
	
	myCamera.draw();
}

function keyPressed() {
	if(key == ' ') showmode ^= 1;
}
function mousePressed() {
}

function tryMove() {
	
	var b = 0;
	if (keyIsDown(87)) b = 1, myCamera.move(0,-1, collision_objects);
	if (keyIsDown(83)) b = 1, myCamera.move(0,1, collision_objects);
	if (keyIsDown(68)) b = 1, myCamera.move(1,0, collision_objects);
	if (keyIsDown(65)) b = 1, myCamera.move(-1,0, collision_objects);
	
	//if (b == 0) myCamera.moveSmart(collision_objects)

	//if (keyIsDown(81)) myCamera.rotate(1);
	//if (keyIsDown(69)) myCamera.rotate(-1);


}