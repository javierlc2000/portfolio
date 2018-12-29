npoints = 3;
points = [];
randpoint = [];
startDraw = false;

function setup() {
	createCanvas(500, 500);

	points = [];

	for (var i=0; i<npoints; i++) {
		var frac = 2*PI*i/npoints;
		points.push([width/2*sin(frac)+width/2,
						-height/2*cos(frac)+height/2]);
	}
	
	randpoint = [width/2, height/2];
	background(0);
	
	noFill();
	stroke(255);

	for (var i=0; i<npoints; i++) {
		line(points[i][0], points[i][1],
			points[(i+1)%npoints][0], points[(i+1)%npoints][1]);
	}

	ellipse(width/2, height/2, width, height)

	for (var i=0; i<npoints; i++) {
		fill(0, 155, 255);
		ellipse(points[i][0], points[i][1], 15, 15);
	}

	drawButtons();
}

function draw() {
	if (startDraw) {
		noStroke();
		fill(255,255,255);
		for (var rep=0; rep<1000; rep++) {
			var d = int(random(npoints));
			
			randpoint[0] = (randpoint[0] + points[d][0])/2; 
			randpoint[1] = (randpoint[1] + points[d][1])/2; 

			ellipse(randpoint[0], randpoint[1], 0.1, 0.1);
		}
	}
}


function mouseClicked() {
	
	if(	width-30 <= mouseX && mouseX < width &&
		height-30 <= mouseY && mouseY < height) {

		if (startDraw) startDraw = false;
		else startDraw = true;
	}
	else if( width-60 <= mouseX && mouseX < width-30 &&
		height-30 <= mouseY && mouseY < height) {

		npoints++;
	}
	else if( width-90 <= mouseX && mouseX < width-60 &&
		height-30 <= mouseY && mouseY < height) {

		if(npoints > 3) npoints--;
		else return;
	}
	else return;

	setup();	
}

function drawButtons() {
	stroke(255);
	fill(0,0,255);
	rect(width, height, -30, -30);
	fill(0);
	noStroke();
	textSize(15);
	text(" S", width-24, height-9);

	stroke(255);
	fill(0,255,0);
	rect(width-30, height, -30, -30);
	fill(0);
	noStroke();
	textSize(20);
	text("+", width-50, height-7);

	stroke(255);
	fill(255,0,0);
	rect(width-60, height, -30, -30);
	fill(0);
	noStroke();
	textSize(20);
	text("-", width-77, height-9);
}