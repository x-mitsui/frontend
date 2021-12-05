import "./libs/component";

import { sum, multiply } from "./libs/math.js";
const { priceFormat, timeFormat } = require("./libs/formats");
console.log("sum:", sum(3, 1));
console.log("multiply:", multiply(3, 11));
console.log("priceFormat:", priceFormat());
console.log("timeFormat:", timeFormat());
