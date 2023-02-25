import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";

// редьюсер, на основе него создается action, с помощью которого можно управзлять данными внутри  текущего state:
const initialState = {              // нач состяние
      category: [
            // { title: 'burger', rus: 'Бургеры', image: '/img/burger.png' },  //    с сервера получем 
            // { title: 'snack', rus: 'Закуски', image: '/img/snack.png' },
            // { title: 'hot-dog', rus: 'Хот-доги', image: '/img/hot-dog.png' },
            // { title: 'combo', rus: 'Комбо', image: '/img/combo.png' },
            // { title: 'shawarma', rus: 'Шаурма', image: '/img/shawarma.png' },
            // { title: 'pizza', rus: 'Пицца', image: '/img/pizza.png' },
            // { title: 'wok', rus: 'Вок', image: '/img/wok.png' },
            // { title: 'dessert', rus: 'Десерты', image: '/img/dessert.png' },
            // { title: 'sauce', rus: 'Соусы', image: '/img/sauce.png' },
      ],
      error: '',
      activeCategory: 0,  // индекс активнйо категории
};




// createAsyncThunk встроенная фукния, выполняет асинхрон действия:
export const categoryRequestAsync = createAsyncThunk(
      'category/fetch',   // category/fetch название action, задали такое имя сами
      () => {

            return fetch(`${API_URI}${POSTFIX}/category`)
                  .then(req => req.json())                  //  req-ответ от сервера, return req.json(). обрабатываем промис
                  .catch(error => ({ error }))              // возаращет объект, попадет в action.payload


      }  // результат этого колбэка попадает в action(в extraReducers)
)



// categorySlice - объект содержащий редьюсеры и actions
const categorySlice = createSlice({
      name: 'category',                                           //  название action, сами придумали
      initialState: initialState,
      reducers: {                               // здесь будут actions:
            changeCategory(state, action) {   //  Делает выбранную  категрию активной
                  console.log('state ', state);
                  console.log('action ', action);                                               // { type: category/changeCategory, payload: indexcategory: i }
                  state.activeCategory = action.payload.indexcategory;                          // свойстов  indexcategory придумали сами(индекс активной катергрии)
            },
      },
      // extraReducers автмоатич создают actions:
      extraReducers: {
            [categoryRequestAsync.pending.type]: (state) => {
                  state.error = ''; // error это свойстов в initialState
            },
            [categoryRequestAsync.fulfilled.type]: (state, action) => {
                  state.error = '';
                  state.category = action.payload;  // сервер возаращет массив категрий. category это свовойство в initialState
            },
            [categoryRequestAsync.rejected.type]: (state, action) => {
                  state.error = action.payload.error;
            }
      }
});


export const { changeCategory } = categorySlice.actions;                // changeCategory функция при выозве которой возращается action(строка с данными: category/changeCategory)
export default categorySlice.reducer;
//export default categorySlice.action;