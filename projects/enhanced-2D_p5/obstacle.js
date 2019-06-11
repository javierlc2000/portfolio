function obstacle(myid, x, y, w, h, inv=false) {
	this.pos = [x, y, w, h];
	this.inv = inv;
	this.id = myid;

	this.hits = function(point, mode=true) {
		if(mode == false) {
			if (x <= point[0] && point[0] <= x+w
				&& y <= point[1] && point[1] <= y+h) return true;
			return false;
		}
		else {
			if (x-6 <= point[0] && point[0] <= x+w+6
				&& y-6 <= point[1] && point[1] <= y+h+6) return true;
			return false;	
		}
	}
}