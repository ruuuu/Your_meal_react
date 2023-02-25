import style from './Catalog.module.css'; // style - название объекта, название сами придумали
// import classNames from 'classnames';
import { Container } from '../Container/Container.jsx';
import { Order } from '../Order/Order.jsx';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct.jsx';

// const goodsList = [
//       { title: 'Мясная бомба' },
//       { title: 'Супер сырный' },
//       { title: 'Сытный' },
//       { title: 'Итальянский' },
//       { title: 'Вечная классика' },
//       { title: 'Тяжелый удар' },
// ];


export const Catalog = () => {

      return (
            <section className={style.catalog}>
                  <Container className={style.container}>
                        <Order />

                        <div className={style.wrapper}>
                              <h2 className={style.title}>Бургеры</h2>

                              <div className={style.wrap_list}>
                                    <ul className={style.list}>
                                          {goodsList.map((item, i) => ( // рендерим карточки продуктов
                                                <li key={i} className={style.item}>
                                                      <CatalogProduct title={item.title} />
                                                </li>
                                          )
                                          )}
                                    </ul>
                              </div>
                        </div>

                  </Container>
            </section>

      )
}




