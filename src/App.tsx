/* eslint-disable no-plusplus */
/* eslint-disable new-cap */
import p5 from "p5";
import React, { useEffect, useRef } from "react";

const width = window.innerWidth;
const height = window.innerHeight;

const App: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};

    const sketch = (p: p5) => {
      const p5Instance = p;
      const ripples: { x: number; y: number; radius: number; alpha: number }[] =
        [];

      p5Instance.setup = () => {
        p5Instance.createCanvas(width, height).parent(canvas);
        p5Instance.noFill();
      };

      p5Instance.draw = () => {
        p5Instance.background(255);

        // 波紋を描画
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          p5Instance.stroke(0, 0, 0, r.alpha);
          p5Instance.ellipse(r.x, r.y, r.radius * 10, r.radius * 10);
          r.radius += 2;
          r.alpha -= 4;

          // 透明度が0以下なら削除
          if (r.alpha <= 0) {
            ripples.splice(i, 1);
          }
        }
      };

      p5Instance.mousePressed = () => {
        const ripple = {
          x: p5Instance.mouseX,
          y: p5Instance.mouseY,
          radius: 0,
          alpha: 255,
        };
        ripples.push(ripple);
      };
    };

    const p5Instance = new p5(sketch);

    p5Ref.current = p5Instance;

    return () => {
      if (!p5Ref.current) return;
      p5Ref.current.remove();
    };
  }, []);

  return <div ref={canvasRef} className="size-full" />;
};

export default App;
