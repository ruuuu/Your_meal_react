import { useState } from 'react';
import { addProduct, removeProduct } from '../../store/order/orderSlice';
import style from './Count.module.css';  // Нужен для покдлючения стилей
import { useDispatch } from 'react-redux';




// число товара в Корзине:
export const Count = ({ count, id }) => {   // props = { count, id}

      //  создаем стейт на основе хука(это useState):
      // const state = useState(props.count);
      // console.log('state ', state);
      // const [count, setCount] = useState(props.count);  // хук useState создает хранилище. Фукнция setCount(count) записывает данные в count


      const dispatch = useDispatch();     //  чтобы получить action. Вернет фукнцию

      const addCount = () => {            // при нажати на плюс, вызовется эта фукнция
            dispatch(addProduct({ id }));
      };

      const removeCount = () => {         //  при нажати на минус, вызовется эта фукнция
            dispatch(removeProduct({ id }));
      };


      return (

            <div className={style.count}>
                  <button className={style.minus} onClick={removeCount}>-</button>
                  <p className={style.amount}>{count}</p>
                  <button className={style.plus} onClick={addCount}>+</button>
            </div>
      );

      // при наажлии на кнпоку + вызовется функция addCount()
      // disabled={count === 1}  дизеблить если count =1:
      // <button className={style.minus} onClick={removeCount} disabled={count === 1}>-</button>
};

