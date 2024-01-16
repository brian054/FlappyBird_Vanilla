/* 
TODO:
    - Sprites
    - Death Animation
    - Menu Screen

    - fine tune gapSize and scoreLimits for gapSize change

    - Wishlist: 
        - Play against someone online - highest score wins - leaderboard
        - Sharingan Mode: 
        - Abilites: Obito phase through pipe 
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
let rectY = 200;
let rectColor = "red";
let verticalVelocity = 0;
let maxVerticalVelocity = 9; 
let isFlyingUp = false;

// Gap size based on score
let gapSize = 200; // decrease by 20 every 10 points
let minimumGapSize = 100;

// Pipes
let pipes = [new Pipe(900, gapSize, gameWindowHeight), new Pipe(1200, gapSize, gameWindowHeight), new Pipe(1500, gapSize, gameWindowHeight)];
let activePipeIndex = 0;

let score = 0;
let gameOver = false;

let distanceBetweenPipePair = 300;

backgroundImage.onload = function() {
    updateLoop(performance.now());
}

function randomFromArray(array) {
    return array[(Math.floor(Math.random() * array.length))];
}

function AABB_Collision(flappyX, flappyY, flappyWidth, flappyHeight, pipeX, pipeY, pipeWidth, pipeHeight) {
    if (flappyX < pipeX + pipeWidth && flappyX + flappyWidth > pipeX &&
        flappyY < pipeY + pipeHeight && flappyY + flappyHeight > pipeY) {
        return true;
    }
}

function drawGameOver() {
    ctx.font = "60px 'Press Start 2P'";
    ctx.textAlign = "center";

    let xPos = gameWindowWidth / 2;
    let yPos = gameWindowHeight / 2;

    ctx.fillStyle = "red";
    ctx.fillText("U DEAD ASS MF", xPos, yPos);
}

function drawScore() {
    ctx.font = "80px 'Press Start 2P'";
    ctx.textAlign = "center";

    let xPos = gameWindowWidth / 2;
    let yPos = 120;

    ctx.fillStyle = "white";
    ctx.fillText(score, xPos, yPos);
}

let startGame = false;
// Handle Input - you don't want this in the update method since it adds a new event listener every frame, 
document.addEventListener('keydown', function(event) {
    // Only jump if not currenty flying
    if (event.code === 'Space' && !isFlyingUp && (verticalVelocity > -maxVerticalVelocity) && !gameOver) {
        verticalVelocity -= 9;
        isFlyingUp = true;
        startGame = true;
    }
});

document.addEventListener('keyup', function(event) {
    // Reset jump boolean when spacebar released
    if (event.code === 'Space' && !gameOver) {
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
        if (startGame) {
            update();
        }
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
    if (!gameOver) {
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].movePipes();
            // Check if pipe is offscreen
            // if (pipes[i].hasScored && pipes[i].pipeXPos + pipes[i].pipeWidth < 0) {
            //     pipes[i] = new Pipe(600, gapSize, gameWindowHeight);
            // }
        }
    }

    // Collision with active pipe
    if (AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[activePipeIndex].pipeXPos, pipes[activePipeIndex].topPipeYPos, pipes[activePipeIndex].pipeWidth, pipes[activePipeIndex].topPipeHeight) || 
        AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[activePipeIndex].pipeXPos, pipes[activePipeIndex].bottomPipeYPos, pipes[activePipeIndex].pipeWidth, pipes[activePipeIndex].bottomPipeHeight)) {
        rectColor = "blue";
        gameOver = true;
        drawGameOver();
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
        if (pipes[i].pipeXPos + pipes[i].pipeWidth < 0) { 
            if (i === 0) {
                pipes[i] = new Pipe(pipes[2].pipeXPos + distanceBetweenPipePair, gapSize, gameWindowHeight);    
            } else if (i === 1) {
                pipes[i] = new Pipe(pipes[0].pipeXPos + distanceBetweenPipePair, gapSize, gameWindowHeight);  
            } else {
                pipes[i] = new Pipe(pipes[1].pipeXPos + distanceBetweenPipePair, gapSize, gameWindowHeight); 
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
    drawScore();
    if (gameOver) { drawGameOver() };
    ctx.stroke();
    //requestAnimationFrame(update);
}

requestAnimationFrame(updateLoop);

