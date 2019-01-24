var sq_size = 400/3;
var padd = 50;

var table = Array(7).fill().map(() => Array(7).fill(0));
var p1 = 0;
var p2 = 0;

function setup() {
	createCanvas(500, 500);
	background(225);
	play();
}

function draw() {
	// draw faces
	noStroke();
	textSize(20);
	fill(225);
	rect(465, 218, 20, 20);
	fill(0, 0, 255);
	text(p1, 470, 235);
	
	fill(225);
	rect(465, 268, 20, 20);
	fill(255, 0, 0);
	text(p2, 470, 285);

	fill(0);
	textSize(10);
	text("|", 474, 256)

	stroke(0);
	for (var i=1; i<7; i+=2) {
		for (var j=1; j<7; j+=2) {
			if (table[i][j] == 0) continue;

			if (table[i][j] == 1) fill(200, 200, 255);
			else if (table[i][j] == 2) fill(255, 200, 200);
			
			var ipad = floor((i-1)/2);
			var jpad = floor((j-1)/2);
			
			rect(ipad*sq_size+padd, jpad*sq_size+padd, sq_size, sq_size);
		}
	}

	// draw edges
	for (var i=0; i<7; i++) {
		for (var j=0; j<7; j++) {
			// si es un node o una cara fora
			if (i%2 == j%2) continue;

			if (i%2 == 0) {
				// coordenades reduides sobre els edges
				var ipad = floor(i/2);
				var jpad = floor((j+1)/2);
			
				if (table[i][j] == 0) {
					if (ipad*sq_size+padd-2.5 <= mouseX && mouseX < ipad*sq_size+padd+2.5 &&
					 	(jpad-1)*sq_size+padd <= mouseY && mouseY < jpad*sq_size+padd) {
						stroke(255,0,0);
					}
					else stroke(200);	
				}
				if(table[i][j] == 1) stroke(0,0,255);
				else if (table[i][j] == 2) stroke(255,0,0);

				if (jpad > 0)
					line(ipad*sq_size + padd, jpad*sq_size + padd,
						ipad*sq_size + padd, (jpad-1)*sq_size + padd);
			}
			else {
				var ipad = floor((i+1)/2);
				var jpad = floor(j/2);
		
				if (table[i][j] == 0) {
					if ((ipad-1)*sq_size+padd <= mouseX && mouseX < ipad*sq_size+padd &&
					 	jpad*sq_size+padd-2.5 <= mouseY && mouseY < jpad*sq_size+padd+2.5) {
						stroke(255,0,0);
					}
					else stroke(200);
				}
				if(table[i][j] == 1) stroke(0,0,255);
				else if (table[i][j] == 2) stroke(255,0,0);
				
				if (ipad > 0)
					line(ipad*sq_size + padd, jpad*sq_size + padd,
						(ipad-1)*sq_size + padd, jpad*sq_size + padd);
			}
		}
	}	

	// draw corners
	stroke(0);
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			fill(0);
			ellipse(i*sq_size + padd, j*sq_size + padd, 10, 10);
		}
	}
}

function mouseClicked() {
	for (var i=0; i<7; i++) {
		for (var j=0; j<7; j++) {
			// si es un node o una cara fora
			if (i%2 == j%2) continue;

			if (i%2 == 0) {
				// coordenades reduides sobre els edges
				var ipad = floor(i/2);
				var jpad = floor((j+1)/2);
			
				if (table[i][j] == 0) {
					if (ipad*sq_size+padd-2.5 <= mouseX && mouseX < ipad*sq_size+padd+2.5 &&
					 	(jpad-1)*sq_size+padd <= mouseY && mouseY < jpad*sq_size+padd) {
						
						table[i][j] = 2;
						checkFaces(2);
						return;
					}
				}
			}
			else {
				var ipad = floor((i+1)/2);
				var jpad = floor(j/2);
		
				if (table[i][j] == 0) {
					if ((ipad-1)*sq_size+padd <= mouseX && mouseX < ipad*sq_size+padd &&
					 	jpad*sq_size+padd-2.5 <= mouseY && mouseY < jpad*sq_size+padd+2.5) {
					

						table[i][j] = 2;
						checkFaces(2);
						return;
					}
				}
			}
		}
	}	
}

function checkFaces(p) {
	var fet = false;
	for (var i=1; i<7; i+=2) {
		for (var j=1; j<7; j+=2) {
			if (table[i][j] != 0) continue;

			if (table[i-1][j] != 0 &&
				table[i][j-1] != 0 &&
				table[i+1][j] != 0 &&
				table[i][j+1] != 0) {
				// encasillado

				table[i][j] = p;
				if (p == 1) p1++;
				else p2++;

				fet = true;
			}
		}
	}
	if (p == 1) {
		if (fet) {
			play();
		}
	}
	else {
		if (!fet) {
			play();
		}
	}
}

function play() {
	// greedy puc obtenir punts
	var punts = Array(7).fill().map(() => Array(7).fill(0));
	for (var i=1; i<7; i+=2) {
		for (var j=1; j<7; j+=2) {
			if (table[i][j] != 0) continue;

			if (table[i-1][j] != 0 &&
				table[i][j-1] != 0 &&
				table[i+1][j] != 0) {

				punts[i][j+1]++;
			}
			if (table[i][j+1] != 0 &&
				table[i][j-1] != 0 &&
				table[i+1][j] != 0) {

				punts[i-1][j]++;
			}
			if (table[i][j+1] != 0 &&
				table[i][j-1] != 0 &&
				table[i-1][j] != 0) {

				punts[i+1][j]++;
			}
			if (table[i][j+1] != 0 &&
				table[i+1][j] != 0 &&
				table[i-1][j] != 0) {

				punts[i][j-1]++;
			}
		}
	}
	var mjugada = [0,0,0];
	for (var i=0; i<7; i++) {
		for (var j=0; j<7; j++) {
			if (punts[i][j] > mjugada[2]) {
				mjugada = [i, j, punts[i][j]];
			}
		}
	}
	if (mjugada[2] != 0) {
		table[mjugada[0]][mjugada[1]] = 1;
		checkFaces(1);
		return;
	}

	// primeres jugades optimes
	var opt = [[2,1], [5,2], [4,5], [1,4]];
	shuffle(opt, true);
	for (var i=0; i<4; i++) {
		if (table[opt[i][0]][opt[i][1]] == 0) {
			
			table[opt[i][0]][opt[i][1]] = 1;
			checkFaces(1);
			return;
		}
	}

	// ultima instancia, hacer la next
	for (var i=0; i<7; i++) {
		for (var j=0; j<7; j++) {
			// si es un node o una cara fora
			if (i%2 == j%2) continue;
			// ya esta jugado
			if (table[i][j] != 0) continue;

			table[i][j] = 1;
			checkFaces(1);
			return;
		}
	}
}