const s_struna = (sketch) => {
  let zvuk;
  sketch.preload = () => {
    zvuk = sketch.loadSound("struna.mp3");
  };

  sketch.setup = () => {
    sketch.createCanvas(700, 200, document.querySelector("#canvas_struna"));
  };

  let run = true;

  let wasMousePressed = false;

  let t = 0;
  let l = 6;

  let A = 30;

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
    sketch.drawingContext.setLineDash([5]);
    sketch.line(-200, 0, 250, 0);

    if (run) {
      t += (0.5 * 30) / (Math.abs(A) + 10);
      if (t > 2 * Math.PI) {
        t = 0;
      }
      A *= 0.99;
      if (Math.abs(A) < 0.1) {
        A = 0;
      }
    }

    sketch.drawingContext.setLineDash([]);

    sketch.stroke(100, 100, 100);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (let x = 0; x <= 3; x += 0.005) {
      let y =
        A * sketch.sin(Math.PI - (2 * Math.PI * x) / l + t) +
        A * sketch.sin((2 * Math.PI * x) / l + t);
      sketch.vertex(150 * x - 200, -y);
    }
    sketch.endShape();

    if (sketch.mouseIsPressed) {
      if (
        sketch.mouseX < sketch.width / 2 + 250 &&
        sketch.mouseX > sketch.width / 2 - 200 &&
        sketch.mouseY < sketch.height / 2 + 50 &&
        sketch.mouseY > sketch.height / 2 - 50
      ) {
        run = false;

        A =
          -((sketch.mouseY - sketch.height / 2) / 1.5) *
          (1 - Math.abs(sketch.mouseX - 375) / 375);

        zvuk.stop();
        let volume = Math.min(Math.abs(A) / 30, 1);
        zvuk.setVolume(volume);
        wasMousePressed = true;
        t = 0;
      }
    }
  };

  sketch.mouseReleased = () => {
    run = true;
    if (wasMousePressed) {
      wasMousePressed = false;
      zvuk.play();
    }
  };
};

new p5(s_struna);
