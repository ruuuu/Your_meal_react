// здесб подключаем компоненты

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice.js";  // categoryReducer здесь дали название сами 
import productReducer from "./product/productSlice.js";     // productReducer здесь дали название сами 
import orderReducer, { localStorageMiddleware } from "./order/orderSlice.js";
import modalReducer from "./modalDelivery/modalDeliverySlice.js";


export const store = configureStore({
      reducer: {                    // редьюсер это фукнции котрые вычитыват из store  состояние(state) приложения и возвращают новое состняие(state)
            // category- название  редьюсера, сам редьюсер это categorySlice.js
            //  product - название  редьюсера, сам редьюсер это productReducer.js
            category: categoryReducer,          // category это названеи state
            product: productReducer,            // product это название state
            order: orderReducer,
            modal: modalReducer

      },


      middleware: getDefaultMiddleware => {
            const middlewares = getDefaultMiddleware().concat(localStorageMiddleware)  // getDefaultMiddleware()  получим массив всех middleware
            console.log('middlewares ', middlewares)
            return middlewares;
      }

});