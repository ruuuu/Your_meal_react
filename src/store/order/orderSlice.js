// Корзина:
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";
import { calcTotalCount, calcTotalPrice } from "../../utils/calcTotal";



// товары корзины хрнаим в LocalStorage,  orderList = [ {id, count}, {}, {} ] спсок товаров в Корзине
const initialState = {
      orderList: JSON.parse(localStorage.getItem('order') || '[]'),  // если пока нет  ничего в лок хранлиище то создаться пустой массив
      orderGoods: [],  // товары Корзины [{}], это товары полученные от /api/product?list={id,id,id}
      totalPrice: 0,
      totalCount: 0, // число товаров в Козина 
      error: [], // 

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
};



// запррос данных с сервера
// createAsyncThunk встроенная фукния, выполняет асинхрон действия:
export const orderRequestAsync = createAsyncThunk(
      'order/fetch',                                        // order/fetch название action, задали такое имя сами
      (_, { getState }) => {                                // getState() это метод 
            const listId = getState().order.orderList.map((item) => {      // order это название action. listId = [id,id,id], map прееберет масив и вернет ноавый массив ,  id каждого желмента 
                  return item.id;
            });

            return fetch(`${API_URI}${POSTFIX}?list=${listId}`)
                  .then(req => req.json())                   //  req-ответ от сервера, return req.json(). обрабатываем промис
                  .catch(error => ({ error }));              // возаращет объект, попадет в action.payload
      }  // результат этого колбэка попадает в action(в extraReducers)
);




const orderSlice = createSlice({
      name: 'order',                            // название action, в Redux  будет отображаться как order/addProduct
      initialState: initialState,
      reducers: {                   // здесь будут actions: 
            addProduct: (state, action) => {  //  при нажатии на кноку Добавить у товара, вызовется эта фукнция
                  //console.log('action.payload in orderSlice ', action.payload);                 // {id: 323423}
                  //console.log('...action.payload in orderSlice ', { ...action.payload });        // {id: 323423}
                  const productOrderList = state.orderList.find((item) => {
                        return item.id === action.payload.id;
                  });                // перебирает массив state.orderList и возврашает первый элемент, удовлевор условию

                  // action.payload - объект, action.payload.id  товар котрый выбрали

                  //console.log('productOrderList ', productOrderList);

                  if (productOrderList) {                                                    // если добавленный элементе етсь в коризне
                        productOrderList.count += 1;
                        const productOrderGoods = state.orderGoods.find((item) => {
                              return item.id === action.payload.id;
                        });

                        productOrderGoods.count = productOrderList.count;
                        state.totalCount = calcTotalCount(state.orderGoods);
                        state.totalPrice = calcTotalPrice(state.orderGoods);
                        //console.log('productOrderGoods in orderSlice ', productOrderGoods);
                  }
                  else {
                        state.orderList.push({ ...action.payload, count: 1 });      // orderList это своойство initialState={} , добавялем один товар в Корзину
                  }

                  // console.log('orderSlice.actions ', orderSlice.actions);
            },
            removeProduct: (state, action) => {  // при нажатии на минус, вызовется эта фукнция

                  const productOrderList = state.orderList.find((item) => {
                        return item.id === action.payload.id;
                  });                // перебирает массив state.orderList и возврашает первый элемент, удовлевор условию



                  if (productOrderList.count > 1) {                                                    // если добавленный элементе етсь в коризне
                        productOrderList.count -= 1;
                        const productOrderGoods = state.orderGoods.find((item) => {
                              return item.id === action.payload.id;
                        });

                        productOrderGoods.count = productOrderList.count;
                        state.totalCount = calcTotalCount(state.orderGoods);
                        state.totalPrice = calcTotalPrice(state.orderGoods);
                        //console.log('productOrderGoods in orderSlice ', productOrderGoods);
                  }
                  else {
                        state.orderList = state.orderList.filter((item) => {
                              return (item.id !== action.payload.id);
                        });      // orderList это своойство initialState={} , добавялем один товар в Корзину
                  }

            }
      },
      // extraReducers автмоатич создают actions. extraReducers нужны чтобы обработать orderRequestAsync
      extraReducers: (builder) => {
            builder.addCase(orderRequestAsync.pending.type, (state) => {   // orderRequestAsync.pending можно без type писать
                  state.error = '';                                        // error это свойстов в initialState
            })
            builder.addCase(orderRequestAsync.fulfilled.type, (state, action) => {
                  console.log('action.payload in OrderSlice ', action.payload);     // то что вернулось с сервера: [ {id, name, category, price, weight, count}, {}, {}]

                  const orderGoods = state.orderList.map((item) => {                // перебираем  [ {id, count}, {id, count} ]
                        const product = action.payload.find((product) => product.id === item.id,);

                        product.count = item.count;

                        return product;
                  });
                  // orderGoods = [ {id, name, price, sount}, {}, {} ]

                  state.error = '';
                  state.orderGoods = orderGoods;
                  state.totalCount = calcTotalCount(orderGoods);
                  state.totalPrice = calcTotalPrice(orderGoods);

            })
            builder.addCase(orderRequestAsync.rejected.type, (state, action) => {
                  state.error = action.payload.error;
            })
      },

});


export const { addProduct, removeProduct } = orderSlice.actions;
export default orderSlice.reducer;