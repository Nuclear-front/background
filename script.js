// script.js

// Number of balls to create
const numberOfBalls = 35;  

// Array to store the balls
let balls = [];

window.onload = function() {
    // Create the balls and add them to the array
    for (let i = 0; i < numberOfBalls; i++) {
        createBall();
    }

    // Start moving the balls after they are created
    startBallMovement();
};

// Function to create a ball at a random position
function createBall() {
    // Create a new div element for the ball
    const ball = document.createElement('div');
    
    // Apply the 'ball' class to style it
    ball.classList.add('ball');
    
    // Randomize the position of each ball
    const x = Math.random() * (window.innerWidth - 50);  // Random x position (50px for ball width)
    const y = Math.random() * (window.innerHeight - 50); // Random y position (50px for ball height)
    
    // Set initial radius (size) of the ball
    const radius = Math.random() * 12 + 17;  // Random radius between 20px and 50px
    ball.style.width = `${radius}px`;
    ball.style.height = `${radius}px`;

    // Apply the random position to the ball
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    // Append the ball to the body
    document.body.appendChild(ball);
    
    // Store the ball's data in the balls array
    balls.push({
        element: ball,  // The actual DOM element
        x: x,           // Current x position
        y: y,           // Current y position
        dx: Math.random() * 4 - 2,  // Random x direction (between -2 and 2)
        dy: Math.random() * 4 - 2,  // Random y direction (between -2 and 2)
        radius: radius, // Initial radius of the ball
        radiusChange: Math.random() * 0.2 + 0.05 // Random speed of radius change
    });
}

// Function to move the balls randomly and change their radius
function moveBall(ballObj) {
    // Update ball's position
    ballObj.x += ballObj.dx;
    ballObj.y += ballObj.dy;

    // Apply the new position to the ball element
    ballObj.element.style.left = `${ballObj.x}px`;
    ballObj.element.style.top = `${ballObj.y}px`;

    // Bounce the ball off the walls of the screen if it hits the edges
    if (ballObj.x <= 0 || ballObj.x >= window.innerWidth - ballObj.radius) {
        ballObj.dx = -ballObj.dx;  // Reverse the horizontal direction
    }

    if (ballObj.y <= 0 || ballObj.y >= window.innerHeight - ballObj.radius) {
        ballObj.dy = -ballObj.dy;  // Reverse the vertical direction
    }

    // Change the radius of the ball over time
    ballObj.radius += ballObj.radiusChange;  // Update the radius

    // If the radius goes too small or too large, reverse the direction of change
    if (ballObj.radius < 10 || ballObj.radius > 20) {
        ballObj.radiusChange = -ballObj.radiusChange;  // Reverse radius growth/shrink
    }

    // Apply the new radius to the ball's width and height
    ballObj.element.style.width = `${ballObj.radius}px`;
    ballObj.element.style.height = `${ballObj.radius}px`;
}

// Function to start moving all the balls
function startBallMovement() {
    setInterval(function() {
        // Loop through each ball and move it
        balls.forEach(function(ballObj) {
            moveBall(ballObj);
        });
    }, 20);  // Move balls every 20 milliseconds
}
