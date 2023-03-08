
// отрисовка Корзины:
import style from './Order.module.css'
import { OrderGoods } from '../OrderGoods/OrderGoods.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { orderRequestAsync } from '../../store/order/orderSlice.js';
import { openModal } from '../../store/modalDelivery/modalDeliverySlice.js';
import { useState } from 'react';
import classNames from 'classnames';


// const OrderList = ['Супер сырный', 'Картошка фри', 'Жгучий хот дог'];




export const Order = () => {

      // деструткризация: эти поля взяты из initialState в orderSlice.js
      const { totalPrice, totalCount, orderList, orderGoods } = useSelector((state) => {  // useSelector -хук, позволяющий вытащить из state  др state
            return state.order;                                                           // order это названеи action
      });

      const dispatch = useDispatch();                                                     //  чтобы получить action и с помщью него вызываем редьюсер . Вернет фукнцию
      // создаем state openOrder - отркрыта корзина или нет, setOpenOrder это фукнция:
      const [openOrder, setOpenOrder] = useState(false); // openOrder=false то есть закрыт
      console.log('openOrder ', openOrder);


      useEffect(() => {
            dispatch(orderRequestAsync());                                                // отппавляем запрос на сервер чеерз orderRequestAsync()
      }, [orderList.length]);                                                             // если в Корзине число товаров изменится, то вызовется еще раз этот коллбэк



      return (
            <div className={classNames(style.order, openOrder ? style.order_open : '') /**/}>
                  <section className={style.wrapper}>
                        <div className={style.header} tabIndex="0" role="button"
                              onClick={() => {
                                    setOpenOrder(!openOrder); // при клике, корзина будет открыться/закрываться
                              }}
                        >
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

                              <button className={style.submit} disabled={orderGoods.length === 0} onClick={() => {
                                    dispatch(openModal());             //  диспатчим action, при клике на кнопку, вызаоется фукнция openModal()
                              }}>Оформить заказ</button>

                              <div className={style.apeal}>
                                    <p className={style.text}>Бесплатная доставка</p>
                                    <button className={style.close}>Свернуть</button>
                              </div>
                        </div>
                  </section>
            </div>
      )

}