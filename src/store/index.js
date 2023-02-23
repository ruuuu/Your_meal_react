// здесб подключаем компоненты

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";


export const store = configureStore({
      reducer: {  // редьюсер это фукнции котрые вычитыват из хранлища  состояние приложения и возвращают новое состняие
            // category- название  редьюсера, сам редьюсер это categorySlice.js
            category: categoryReducer,
      }
});