window.onload = function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const backgroundImage = new Image();
    backgroundImage.src = 'images/background.jpeg';

    backgroundImage.onload = function() {
        ctx.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);

        // Draw Flappy
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(canvas.width / 2, canvas.height / 2, 40, 40);
        ctx.stroke();
    }
}