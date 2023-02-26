// здесб подключаем компоненты

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";
import productReducer from "./product/productSlice.js";




export const store = configureStore({
      reducer: {                    // редьюсер это фукнции котрые вычитыват из хранлища  состояние(state) приложения и возвращают новое состняие(state)
            // category- название  редьюсера, сам редьюсер это categorySlice.js
            //  product - название  редьюсера, сам редьюсер это productReducer.js
            category: categoryReducer,          // category это state
            product: productReducer,            // product это state
      }
});