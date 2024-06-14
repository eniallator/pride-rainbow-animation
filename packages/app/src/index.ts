import { Vector } from "@web-art/linear-algebra";
import config from "./config";
import { AppContext, appMethods } from "./lib/types";
import { posMod } from "@web-art/core";

function makeTrails({ canvas, time, paramConfig }: AppContext<typeof config>) {
  const speed = paramConfig.getVal("speed");
  const timeAlive = speed * (time.now - time.animationStart);
  const trailLen = paramConfig.getVal("trail-len") * Math.PI;
  const numItems = paramConfig.getVal("num-items");
  const center = Vector.create(canvas.width / 2, canvas.height);
  const maxRadius = center.getMin();
  const rainbowWidth = paramConfig.getVal("rainbow-width") * maxRadius;
  const numColours = paramConfig.getVal("colours").length;
  return new Array(numColours).fill(undefined).map((_, i) => {
    const radius = maxRadius - ((i + 0.5) / numColours) * rainbowWidth;
    return new Array(numItems)
      .fill(undefined)
      .map((_, j) =>
        Vector.create(
          -radius *
            Math.sin(
              Math.PI / 2 -
                posMod(timeAlive - (j / numItems) * trailLen, Math.PI)
            ),
          -radius *
            Math.cos(
              Math.PI / 2 -
                posMod(timeAlive - (j / numItems) * trailLen, Math.PI)
            )
        ).add(center)
      );
  });
}

function animationFrame(context: AppContext<typeof config>) {
  const { canvas, ctx, paramConfig } = context;
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.globalAlpha = 1;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const colours = paramConfig.getVal("colours").flat();

  const diameter =
    (paramConfig.getVal("rainbow-width") / colours.length) *
    Math.min(canvas.width / 2, canvas.height);

  makeTrails(context).forEach((trail, i) => {
    ctx.fillStyle = `#${colours[i]}`;

    trail.forEach((pos, j) => {
      ctx.globalAlpha = (trail.length - 1 - j) / (trail.length - 1);
      ctx.beginPath();
      ctx.arc(pos.x(), pos.y(), diameter / 2, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  });
}

export default appMethods.stateless({
  animationFrame,
});
