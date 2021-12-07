class M {
  a: number = 3;
  constructor() {}
}
let arr2: M[] = [];
let p: number[] = [];
let m: [string, number] = ["1", 2];

interface V {
  K: (para: string) => void;
}
type S = (para: string) => void;
let func: S = function (params: string) {};
let k: V = {
  K: function s(params: string) {},
};
interface VV {
  move(): void;
}
