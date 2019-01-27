/*
	.			.
	..		   ..
	 ...	 ...
	   ..	..
        .	.
*/
var points1 = [ [100,100],
				[100,200], [200,200], [300,200],
									  [300,300] ];
var points2 = [];

function setup() {
	createCanvas(500, 500);

	for (var i=0; i<5; ++i) {
		points2.push([points1[i][0], 400-points1[i][1]]);
	}

	frameRate(3);
}

function draw() {
	translate(50, 0);
	background(225);
	var dib;
	if(frameCount%2 == 0) dib = points1; 
	else dib = points2; 

	fill(0);
	for (var i=0; i<5; i++) {
		var e = 20;
		if(i == 2) e = 40;

		ellipse(dib[i][0], dib[i][1], e);
		if(i > 0) line(dib[i][0], dib[i][1], dib[i-1][0], dib[i-1][1]);
	}
}