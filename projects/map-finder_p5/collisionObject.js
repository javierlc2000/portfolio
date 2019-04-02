function CollisionObject(type) {
	this.type = type;

	this.createBox = function(x, y, h, w) {
		this.x = x;
		this.y = y;

		this.h = h;
		this.w = w;
	}	

	this.createCircle = function(x, y, r) {
		this.x = x;
		this.y = y;

		this.r = r;
	}

	this.distanceFrom = function(x, y) {
		if (this.type == 'box') {
			var dx = min(abs(this.x - x), abs(x - this.w - this.x));
			var dy = min(abs(this.y - y), abs(y - this.h - this.y));

			var cx = 1e9, cy = 1e9;
			if (this.x <= x && x <= this.x + this.w) cy = 1;
			if (this.y <= y && y <= this.y + this.h) cx = 1;

			return max(0, Math.min(sqrt(dx*dx + dy*dy), cx*dx, cy*dy));
		}
		else {
			var d = sqrt((this.x - x)*(this.x - x) + (this.y - y)*(this.y - y)) - this.r;
			return max(0, d);
		}
	}

	this.inside = function(x, y) {
		if (this.type == 'box') {
			var cx = 0, cy = 0;
			if (this.x <= x && x <= this.x + this.w) cy = 1;
			if (this.y <= y && y <= this.y + this.h) cx = 1;
			return (cx == 1 && cy == 1);
		}
		else {
			var d = sqrt((this.x - x)*(this.x - x) + (this.y - y)*(this.y - y)) - this.r;
			if (d < 0) return true;
			else return false;	
		}
	}
	this.draw = function() {
		fill('rgba(255,255,255,0.2)');
		stroke(255);
		strokeWeight(1);
		if (type == 'box') rect(this.x, this.y, this.w, this.h);
		if (type == 'circle') ellipse(this.x, this.y, 2*this.r, 2*this.r);
	}

}
