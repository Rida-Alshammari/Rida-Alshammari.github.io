// TODO: ========================== Class Network Animation ==========================
class Network {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dots = [];
        this.connectDistance = 200;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.initDots();
    }
    initDots() {
        this.dots = [];
        const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
        for (let i = 0; i < count; i++) {
            this.dots.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // Draw connections
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectDistance) {
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                }
            }
        }
        this.ctx.stroke();
        // Draw dots
        this.ctx.fillStyle = '#00f0ff';
        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    update() {
        this.dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Bounce on edges
            if (dot.x < 0 || dot.x > this.width) dot.vx *= -1;
            if (dot.y < 0 || dot.y > this.height) dot.vy *= -1;
        });
    }
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

const network2 = new Network(document.getElementById('networkCanvas2'));
const network4 = new Network(document.getElementById('networkCanvas4'));
const network6 = new Network(document.getElementById('networkCanvas6'));
// Mouse Interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    gsap.to('.hero-image', {
        x: mouseX * 0.05,
        y: mouseY * -0.05,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Todo: ============================== Start Particle JS ==============================
particlesJS("particles", {
    particles: {
        number: {
            value: 600,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#00f0ff",
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
        },
        opacity: {
            value: 0.8,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#777777",
            opacity: 0.4,
            width: 1,
        },
        // 00f0ff => Green
        // 00ff6c => Green 2
        // 005df2 => blue
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: {
                enable: true,
                mode: "push",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
        },
    },
    retina_detect: true,
});
function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}
window.addEventListener("scroll", function () {
    var scrollTopButton = document.querySelector(".scroll-top");
    if (this.window.pageYOffset > 200) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});