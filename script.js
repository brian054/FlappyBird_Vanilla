/* 
Friday TODO: 
    - Infinite Pipes
    - Score
    - Set collision on pipes
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
let pipes = [800, 1200, 1500, 1800];

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

backgroundImage.onload = function() {
    update(); 
}

// Might need to use an object lol lot of parameters there
function AABB_Collision(flappyX, flappyY, flappyWidth, flappyHeight, pipeX, pipeY, pipeWidth, pipeHeight) {
    if (flappyX < pipeX + pipeWidth && flappyX + flappyWidth > pipeX &&
        flappyY < pipeY + pipeHeight && flappyY + flappyHeight > pipeY) {
        return true;
    }
}

function update() {
    ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);   

    // Apply gravity to the vertical velocity
    verticalVelocity += gravity;
    
    // Apply vertical velocity to rectangle
    rectY += verticalVelocity;

    // Move Pipes
    pipes = pipes.map(element => element - 1);

    // Collision with pipe1 set test
    if (AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[0], firstPipeYPos, pipeWidth, pipeHeight) || 
        AABB_Collision(rectX, rectY, rectWidth, rectHeight, pipes[0], secondPipeYPos, pipeWidth, pipeHeight)) {
        rectColor = "blue";
    }

    // Collision w/ ground
    if (rectY > gameWindowHeight - rectHeight - 125) {
        rectY = gameWindowHeight - rectHeight - 125;
        verticalVelocity = 0;
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
     for (let i = 0; i < pipes.length; i++) {
        ctx.fillRect(pipes[i], firstPipeYPos, pipeWidth, pipeHeight);
        ctx.fillRect(pipes[i], secondPipeYPos, pipeWidth, pipeHeight);
     }
     ctx.stroke();
     requestAnimationFrame(update);
}

requestAnimationFrame(update);

