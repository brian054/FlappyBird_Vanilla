/* 
Friday TODO: 
    - Add a ReadMe file that documents how to run project
    - Collision with ground
    - Background scrolling on inf loop
    - Create Pipes
    - Set collision on pipes
    - Infinite Pipes
    - Score
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = 'images/background.jpeg';

const rectWidth = 40;
const rectHeight = 40;
let rectX = canvas.width / 2 - rectWidth / 2;
let rectY = canvas.height / 2 - rectHeight / 2;
const gravity = 6;

backgroundImage.onload = function() {
    update(); 
}

function update() {
    ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);   

    // Apply gravity to the rectangle
    rectY += gravity;

     // Draw Flappy
     ctx.beginPath();
     ctx.fillStyle = "red";
     ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
     ctx.stroke();

     requestAnimationFrame(update);
}