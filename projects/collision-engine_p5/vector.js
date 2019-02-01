function Vector(x, y) {
	this.x = x;
	this.y = y;

	this.getVector = function() {
		return (this.x, this.y);
	}
	this.setVector = function(nx, ny) {
		this.x = nx;
		this.y = ny;
	}

	this.addVector = function(v) {
		this.x += v.x;
		this.y += v.y;
	}
	this.subVector = function(v) {
		this.x -= v.x;
		this.y -= v.y;
	}
}