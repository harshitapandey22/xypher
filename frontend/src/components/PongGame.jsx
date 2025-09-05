import React, { useEffect, useRef, useState } from "react";

export default function PongGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("pongHighScore")) || 0
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const requestRef = useRef();

  const WIDTH = 400;
  const HEIGHT = 250;

  // Paddle state (useRef to persist without re-render)
  const paddleRef = useRef({
    width: 80,
    height: 10,
    x: (WIDTH - 80) / 2,
    speed: 3,
    moveLeft: false,
    moveRight: false,
  });

  // Ball state
  const ballRef = useRef({
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius: 8,
    dx: 1.0,
    dy: -1.2,
  });

  // Score ref to prevent stale closure
  const scoreRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const drawPaddle = () => {
      const paddle = paddleRef.current;
      ctx.beginPath();
      ctx.rect(paddle.x, HEIGHT - paddle.height - 5, paddle.width, paddle.height);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    };

    const drawBall = () => {
      const ball = ballRef.current;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00ff99";
      ctx.fill();
      ctx.closePath();
    };

    const drawScore = () => {
      ctx.font = "14px monospace";
      ctx.fillStyle = "#00ff99";
      ctx.fillText(`Score: ${scoreRef.current}`, 8, 20);
      ctx.fillText(`High: ${highScore}`, WIDTH - 100, 20);
    };

    const update = () => {
      const ball = ballRef.current;
      const paddle = paddleRef.current;

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawPaddle();
      drawBall();
      drawScore();

      // Paddle movement
      if (paddle.moveRight && paddle.x < WIDTH - paddle.width) paddle.x += paddle.speed;
      if (paddle.moveLeft && paddle.x > 0) paddle.x -= paddle.speed;

      // Ball wall collisions
      if (ball.x + ball.dx > WIDTH - ball.radius || ball.x + ball.dx < ball.radius)
        ball.dx = -ball.dx;
      if (ball.y + ball.dy < ball.radius)
        ball.dy = -ball.dy;

      // Paddle bounce check
      if (ball.y + ball.dy > HEIGHT - ball.radius - paddle.height - 5) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
          scoreRef.current += 1;
          setScore(scoreRef.current);
        } else {
          // Missed paddle = game over
          setGameOver(true);
          setGameStarted(false);
          cancelAnimationFrame(requestRef.current);
          if (scoreRef.current > highScore) {
            localStorage.setItem("pongHighScore", scoreRef.current);
            setHighScore(scoreRef.current);
          }
          return;
        }
      }

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      requestRef.current = requestAnimationFrame(update);
    };

    if (gameStarted) {
      // Reset state
      scoreRef.current = 0;
      setScore(0);
      setGameOver(false);

      ballRef.current = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        radius: 8,
        dx: 1.0,
        dy: -1.2,
      };

      paddleRef.current.x = (WIDTH - paddleRef.current.width) / 2;
      requestRef.current = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const paddle = paddleRef.current;
      if (e.key === "ArrowRight") paddle.moveRight = true;
      if (e.key === "ArrowLeft") paddle.moveLeft = true;
    };
    const handleKeyUp = (e) => {
      const paddle = paddleRef.current;
      if (e.key === "ArrowRight") paddle.moveRight = false;
      if (e.key === "ArrowLeft") paddle.moveLeft = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className="mt-4 text-center">
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid #8b5cf6",
          borderRadius: 10,
          background: "#111827",
        }}
      />
      <div className="mt-2 text-gray-400 text-sm">
        Use ← → arrow keys to move paddle. Don’t let the ball fall!
      </div>

      {!gameStarted && !gameOver && (
        <button
          onClick={startGame}
          className="mt-4 mb-5 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          🎮 Play Pong
        </button>
      )}

      {gameOver && (
        <div className="mt-4">
          <p className="text-red-400 font-bold mb-2">
            💀 Game Over! Your Score: {score}
          </p>
          <button
            onClick={startGame}
            className="px-4 mb-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            🔁 Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
