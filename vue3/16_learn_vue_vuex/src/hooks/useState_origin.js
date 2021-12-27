import { mapState } from "vuex";
import useMapper from "./useMapper";
export default function (states) {
  return useMapper(states, mapState);
}
