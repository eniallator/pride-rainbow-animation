import {
  colorConfig,
  config,
  configCollection,
  numberConfig,
  rangeConfig,
} from "@web-art/config-parser";

export default config(
  rangeConfig({
    id: "trail-len",
    label: "Trail Length",
    default: 0.6,
    attrs: {
      min: "0",
      max: "1",
      step: "0.05",
    },
  }),
  rangeConfig({
    id: "speed",
    label: "Speed",
    default: 1,
    attrs: {
      min: "0.1",
      max: "2",
      step: "0.05",
    },
  }),
  rangeConfig({
    id: "rainbow-width",
    label: "Rainbow Width",
    default: 0.4,
    attrs: {
      min: "0.1",
      max: "1",
      step: "0.05",
    },
  }),
  numberConfig({
    id: "num-items",
    label: "Number of Trail Items",
    default: 100,
    attrs: {
      min: "1",
      max: "500",
    },
  }),
  configCollection({
    id: "colours",
    label: "Colours",
    expandable: true,
    fields: [colorConfig({ id: "colour", label: "Colour" })],
    default: [
      ["E70000"],
      ["FF8C00"],
      ["FFEF00"],
      ["00811F"],
      ["0044FF"],
      ["760089"],
    ],
  })
);
