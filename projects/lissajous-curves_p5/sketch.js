var ncir = 11;
var radius = 2*500/ncir/6;
var padd = 1*500/ncir/6;
var square = radius + padd;

var cirL = [];
var cirD = [];
var speeds = [];



function setup() {
    createCanvas(500, 500);

    for (var i=0; i+1<ncir; i++) {
        cirL[i] = ([square, height - square*(2*i+3)]);
        cirD[i] = ([square*(2*i+3), height - square]);

        speeds[i] = 0.005 + 0.005*(i+1);
    }
}


function draw() {
    fill(225);
    noStroke();
    rect(0, height - 2*(radius+padd), width, height);
    rect(0, 0, 2*(radius+padd), height);
    for (var i=0; i+1<ncir; i++) { 
        noFill();
        stroke(0);
        ellipse(cirL[i][0], cirL[i][1], 2*radius)
        ellipse(cirD[i][0], cirD[i][1], 2*radius)

        fill(0);
        var pos1 = speeds[i]*frameCount+Math.PI/2;
        var pos2 = -speeds[i]*frameCount+2*Math.PI/2;
        ellipse(cirL[i][0] + radius*sin(pos1),
                    cirL[i][1] + radius*cos(pos1), radius/5)
        ellipse(cirD[i][0] + radius*sin(pos2),
                    cirD[i][1] + radius*cos(pos2), radius/5)
        for (var j=0; j+1<ncir; j++) {

            var pos1 = speeds[i]*frameCount+Math.PI/2;
            var pos2 = -speeds[j]*frameCount+2*Math.PI/2;
            ellipse(cirD[j][0] + radius*sin(pos2),
               cirL[i][1] + radius*cos(pos1), 0.1);     
        }
    }

}
