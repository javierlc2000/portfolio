nfishes = 6;
fish = [];
food = [];

maxrad = 15;
maxvel = 4;
maxacc = 2;
maxlon = 20;

function setup() {
    createCanvas(500, 500);

    for(var i=0; i<nfishes; i++) {
        var f = new Fish(maxvel, maxacc, maxrad, maxlon, i);

        fish.push(f);    
    }
}

function draw() {
    background(100,100,255);

    if(frameCount%20 == 0){
        for(var i=0; i<nfishes; i++) {
            fish[i].changeAcc();
        }
    }
    
    for (var i=0; i<nfishes; i++) {
        fish[i].update();
        fish[i].show();
    }

    for (var i=0; i<food.length; i++) {
        food[i].update();
        food[i].show();
    }
}

function mousePressed() {
    if( 0 <= mouseX && mouseX < width &&
        0 <= mouseY && mouseY < height) {
        food.push(new Food(mouseX, mouseY));
    } 
}