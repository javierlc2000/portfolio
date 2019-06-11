function game() {
	this.obstacles = [];
	this.obstacles.push(new obstacle(0, -75,-75,150,1, true));
	this.obstacles.push(new obstacle(1, -75,-75,1,150, true));
	this.obstacles.push(new obstacle(2,  75,-75,1,150, true));
	this.obstacles.push(new obstacle(3, -75, 75,150,1, true));
	
	// Maze map
	this.obstacles.push(new obstacle(4, -15,-15,1,30));
	this.obstacles.push(new obstacle(5, -15,15,30,1));
	this.obstacles.push(new obstacle(6, 15,-45,1,30));
	this.obstacles.push(new obstacle(7, -15,45,1,30));
	this.obstacles.push(new obstacle(8, -15,-45,1,30));
	this.obstacles.push(new obstacle(9, 15,15,1,30));
	this.obstacles.push(new obstacle(10, 15,-15,30,1));
	this.obstacles.push(new obstacle(11, 45,-45,30,1));
	this.obstacles.push(new obstacle(12, 45,15,1,30));
	this.obstacles.push(new obstacle(13, 45,15,30,1));
	this.obstacles.push(new obstacle(14, 15,-75,1,30));
	this.obstacles.push(new obstacle(15, 15,45,1,30));

	this.player = new player("Javier", this.obstacles);
	this.map = new minimap(this.player, this.obstacles);
	this.stats = new stats(this.player);
	this.scene = new scene(this.player, this.obstacles);
	
	this.update = function() {
		this.player.update();
		this.scene.update();
	}

	this.draw = function() {
		this.map.draw();
		this.stats.draw();
		this.scene.draw();
	}
}