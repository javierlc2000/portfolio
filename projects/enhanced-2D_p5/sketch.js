var myGame;

function setup() {
	createCanvas(500,500);
	myGame = new game();
	//frameRate(0);
	//draw();
}

function draw() {
	background(0);
	myGame.update();
	myGame.draw();
}