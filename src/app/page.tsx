'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 50; // Size of each grid square
    const gridColor = '#8B0000'; // Dark red
    const highlightColor = '#FF0000'; // Bright red
    let highlightX = 0;
    let highlightY = 0;

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid squares
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.strokeStyle = gridColor;
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      // Draw the highlighted square
      ctx.fillStyle = highlightColor;
      ctx.fillRect(highlightX, highlightY, gridSize, gridSize);

      // Move the highlight
      highlightX += gridSize;
      if (highlightX >= canvas.width) {
        highlightX = 0;
        highlightY += gridSize;
        if (highlightY >= canvas.height) {
          highlightY = 0;
        }
      }
    }

    function animate() {
      drawGrid();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div className="container">
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      <header>
        <h1 className="glow-title">
          Welcome to <span className="highlight">Afaq Hub</span>
        </h1>
        <p className="glow-subtitle">Ignite your imagination and achieve greatness.</p>
      </header>

      <main>
        <SignedIn>
          <div className="card signed-in glow-card">
            <h2 className="card-title glow-heading">Hello, User!</h2>
            <p className="glow-text">You’re signed in. Manage your account below:</p>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="card signed-out glow-card">
            <h2 className="card-title glow-heading">Get Started Today!</h2>
            <p className="glow-text">Sign in to unlock amazing features.</p>
            <SignInButton mode="modal">
              <button className="glow-button">Sign In</button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>

      <footer>
        <p className="footer-glow">© {new Date().getFullYear()} Afaq Hub. Designed to inspire.</p>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@300;400;500&display=swap');

        .container {
          font-family: 'Montserrat', sans-serif;
          color: #fff;
          background: linear-gradient(135deg, #2c0000, #3f0000, #5c0000);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .background-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        header {
          text-align: center;
          z-index: 2;
          margin-bottom: 3rem;
        }

        .glow-title {
          font-family: 'Roboto', sans-serif;
          font-size: 4rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 50px #FF0000;
          animation: glow-pulse 2s infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 50px #FF0000;
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 0, 0, 0.8), 0 0 70px #FF0000;
          }
        }

        .glow-subtitle {
          font-family: 'Roboto', sans-serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 0 20px #FF0000, 0 0 40px #FF0000;
        }

        .highlight {
          background: linear-gradient(90deg, #FF0000, #8B0000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-text {
          font-family: 'Roboto', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: #fff;
          text-shadow: 0 0 15px #FF0000, 0 0 30px #FF0000;
        }

        .glow-heading {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 0 20px #FF0000, 0 0 40px #FF0000;
        }

        .glow-card {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 2px solid transparent;
          border-image: linear-gradient(90deg, #FF0000, #8B0000) 1;
          border-radius: 15px;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          z-index: 2;
          transform: translateY(0px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glow-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }

        .glow-button {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          padding: 0.8rem 2rem;
          background: linear-gradient(90deg, #FF0000, #8B0000);
          border: none;
          border-radius: 50px; /* Rounded shape */
          color: #fff;
          cursor: pointer;
          text-shadow: 0 0 15px #FF0000, 0 0 30px #FF0000;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glow-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(255, 0, 0, 0.9);
        }

        .footer-glow {
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 0 10px #FF0000, 0 0 20px #FF0000;
        }

        .glow-title:hover, 
        .glow-subtitle:hover, 
        .glow-text:hover, 
        .glow-heading:hover, 
        .footer-glow:hover {
          text-shadow: 0 0 30px #FF4500, 0 0 60px #FF4500, 0 0 90px #FF4500;
          color: #fff;
          transition: text-shadow 0.3s ease, color 0.3s ease;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .glow-title {
            font-size: 2.5rem;
          }
          .glow-subtitle {
            font-size: 1.2rem;
          }
          .glow-card {
            padding: 1.5rem;
          }
          .glow-button {
            font-size: 1rem;
            padding: 0.7rem 1.5rem;
          }
        }

        @media (max-width: 500px) {
          .glow-title {
            font-size: 2rem;
          }
          .glow-subtitle {
            font-size: 1rem;
          }
          .glow-card {
            padding: 1rem;
          }
          .glow-button {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
          }
        }

        @media (max-width: 400px) {
          .glow-title {
            font-size: 1.8rem;
          }
          .glow-subtitle {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
