var nballs = 20;
var balls = [];

var colHandler = new CollisionHandler();
var colActiv = Array(nballs).fill().map(() => Array(nballs).fill(true));

function setup() {
    createCanvas(500, 500);
    frameRate(50);

    for (var i=0; i<nballs; i++) {
        var m = random(5, 20);
                        //mass,rad,elas,     x,          y
        balls[i] = new Ball(m, m, 0.7, 50+random(400), 50+random(400),
                             //vxi,              vyi
                        random(-500, 500)/m, random(-500, 500)/m);   
    
    }    
}

function draw() {
    background(255);

    for (var i=0; i<nballs; i++) {
        var aux = colHandler.intersectFrame(balls[i]);
        if(aux != "") colHandler.updateCollisionFrame(balls[i], aux);
    }

    for (var i=0; i<nballs; i++) {
        for (var j=i+1; j<nballs; j++){
            if(colHandler.intersect(balls[i], balls[j])) {
                if (colActiv[i][j]) {
                    colHandler.updateCollision(balls[i], balls[j]);
                    colActiv[i][j] = false;
                }
            }
            else colActiv[i][j] = true;
        }
    }

    for (var i=0; i<nballs; i++) {
        balls[i].update();
        balls[i].draw();
    }
}
