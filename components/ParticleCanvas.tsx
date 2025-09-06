import React, { useRef, useEffect } from 'react';

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const options = {
      staticStarCount: 400,
      shootingStarCount: 3,
      starColor: "rgba(255, 255, 255, 0.8)",
      maxStaticStarSize: 1.5,
      shootingStarBaseSpeed: 10,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class StaticStar {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * options.maxStaticStarSize;
        this.alpha = Math.random() * 0.5 + 0.3; // Initial opacity
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
      }

      draw() {
        // Twinkle effect
        this.alpha += this.twinkleSpeed;
        if (this.alpha > 0.8 || this.alpha < 0.2) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }
    
    class ShootingStar {
        x: number;
        y: number;
        len: number;
        speed: number;
        angle: number;
        vx: number;
        vy: number;
        radius: number;

        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.len = Math.random() * 80 + 40;
            this.speed = Math.random() * 8 + options.shootingStarBaseSpeed;
            // Angle between 30 and 60 degrees
            this.angle = Math.PI / 6 + Math.random() * (Math.PI / 6); 
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x > canvas.width + this.len || this.y > canvas.height + this.len) {
                this.reset();
            }
        }

        draw() {
            const tailX = this.x - this.len * Math.cos(this.angle);
            const tailY = this.y - this.len * Math.sin(this.angle);

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            
            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.radius / 2})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.radius;
            ctx.stroke();

            // Glowing head
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
            ctx.fill();
        }
    }


    let staticStars: StaticStar[] = [];
    let shootingStars: ShootingStar[] = [];

    const createStars = () => {
        staticStars = [];
        for (let i = 0; i < options.staticStarCount; i++) {
            staticStars.push(new StaticStar());
        }
        shootingStars = [];
        for (let i = 0; i < options.shootingStarCount; i++) {
            shootingStars.push(new ShootingStar());
        }
    }
    
    const animate = () => {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      staticStars.forEach(star => star.draw());
      shootingStars.forEach(star => {
          star.update();
          star.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };
    
    createStars();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default ParticleCanvas;