import { createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";


//  инициализируем state:
const initilState = {
      products: [],  //  с сервера будут приходить
      error: '',
};



export const productRequestAsync = createAsyncThunk(
      'product/fetch',                                      // product/fetch название action, задали такое имя сами
      (category) => {
            return fetch(`${API_URI}${POSTFIX}/?category=${category}`)
                  .then(req => req.json())                  //  req-ответ от сервера, return req.json(). обрабатываем промис
                  .catch(error => ({ error }))              // возаращет объект, попадет в action.payload


      }  // результат этого колбэка попадает в action(в extraReducers)
)




const productSlice = createSlice({
      name: 'product',                                 //  название action, сами придумали
      initialState: initialState,
      extraReducers: (builder) => {
            // addCase()- добавляет редьюсер, метод возвращает builder           // здесь будут actions: обрабабтываем данные пришедшие в сервера
            builder.addCase(productRequestAsync.pending.type, (state) => {
                  state.error = ''; // error это свойстов в initialState
            })
            builder.addCase(productRequestAsync.fulfilled.type, (state, action) => {
                  state.error = '';
                  state.products = action.payload;                                  // сервер возаращет массив продуктов. products это свовойство в initialState
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



export default productSlice.reducer;