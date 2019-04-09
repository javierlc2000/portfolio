// this is a simple color struct in RGBA mode

function customColor(r, g, b, a) {
	this.red = r; // 0 to 255
	this.green = g;
	this.blue = b;	
	this.alpha = a; // 0 to 1

	this.add = function(col) {
		this.red += col.red;
		this.green += col.green;
		this.blue += col.blue;
		this.alpha += col.alpha;

		if (this.red >= 256) this.red = 255;
		if (this.green >= 256) this.green = 255;
		if (this.blue >= 256) this.blue = 255;
		if (this.alpha >= 1) this.alpha = 1;

		if (this.red < 0) this.red = 0;
		if (this.green < 0) this.green = 0;
		if (this.blue < 0) this.blue = 0;
		if (this.alpha < 0) this.alpha = 0;
	}
}