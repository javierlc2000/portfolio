function minimap(player,obstacles) {
	this.box = [5,5,150,150];

	this.draw = function() {
		// draw margin
		stroke(255);
		fill(35);
		rect(this.box[0], this.box[1], this.box[2], this.box[3]);

		// draw obstacle
		for (var i=0; i<obstacles.length; i++) {
			if (obstacles[i].inv == false) {
				rect(this.box[0] + this.box[2]/2 + obstacles[i].pos[0],
					this.box[1] + this.box[3]/2 + obstacles[i].pos[1],
					 obstacles[i].pos[2], obstacles[i].pos[3]);
			}
		}		
		
		// drawhead
		noStroke();
		fill(color(200,230, 0, 200));
		arc(this.box[0] + this.box[2]/2 + player.me[0], this.box[1] + this.box[3]/2 + player.me[1],
			70, 70,
			player.angle - 0.5, player.angle + 0.5, PIE);

		stroke(0);
		fill(0,255, 0);
		ellipse(this.box[0] + this.box[2]/2 + player.me[0], this.box[1] + this.box[3]/2 + player.me[1], 10, 10);
		
	}

}