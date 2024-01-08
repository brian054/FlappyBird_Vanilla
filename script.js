/* 
TODO: 
    - Fix pipe gapSize for recycled pipes, needs to hold old size when gapSize switches over
    - Set variable yPos's for pipes (4 or 5 yPos's???), pick a random one from array 
    - FIXED TIME STEP runs way slower on 2nd monitor we need consistency across all 


    - Sprites
    - Death Animation
    - Wishlist: 
        - Play against someone online - highest score wins
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
const gravity = 0.03;
let rectX = canvas.width / 2 - rectWidth / 2;
let rectY = canvas.height / 2 - rectHeight / 2;
let rectColor = "red";
let verticalVelocity = 0.5; // 1;
let isFlyingUp = false;

// Pipes
const pipeWidth = 80;
const pipeHeight = 200;
//let pipeXPos = 400; 
let firstPipeYPos = 0;
let secondPipeYPos = gameWindowHeight - pipeHeight;

// Basically just the xPos's, variable heights later
// When pipe[0] is less than gameWindowWidth, reset it to the 900 spot 
let bufferPipes = [900, 1200];
let recycledPipes = [];

let score = 0;


/*
Infinite Pipes:

So we'd have x amount of yPos's that we store in an array. 
These yPos's are used to position each pipe pair. The pipes should also 
have a "gap" value that over time gets smaller. 

Maybe 5 different pipe positions possible

Flow:
- 3 or 4 buffered (I think 2-3 pairs of pipes can be on screen at a time)

- Pick a random yPos from the positions array
- Build the pipe pair
- Store it in the "buffer" array 
- Remove the pair from buffer array once it goes off screen

*/

// Gap size based on score - good
let gapSize = 200; // decrease by 20 every 10 points
let minimumGapSize = 100;
//let gapSizes = [200, 180, 160, 140, 120, 100];

let distanceBetweenPipePair = 300;

backgroundImage.onload = function() {
    update(); 
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

// Reset a pipe when it goes off screen
function resetPipes(pipes, index) { 
    if (pipes[index] < 0 - pipeWidth) {
        pipes[index] = 900;
    }
}

// Set gapSize depending on score
function gapSizeCheck() {

}

function update() {
    ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);   

    // Apply gravity to the vertical velocity
    verticalVelocity += gravity;
    
    // Apply vertical velocity to rectangle
    rectY += verticalVelocity;

    // Move Pipes
    bufferPipes = bufferPipes.map(element => element - 1);
    recycledPipes = recycledPipes.map(element => element - 1);

    // "Infinite Pipes"
    for (i = 0; i < bufferPipes.length; i++) {
        resetPipes(bufferPipes, i);
    }

    // Collision with pipe1 set test
    if (AABB_Collision(rectX, rectY, rectWidth, rectHeight, bufferPipes[0], firstPipeYPos, pipeWidth, pipeHeight) || 
        AABB_Collision(rectX, rectY, rectWidth, rectHeight, bufferPipes[0], secondPipeYPos, pipeWidth, pipeHeight)) {
        rectColor = "blue";
    }

    // Collision w/ ground
    if (rectY > gameWindowHeight - rectHeight - 125) {
        rectY = gameWindowHeight - rectHeight - 125;
        verticalVelocity = 0;
    }

    // Increase score if needed
    if (bufferPipes[0] + pipeWidth < rectX) {
        score += 1;
        console.log("Score = " + score);
        if (score % 10 == 0 && gapSize != minimumGapSize) { 
            gapSize -= 20;
        }
        // Assign recycled and buffered pipes xPos's
        if (recycledPipes[0]) {
            recycledPipes[1] = bufferPipes[0];
        } else {
            recycledPipes[0] = bufferPipes[0];
        }
        bufferPipes[0] = bufferPipes[1];
        bufferPipes[1] = bufferPipes[0] + distanceBetweenPipePair; 
    }

    // Switch recycled out if needed - this currently never runs
    if (recycledPipes[0] + pipeWidth < 0) {
        recycledPipes[0] = recycledPipes[1];
        recycledPipes[1] = undefined;
    }

    // Handle Input
    document.addEventListener('keydown', function(event) {
        // Only jump if not currenty flying
        if (event.code === 'Space' && !isFlyingUp) {
            verticalVelocity -= 2;
            isFlyingUp = true;
        }
    });

    document.addEventListener('keyup', function(event) {
        // Reset jump boolean when spacebar released
        if (event.code === 'Space') {
            isFlyingUp = false;
        }
    });

    // Draw Flappy
    ctx.beginPath();
    ctx.fillStyle = rectColor;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.fillStyle = "blue";
    for (let i = 0; i < recycledPipes.length; i++) {
        ctx.fillRect(recycledPipes[i], 0, pipeWidth, pipeHeight);
        ctx.fillRect(recycledPipes[i], pipeHeight + gapSize, pipeWidth, gameWindowHeight - (pipeHeight + gapSize));
    }
    for (let i = 0; i < bufferPipes.length; i++) {
        ctx.fillRect(bufferPipes[i], 0, pipeWidth, pipeHeight);
        ctx.fillRect(bufferPipes[i], pipeHeight + gapSize, pipeWidth, gameWindowHeight - (pipeHeight + gapSize));
    }
    ctx.stroke();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

