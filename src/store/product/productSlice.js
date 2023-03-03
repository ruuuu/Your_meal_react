import { createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";
import { createAsyncThunk } from "@reduxjs/toolkit";


//  инициализируем state:
const initilState = {
      products: [],  //  с сервера будут приходить
      error: '',
};


// action срабатывают на основе  createAsyncThunk, с помощью функуии productRequestAsync:
export const productRequestAsync = createAsyncThunk(
      'product/fetch',                                      // product/fetch название action, задали такое имя сами
      (category) => {
            return fetch(`${API_URI}${POSTFIX}/?category=${category}`)
                  .then(req => req.json())                  //  req-ответ от сервера, return req.json(). обрабатываем промис
                  .catch(error => ({ error }))              // возаращет объект, попадет в action.payload


      }  // результат этого колбэка попадает в action(котрый в extraReducers)
)




const productSlice = createSlice({
      name: 'product',                                 //  название state, сами придумали,
      initialState: initilState,
      extraReducers: (builder) => {
            // addCase() добавляет редьюсер, метод возвращает builder           // здесь будут actions: обрабабтываем данные пришедшие в сервера
            builder.addCase(productRequestAsync.pending.type, (state) => {
                  state.error = ''; // error это свойстов в initialState
            })
            builder.addCase(productRequestAsync.fulfilled.type, (state, action) => {
                  state.error = '';
                  console.log('action.payload in ProductSlice ', action.payload);         // action.payload это то, что возвращает сервер, а именно [{},{},{}] -массив продуктов
                  state.products = action.payload;                                        // сервер возаращет массив продуктов. products это свовойство в initialState
            })
            builder.addCase(productRequestAsync.rejected.type, (state, action) => {
                  state.error = action.payload.error;
            })

            // либо можно напсиать так:
            // builder
            //       .addCase()
            //       .addCase()
            //       .addCase()
      },

});



export default productSlice.reducer;             // редьюсер вытащили