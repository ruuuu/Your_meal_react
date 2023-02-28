// здесб подключаем компоненты

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";  // categoryReducer здесь дали название сами 
import productReducer from "./product/productSlice.js";     // productReducer здесь дали название сами 
import orderReducer, { localStorageMiddleware } from "./order/orderSlice.js";



export const store = configureStore({
      reducer: {                    // редьюсер это фукнции котрые вычитыват из хранлища  состояние(state) приложения и возвращают новое состняие(state)
            // category- название  редьюсера, сам редьюсер это categorySlice.js
            //  product - название  редьюсера, сам редьюсер это productReducer.js
            category: categoryReducer,          // category это state
            product: productReducer,            // product это state
            order: orderReducer,
      },


      middleware: getDefaultMiddleware => {
            const middlewares = getDefaultMiddleware().concat(localStorageMiddleware)  // getDefaultMiddleware()  получим массив всех middleware
            console.log('middlewares ', middlewares)
            return middlewares;
      }

});