// модалка заказа:
import classNames from 'classnames';
import style from './ModalDelivery.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalDelivery/modalDeliverySlice.js';
import { updateFormValue } from '../../store/form/formSlice.js';



// форма отправки данных на сервер:
export const ModalDelivery = () => {

  // деструткризация:
  const { isOpen } = useSelector((state) => state.modal);  // useSelector -хук;  state.isOpen  взяли из itinitialState ModalDeliverySlice.js
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();   //  чтобы получить action. Вернет фукнцию


  const handleInputChange = (evt) => {
    dispatch(updateFormValue({ field: evt.target.name, value: evt.target.value }));     // первый параметр это  значние атрибута name у поля
  };



  const handleSubmit = (evt) => {  // при отпраке формы, вызовется эта фукнция
    evt.preventDefault();         // чтобы  после отправки формы, станица не перезграужалась
    dispatch(); // диспатчим action
  };


  return (
    isOpen && (    // если isOpen=true, то отображаем верстку модалки
      <div className={style.modal} onClick={({ target, currentTarget }) => {  // target это то элемент на который нажали
        //console.log('target ', target);             // элемент на котрый нажали.  (элемент котрый вызвал событие)
        //console.log('eventTarget ', currentTarget);  // элемент на котрый навешано событие. В нашем случаем это модалка
        if (target === currentTarget) {
          dispatch(closeModal());
        }
      }}>
        <div className={style.mdelivery}>
          <div className={style.container}>
            <h2 className={style.title}>Доставка</h2>

            <form className={style.form} id='delivery' onSubmit={handleSubmit
              // по нажатию на Отправить, происходит событие onSubmit
            }>
              <fieldset className={style.fieldset}>
                <input className={style.input} type='text' name='name' placeholder='Ваше имя' value={form.name} onChange={handleInputChange /*при вводе текста в поле, происходит событие onChange*/} />
                <input className={style.input} type='tel' name='phone' placeholder='Телефон' value={form.phone} onChange={handleInputChange} />
              </fieldset>

              <fieldset className={style.fieldset_radio}>
                <label className={style.label}>
                  <input className={style.radio} type='radio' name='format' value='pickup' checked={form.format === 'pickup'} />
                  <span>Самовывоз</span>
                </label>

                <label className={style.label}>
                  <input className={style.radio} type='radio' name='format' value='delivery' checked={form.format === 'delivery'} />
                  <span>Доставка</span>
                </label>
              </fieldset>

              <fieldset className={style.fieldset}>
                <input className={style.input} type='text' name='address' placeholder='Улица, дом, квартира' value={form.address} onChange={handleInputChange} />
                <input className={classNames(style.input, style.input_half)} type='number' name='floor' placeholder='Этаж' value={form.floor} onChange={handleInputChange} />
                <input className={classNames(style.input, style.input_half)} type='number' name='intercom' placeholder='Домофон' value={form.intercom} onChange={handleInputChange} />
              </fieldset>
            </form>

            <button className={style.submit} type='submit' form='delivery'>
              Оформить
            </button>
          </div>

          <button className={style.modal__close} type='button' onClick={() => {
            dispatch(closeModal());
          }}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
              <rect x='5.07422' y='5.28247' width='1' height='20' transform='rotate(-45 5.07422 5.28247)' />
              <rect x='5.78125' y='19.4246' width='1' height='20' transform='rotate(-135 5.78125 19.4246)' />
            </svg>
          </button>
        </div>
      </div >
    )
  )
}





