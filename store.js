import { createStore } from "redux";
import countreducers from "./Cartreducer";

const store = createStore(countreducers);

export default store;