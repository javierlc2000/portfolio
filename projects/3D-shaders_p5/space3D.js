
// this class represents 3D space before being rendered onto a screen

function space3D() {
	var objects = []; // public, for now spheres


	this.addSphere = function(origin, radius, sphColor) {
		objects.push(new customSphere(origin, radius, sphColor));
	}

	this.safeRadius = function(cP) {
		var d = 1e9;
		for (var i=0; i<objects.length; i++) {	
			d = min(d, objects[i].distanceFrom(cP));
		}

		return d;
	}

	this.closestObject = function(cP) {
		var d = this.safeRadius(cP);
		for (var i=0; i<objects.length; i++) {	
			if (objects[i].distanceFrom(cP) == d) return objects[i];
		}

		return -1;
	}

	this.closestIntersectingSphere = function(ori, dir) {
		var secondPoint = ori.add(dir.multiply(10));
		var minIndex = -1, minDist = 1e9;
		for (var i=0; i<objects.length; i++) {

			var s = ori.vectorTo(objects[i].center);
			var d = dir.crossProduct(s).norma() / dir.norma();
			
			d -= objects[i].radius;

			var dist = sqrt((ori.x - objects[i].center.x)*(ori.x - objects[i].center.x) +
						(ori.y - objects[i].center.y)*(ori.y - objects[i].center.y) + 
						(ori.z - objects[i].center.z)*(ori.z - objects[i].center.z));

			if (d < 0 && dist < minDist) {
				minIndex = i;
				minDist = dist;

				console.log(i);
			}
		}
		if (minIndex == -1) return -1;
		return objects[minIndex];
	}

	this.move1Circle = function(a) {
		objects[1].center.x = 50*cos(a);
		objects[1].center.y = 50*sin(a);
		objects[1].center.z = 50*sin(a+0.8);
		objects[1].sphColor.alpha = 0.5 + 0.5*sin(a + 0.8);
	}

}