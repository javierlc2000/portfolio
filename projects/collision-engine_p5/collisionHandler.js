function CollisionHandler() {
	this.intersect = function(A, B) {
	    var d = (A.pos.x - B.pos.x)**2 + (A.pos.y - B.pos.y)**2;
	    var d2 = (A.radius + B.radius)**2;

	    if (d <= d2) return true;
	    else return false;
	}

	this.intersectFrame = function(A) {
		var r = (A.pos.x + A.radius >= width-1);
		var u = (A.pos.y + A.radius >= height-1);
		var l = (A.pos.x - A.radius <= 0);
		var d = (A.pos.y - A.radius <= 0);

		if(r==0 && l==0) A.activL = true;
		if(d==0 && u==0) A.activU = true;
		
		if (r && u) return "ru";
		if (r && d) return "rd";
		if (l && u) return "ru";
		if (l && d) return "ld";
		
		if (r) return "r";
		if (l) return "l";
		if (u) return "d";
		if (d) return "u";

		return "";
	}

	this.updateCollision = function(A, B){
		var nrad = A.radius + B.radius;
		var colx = (A.pos.x*B.radius + B.pos.x*A.radius)/nrad;
		var coly = (A.pos.y*B.radius + B.pos.y*A.radius)/nrad;
		
		var nmass = A.mass + B.mass;
		A.vel.x = (A.vel.x*(A.mass-B.mass) + B.mass*B.vel.x)/nmass;
		A.vel.y = (A.vel.y*(A.mass-B.mass) + B.mass*B.vel.y)/nmass;
		B.vel.x = (B.vel.x*(B.mass-A.mass) + A.mass*A.vel.x)/nmass;
		B.vel.y = (B.vel.y*(B.mass-A.mass) + A.mass*A.vel.y)/nmass;
	}

	this.updateCollisionFrame = function(A, ord){
		if(A.activL && (ord == "r" || ord == "l")) {
			A.vel.x *= -A.ellast;
			A.activL = false;
		}
		if(A.activU && (ord == "u" || ord == "d")) {
			A.vel.y *= -A.ellast;
			A.activU = false;
		}
		if (ord == "" && A.activU && A.activL) {
			A.vel.x *= -A.ellast, A.vel.y *= -A.ellast;
		}
	}
}