// Корзина:
import { createSlice } from "@reduxjs/toolkit";


// товары корзины хрнаим в LocalStorage,  orderList = [{},{},{}] спсок товаров в Корзине
const initialState = {
      orderList: JSON.parse(localStorage.getItem('order') || '[]'),  // если пока нет  ничего в лок хранлиище то создаться пустой массив
};


// свой middleware:
export const localStorageMiddleware = store => next => action => {
      //console.log('action ', action);
      const nextAction = next(action);
      if (nextAction.type.startsWith('order/')) {
            const orderList = store.getState().order.orderList;
            localStorage.setItem('order', JSON.stringify(orderList));
            console.log('orderList ', orderList);
      }

      return nextAction; // возвращет action, каждый раз когда вызывается action, вызывается каждый middleware
}






const orderSlice = createSlice({
      name: 'order',                            // название action, в Redux  будет отображаться как order/addProduct
      initialState: initialState,
      reducers: {  // здесь будут actions: 
            addProduct: (state, action) => {
                  console.log('action.payload in orderSlice ', action.payload);                 // {id: 323423}
                  console.log('...action.payload in orderSlice ', { ...action.payload });        // {id: 323423}
                  const product = state.orderList.find((productItem) => {           // переьирает массив state.orderList и возврашает элемент, удовлевор условию
                        return (productItem.id === action.payload.id);               // action.payload - объект, action.payload.id  товар котрый выбрали
                  });

                  if (product) {                                                    // если добавленный элементе етсь в коризне
                        product.count += 1;
                  }
                  else {
                        state.orderList.push({ ...action.payload, count: 1 });      // orderList это своойство initialState={} , добавялем один товар в Корзину
                  }

                  console.log('orderSlice.actions ', orderSlice.actions);
            }
      }

});


export const { addProduct } = orderSlice.actions;  // возвращаем addProduct
export default orderSlice.reducer;