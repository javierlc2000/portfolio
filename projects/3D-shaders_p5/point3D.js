// this is a very simple point3D struct
// in some cases it will also represent a 3D vector in space

function point3D(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.norma = function() {
		var x = this.x;
		var y = this.y;
		var z = this.z;

		return Math.sqrt(x*x + y*y + z*z);
	}

	this.multiply = function(a) {
		var x = this.x*a;
		var y = this.y*a;
		var z = this.z*a;

		return new point3D(x, y, z);
	}

	this.add = function(a) {
		var x = this.x + a.x;
		var y = this.y + a.y;
		var z = this.z + a.z;

		return new point3D(x, y, z);
	}

	this.directionTo = function(pointB) {
		var x = pointB.x - this.x;
		var y = pointB.y - this.y;
		var z = pointB.z - this.z;
	
		var P = new point3D(x, y, z);
		var nor = P.norma();
		P.x /= nor;
		P.y /= nor;
		P.z /= nor;

		return P;
	}

	this.crossProduct = function(a) {
		var x = this.y*a.z - this.z*a.y;
		var y = this.z*a.x - this.x*a.z;
		var z = this.x*a.y - this.y*a.x;
		
		var P = new point3D(x, y, z);
		var nor = P.norma();
		P.x /= nor;
		P.y /= nor;
		P.z /= nor;

		return P;
	}

	this.vectorTo = function(a) {
		var x = a.x - this.x;
		var y = a.x - this.x;
		var z = a.x - this.x;

		return new point3D(x, y, z);
	}
}