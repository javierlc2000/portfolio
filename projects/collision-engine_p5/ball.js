function Ball(m=0, r=0, e=0, 
				nx=0, ny=0, nvx=0, nvy=0,
				nax=0, nay=0) {
	
	this.mass = m;
	this.radius = r;
	this.ellast = Math.min(0.99, e);
	this.activL = true;
	this.activU = true;

	this.pos = new Vector(nx, ny);
	this.vel = new Vector(nvx, nvy);
	this.acc = new Vector(nax, nay);

	this.update = function() {
		this.pos.addVector(this.vel);
		this.vel.addVector(this.acc);
	}

	this.unupdate = function() {
		this.vel.subVector(this.acc);
		this.pos.subVector(this.vel);
	}

	this.draw = function() {
		fill(255);
		stroke(0);

		ellipse(this.pos.x, this.pos.y, this.radius*2);
	}
}