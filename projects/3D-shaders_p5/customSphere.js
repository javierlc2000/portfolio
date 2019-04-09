
// this is a sphere class mainly for testing the shader renderer

// point3D center, int radius 
function customSphere(center, radius, sphColor) {
	this.center = center;
	this.radius = radius;
	this.sphColor = sphColor;


	this.distanceFrom = function(cP) {
		var c = this.center;
		var d1 = Math.sqrt( (cP.x-c.x)*(cP.x-c.x) + (cP.y-c.y)*(cP.y-c.y) + (cP.z-c.z)*(cP.z-c.z) );

		return d1-this.radius;
	}
}