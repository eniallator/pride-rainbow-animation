import type { InitParserObject, SeriFormOptions } from "seriform";
import {
  colorParser,
  createParsers,
  listParser,
  numberParser,
  rangeParser,
} from "seriform";

export const options: SeriFormOptions = { query: location.search };
export const config = createParsers({
  "trail-len": rangeParser({
    label: "Trail Length",
    default: 0.6,
    attrs: {
      min: "0",
      max: "1",
      step: "0.05",
    },
  }),
  speed: rangeParser({
    label: "Speed",
    default: 1,
    attrs: {
      min: "0.1",
      max: "2",
      step: "0.05",
    },
  }),
  "rainbow-width": rangeParser({
    label: "Rainbow Width",
    default: 0.4,
    attrs: {
      min: "0.1",
      max: "1",
      step: "0.05",
    },
  }),
  "num-items": numberParser({
    label: "Number of Trail Items",
    default: 100,
    attrs: {
      min: "1",
      max: "500",
    },
  }),
  colors: listParser({
    label: "Colours",
    expandable: true,
    field: colorParser({ label: "Colour" }),
    default: ["E70000", "FF8C00", "FFEF00", "00811F", "0044FF", "760089"],
  }),
});

export type Config =
  typeof config extends InitParserObject<infer R> ? R : never;
