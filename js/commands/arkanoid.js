const output = [
    "EXECUTING GAME...",
    "CONTROLS: ← →",
    "TO EXIT PRESS: 'ESC'",
    "> ",
];

async function arkanoid() {
    return new Promise((resolve) => {
        let div = document.createElement("div");
        document.querySelector(".crt").appendChild(div);
        div.classList.add("fullscreen");

        const container = div;

        const remove = (event) => {
            event.preventDefault();
            container.remove();
            resolve();
        };

        container.focus();

        const canvas = document.createElement("canvas");
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");

        const w = (canvas.width = container.offsetWidth);
        const h = (canvas.height = container.offsetHeight);

        var x = canvas.width / 2;
        var y = canvas.height - 30;

        // Ball
        var dx = 4;
        var dy = -4;
        var ballRadius = 10;

        // Paddle
        var paddleHeight = 10;
        var paddleWidth = 100;
        var paddleX = (canvas.width - paddleWidth) / 2;

        // Controls
        var rightPressed = false;
        var leftPressed = false;

        // Bricks
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        var brickRowCount = 6;
        var brickColumnCount = Math.floor(w / (brickWidth + 10));

        // Score
        var score = 0;

        // Lives
        var lives = 3;

        var bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#5bf870";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(
                paddleX,
                canvas.height - paddleHeight,
                paddleWidth,
                paddleHeight
            );
            ctx.fillStyle = "#5bf870";
            ctx.fill();
            ctx.closePath();
        }

        function keyDownHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = true;
            } else if (e.keyCode == 37) {
                leftPressed = true;
            }

            if (e.keyCode === 27) {
                remove(e);
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = false;
            } else if (e.keyCode == 37) {
                leftPressed = false;
            }
        }

        function drawBricks() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX =
                            c * (brickWidth + brickPadding) + brickOffsetLeft;
                        var brickY =
                            r * (brickHeight + brickPadding) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#5bf870";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function collisionDetection() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var b = bricks[c][r];
                    if (b.status == 1) {
                        if (
                            x > b.x &&
                            x < b.x + brickWidth &&
                            y > b.y &&
                            y < b.y + brickHeight
                        ) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickRowCount * brickColumnCount) {
                                alert("YOU WIN, CONGRATULATIONS!");
                            }
                        }
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "18px VT323";
            ctx.fillStyle = "#5bf870";
            ctx.fillText("Score: " + score, 8, 20);
        }

        function drawLives() {
            ctx.font = "18px VT323";
            ctx.fillStyle = "#5bf870";
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    lives--;
                    if (!lives) {
                        document.location.reload();
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx;
            y += dy;
            requestAnimationFrame(draw);
        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        draw();
    });
}

export { output };
export default arkanoid;
