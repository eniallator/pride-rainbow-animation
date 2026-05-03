import { polarToCartesian, positiveMod } from "niall-utils";
import { Vector } from "vectyped";

import { appMethods } from "./lib/index.ts";

import type { Config } from "./config.ts";
import type { AppContext } from "./lib/index.ts";

function makeTrails({ canvas, time, seriform }: AppContext<Config>) {
  const timeAlive = seriform.getValue("speed") * (time.now - time.start);
  const trailLen = seriform.getValue("trail-len") * Math.PI;
  const numItems = seriform.getValue("num-items");
  const center = Vector.create(canvas.width / 2, canvas.height);
  const maxRadius = center.getMin();
  const rainbowWidth = seriform.getValue("rainbow-width") * maxRadius;
  const numColors = seriform.getValue("colors").length;

  return new Array(numColors)
    .fill(undefined)
    .map((_, i) =>
      new Array(numItems)
        .fill(undefined)
        .map((_, j) =>
          Vector.create(
            ...polarToCartesian(
              ((i + 0.5) / numColors) * rainbowWidth - maxRadius,
              positiveMod(timeAlive - (j / numItems) * trailLen, Math.PI)
            )
          ).add(center)
        )
    );
}

function animationFrame(context: AppContext<Config>) {
  const { canvas, ctx, seriform } = context;

  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.globalAlpha = 1;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const colors = seriform.getValue("colors");

  const diameter =
    (seriform.getValue("rainbow-width") / colors.length) *
    Math.min(canvas.width / 2, canvas.height);

  makeTrails(context).forEach((trail, i) => {
    ctx.fillStyle = `#${colors[i]}`;

    trail.forEach((pos, j) => {
      ctx.globalAlpha = (trail.length - 1 - j) / (trail.length - 1);
      ctx.beginPath();
      ctx.arc(pos.x(), pos.y(), diameter / 2, 0, 2 * Math.PI);
      ctx.fill();
    });
  });
}

export const app = appMethods<Config>({
  init: () => {
    /* Nothing to init */
  },
  animationFrame,
});
