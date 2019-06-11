function stats(player) {
	this.box = [160,5,335,150];
	
	this.draw = function() {
		stroke(255);
		fill(0);
		var s = this.box[2]/5-10;
		fill(35);
		rect(this.box[0], this.box[1], this.box[2], this.box[3]);
		
		textSize(15);

		if(keys.has('h') || keys.has('H')) {
			stroke(255)
			fill(100);
			rect(this.box[0] + 43, this.box[1] + this.box[2]/4+3, s-6, s-6);
		}
		else {
			stroke(255)
			fill(0);
			rect(this.box[0] + 40, this.box[1] + this.box[2]/4, s, s);
			rect(this.box[0] + 40 + 2/3*s, this.box[1] + this.box[2]/4 + 2/3*s, s/3, s/3);
			noStroke();
			fill(255);
			text("H", this.box[0] + 40 + 2/3*s+6, this.box[1] + this.box[2]/4 + s-3);
		}
		
		if(keys.has('j') || keys.has('J')) {
			stroke(255)
			fill(100);
			rect(this.box[0] + 53+s, this.box[1] + this.box[2]/4+3, s-6, s-6);
		}
		else {
			stroke(255)
			fill(0);
			rect(this.box[0] + 50+s, this.box[1] + this.box[2]/4, s, s);
			rect(this.box[0] + 50+s + 2/3*s, this.box[1] + this.box[2]/4 + 2/3*s, s/3, s/3);
			noStroke();
			fill(255);
			text("J", this.box[0] + 50+s + 2/3*s+6, this.box[1] + this.box[2]/4 + s-3);
		}
		
		if(keys.has('k') || keys.has('K')) {
			stroke(255)
			fill(100);
			rect(this.box[0] + 63+2*s, this.box[1] + this.box[2]/4+3, s-6, s-6);
		}
		else {
			stroke(255)
			fill(0);
			rect(this.box[0] + 60+2*s, this.box[1] + this.box[2]/4, s, s);
			rect(this.box[0] + 60+2*s + 2/3*s, this.box[1] + this.box[2]/4 + 2/3*s, s/3, s/3);
			noStroke();
			fill(255);
			text("K", this.box[0] + 60+2*s + 2/3*s+6, this.box[1] + this.box[2]/4 + s-3);
		}
		
		if(keys.has('l') || keys.has('L')) {
			stroke(255)
			fill(100);
			rect(this.box[0] + 73+3*s, this.box[1] + this.box[2]/4+3, s-6, s-6);
		}
		else {
			stroke(255)
			fill(0);
			rect(this.box[0] + 70+3*s, this.box[1] + this.box[2]/4, s, s);
			rect(this.box[0] + 70+3*s + 2/3*s, this.box[1] + this.box[2]/4 + 2/3*s, s/3, s/3);
			noStroke();
			fill(255);
			text("L", this.box[0] + 70+3*s + 2/3*s+6, this.box[1] + this.box[2]/4 + s-3);
		}

		noStroke();
		fill(230);
		textSize(20);
		text(player.name, this.box[0]+240, this.box[1]+35);

		noStroke();
		fill(0, 100, 0);
		rect(this.box[0]+10, this.box[1]+53, this.box[2]-20, 10, 20);
		fill(0, 255, 0);
		rect(this.box[0]+10, this.box[1]+50, this.box[2]-20, 10, 20);
	
		noStroke();
		fill(50, 200, 200);
		rect(this.box[0]+55, this.box[1]+65, this.box[2]-70, 4, 4);
		fill(100, 255, 255);
		rect(this.box[0]+55, this.box[1]+63, this.box[2]-70, 4, 4);

	}
}