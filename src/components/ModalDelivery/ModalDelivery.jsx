// модалка заказа:
import classNames from 'classnames';
import style from './ModalDelivery.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalDelivery/modalDeliverySlice.js';
import { submitForm, updateFormValue } from '../../store/form/formSlice.js';
import { validateForm } from '../../store/form/formSlice.js';
import { changeTouch } from '../../store/form/formSlice.js';


// форма отправки данных на сервер:
export const ModalDelivery = () => {

  // деструткризация:
  const { isOpen } = useSelector((state) => state.modal);  // useSelector -хук;  state.isOpen  взяли из itinitialState ModalDeliverySlice.js
  const form = useSelector((state) => state.form);

  console.log('form in ModalDelivery ', form);  // { name: 'Rufina' , format: 'delivery', address: ,  floor: ,  touch: , error: , errors: }
  //console.log('form ', ...form);

  const dispatch = useDispatch();                                 //  чтобы получить action. Вернет фукнцию
  const { orderList } = useSelector((state) => state.order);          // корзина  orderList = [ {id, count}, {id, count} ]


  const handleInputChange = (evt) => {          // при вводе в поля ввода, вызовется  эта функция  
    dispatch(updateFormValue({ field: evt.target.name, value: evt.target.value }));     // первый параметр это  значние атрибута name у поля
    dispatch(validateForm());

  };



  const handleSubmit = (evt) => {         // при отправке формы(нажатие на кнопку Отправить), вызовется эта фукнция(отправка данных на сервер)
    evt.preventDefault();                 // чтобы  после отправки формы, станица не перезграужалась
    dispatch(validateForm());

    console.log('form.errors ', form.errors);                 // { name: 'name can not be ampty',  address: 'address can not be empty' }

    if (Object.keys(form.errors).length === 0 && form.touch) {                // если ошибок валидации нет и заполняли форму
      dispatch(submitForm({ ...form, orderList }));                           // диспатчим action
    }

    dispatch(changeTouch());
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
              // по нажатию на Отправить, происходит событие onSubmit и вызовется handleSubmit()
            }>
              <fieldset className={style.fieldset}>
                <input className={style.input} type='text' name='name' placeholder='Ваше имя' value={form.name} onChange={handleInputChange /*при вводе текста в поле, происходит событие onChange*/} />
                <input className={style.input} type='tel' name='phone' placeholder='Телефон' value={form.phone} onChange={handleInputChange} />
              </fieldset>

              <fieldset className={style.fieldset_radio}>
                <label className={style.label}>
                  <input className={style.radio} type='radio' name='format' value='pickup' checked={form.format === 'pickup'} onChange={handleInputChange} />
                  <span>Самовывоз</span>
                </label>

                <label className={style.label}>
                  <input className={style.radio} type='radio' name='format' value='delivery' checked={form.format === 'delivery'} onChange={handleInputChange} />
                  <span>Доставка</span>
                </label>
              </fieldset>

              {form.format === 'delivery' && (       // если form.format === 'delivery' то отобразить блок

                <fieldset className={style.fieldset}>
                  <input className={style.input} type='text' name='address' placeholder='Улица, дом, квартира' value={form.address} onChange={handleInputChange} />
                  <input className={classNames(style.input, style.input_half)} type='number' name='floor' placeholder='Этаж' value={form.floor} onChange={handleInputChange} />
                  <input className={classNames(style.input, style.input_half)} type='number' name='intercom' placeholder='Домофон' value={form.intercom} onChange={handleInputChange} />
                </fieldset>
              )}
            </form>

            <button className={style.submit} type='submit' form='delivery'>Оформить</button>
            {form.touch && Object.entries(form.errors).map(([key, val]) => {  // Object.entries превращает объект в массив  form.errors =  [ ['name', 'name cannnot be empty'], ['address', 'address cannot be empty'], [] ]и перебираем его
              return <p key={key}>{val}</p>        // указали key чтобы реакт не ругался
            })}
          </div>

          <button className={style.modal__close} type='button' onClick={() => { // пр нажатии на эту кнпоку, вызовется closeModal()
            dispatch(closeModal());
          }}>

            <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
              <rect x='5.07422' y='5.28247' width='1' height='20' transform='rotate(-45 5.07422 5.28247)' />
              <rect x='5.78125' y='19.4246' width='1' height='20' transform='rotate(-135 5.78125 19.4246)' />
            </svg>
          </button>
        </div>
      </div>
    )
  )
}





