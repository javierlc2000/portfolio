function laser() {
	
	var max_seen_points = 200;

	var EPSILON = 0.1;
	var MAPPING_EPSILON = 10;
	var num_bounces = 2;
	var num_iter_line = 100;
	
	var range = 50;
	var speed = 3;
	var ang_speed = 0.05;
	
	var radius = 10;

	var seenPoints = []

	this.createLaser = function() {
		this.x = 50;
		this.y = 50;
		this.angle = Math.PI/4;
		this.dir_x = cos(Math.PI/4);
		this.dir_y = sin(Math.PI/4);
	}


	this.draw = function() {		

		strokeWeight(2);
		stroke('rgba(0, 0, 0,' + 1 + ')');
		fill('rgba(100, 255, 100,' + 0.9 + ')');
		ellipse(this.x, this.y, 2*radius, 2*radius);

		for (var i=0; i<360; i+=60) {
			var angle = this.angle + i/180*Math.PI;
			var anglex = this.x + 1000*cos(angle);
			var angley = this.y + 1000*sin(angle);

			computeLine(this.x, this.y, //start point 
						1e9, 1e9, // last point
						cos(angle), sin(angle), // last velocities
						this.x, this.y, // current point
						anglex, angley, // finish point
						0, 0, 0); // recursive limiters
		}
		
		
		for (var i = 0; i<seenPoints.length; i++) {
			ellipse(seenPoints[i][0], seenPoints[i][1], 5, 5);
		}

		//console.log(seenPoints.length);
	}

	this.move = function(dx, dy, col) {
		this.x += dx*speed;
		this.y += dy*speed;

		for (var i=0; i<col.length; i++) {
			if (col[i].inside(this.x - radius, this.y - radius) ||
				col[i].inside(this.x - radius, this.y + radius) ||
				col[i].inside(this.x + radius, this.y - radius) ||
				col[i].inside(this.x + radius, this.y + radius) ) {
				this.x -= dx*speed;
				this.y -= dy*speed;
				return;
			}
		}

		if (this.x-radius < 0 || this.x+radius >= width
			|| this.y-radius < 0 || this.y+radius >= height) {
			
			this.x -= dx*speed;
			this.y -= dy*speed;
			return;
		}
	}	

	this.moveSmart = function(col) {
		var ox = this.x;
		var oy = this.y;

		this.x += this.dir_x*speed;
		this.y += this.dir_y*speed;
		
		for (var i=0; i<col.length; i++) {
			if (col[i].inside(this.x - radius, this.y - radius) ||
				col[i].inside(this.x - radius, this.y + radius) ||
				col[i].inside(this.x + radius, this.y - radius) ||
				col[i].inside(this.x + radius, this.y + radius) ||
				this.x-radius < 0 || this.x+radius >= width
				|| this.y-radius < 0 || this.y+radius >= height)  {
				
				this.x = ox;
				this.y = oy;

				var d1 = safeRadius(this.x+this.dir_x, this.y-this.dir_y);
				var d2 = safeRadius(this.x-this.dir_x, this.y+this.dir_y);

				if (d1 <= d2) this.dir_x *= -1;
				else this.dir_y *= -1;

				this.angle = atan2(this.dir_y, this.dir_x);

				return;
			}
		}
	}

	this.rotate = function(da) {
		this.angle += da*ang_speed;

		this.dir_x = cos(this.angle);
		this.dir_y = sin(this.angle);
	}

	function safeRadius(mx, my) {
		var d = 1e9;
		for (var i=0; i<num_collision_objects; i++) {	
			d = min(d, collision_objects[i].distanceFrom(mx, my))
		}

		return Math.min(d, mx, my, width - mx, height - my);
	}

	function distance(x, y, xx, yy) {
		return sqrt((x - xx)*(x - xx) + (y - yy)*(y - yy));
	}

	function makeLine(sx, sy, cx, cy, alpha) {
		strokeWeight(2);
		stroke('rgba(100, 255, 100,' + alpha + ')');
		line(sx, sy, cx, cy);
	}

	function optimisePoints() {
		seenPoints.sort();
		var lasti = -1;
		seenPoints2 = []
		for (var i=0; i<seenPoints.length; i++) {
			if (lasti == -1 || 
				distance(seenPoints[lasti][0], seenPoints[lasti][1], 
							seenPoints[i][0], seenPoints[i][1]) >= MAPPING_EPSILON) {
				
				lasti = i;
				seenPoints2.push([seenPoints[lasti][1], seenPoints[lasti][0]]);
			
			}
		}

		seenPoints2.sort();
		lasti = -1;
		seenPoints = [];
		for (var i=0; i<seenPoints2.length; i++) {
			if (lasti == -1 || 
				distance(seenPoints2[lasti][0], seenPoints2[lasti][1],
							seenPoints2[i][0], seenPoints2[i][1]) >= MAPPING_EPSILON) {
				lasti = i;
				seenPoints.push([seenPoints2[lasti][1], seenPoints2[lasti][0]]);
			}
		}
		
		if (seenPoints.length > max_seen_points) {
			seenPoints.shift();
		}
	}

	function computeLine(sx, sy, lx, ly, lsx, lsy, cx, cy, fx, fy, or_line, or_reboot, dist) {
		if (or_line >= num_iter_line || or_reboot >= num_bounces)  return;
		if (dist > range) return;

		if (distance(cx, cy, fx, fy) < EPSILON) {
			makeLine(sx, sy, cx, cy, 1);

			return;
		}
		
		if (distance(cx, cy, lx, ly) < EPSILON) {		
			makeLine(sx, sy, cx, cy, 1);
			
			
			dist += 1;//distance(sx, sy, cx, cy);			

			
			if (dist < range) {
				var d1 = safeRadius(cx+lsx, cy-lsy);
				var d2 = safeRadius(cx-lsx, cy+lsy);
				
				if (distance(cx, cy, cx, height) > EPSILON &&
					distance(cx, cy, cx, 0) > EPSILON &&
					distance(cx, cy, width, cy) > EPSILON &&
					distance(cx, cy, 0, cy) > EPSILON) seenPoints.push([cx, cy]);
				
				optimisePoints();

				if (d1 >= d2)		
					computeLine(cx, cy, 1e9, 1e9, lsx, -lsy, cx+lsx, cy-lsy, cx + 500*lsx, cy - 500*lsy, 0, or_reboot+1, dist);
				else
					computeLine(cx, cy, 1e9, 1e9, -lsx, lsy, cx-lsx, cy+lsy, cx - 500*lsx, cy + 500*lsy, 0, or_reboot+1, dist);
			}
			return;
		}
		

		var d = safeRadius(cx, cy);
		d = Math.min(d, distance(cx, cy, fx, fy), range - dist);

		var nx = cx + d*lsx;
		var ny = cy + d*lsy;

		dist += d;
		return computeLine(sx, sy, cx, cy, lsx, lsy, nx, ny, fx, fy, or_line+1, or_reboot, dist);
	}

}