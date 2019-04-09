
// this is the ray object that is called from camera
// in contains the ray tracing algorithm

// point3d origin, point3D dir
function ray(or, dir) {
	var origin = or;
	var direction = dir;

	var EPSILON = 0.0001;
	var max_iterations = 30;

	var endPosition = -1;
	var endColor = new customColor(0,0,0,1);

	this.endingColor = function() {
		var norma = direction.norma();
		direction.x /= norma;
		direction.y /= norma;
		direction.z /= norma;
		
		rayMarch(or, direction, 0);

		var endColorNow = new customColor(endColor.red, endColor.green,
											endColor.blue, endColor.alpha);
		if (endPosition != -1) {
			// i have converged, therefore collided 
			var x = isLitten(endPosition);

			if(!x) {
				endColorNow.add(new customColor(-100, -100, -100, 0));
			}
		}
		return endColorNow;
	}

	function isLitten(pos) {
		/*
		var lightDir = pos.directionTo(myScene.lightSource);

		console.log(myScene.innerSpace.closestObject(pos));
		var v = closestIntersectingSphere(pos, lightDir);

		if (v == -1) return true;
		return false;
		*/
		
		var lightDir = pos.directionTo(myScene.lightSource);
		
		endPosition = -1;
		pos = pos.add(lightDir);

		rayMarch(pos, lightDir, 0);
		if (endPosition == -1) return true;
		return false;
	}

	function rayMarch(currentPosition, dir, iterations) {
		if (iterations > max_iterations) return;

		var r = myScene.innerSpace.safeRadius(currentPosition);
		
		if (abs(r) < EPSILON) {
			var sph = myScene.innerSpace.closestObject(currentPosition);
			endColor = sph.sphColor;
			endPosition = currentPosition;
			return;
		}

		var newPosition = new point3D(0,0,0);
		newPosition.x = currentPosition.x + dir.x*r;
		newPosition.y = currentPosition.y + dir.y*r;
		newPosition.z = currentPosition.z + dir.z*r;

		var r = myScene.innerSpace.safeRadius(newPosition);
	
		rayMarch(newPosition, dir, iterations+1)
	}

	function closestIntersectingSphere(origin, direction) {
		return myScene.innerSpace.closestIntersectingSphere(origin, direction);
	}

}