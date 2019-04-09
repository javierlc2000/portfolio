// this class represents the 2D screen after rendering

function screen(wid, hei) {
	var scWidth = wid;
	var scHeight = hei;
	
	this.pixel = [];


	this.draw = function() {
		var rectW = width/scWidth;
		var rectH = height/scHeight;
	
		for (var i=0; i<this.pixel.length; i++) {
			for (var j=0; j<this.pixel[i].length; j++) {
				var r = this.pixel[i][j].red;
				var g = this.pixel[i][j].green;
				var b = this.pixel[i][j].blue;
				var a = this.pixel[i][j].alpha;

				fill('rgba('+r+','+g+','+b+','+a+')');
				noStroke();

				rect(i*rectW, j*rectH, rectW, rectH);

			}
		}

	}
}