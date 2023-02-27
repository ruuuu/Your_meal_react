// Корзина:

// товары корзины хрнаим в LocalStorage,  orderList = [{},{},{}] спсок товаров в Корзине
const initialState = {
      orderList: JSON.parse(localStorage.getItem('order') || '[]'),  // если пока нет  ничего в лок хранлиище то создаться пустой массив
};


const orderSlice = createSlice({
      name: 'order',                            // название action
      initialState: initialState,
      reducer: {
            addProduct: (state, action) => {

            }
      }

})