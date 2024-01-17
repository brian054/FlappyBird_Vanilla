class Pipe {
   _heightArray = [100, 150, 200, 250, 300];

    // topPipeImage = new Image();
    // bottomPipeImage = new Image();

    pipeWidth = 80;
    topPipeYPos = 0;

    hasScored = false; 

    floorHeight = 575;

    constructor(pipeXPos, gapSize, gameWindowHeight) {
        this.topPipeImage = new Image();
        this.bottomPipeImage = new Image();
        this.topPipeImage.onload = () => {
            this.bottomPipeImage.onload = () => {
                this.pipeXPos = pipeXPos;
                this.gapSize = gapSize;
                this.gameWindowHeight = gameWindowHeight;
                this.topPipeHeight = this.getRandomHeight();
                this.bottomPipeYPos = this.topPipeHeight + gapSize;
                this.bottomPipeHeight = this.floorHeight - this.topPipeHeight - gapSize;
            };
            this.bottomPipeImage.src = 'images/pipe-green-bottom.png';
        };
        this.topPipeImage.src = 'images/pipe-green-top.png';
    }

    // public
    movePipes() {
        this.pipeXPos -= 3;
    }

    drawPipes(ctx) {
        console.log("Top Pipe Dimensions:", this.pipeWidth, this.topPipeHeight);
        console.log("Bottom Pipe Dimensions:", this.pipeWidth, this.bottomPipeHeight);
        console.log("Top Pipe Position:", this.pipeXPos, this.topPipeYPos);
        console.log("Bottom Pipe Position:", this.pipeXPos, this.bottomPipeYPos);

        // Top 
        ctx.drawImage(
            this.topPipeImage,
            this.pipeXPos, this.topPipeYPos, this.pipeWidth, this.topPipeHeight
        );
        // Bottom 
        ctx.drawImage(
            this.bottomPipeImage,
           // 0, 0, // src rect (x, y)
            //this.bottomPipeImage.width, this.bottomPipeHeight, // src rect (w, h)
            this.pipeXPos, this.bottomPipeYPos, this.pipeWidth, this.bottomPipeHeight
        );
        //ctx.fillRect(this.pipeXPos, this.bottomPipeYPos, this.pipeWidth, this.bottomPipeHeight);
    }

    // private - not right now for testing 
    getRandomHeight() {
        return this._heightArray[Math.floor(Math.random() * this._heightArray.length)];
    }

}