var mat_offset = 50; // final value
var color_strength = 20; // final value
var frameRateEvol = 10; // final value
var INF = 10000; // final value

var mat_size = 3;
var matrix = [[]];
var original_matrix = [[]];
var sq_size = 0;

var drawing = true;
var frameCountEvol = 0;

function setup() {
	createCanvas(500, 500);

	sq_size = 400.0/mat_size;
	matrix = Array(mat_size).fill().map(() => Array(mat_size).fill(0));
	drawing = true;
	frameRate(0);
	textFont("monospace");

	draw();
}

function draw() {
	if (drawing == false) {
		matrix = matrixProduct(matrix, original_matrix);
		frameCountEvol++;
	}
	else frameCountEvol = 0;

	background(225);
	drawButtons();
	drawMatrix();
}


function mouseClicked() {
	if(	width-2-30 <= mouseX && mouseX < width-2 &&
		height-2-30 <= mouseY && mouseY < height-2) {

		if (drawing) {
			mat_size++;
			setup();	
		}
	}
	else if( width-2-60 <= mouseX && mouseX < width-2-30 &&
		height-2-30 <= mouseY && mouseY < height-2) {
		
		if (drawing) {
			mat_size--;
			if (mat_size < 1) mat_size = 1;

			setup();	
		}
	}
	else if(0 <= mouseX && mouseX < 30 &&
	    height-2-30 <= mouseY && mouseY < height-2) {

		if (drawing) {
			drawing = false;
			original_matrix = matrix;
			frameRate(frameRateEvol);
		} 	
		else {
			drawing = true;

			background(225);
			drawButtons();
			drawMatrix();
			
			frameRate(0);
		}	
	}
	else if(30 <= mouseX && mouseX < 60 &&
	    height-2-30 <= mouseY && mouseY < height-2) {
		
		if (drawing) {
			setup();
		} 	
	}
	else {
		for (var i=0; i<mat_size; ++i) {
			for (var j=0; j<mat_size; ++j) {
			
				if( i*sq_size + mat_offset <= mouseX && mouseX < (i+1)*sq_size + mat_offset &&
					j*sq_size + mat_offset <= mouseY && mouseY < (j+1)*sq_size + mat_offset) {
					
					if (drawing) {
						if(keyIsPressed && keyCode == SHIFT) matrix[i][j]--;				
						else matrix[i][j]++;
					}
				}					
			}
		}
		draw();
	}
}

function drawButtons() {

	if (drawing) {
		stroke(0);
		fill(0,255,0);
		rect(width-2, height-2, -30, -30);
		fill(0);
		noStroke();
		textSize(20);
		text("+", width-2-20, height-2-10);

		stroke(0);
		fill(255,0,0);
		rect(width-2-30, height-2, -30, -30);
		fill(0);
		noStroke();
		textSize(20);
		text("-", width-2-50, height-2-10);

		stroke(0);
		fill(0,255, 0);
		rect(0, height-2, 30, -30);
	
		fill(0);
		noStroke();
		textSize(20);
		text("^", 10, height-2-9);
		textSize(15);
		text("|", 11.4, height-2-10);
		
		fill(255,0, 0);
		stroke(0);
		rect(30, height-2, 30, -30);
	
		fill(0);
		noStroke();
		textStyle(BOLD);
		textSize(20);
		text(char(0x25A0), 40, height-2-8);
		textStyle(NORMAL);
	}
	else{
		stroke(0);
		fill(255, 0, 0);
		rect(0, height-2, 30, -30);
	
		fill(0);
		noStroke();
		textSize(15);
		
		text("X", 12, height-2-9);
		
		text("^"+frameCountEvol, 45, height-2-9)	
	}
}

function drawMatrix() {
	for (var i=0; i<mat_size; ++i) {
		for (var j=0; j<mat_size; ++j) {
			stroke(0);
			var col_temp = matrix[i][j]*color_strength;

			if(matrix[i][j] >= 0) {
				fill(255-col_temp/pow(color_strength, 2),255 - col_temp/color_strength,255-col_temp);
			}
			else {
				col_temp *= -1;
				fill(255-col_temp, 255-col_temp/color_strength, 255-col_temp/pow(color_strength, 2));
			}

			rect(i*sq_size + mat_offset, j*sq_size + mat_offset,
				sq_size, sq_size);

			textSize(sq_size/5);
			var t = matrix[i][j];
			var l = floor(log(abs(t))/log(10));
			if (t == 0) l = 0;
			if (t < 0) l++;

			fill(0);

			if(t < -2500 || t > 2500) fill(255);
			if (t >= INF){
				t = "+INF";
				l = 3;
			}
			if (t <= -INF){
				t = "-INF";
				l = 3;
			}

			text(t, (i+0.45 - l/15)*sq_size + mat_offset,
					(j+0.58)*sq_size + mat_offset);
		}
	}
}

function matrixProduct(A, B) {
	var C = Array(mat_size).fill().map(() => Array(mat_size).fill(0));

	for (var i=0; i<mat_size; i++)
		for (var j=0; j<mat_size; j++)
			for (var k=0; k<mat_size; k++) C[i][j] += A[i][k]*B[k][j];
	for (var i=0; i<mat_size; i++)
		for (var j=0; j<mat_size; j++)
			C[i][j] = min(INF, max(-INF, C[i][j]));
	return C;
}