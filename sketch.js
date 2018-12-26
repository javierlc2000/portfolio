nsnakes = 5;
snakes = [];

maxrad = 15;
maxvel = 7;
maxacc = 1;
maxlon = 20;

function setup() {
    createCanvas(500, 500);

    for(var i=0; i<nsnakes; i++) {
        var snake = new Snake(maxvel, maxacc, maxrad, maxlon);

        snakes.push(snake);    
    }
}

function draw() {
    background(0,0,255);

    if(frameCount%20 == 0){
        for(var i=0; i<nsnakes; i++) {
            snakes[i].changeAcc();
        }
    }
    
    for (var i=0; i<nsnakes; i++) {
        snakes[i].update();
        snakes[i].show();
    }
}