import { mapState, createNamespacedHelpers } from "vuex";
import useMapper from "./useMapper";
export default function (moduleName, mapper) {
  let mapFn = mapState;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapFn = createNamespacedHelpers(moduleName).mapState;
  } else {
    // 如果只传一个参数为数组或对象
    mapper = moduleName;
  }
  return useMapper(mapper, mapFn);
}
