import { initState } from "./init.js";
export default function Vue(opts) {
  this._init(opts);
}
Vue.prototype._init = function (opts) {
  this.$options = opts;
  initState(this);
};
