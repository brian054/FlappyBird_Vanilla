class Pipe {
    _heightArray = [100, 200, 300, 400, 500];

    pipeWidth = 80;
    
    topPipeHeight = this.#getRandomHeight(this._heightArray);
    bottomPipeHeight;

    topPipeYPos = 0;
    bottomPipeYPos;

    hasScored = false; 

    constructor(pipeXPos, gapSize, gameWindowHeight) {
        this.pipeXPos = pipeXPos;
        this.gapSize = gapSize;
        this.gameWindowHeight = gameWindowHeight;
        this.bottomPipeHeight = gameWindowHeight - 125;
        this.bottomPipeYPos = this.topPipeHeight + gapSize;
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

    // private
    #getRandomHeight(heightArray) {
        return this._heightArray[Math.floor(Math.random() * heightArray.length)];
    }

}