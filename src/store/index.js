// здесб подключаем компоненты

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";  // categoryReducer здесь дали название сами 
import productReducer from "./product/productSlice.js";     // productReducer здесь дали название сами 
import orderReducer from "./order/orderSlice.js";



export const store = configureStore({
      reducer: {                    // редьюсер это фукнции котрые вычитыват из хранлища  состояние(state) приложения и возвращают новое состняие(state)
            // category- название  редьюсера, сам редьюсер это categorySlice.js
            //  product - название  редьюсера, сам редьюсер это productReducer.js
            category: categoryReducer,          // category это state
            product: productReducer,            // product это state
            order: orderReducer,
      }
});