function player(myname, obstacles) {

	this.name = myname;

	this.me = [0,0];
	this.angle = -Math.PI/2;

	this.update = function() {
		var dx = 1*cos(this.angle);
		var dy = 1*sin(this.angle);
		var dang = 0.05;
		if(keys.has('q') || keys.has('Q')) {
			dx *= 2;			
			dy *= 2;	
			dang *= 2;	
		}

		if (keys.has('w') || keys.has('W')) {
			if(this.canMove(dx, dy)) {
				this.me[0] += dx;
				this.me[1] += dy;
			}
			else if(this.canMove(dx, 0)) {
				this.me[0] += dx;
			}
			else if(this.canMove(0, dy)) {
				this.me[1] += dy;
			}
		}
		if (keys.has('s') || keys.has('S')) {
			if(this.canMove(-dx, -dy)) {
				this.me[0] -= dx;
				this.me[1] -= dy;
			}
			else if(this.canMove(-dx, 0)) {
				this.me[0] -= dx;
			}
			else if(this.canMove(0, -dy)) {
				this.me[1] -= dy;
			}
		}
		if (keys.has('a') || keys.has('A')) {
			this.angle -= dang;
		}
		if (keys.has('d') || keys.has('D')) {
			this.angle += dang;	
	 	}
	}

	this.canMove = function(dx, dy) {
		var temp = [this.me[0] + dx, this.me[1] + dy];

		for (var i=0; i<obstacles.length; i++) {
			if (obstacles[i].hits(temp)) return false;
		}
		return true;
	}

	this.ray_shoot = function(x, y, an) {
		var temp = [x, y];
		var speed = [cos(an), sin(an)];
		
		var it = 0;

		while (it < 255) {
			for (var i=0; i<obstacles.length; i++) {
				if(obstacles[i].hits(temp, false)) return [it, obstacles[i].id];
			}

			temp[0] += 0.5*speed[0]; 
			temp[1] += 0.5*speed[1]; 
			it++;
		}
		return [-1, -1];
	}
}