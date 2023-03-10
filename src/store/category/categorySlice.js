import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";



// редьюсер, на основе него создается action, с помощью которого можно управзлять данными внутри  текущего state:
//  инициализируем state:
const initialState = {              // нач состяние
      category: [ //    с сервера получем 
            // { title: 'burger', rus: 'Бургеры', image: '/img/burger.png' },  
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




// createAsyncThunk встроеннй в redux ToolKit  middleware, выполняет асинхрон действия:
// запррос данных с сервера
export const categoryRequestAsync = createAsyncThunk(
      'category/fetch',                                     // category/fetch название action, задали такое имя сами
      () => {
            return fetch(`${API_URI}${POSTFIX}/category`)
                  .then(req => req.json())                  //  req-ответ от сервера, return req.json(). обрабатываем промис
                  .catch(error => ({ error }))              // возаращет объект, попадет в action.payload
      }  // результат этого колбэка попадает в action(в extraReducers)
);



// categorySlice - объект содержащий редьюсеры и actions
const categorySlice = createSlice({
      name: 'category',                                           //  название state, сами придумали.  в Redux  будет отображаться как category/changeCategory
      initialState: initialState,
      reducers: {                               // здесь будут редьюсеры:
            // редьюсер. Они меняют значения полей state :
            changeCategory(state, action) {     //  Делает выбранную  категрию активной, changeCategory()=>{} это action
                  //console.log('state in categorySlice ', state);
                  //console.log('action in categorySlice ', action);
                  //console.log('action.payload in categorySlice ', action.payload);                                  // {indexcategory: 6} ,  { type: category/changeCategory, payload: indexcategory: i }
                  state.activeCategory = action.payload.indexcategory;                             //  action.payload - объект, свойстов  indexcategory придумали сами(индекс активной катергрии)
            },
      },
      // extraReducers автмоатич создают actions. ExtraReducers нужны чтобы обработать categoryRequestAsync(запрос на сервер)
      extraReducers: (builder) => {
            builder.addCase(categoryRequestAsync.pending.type, (state) => {
                  state.error = ''; // error это свойстов в initialState
            })
            builder.addCase(categoryRequestAsync.fulfilled.type, (state, action) => {
                  state.error = '';
                  state.category = action.payload;  // action.payload это то что сервер возаращет (массив категрий). category это свовойство в initialState
            })
            builder.addCase(categoryRequestAsync.rejected.type, (state, action) => {
                  state.error = action.payload.error;
            })
      },
});




export const { changeCategory } = categorySlice.actions;                // вытащили редльюсеры из categorySlice.actions; changeCategory функция при выозве которой возращается action(строка с данными: category/changeCategory)
export default categorySlice.reducer;           // здесь экспортируем, а в index.js импортруем как categoryReducer
//export default categorySlice.action;