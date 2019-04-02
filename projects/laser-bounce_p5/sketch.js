
var nboxes = 10;
var boxes = [];
var startx = 250, starty = 250;

var eps = 0.1;

function setup() {
	createCanvas(500,500);

	for (var i = 0; i<nboxes; i++) {
		boxes.push(new Box(random(0,400), random(0,400),
							random(20, 100), random(20, 100)));
	}
	
}

function draw() {
	background(0);
	for (var i=0; i<nboxes; i++) {	
		boxes[i].update();
		boxes[i].draw();
	}


	var angle = frameCount/400;
	var lsx = cos(angle);
	var lsy = sin(angle);
	var anglex = 250 + 500*lsx;
	var angley = 250 + 500*lsy;

	computeLine(250, 250, //start point 
				1e9, 1e9, // last point
				lsx, lsy, // last velocities
				250, 250, // current point
				anglex, angley, // finish point
				0, 0); // recursive limiters
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

function computeLine(sx, sy, lx, ly, lsx, lsy, cx, cy, fx, fy, or_line, or_reboot) {
	if (or_line >= 100 || or_reboot >= 10)  return;
	
	if (distance(cx, cy, fx, fy) < eps) {

		strokeWeight(2);
		var alpha = (10 - or_reboot)/10;
		stroke('rgba(100, 255, 100,' + alpha + ')');
		line(sx, sy, cx, cy);	
		strokeWeight(1);

		return;
	}
	
	if (distance(cx, cy, lx, ly) < eps) {		

		strokeWeight(2);
		var alpha = (10 - or_reboot)/10;
		stroke('rgba(100, 255, 100,' + alpha + ')');
		line(sx, sy, cx, cy);	
		strokeWeight(1);

		//console.log('change dir');	

		var d1 = safeRadius(cx+lsx, cy-lsy);
		var d2 = safeRadius(cx-lsx, cy+lsy);

		if (d1 >= d2) computeLine(cx, cy, 1e9, 1e9, lsx, -lsy, cx+lsx, cy-lsy, cx + 500*lsx, cy - 500*lsy, 0, or_reboot+1);
		else computeLine(cx, cy, 1e9, 1e9, -lsx, lsy, cx-lsx, cy+lsy, cx - 500*lsx, cy + 500*lsy, 0, or_reboot+1);
		return;
	}
	
	//console.log("eoo");

	var d = safeRadius(cx, cy);
	d = min(d, distance(cx, cy, fx, fy));
	d *= 0.8; // adavnces slowly gains precision
	var nx = cx + d*lsx;
	var ny = cy + d*lsy;

	return computeLine(sx, sy, cx, cy, lsx, lsy, nx, ny, fx, fy, or_line+1, or_reboot);
}