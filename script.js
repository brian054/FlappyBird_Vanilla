/* 
TODO:
    - Fix pipeHeight and gapSizes
    - Pick Font - Score on Screen
    - Sprites
    - Death Animation

    - Wishlist: 
        - Play against someone online - highest score wins - leaderboard
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameWindowWidth = canvas.width;
const gameWindowHeight = canvas.height;

const backgroundImage = new Image();
backgroundImage.src = 'images/background.jpeg';

// Flappy
const rectWidth = 40;
const rectHeight = 40;
const gravity = 0.5;
let rectX = canvas.width / 2 - rectWidth / 2;
let rectY = canvas.height / 2 - rectHeight / 2;
let rectColor = "red";
let verticalVelocity = 0;
let maxVerticalVelocity = 9; 
let isFlyingUp = false;

// Gap size based on score
let gapSize = 200; // decrease by 20 every 10 points
let minimumGapSize = 100;

// Pipes
let pipes = [new Pipe(600, gapSize, gameWindowHeight), new Pipe(900, gapSize, gameWindowHeight), new Pipe(1200, gapSize, gameWindowHeight)];
let activePipeIndex = 0;

let score = 0;

let distanceBetweenPipePair = 300;

backgroundImage.onload = function() {
    updateLoop(performance.now()); 
}

function randomFromArray(array) {
    return array(Math.floor(Math.random() * array.length));
}

// Might need to use an object lol lot of parameters there
function AABB_Collision(flappyX, flappyY, flappyWidth, flappyHeight, pipeX, pipeY, pipeWidth, pipeHeight) {
    if (flappyX < pipeX + pipeWidth && flappyX + flappyWidth > pipeX &&
        flappyY < pipeY + pipeHeight && flappyY + flappyHeight > pipeY) {
        return true;
    }
}

// Handle Input - you don't want this in the update method since it adds a new event listener every frame, 
document.addEventListener('keydown', function(event) {
    // Only jump if not currenty flying
    if (event.code === 'Space' && !isFlyingUp && (verticalVelocity > -maxVerticalVelocity)) {
        verticalVelocity -= 9;
        isFlyingUp = true;
    }
});

document.addEventListener('keyup', function(event) {
    // Reset jump boolean when spacebar released
    if (event.code === 'Space') {
        isFlyingUp = false;
    }
});

// Fixed time step variables
const fixedTimeStep = 16; // 60 FPS (1000ms / 60 frames per second)
let lastTimestamp = performance.now();
let lag = 0;

function updateLoop(timestamp) {
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    lag += elapsed;

    while (lag >= fixedTimeStep) {
        update();
        lag -= fixedTimeStep;
    }

    render();

    requestAnimationFrame(updateLoop);
}

function update() {  
    // Apply gravity to the vertical velocity
    verticalVelocity += gravity;
    
    // Apply vertical velocity to rectangle
    rectY += verticalVelocity;

    // Move Pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].movePipes();

        // Check if pipe is offscreen
        // if (pipes[i].hasScored && pipes[i].pipeXPos + pipes[i].pipeWidth < 0) {
        //     pipes[i] = new Pipe(600, gapSize, gameWindowHeight);
        // }
    }

    // Collision with active pipe
    if (AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[activePipeIndex].pipeXPos, pipes[activePipeIndex].topPipeYPos, pipes[activePipeIndex].pipeWidth, pipes[activePipeIndex].topPipeHeight) || 
        AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[activePipeIndex].pipeXPos, pipes[activePipeIndex].bottomPipeYPos, pipes[activePipeIndex].pipeWidth, pipes[activePipeIndex].bottomPipeHeight)) {
        rectColor = "blue";
    }

    // Collision w/ ground
    if (rectY > gameWindowHeight - rectHeight - 125) {
        rectY = gameWindowHeight - rectHeight - 125;
        verticalVelocity = 0;
    }

    // Increase score if needed
    if (pipes[activePipeIndex].pipeXPos + pipes[activePipeIndex].pipeWidth < rectX && !pipes[activePipeIndex].hasScored) {
        score += 1;
        pipes[activePipeIndex].hasScored = true;
        console.log("Score = " + score);
        if (score % 5 == 0 && gapSize != minimumGapSize) { 
            gapSize -= 20;
        }

        // Switch active pipe
        if (activePipeIndex === 0 || activePipeIndex === 1) {
            activePipeIndex += 1;
        } else {
            activePipeIndex = 0;
        }
    }

    // Could do this inside for loop above but for simplicity for now doing this
    for (let i = 0; i < pipes.length; i++) {
        //Check if pipe is offscreen
        if (pipes[i].hasScored && pipes[i].pipeXPos + pipes[i].pipeWidth < 0) { // hasScored might not be needed here fr
            if (i === 0) {
                pipes[i] = new Pipe(pipes[2].pipeXPos  + distanceBetweenPipePair, gapSize, gameWindowHeight);    
            } else if (i === 1) {
                pipes[i] = new Pipe(pipes[0].pipeXPos  + distanceBetweenPipePair, gapSize, gameWindowHeight);  
            } else {
                pipes[i] = new Pipe(pipes[1].pipeXPos  + distanceBetweenPipePair, gapSize, gameWindowHeight); 
            }
        }
    }

}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height); 

    // Draw Flappy
    ctx.beginPath();
    ctx.fillStyle = rectColor;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].drawPipes(ctx);
    }
    ctx.stroke();
    //requestAnimationFrame(update);
}

requestAnimationFrame(updateLoop);

