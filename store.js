import { createStore } from "redux";
import mainReducer from "./services/reducers/main-reducer";

export const store = createStore(mainReducer);
