const s_harmony = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(700, 200, document.querySelector("#canvas_harmony"));

    sketch.background(180);
  };

  let t = 0;
  let run = document.querySelector("#harmony_spustit").checked;

  let n = document.querySelector("#harmony_n").valueAsNumber;
  document.querySelector("#label_harmony_n").innerText = n;
  let l = 6 / n;

  document.querySelector("#harmony_n").addEventListener("input", () => {
    n = document.querySelector("#harmony_n").valueAsNumber;
    l = 6 / n;

    document.querySelector("#label_harmony_n").innerText = n;

    if (!run) {
      sketch.loop();
      sketch.noLoop();
    }
  });

  if (run) {
    sketch.loop();
  } else {
    sketch.noLoop();
  }

  document.querySelector("#harmony_spustit").addEventListener("click", () => {
    run = document.querySelector("#harmony_spustit").checked;
    if (run) {
      sketch.loop();
    } else {
      sketch.noLoop();
    }
  });

  sketch.draw = () => {
    sketch.clear();
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.stroke(0, 0, 0);
    sketch.strokeWeight(3);
    sketch.line(-200, -sketch.height / 2 + 50, -200, sketch.height / 2 - 50);
    sketch.line(250, -sketch.height / 2 + 50, 250, sketch.height / 2 - 50);
    sketch.strokeWeight(1);
    sketch.textSize(24);
    sketch.fill(0, 0, 0);
    sketch.text("0", -207, 80);
    sketch.text("3", 243, 80);
    sketch.drawingContext.setLineDash([5]);
    sketch.line(-200, 0, 250, 0);

    if (run) {
      t += 0.05;
      if (t > 2 * Math.PI) {
        t = 0;
      }
    }

    sketch.drawingContext.setLineDash([]);

    sketch.stroke(255, 0, 100);
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.beginShape();
    for (let x = 0; x <= 3; x += 0.005) {
      let y = 30 * sketch.sin((2 * Math.PI * x) / l + t);
      sketch.vertex(150 * x - 200, -y);
    }
    sketch.endShape();

    sketch.stroke(255, 100, 100);
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.beginShape();
    for (let x = 0; x <= 3; x += 0.005) {
      let y = 30 * sketch.sin(Math.PI - (2 * Math.PI * x) / l + t);
      sketch.vertex(150 * x - 200, -y);
    }
    sketch.endShape();

    sketch.stroke(100, 100, 100);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (let x = 0; x <= 3; x += 0.005) {
      let y =
        30 * sketch.sin(Math.PI - (2 * Math.PI * x) / l + t) +
        30 * sketch.sin((2 * Math.PI * x) / l + t);
      sketch.vertex(150 * x - 200, -y);
    }
    sketch.endShape();

    sketch.fill(255, 0, 0);
    sketch.strokeWeight(0);
    sketch.circle(250, 0, 10);
    sketch.circle(-200, 0, 10);

    for (let i = 1; i < n; i++) {
      sketch.circle(-200 + (450 * i) / n, 0, 10);
    }
  };
};

new p5(s_harmony);
