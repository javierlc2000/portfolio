function Food(x, y) {
	this.x = x;
	this.y = y;

	this.show = function() {
		fill(255, 0, 0);
		ellipse(this.x, this.y, 5, 5);
	}

	this.update = function(){
		this.x += random(0.6)-0.3;
		this.y += random(0.6)-0.3;
	}
}