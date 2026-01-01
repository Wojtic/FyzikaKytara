const s_odraz = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(700, 200, document.querySelector("#canvas_odraz"));
  };

  let odraz_t = -10;

  let odraz_showAfter = document.querySelector("#odraz_after").checked;
  let odraz_showUndisturbed =
    document.querySelector("#odraz_undisturbed").checked;

  let odraz_run = document.querySelector("#odraz_spustit").checked;
  let odraz_freeEnd = document.querySelector("#odraz_volny").checked;

  if (odraz_run) {
    sketch.loop();
  } else {
    sketch.noLoop();
  }

  document.querySelector("#odraz_after").addEventListener("click", () => {
    odraz_showAfter = document.querySelector("#odraz_after").checked;
  });

  document.querySelector("#odraz_volny").addEventListener("click", () => {
    odraz_freeEnd = document.querySelector("#odraz_volny").checked;
  });

  document.querySelector("#odraz_undisturbed").addEventListener("click", () => {
    odraz_showUndisturbed =
      document.querySelector("#odraz_undisturbed").checked;
  });

  document.querySelector("#odraz_spustit").addEventListener("click", () => {
    odraz_run = document.querySelector("#odraz_spustit").checked;
    if (odraz_run) {
      sketch.loop();
    } else {
      sketch.noLoop();
    }
  });

  sketch.draw = () => {
    sketch.background(255);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.stroke(0, 0, 0);
    sketch.strokeWeight(odraz_freeEnd ? 1 : 5);
    sketch.line(0, -sketch.height / 2 + 50, 0, sketch.height / 2 - 50);

    odraz_t += 0.05;
    if (odraz_t > 10) {
      odraz_t = -10;
    }

    sketch.drawingContext.setLineDash([6]);

    if (odraz_showAfter) {
      sketch.stroke(255, 0, 100);
      sketch.strokeWeight(2);
      sketch.noFill();
      sketch.beginShape();
      for (let x = -7; x <= 7; x += 0.1) {
        let y = 30 * sketch.exp(-1 * (x - odraz_t) ** 2);
        sketch.vertex(40 * x, -y);
      }
      sketch.endShape();
    }

    if (odraz_showUndisturbed) {
      sketch.stroke(0, 0, 255);
      sketch.strokeWeight(2);
      sketch.noFill();
      sketch.beginShape();

      for (let x = -7; x <= 0; x += 0.1) {
        let y =
          -30 * sketch.exp(-1 * (x + odraz_t) ** 2) * (odraz_freeEnd ? -1 : 1);
        sketch.vertex(40 * x, -y);
      }
      sketch.endShape();
    }
    sketch.drawingContext.setLineDash([]);

    sketch.stroke(200, 100, 200);
    sketch.strokeWeight(3);
    sketch.noFill();
    sketch.beginShape();

    for (let x = -7; x <= 0; x += 0.1) {
      let y =
        -30 * sketch.exp(-1 * (x + odraz_t) ** 2) * (odraz_freeEnd ? -1 : 1) +
        30 * sketch.exp(-1 * (x - odraz_t) ** 2);
      sketch.vertex(40 * x, -y);
    }
    sketch.endShape();
  };
};

new p5(s_odraz);
