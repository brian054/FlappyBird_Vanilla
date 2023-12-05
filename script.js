/* 
Friday TODO: 
    - Set collision on pipes
    - Infinite Pipes
    - Score
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
let verticalVelocity = 1;
let isFlyingUp = false;

// Pipes
const pipeWidth = 80;
const pipeHeight = 200;
let pipeXPos = 400; 
let firstPipeYPos = 0;
let secondPipeYPos = gameWindowHeight - pipeHeight;

// Basically just the xPos's, variable heights later
let pipes = [800, 1200, 1500, 1800];

backgroundImage.onload = function() {
    update(); 
}

function update() {
    ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);   

    // Apply gravity to the vertical velocity
    verticalVelocity += gravity;
    
    // Apply vertical velocity to rectangle
    rectY += verticalVelocity;

    // Collision w/ ground
    if (rectY > gameWindowHeight - rectHeight - 125) {
        rectY = gameWindowHeight - rectHeight - 125;
        verticalVelocity = 0;
    }

    // Move Pipes
    pipes = pipes.map(element => element - 1);

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
     ctx.fillStyle = "red";
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