import style from './Catalog.module.css'; // style - название объекта, название сами придумали
// import classNames from 'classnames';
import { Container } from '../Container/Container.jsx';
import { Order } from '../Order/Order.jsx';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { productRequestAsync } from '../../store/product/productSlice';


// const goodsList = [ // с сервера получаем товары

//       //       { title: 'Мясная бомба' },
//       //       { title: 'Супер сырный' },
//       //       { title: 'Сытный' },
//       //       { title: 'Итальянский' },
//       //       { title: 'Вечная классика' },
//       //       { title: 'Тяжелый удар' },
// ];





export const Catalog = () => {


      //{ products } -это деструтктуризция
      const { products } = useSelector((state) => {   // useSelector -хук, products = [ {}, {}, {} ]
            return state.product;                     // state.product  взяли из itinitialState ProductSlice.js
      });
      //console.log('{ products } ', { products });


      const { category, activeCategory } = useSelector((state) => {   // category, activeCategory это свойсва state 
            return state.category;
      });
      //console.log('{ category }  ', { category });


      const dispatch = useDispatch();   //  чтобы получить action. Вернет фукнцию

      useEffect(() => {
            if (category.length) {
                  dispatch(productRequestAsync(category[activeCategory].title));  //  отппавляем запрос на сервер
            }
      }, [category, activeCategory]);  // если изменится category или activeCategory то запускается productRequestAsync



      return (
            <section className={style.catalog}>
                  <Container className={style.container}>
                        <Order />

                        <div className={style.wrapper}>
                              <h2 className={style.title}>{category[activeCategory]?.rus}</h2>

                              <div className={style.wrap_list}>

                                    {products.length ? (
                                          <ul className={style.list}>
                                                {products.map((item, i) => (                         // рендерим карточки продуктов, ствим атрибут  key={id} чтобф реакт не ругался
                                                      <li key={item.id} className={style.item}>
                                                            <CatalogProduct item={item} />
                                                      </li>
                                                )
                                                )}
                                          </ul>
                                    ) : (
                                          <p className={style.empty}>К сожалению, товаров такой категории нет</p>
                                    )}
                              </div>
                        </div>

                  </Container>
            </section>

      )
}




