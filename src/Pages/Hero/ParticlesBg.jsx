import React, { useEffect, useRef, memo } from "react";

const ParticlesBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const particleCount =
      window.innerWidth < 768 ? 20 : 35;

    const dots = Array.from(
      { length: particleCount },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * Math.PI * 2,
      })
    );

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.a += 0.008;

        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;

        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();

        ctx.arc(
          d.x,
          d.y,
          d.r,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(0,149,255,${
          0.12 +
          0.18 *
            Math.abs(Math.sin(d.a))
        })`;

        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (
          let j = i + 1;
          j < dots.length;
          j++
        ) {
          const dx =
            dots[i].x - dots[j].x;

          const dy =
            dots[i].y - dots[j].y;

          const dist = Math.sqrt(
            dx * dx + dy * dy
          );

          if (dist < 90) {
            ctx.beginPath();

            ctx.moveTo(
              dots[i].x,
              dots[i].y
            );

            ctx.lineTo(
              dots[j].x,
              dots[j].y
            );

            ctx.strokeStyle = `rgba(0,149,255,${
              0.05 *
              (1 - dist / 90)
            })`;

            ctx.lineWidth = 0.4;

            ctx.stroke();
          }
        }
      }

      raf =
        requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default memo(ParticlesBg);