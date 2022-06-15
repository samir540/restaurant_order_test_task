import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice";
import tablesAndServersReducer from "./tableAndServerSlice";
import mealsReducer from "./mealOrderSlice";

 const store = configureStore({
   reducer: {
     order: orderReducer,
     tablesAndServers: tablesAndServersReducer,
     meals: mealsReducer,
   },
 });

export default store;