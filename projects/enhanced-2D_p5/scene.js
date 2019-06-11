function scene(player, obstacles) {
	this.box = [5,160,490,335];
	this.me = [this.box[2]/2, this.box[3]/2];
	
	this.max_it = 50;
	var vSlider = createSlider(0, 20, 6, 0.5);
	var avSlider = createSlider(0, 2, 0.1, 0.01);
	this.view = vSlider.value();
	this.view_an = avSlider.value();

	this.update = function() {
		this.view = vSlider.value();
		this.view_an = avSlider.value();
	}
	
	this.draw = function() {
		stroke(255);
		fill(0);
		rect(this.box[0], this.box[1], this.box[2], this.box[3]);
		
		this.rayCasting();
		this.drawPlayer();
	}
	this.findScreen = function() {
		var dx = cos(player.angle + Math.PI/2);
		var dy = sin(player.angle + Math.PI/2);
		var x = player.me[0] - this.view*dx;
		var y = player.me[1] - this.view*dy;

		if(keys.has("0")) {
			stroke(255);
			noFill();
			ellipse(80+player.me[0] - this.view*dx, 80+player.me[1] - this.view*dy, 5, 5);
			ellipse(80+player.me[0] + this.view*dx, 80+player.me[1] + this.view*dy, 5, 5);
		}
		return [x, y, dx, dy]
	}

	this.drawPlayer = function() {
		if (keys.has("9")) {
			noStroke();
			fill(180,135,80)
			rect(this.box[0] + this.me[0] - 25, this.box[1] + this.me[1] + 50, 50, 25, 1);
			rect(this.box[0] + this.me[0] - 25, this.box[1] + this.me[1] + 60, 23, 70, 1);
			rect(this.box[0] + this.me[0] + 2, this.box[1] + this.me[1] + 60, 23, 70, 1);

			fill(0,255,0);
			//rect(this.box[0] + this.me[0] - 50, this.box[1] + this.me[1] - 35, 100, 30, 1);
			rect(this.box[0] + this.me[0] - 25, this.box[1] + this.me[1] - 35, 50, 80, 1);
			rect(this.box[0] + this.me[0] - 50, this.box[1] + this.me[1] - 25, 20, 70, 1);
			rect(this.box[0] + this.me[0] + 30, this.box[1] + this.me[1] - 25, 20, 70, 1);

			fill(255,205,200);
			rect(this.box[0] + this.me[0] - 7, this.box[1] + this.me[1] - 70, 14, 40, 5);
			
			fill(255,155,100);
			ellipse(this.box[0] + this.me[0], this.box[1] + this.me[1] - 70, 50, 60);
		} 
	}

	this.rayCasting = function() {
		var an = player.angle-this.view_an;
		var scr = this.findScreen();
		var x = scr[0];
		var y = scr[1];
		var dx = scr[2];
		var dy = scr[3];

		var walls = [];
		var it_id = [];
		for (var i=0; i<obstacles.length; i++) walls.push([]);
		for (var i=0; i<obstacles.length; i++) it_id.push(0);

		for (var iteration=0; iteration<=this.max_it; iteration++) {

			var s_id = player.ray_shoot(x, y, an);
			var s = s_id[0];
			var id = s_id[1];
			// debugging

			if(s != -1) {
				var line_length = min(1.5*(255-s), this.box[3]-3);
				var line_color = min(255-s, 255);
				
				stroke(line_color);
				if (keys.has('0')) line(80+x, 80+y, 80+x+50*cos(an), 80+y+50*sin(an))

				walls[id].push( [this.box[0] + this.box[2]*iteration/this.max_it,
									this.box[1] + this.box[3]/2 - line_length/2] );
				walls[id].push( [this.box[0] + this.box[2]*iteration/this.max_it,
									this.box[1] + this.box[3]/2 + line_length/2] );
				it_id[id] += line_color;
			
			}

			for (var cid=0; cid<obstacles.length; cid++) {				
				if (walls[cid].length > 0) {
					var bx=0, by=0;
					for (var i=0; i<walls[cid].length; i++) {
						bx += walls[cid][i][0];
						by += walls[cid][i][1];
					}
					bx /= walls[cid].length;
					by /= walls[cid].length;
					
					walls[cid].sort(function(x, y) {
					  	var v1 = atan2(x[0] - bx, x[1] - by);
					  	var v2 = atan2(y[0] - bx, y[1] - by);
						
						if(v1 > v2) return 1;
						else return -1;
					});


					strokeWeight(10);
					stroke(min(255, max(0, 2*it_id[cid]/walls[cid].length)));
					fill(min(255, max(0, 2*it_id[cid]/walls[cid].length)));
					beginShape();
					var last_ind = -1;
					var last = [1e9, 1e9];
					var ef = 0;
					for (var i=0; i<walls[cid].length; i++) {
						var d = sqrt((last[0] - walls[cid][i][0])*(last[0] - walls[cid][i][0]) +
							(last[1] - walls[cid][i][1])*(last[1] - walls[cid][i][1]));
						
						if (d > 80 && last[0] != 1e9) {
							for (var it=last_ind+1; it<=i; ++it) {
								ef++;
								vertex(walls[cid][it][0], walls[cid][it][1]);
							}
							last[0] = walls[cid][i][0];
							last[1] = walls[cid][i][1];
							last_ind = i;
						}
						else if (d > 20) {
							ef++;
							vertex(walls[cid][i][0], walls[cid][i][1]);
							last[0] = walls[cid][i][0];
							last[1] = walls[cid][i][1];
							last_ind = i;
						}
					}
					endShape(CLOSE);
					strokeWeight(1);
					//console.log(ef/walls[cid].length);
				}
			}

			x += 2*this.view*dx/this.max_it;
			y += 2*this.view*dy/this.max_it;
			an += 2*this.view_an/this.max_it;
		}	

	}
}