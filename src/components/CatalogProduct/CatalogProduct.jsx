import style from './CatalogProduct.module.css'; // style - название объекта, название сами придумали
import { API_URI } from '../../const';



// { item } -дектструктуризация: item-{id, title, price, weight}
export const CatalogProduct = ({ item }) => (   // props= ({ item } нужен чтобы передввать значния элементам

      <article className="product">
            <img src={`${API_URI}/${item.image}`} alt={item.title} className={style.image} />

            <p className={style.price}>{item.price}
                  <span className="currency">₽</span>
            </p>

            <h3 className={style.title}>
                  <button className={style.detail}>{item.title}</button>
            </h3>

            <p className={style.weight}>{item.weight}г</p>

            <button className={style.add} type="button">Добавить</button>
      </article>

);


