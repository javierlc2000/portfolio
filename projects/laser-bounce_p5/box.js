function Box(x, y, h, w) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.ax = customRandom();
	this.ay = customRandom();
	this.h = h;
	this.w = w;

	function customRandom() {
		return (1-random(200)/100)/100;
	}

	this.distanceFrom = function(x, y) {
		var dx = min(abs(this.x - x), abs(x - this.w - this.x));
		var dy = min(abs(this.y - y), abs(y - this.h - this.y));

		var cx = 1e9, cy = 1e9;
		if (this.x <= x && x <= this.x + this.w) cy = 1;
		if (this.y <= y && y <= this.y + this.h) cx = 1;

		return max(0, Math.min(sqrt(dx*dx + dy*dy), cx*dx, cy*dy));
	}

	this.draw = function() {
		fill('rgba(255,255,255,0.2)');
		stroke(255);

		rect(this.x, this.y, this.w, this.h);
	}

	this.update = function() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x > width) this.x = -this.w;
		if (this.x < -this.w) this.x = width;
		if (this.y > height) this.y = -this.h;
		if (this.y < -this.h) this.y = height;
		
		this.vx += this.ax;
		this.vy += this.ay;


		if (frameCount%100) this.ax = customRandom(), this.ay = customRandom();
	}
}
