class Pipe {
   _heightArray = [100, 150, 200, 250, 300];

    pipeWidth = 80;
    topPipeYPos = 0;

    hasScored = false; 

    floorHeight = 575;

    constructor(pipeXPos, gapSize, gameWindowHeight) {
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
        ctx.fillStyle = "green";
        ctx.fillRect(this.pipeXPos, this.topPipeYPos, this.pipeWidth, this.topPipeHeight);
        // Bottom 
        ctx.fillRect(this.pipeXPos, this.bottomPipeYPos, this.pipeWidth, this.bottomPipeHeight);
    }

    // private - not right now for testing 
    getRandomHeight() {
        return this._heightArray[Math.floor(Math.random() * this._heightArray.length)];
    }

}