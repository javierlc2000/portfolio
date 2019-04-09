
// this class is the camera object in the scene
// it renders the space3D with the ray marching algorithm

// point3D origin and direction
// int definition, number of rays is Def x Def
function customCamera(origin, direction, definition,
						dirX, myZoom) {
	this.origin = origin;
	this.direction = direction;
	this.definition = definition;
	this.pixelScope = 0.1; // double pixelScope, differente in angle amogst rays
	
	var zoom = myZoom;
	this.dirX = dirX.multiply(zoom);
	var dirY = dirX.crossProduct(direction).multiply(zoom);

	this.takePicture = function() {
		var sc = new screen(definition, definition);

		//console.log('Taking Picture');
		
		for (var i=0; i<definition; i++) {
			
			var I = i - definition/2;

			// progress bar
			//if (100.0*(i+1)/definition%20 == 0) console.log('Loading: ' + 100.0*(i+1)/definition + '%');
			
			sc.pixel[i] = []
			
			for (var j=0; j<definition; j++) {

				var J = j - definition/2;

				var dir = new point3D(0,0,0);
				dir.x = this.direction.x;
				dir.y = this.direction.y;
				dir.z = this.direction.z;
				
				dir.x += I*this.dirX.x + J*dirY.x;
				dir.y += I*this.dirX.y + J*dirY.y;
				dir.z += I*this.dirX.z + J*dirY.z;

				var rayDir = new ray(this.origin, dir);

				sc.pixel[i][j] = rayDir.endingColor();
			}
		}

		return sc;
	}

}