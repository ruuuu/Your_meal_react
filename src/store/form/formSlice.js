// отправка данных формы
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearOrder } from "../order/orderSlice.js";
import { closeModal } from "../modalDelivery/modalDeliverySlice.js";




const initialState = {
      //  поля формы:
      name: '',
      phone: '',
      format: 'delivery',
      address: '',
      floor: '',
      intercom: '',
};



export const submitForm = createAsyncThunk(
      'form/submit',                                              // form/submit название action, задали такое имя сами
      // dispatch нужен чтобы заказы очищать и закрывать модалку:                                  
      async (data, { dispatch, rejectWithValue }) => {  // data- данные котрые отправляем на сервер https://cloudy-slash-rubidium.glitch.me/api/order
            try {
                  const response = await fetch('https://cloudy-slash-rubidium.glitch.me/api/order',
                        {
                              method: 'POST',
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data)
                        }
                  );

                  if (!response.ok) {
                        throw new Error(`Ошибка ${response.statusText}`);
                  }

                  dispatch(clearOrder());
                  dispatch(closeModal());
                  return await response.json();                         // дожидаемся ответа от сервера
            } catch (error) {
                  return rejectWithValue(error.message);
            }
      }
);



const formSlice = createSlice({

      name: 'form',                 // нзв action
      initialState: initialState,
      reducers: {
            // редьюсер :
            updateFormValue: (state, action) => {
                  //  action.payload.field выдаст значение  атрибута name у поля
                  //  action.payload.value выдаст значение этого полч 
                  console.log('action.payload ', action.payload);   // { field: 'phone', value: '877565464564' }
                  state[action.payload.field] = action.payload.value;
            }
      },
      // extraReducers нужны чтобы обработать orderRequestAsync(запрос на сервер):
      extraReducers: (builder) => {
            builder.addCase(submitForm.pending.type, (state) => {
                  state.status = 'loading'; // название статуса можем любон придумать
                  state.error = '';
                  state.response = null;
            })
            builder.addCase(submitForm.fulfilled.type, (state, action) => {
                  state.status = 'success';
                  console.log('action.payload in formSlice ', action.payload)
                  state.response = action.payload;
            })
            builder.addCase(submitForm.rejected.type, (state, action) => {
                  state.status = 'failed';
                  state.error = action.payload.error;
            })
      }
});



export const { updateFormValue } = formSlice.actions;  // вытащили редьюсер updateFormValue
export default formSlice.reducer;