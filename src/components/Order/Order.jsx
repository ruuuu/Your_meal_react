//import style from './OrderGoods.module.css';
import style from './Order.module.css'
import { OrderGoods } from '../OrderGoods/OrderGoods.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { orderRequestAsync } from '../../store/order/orderSlice.js';

// отрисовка Корзины:
const OrderList = ['Супер сырный', 'Картошка фри', 'Жгучий хот дог'];




export const Order = () => {

      // деструткризация:
      const { totalPrice, totalCount, orderList, orderGoods } = useSelector((state) => {  // useSelector -хук, позволяющий вытащить из state  др state
            return state.order;
      });

      const dispatch = useDispatch();   //  чтобы получить action. Вернет фукнцию

      useEffect(() => {
            dispatch(orderRequestAsync());      // отппавляем запрос на сервер
      }, [orderList.length]);  // если в Корзине число товаров изменится, то вызовется еще раз этот коллбэк



      return (
            <div className={style.order}>
                  <section className={style.wrapper}>
                        <div className={style.header} tabIndex="0" role="button">
                              <h2 className={style.title}>Корзина</h2>
                              <span className={style.count}>{totalCount}</span>
                        </div>

                        <div className={style.wrap_list}>
                              <ul className={style.list}>

                                    {orderGoods.map((item) => (         // orderGoods = [ {id, title, price, category, count, image}, {}, {} ]
                                          <OrderGoods key={item.id} {...item} />  // ...item вытащит все props: id, title, price, weight, count; key={i}добавили чтоб реакт не ругался
                                    )
                                    )}
                              </ul>

                              <div className={style.total}>
                                    <p>Итого</p>
                                    <p>
                                          <span className={style.amount}>{totalPrice}</span>
                                          <span className="currency">&nbsp;₽</span>
                                    </p>
                              </div>

                              <button className={style.submit}>Оформить заказ</button>

                              <div className={style.apeal}>
                                    <p className={style.text}>Бесплатная доставка</p>
                                    <button className={style.close}>Свернуть</button>
                              </div>
                        </div>
                  </section>
            </div>
      )

}