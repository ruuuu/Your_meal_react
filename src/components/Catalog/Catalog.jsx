import style from './Catalog.module.css'; // style - название объекта, название сами придумали
// import classNames from 'classnames';
import { Container } from '../Container/Container.jsx';
import { Order } from '../Order/Order.jsx';





export const Catalog = () => {

      return (
            <section className="catalog">
                  <Container className="catalog__container">
                        <Order />
                        <div className="catalog__wrapper">
                              <h2 className="catalog__title">Бургеры</h2>

                              <div className="catalog__wrap_list">
                                    <ul clasNames="catalog__list">
                                          <li className="catalog__item">

                                          </li>
                                    </ul>
                              </div>
                        </div>

                  </Container>
            </section>

      )
}




