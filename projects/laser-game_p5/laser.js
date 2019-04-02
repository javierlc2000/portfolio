function laser(type) {
	this.type = type;
	
	var max_seen_points = 1000;

	var EPSILON = 0.1;
	var num_bounces = 10;
	var num_iter_line = 100;
	var range = 200;
	var speed = 3;
	var ang_speed = 0.05;
	var radius = 10;

	var seenPoints = []

	this.createLaser = function() {
		if (this.type == 'red') {
			this.x = 50;
			this.y = 50;
			this.angle = Math.PI/4;
		}
		else {
			this.x = width - 50;
			this.y = height - 50;
			this.angle = -3*Math.PI/4;
		}

	}


	this.draw = function() {		
		//var angle = atan2(mouseY - this.y, mouseX - this.x);
		var angle = this.angle;

		var lsx = cos(angle);
		var lsy = sin(angle);
		var anglex = this.x + 1000*lsx;
		var angley = this.y + 1000*lsy;

		strokeWeight(2);
		if (type == 'green') stroke('rgba(100, 255, 100,' + 1 + ')');
		else if (type == 'red') stroke('rgba(255, 100, 100,' + 1 + ')');
		noFill();
		ellipse(this.x, this.y, 2*radius, 2*radius);

		computeLine(this.x, this.y, //start point 
					1e9, 1e9, // last point
					lsx, lsy, // last velocities
					this.x, this.y, // current point
					anglex, angley, // finish point
					0, 0, 0); // recursive limiters
	
		for (var i = 0; i< seenPoints.length; i++) {
			ellipse(seenPoints[i][0], seenPoints[i][1], 2, 2);
		}

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

	this.rotate = function(da) {
		this.angle += da*ang_speed;
	}

	function safeRadius(mx, my) {
		var d = 1e9;
		for (var i=0; i<num_collision_objects; i++) {	
			d = min(d, collision_objects[i].distanceFrom(mx, my))
		}
		return d;
	}

	function distance(x, y, xx, yy) {
		return sqrt((x - xx)*(x - xx) + (y - yy)*(y - yy));
	}

	function makeLine(sx, sy, cx, cy, alpha) {
		strokeWeight(2);
		if (type == 'green') stroke('rgba(100, 255, 100,' + alpha + ')');
		else if (type == 'red') stroke('rgba(255, 100, 100,' + alpha + ')');
				line(sx, sy, cx, cy);
	}

	function computeLine(sx, sy, lx, ly, lsx, lsy, cx, cy, fx, fy, or_line, or_reboot, dist) {
		if (or_line >= num_iter_line || or_reboot >= num_bounces)  return;
		if (dist > range) return;

		if (distance(cx, cy, fx, fy) < EPSILON) {
			makeLine(sx, sy, cx, cy, (10 - or_reboot)/10);

			return;
		}
		
		if (distance(cx, cy, lx, ly) < EPSILON) {		
			makeLine(sx, sy, cx, cy, (10 - or_reboot)/10);
			
			
			dist += 1;//distance(sx, sy, cx, cy);			

			if (dist < range) {
				var d1 = safeRadius(cx+lsx, cy-lsy);
				var d2 = safeRadius(cx-lsx, cy+lsy);

				if (seenPoints.length > max_seen_points) seenPoints.shift();
				seenPoints.push([cx, cy]);

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