const s_skladani = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(700, 200, document.querySelector("#canvas_skladani"));

    sketch.background(180);
  };

  let t = 0;

  let l = document.querySelector("#skladani_l").valueAsNumber;
  document.querySelector("#label_skladani_l").innerText = "Lambda: " + l;

  document.querySelector("#skladani_l").addEventListener("input", () => {
    l = document.querySelector("#skladani_l").valueAsNumber;

    document.querySelector("#label_skladani_l").innerText = "Lambda: " + l;
  });

  let run = document.querySelector("#skladani_spustit").checked;

  if (run) {
    sketch.loop();
  } else {
    sketch.noLoop();
  }

  document.querySelector("#skladani_spustit").addEventListener("click", () => {
    run = document.querySelector("#skladani_spustit").checked;
    if (run) {
      sketch.loop();
    } else {
      sketch.noLoop();
    }
  });

  sketch.draw = () => {
    sketch.background(255);
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
    t += 0.05;
    if (t > 2 * Math.PI) {
      t = 0;
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

    if ((6 / l) % 1 < 0.0001) {
      sketch.fill(0, 255, 0);
    } else {
      sketch.fill(255, 0, 0);
    }
    sketch.strokeWeight(0);
    sketch.circle(
      250,
      -30 * sketch.sin(Math.PI - (2 * Math.PI * 3) / l + t) -
        30 * sketch.sin((2 * Math.PI * 3) / l + t),
      15
    );
  };
};

new p5(s_skladani);
