function Fish(mvel, macc, mrad, mlon, mid) {
    this.mid = mid;
    this.pos = [random(width), random(height)];
    
    this.radius = random(5, mrad);
    this.vel = [random(mvel) - mvel/2, random(mvel) - mvel/2];
    this.acc = [random(macc) - macc/2, random(macc) - macc/2];

    this.tail = [];

    this.update = function() {
        this.tail.push([this.pos[0], this.pos[1]]);
        if(this.tail.length > mlon) this.tail.shift();

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];

        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];

        var mod = Math.sqrt(this.vel[0]**2 + this.vel[1]**2);
        if(mod > max(mvel - this.radius, mvel/30)){
            this.vel[0] *= mvel/mod;
            this.vel[1] *= mvel/mod;
        }

        if(this.pos[0] > width+this.radius) this.pos[0] = -this.radius;
        else if(this.pos[1] > height+this.radius) this.pos[1] = -this.radius;
        else if(this.pos[0] < -this.radius) this.pos[0] = width + this.radius;
        else if(this.pos[1] < -this.radius) this.pos[1] = height + this.radius;
        
        if (food.length != 0) {
            var closestFood = food[0];
            var distC = dist(this.pos[0], this.pos[1],
                closestFood.x, closestFood.y);
            for (var i=1; i<food.length; i++) {
                
                var distN = dist(this.pos[0], this.pos[1],
                    food[i].x, food[i].y);
                
                if (distC > distN) {
                    closestFood = food[i];
                    
                    distC = dist(this.pos[0], this.pos[1],
                        closestFood.x, closestFood.y);
                }
            }

            
            var mod = dist(this.pos[0], this.pos[1],
                closestFood.x, closestFood.y);

            if(mod < this.radius) {
                food.splice(food.indexOf(closestFood), 1);
            }
            else{
                this.acc = [(closestFood.x - this.pos[0])/mod*mvel,
                                (closestFood.y - this.pos[1])/mod*mvel];
            }
        }
    };

    this.show = function() {
        fill(255);
        var len = this.tail.length;
        for(var i=0; i<len; i++) {
            if(i%2 || i%3) continue;
            ellipse(this.tail[i][0], this.tail[i][1], 
                this.radius*i/len, this.radius*i/len);
        }
       
        if(mid == 0) text("Amanda", this.pos[0] - 20, this.pos[1]-10)
        else if (mid == 1) text("Guille", this.pos[0] - 20, this.pos[1]-10)
        else if (mid == 2) text("Ricardo", this.pos[0] - 20, this.pos[1]-10)
        else if (mid == 3) text("Enrique", this.pos[0] - 20, this.pos[1]-10)
        else if (mid == 4) text("Elena", this.pos[0] - 20, this.pos[1]-10)
        else if (mid == 5) text("Javier", this.pos[0] - 20, this.pos[1]-10)
    };

    this.changeAcc = function() {
        if (food.length == 0){
            this.acc = [random(macc) - macc/2, random(macc) - macc/2];
        }
    }

    this.reset = function() {
        this.radius = random(5, mrad);
        this.vel = [random(mvel) - mvel/2, random(mvel) - mvel/2];
        this.acc = [random(macc) - macc/2, random(macc) - macc/2];

        this.tail = [];
    }
}
