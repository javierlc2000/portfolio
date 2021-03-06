
var nboxes = 10;
var boxes = [];
var startx = 250, starty = 250;

var eps = 0.1;

function setup() {
	createCanvas(500,500);

	for (var i = 0; i<nboxes; i++) {
		boxes.push(new Box(random(100,400), random(100,400),
							random(20, 100), random(20, 100)));
	}
	background(0);
	for (var i=0; i<nboxes; i++) {	
		boxes[i].draw();
	}
}

function draw() {
	//background(0);

	var anglex = 250 + 500*cos(frameCount/100);
	var angley = 250 + 500*sin(frameCount/100);

	var finishPoint = computeLine(startx, starty, anglex, angley, 0, 1e9, 1e9);
	//console.log(finishPoint);	
	strokeWeight(2);
	stroke('lightgreen');
	if(finishPoint[0] != 1e9) line(startx, starty, finishPoint[0], finishPoint[1]);	
	strokeWeight(1);

}


function safeRadius(mx, my) {
	var d = 1e9;
	for (var i=0; i<nboxes; i++) {	
		d = min(d, boxes[i].distanceFrom(mx, my))
	}
	return d;
}

function distance(x, y, xx, yy) {
	return sqrt((x - xx)*(x - xx) + (y - yy)*(y - yy));
}

function computeLine(cx, cy, fx, fy, or, antx, anty) {
	if (or >= 100) return [1e9, 1e9];
	if (distance(cx, cy, fx, fy) < eps) return [fx, fy];
	if (distance(cx, cy, antx, anty) < eps) {
		return [cx, cy];
	}
	var d = safeRadius(cx, cy);
	d = min(d, distance(cx, cy, fx, fy));

/*
	stroke('rgba(255,255,255,1)');
	fill('rgba(255,255,255,0.25)');

	ellipse(cx, cy, 2*d, 2*d);
	fill(255);
	ellipse(cx, cy, 5, 5);
*/

	
	var angle = atan2(fy - cy, fx - cx);
	var nx = cx + d*cos(angle);
	var ny = cy + d*sin(angle);
	return computeLine(nx, ny, fx, fy, or+1, cx, cy);
}