// отправка жанных формы
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
      //  поля формы:
      name: 'Руфина',
      phone: '89765454323',
      format: 'delivery',
      address: 'Казань',
      floor: '12',
      intercom: '',
};



export const submitForm = createAsyncThunk(
      'form/submit',                                        // order/fetch название action, задали такое имя сами
      async(data, {
            dispatch
      })
);



const formSlice = createSlice({

      name: 'form',                 // нзв state
      initialState: initialState,
      reducers: {
            // редьюсер :
            updateFormValue: (state, action) => {
                  //  action.payload.field выдаст значение  атрибута name у поля
                  //  action.payload.value выдаст значение этого полч 
                  console.log('action.payload ', action.payload);   // { field: 'phone', value: '877565464564' }
                  state[action.payload.field] = action.payload.value;
            }

      }
});



export const { updateFormValue } = formSlice.actions;  // вытащили редьюсер updateFormValue
export default formSlice.reducer;