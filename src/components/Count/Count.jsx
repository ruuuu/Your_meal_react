import { useState } from 'react';
import style from './Count.module.css';  // Нужен для покдлючения стилей



export const Count = (props) => {

      //   создаем стейт на основе хука(это useState):
      //const state = useState(props.count);
      //console.log('state ', state);
      const [count, setCount] = useState(props.count);  // фукнция setCount(count) записывает данные в count

      const addCount = () => {
            setCount(count + 1);
      };

      const removeCount = () => {
            if (count > 1) {
                  setCount(count - 1);
            }

      };


      return (

            <div className={style.count}>
                  <button className={style.minus} onClick={removeCount} disabled={count === 1}>-</button>
                  <p className={style.amount}>{count}</p>
                  <button className={style.plus} onClick={addCount}>+</button>
            </div>
      );

      // при наажлии на кнпоку + вызовется функция addCount()
      // disabled={count === 1}  дизеблить если count =1
};

