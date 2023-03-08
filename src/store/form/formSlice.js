// отправка данных формы
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearOrder } from "../order/orderSlice.js";
import { closeModal } from "../modalDelivery/modalDeliverySlice.js";



// нача  значения  state
const initialState = {
      //  поля формы:
      name: '',
      phone: '',
      format: 'delivery',
      address: '',
      floor: '',
      intercom: '',
      error: null,
      errors: {}, // ошибки валидации
      touch: false, // заполняли форму или нет

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
            // редьюсер.  Они меняют значения полей  у inirialState :
            updateFormValue: (state, action) => {
                  //  action.payload.field выдаст значение  атрибута name у поля
                  //  action.payload.value выдаст значение этого полч 
                  console.log('action.payload ', action.payload);   // { field: 'phone', value: '877565464564' }
                  state[action.payload.field] = action.payload.value;
            },
            setError: (state, action) => {
                  console.log('action.payload in setError() ', action.payload);           // { floor: 'floor can not be empty',  intercome: 'intercome can not be empty' }
                  state.errors = action.payload;
            },
            clearError: (state) => { // очищаем ошибки валидации
                  state.errors = {};
            },
            changeTouch: (state) => { // выясняем  Заполняли форму или нет
                  state.touch = true;
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



export const { updateFormValue, setError, clearError, changeTouch } = formSlice.actions;  // вытащили редьюсеры updateFormValue setError, clearError, changeTouch
export default formSlice.reducer;


// validateForm - фукнция котрпая возращает функцию:
export const validateForm = () => (dispatch, getState) => {                   // функция getState возвращает state
      const form = getState().form;       // получили form из store(в index.js)
      console.log('form ', form);
      const errors = {};                  // начальное значеение, ниже заполняем объект своствами.  Ошибки валдиации


      if (!form.name) {                   // если поле пустое 
            errors.name = 'name field can not be empty';
      }
      if (!form.phone) {
            errors.phone = 'phone field can not be empty';
      }

      if (!form.address && form.format === 'delivery') {
            errors.address = 'address field can not be empty';
      }
      if (!form.floor && form.format === 'delivery') {
            errors.floor = 'floor field can not be empty';
      }
      if (!form.intercom && form.format === 'delivery') {
            errors.intercom = 'intercom field can not be empty';
      }

      if (form.delivery === 'pickup') {
            dispatch(updateFormValue({ field: 'address', value: '' })); //  очищем поле address
            dispatch(updateFormValue({ field: 'floor', value: '' }));
            dispatch(updateFormValue({ field: 'intercom', value: '' }));
      }


      if (Object.keys.length) {    //  если в объект errors ={} не пустой(то есть есть ошибки)
            dispatch(setError(errors)); // обновляем state.errors
      }
      else {
            dispatch(clearError()); // state.errors = {} то етсь очищаем
      }




}