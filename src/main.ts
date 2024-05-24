import p5 from 'p5';

const sketch = (p: p5) => {
  let ripples: { x: number; y: number; radius: number; alpha: number }[] = [];

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noFill();
  };

  p.draw = () => {
    p.background(255);

    // 波紋を描画
    for (let i = ripples.length - 1; i >= 0; i--) {
      let r = ripples[i];

      p.stroke(0, 0, 0, r.alpha);
      p.ellipse(r.x, r.y, r.radius * 10, r.radius * 10);
      r.radius += 2;
      r.alpha -= 4;

      if (r.alpha <= 0) {
        ripples.splice(i, 1);
      }
    }
  };

  p.mousePressed = () => {
    let ripple = {
      x: p.mouseX,
      y: p.mouseY,
      radius: 0,
      alpha: 255,
    };

    console.log(ripple);
    ripples.push(ripple);
  };
};

new p5(sketch);
