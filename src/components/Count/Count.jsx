import { useState } from 'react';
import style from './Count.module.css';  // Нужен для покдлючения стилей


// число товара в Корзине:
export const Count = ({ count, id }) => {   // props = { count, id}

      //   создаем стейт на основе хука(это useState):
      //const state = useState(props.count);
      //console.log('state ', state);
      //const [count, setCount] = useState(props.count);  // фукнция setCount(count) записывает данные в count

      const addCount = () => {

      };

      const removeCount = () => {

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

