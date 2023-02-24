import style from './Navigation.module.css'; // style - название объекта, название сами придумали. Нужен для покдлючения стилей
import classNames from 'classnames';
import { Container } from '../Container/Container';  // компонент Container
import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../../store/category/categorySlice.js';
import { useEffect } from 'react';



export const Navigation = () => {

      const { category, activeCategory } = useSelector((state) => {  // useSelector это хук

            return state.category;        // category = [ {}, {}, {}, {} ]
      })

      const dispatch = useDispatch();   //  чтобы получить action. Вернет фукнцию

      useEffect(() => { // useEffect это хук

      }, [])




      // useDispatch это хук
      return (
            <nav className={style.navigation}>
                  <Container className={style.container}>
                        <ul className={style.list}>

                              {category.map((item, i) => (
                                    <li className={style.item}>
                                          <button className={classNames(style.button, activeCategory === i ? style.button_active : '')} style={{ backgroundImage: `url(${item.image})` }}
                                                onClick={() => {
                                                      dispatch(changeCategory({ indexcategory: i })) // при клике, вызывается changeCategory() и возаращется action
                                                }}> {item.rus} </button>
                                    </li>
                              )
                              )}

                        </ul>
                  </Container>
            </nav>

      );
}


