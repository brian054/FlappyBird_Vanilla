class Pipe {
   _heightArray = [100, 150, 200, 250, 300];

    pipeImage = new Image();

    pipeWidth = 80;
    topPipeYPos = 0;

    hasScored = false; 

    floorHeight = 575;

    constructor(pipeXPos, gapSize, gameWindowHeight) {
        this.pipeImage.src = 'images/pipe-green.png';
        this.pipeXPos = pipeXPos;
        this.gapSize = gapSize;
        this.gameWindowHeight = gameWindowHeight;
        this.topPipeHeight = this.getRandomHeight();
        this.bottomPipeYPos = this.topPipeHeight + gapSize;
        this.bottomPipeHeight = this.floorHeight - this.topPipeHeight - gapSize;
    }

    // public
    movePipes() {
        this.pipeXPos -= 3;
    }

    drawPipes(ctx) {
        // Top 
        ctx.save(); // save current transformation state
        ctx.scale(1, -1); // flip 
        ctx.drawImage(
            this.pipeImage,
            0, this.topPipeHeight, // src rect (x, y)
            this.pipeImage.width, this.topPipeHeight, // src rect (width, height)
            this.pipeXPos, this.topPipeYPos, this.pipeWidth, this.topPipeHeight
        );
        ctx.restore;
        //ctx.fillStyle = "green";
       // ctx.fillRect(this.pipeXPos, this.topPipeYPos, this.pipeWidth, this.topPipeHeight);
        // Bottom 
        ctx.drawImage(
            this.pipeImage,
            0, 0, // src rect (x, y)
            this.pipeImage.width, this.bottomPipeHeight, // src rect (w, h)
            this.pipeXPos, this.bottomPipeYPos, this.pipeWidth, this.bottomPipeHeight
        );
        //ctx.fillRect(this.pipeXPos, this.bottomPipeYPos, this.pipeWidth, this.bottomPipeHeight);
    }

    // private - not right now for testing 
    getRandomHeight() {
        return this._heightArray[Math.floor(Math.random() * this._heightArray.length)];
    }

}