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
      staticStarCount: 800,
      shootingStarCount: 3,
      starColor: "rgba(255, 255, 255, 0.8)",
      maxStaticStarSize: 1.5,
      shootingStarBaseSpeed: 10,
      mouseRadius: 200, // Radius for mouse interaction
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    
    const mouse = {
        x: -options.mouseRadius,
        y: -options.mouseRadius,
    };

    class StaticStar {
      x: number;
      y: number;
      z: number; // Depth for parallax effect
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      minAlpha: number;
      maxAlpha: number;
      vx: number; // Velocity x for mouse interaction
      vy: number; // Velocity y for mouse interaction

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 0.7 + 0.3; // Depth from 0.3 to 1.0
        this.radius = Math.random() * options.maxStaticStarSize * this.z;
        this.minAlpha = Math.random() * 0.2 + 0.1;
        this.maxAlpha = Math.random() * 0.4 + 0.5;
        this.alpha = (Math.random() * (this.maxAlpha - this.minAlpha) + this.minAlpha) * this.z;
        this.twinkleSpeed = Math.random() * 0.012 + 0.003;
        this.vx = 0;
        this.vy = 0;
      }

      update(velocity: number) {
        // Scroll parallax
        this.y -= velocity * this.z;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < options.mouseRadius) {
            const force = (options.mouseRadius - dist) / options.mouseRadius;
            this.vx += (dx / dist) * force * 0.25;
            this.vy += (dy / dist) * force * 0.25;
        }

        // Apply friction and update position
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.x += this.vx;
        this.y += this.vy;

        // Screen wrapping
        if (this.y < -this.radius) {
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
        } else if (this.y > canvas.height + this.radius) {
            this.y = -this.radius;
            this.x = Math.random() * canvas.width;
        }
        if (this.x < -this.radius) { this.x = canvas.width + this.radius; }
        if (this.x > canvas.width + this.radius) { this.x = -this.radius; }

      }

      draw(velocity: number) {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > this.maxAlpha * this.z || this.alpha < this.minAlpha * this.z) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
        
        const streakLength = Math.min(Math.abs(velocity) * 0.8 * this.z, 30);

        if (streakLength > 2) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + streakLength * Math.sign(velocity));
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.8})`;
            ctx.lineWidth = this.radius * 1.2;
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
        }
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

      scrollVelocity *= 0.95; // Apply friction to the scroll velocity
      
      staticStars.forEach(star => {
        star.update(scrollVelocity);
        star.draw(scrollVelocity);
      });

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

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        scrollVelocity += (currentScrollY - lastScrollY) * 0.02;
        lastScrollY = currentScrollY;
    }

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    const handleMouseLeave = () => {
        mouse.x = -options.mouseRadius;
        mouse.y = -options.mouseRadius;
    }
    
    createStars();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default ParticleCanvas;