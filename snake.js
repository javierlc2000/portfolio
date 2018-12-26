function Snake(mvel, macc, mrad, mlon) {
    this.pos = [random(width), random(height)];
    
    this.radius = random(5, mrad);
    this.vel = [random(mvel) - mvel/2, random(mvel) - mvel/2];
    this.acc = [random(macc) - macc/2, random(macc) - macc/2];

    this.tail = [];

    this.update = function() {

        this.tail.push([this.pos[0], this.pos[1]]);
        if(this.tail.length > min(frameCount/100, mlon)) this.tail.shift();

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];

        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];

        var mod = Math.sqrt(this.vel[0]**2 + this.vel[1]**2);
        if(mod > max(mvel - 0.2*this.radius - 1.5*this.tail.length, mvel/30)){
            this.vel[0] *= mvel/mod;
            this.vel[1] *= mvel/mod;
        }

        if(this.pos[0] > width+this.radius) this.pos[0] = -this.radius;
        else if(this.pos[1] > height+this.radius) this.pos[1] = -this.radius;
        else if(this.pos[0] < -this.radius) this.pos[0] = width + this.radius;
        else if(this.pos[1] < -this.radius) this.pos[1] = height + this.radius;
        else return;

        if(random(100) < 20) this.reset();
    };

    this.show = function() {
        var len = this.tail.length;
        for(var i=0; i<len; i++) {

            ellipse(this.tail[i][0], this.tail[i][1], 
                this.radius*i/len, this.radius*i/len);
        
        }
    };

    this.changeAcc = function() {
        this.acc = [random(macc) - macc/2, random(macc) - macc/2];
    }

    this.reset = function() {
        this.radius = random(5, mrad);
        this.vel = [random(mvel) - mvel/2, random(mvel) - mvel/2];
        this.acc = [random(macc) - macc/2, random(macc) - macc/2];

        this.tail = [];
    }
}
