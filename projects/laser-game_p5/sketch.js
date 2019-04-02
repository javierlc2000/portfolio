var num_collision_objects = 10;
var collision_objects = [];

var myLaser = new laser('green');
var myLaser2 = new laser('red');

function setup() {
	createCanvas(1000,500);

	for (var i = 0; i<num_collision_objects; i++) {

		var obj = new CollisionObject('box');

		obj.createBox( random(50,width - 150), random(50, height - 150),
					   random(20, 100), random(20, 100));
		
		collision_objects.push(obj);
	}

	myLaser.createLaser();
	myLaser2.createLaser();
}

function draw() {
	background(0);
	for (var i=0; i<num_collision_objects; i++) {	
		//boxes[i].update();
		//collision_objects[i].draw();
	}


	tryMove()
	myLaser.draw();
	myLaser2.draw();
}


function tryMove() {
	if (keyIsDown(UP_ARROW)) myLaser.move(0,-1, collision_objects);
	if (keyIsDown(87)) myLaser2.move(0,-1, collision_objects);

	if (keyIsDown(DOWN_ARROW)) myLaser.move(0,1, collision_objects);
	if (keyIsDown(83)) myLaser2.move(0,1, collision_objects);

	if (keyIsDown(RIGHT_ARROW)) myLaser.move(1,0, collision_objects);
	if (keyIsDown(68)) myLaser2.move(1,0, collision_objects);
	
	if (keyIsDown(LEFT_ARROW)) myLaser.move(-1,0, collision_objects);
	if (keyIsDown(65)) myLaser2.move(-1,0, collision_objects);

	if (keyIsDown(81)) myLaser2.rotate(1);
	if (keyIsDown(69)) myLaser2.rotate(-1);

	if (keyIsDown(35)) myLaser.rotate(-1);
	if (keyIsDown(16)) myLaser.rotate(1);
}