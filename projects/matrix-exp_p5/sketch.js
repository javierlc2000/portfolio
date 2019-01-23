var mat_offset = 50; // final value
var color_strength = 10; // final value
var frameRateEvol = 10; // final value

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

		mat_size++;

		setup();	
	}
	else if( width-2-60 <= mouseX && mouseX < width-2-30 &&
		height-2-30 <= mouseY && mouseY < height-2) {
		
		mat_size--;
		if (mat_size < 1) mat_size = 1;

		setup();	
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
			setup();
			frameRate(0);
		}	
	}
	else {
		for (var i=0; i<mat_size; ++i) {
			for (var j=0; j<mat_size; ++j) {
			
				if( i*sq_size + mat_offset <= mouseX && mouseX < (i+1)*sq_size + mat_offset &&
					j*sq_size + mat_offset <= mouseY && mouseY < (j+1)*sq_size + mat_offset) {
					
					drawing = true;
					frameRate(0);

					matrix[i][j]++;				
					
				}					
			}
		}
		draw();
	}
}

function drawButtons() {
	stroke(0);
	fill(0,255,0);
	rect(width-2, height-2, -30, -30);
	fill(0);
	noStroke();
	textSize(20);
	text("+", width-2-20, height-2-7);

	stroke(0);
	fill(255,0,0);
	rect(width-2-30, height-2, -30, -30);
	fill(0);
	noStroke();
	textSize(20);
	text("-", width-2-48, height-2-9);

	stroke(0);
	if (drawing) {
		fill(0,255, 0);
		rect(0, height-2, 30, -30);
	
		fill(0);
		noStroke();
		textSize(20);
		text("^", 10, height-2-9);
		textSize(15);
		text("|", 13, height-2-10);

	}
	else{
		fill(255, 0, 0);
		rect(0, height-2, 30, -30);
	
		fill(0);
		noStroke();
		textSize(15);
		
		text("X", 12, height-2-9);
		
		text(frameCountEvol, 40, height-2-9)
		
	}
}

function drawMatrix() {
	for (var i=0; i<mat_size; ++i) {
		for (var j=0; j<mat_size; ++j) {
			stroke(0);
			var col_temp = matrix[i][j]*color_strength;
			fill(255 - col_temp/pow(color_strength, 2),255 - col_temp/color_strength,255-col_temp);
		
			rect(i*sq_size + mat_offset, j*sq_size + mat_offset,
				sq_size, sq_size);
		}
	}
}

function matrixProduct(A, B) {
	var C = Array(mat_size).fill().map(() => Array(mat_size).fill(0));

	for (var i=0; i<mat_size; i++)
		for (var j=0; j<mat_size; j++)
			for (var k=0; k<mat_size; k++) C[i][j] += A[i][k]*B[k][j];

	return C;
}