import style from './Navigation.module.css'; // style - название объекта, название сами придумали. Нужен для покдлючения стилей
import classNames from 'classnames';
import { Container } from '../Container/Container.jsx';  // компонент Container
import { useSelector, useDispatch } from 'react-redux';
import { categoryRequestAsync, changeCategory } from '../../store/category/categorySlice.js';
import { useEffect } from 'react';
import { API_URI } from '../../const';




export const Navigation = () => {

      const { category, activeCategory } = useSelector((state) => {  // useSelector это хук
            return state.category;        // category = [ {}, {}, {}, {} ]
      })

      const dispatch = useDispatch();   //  useDispatch это хук, чтобы получить action. Вернет фукнцию


      useEffect(() => {                   // useEffect это хук
            dispatch(categoryRequestAsync('max'));                      // отправляем запрос на сервер
      }, [])  // если массив [] не передать, то при каждом рендере  Navigation при нажатии на категрию, срабатывает categoryRequestAsync. Если передать непустой  массив, то будет каждый раз  вызываться categoryRequestAsync, когла меняем катеогрию. Если передать пустой массви, то categoryRequestAsync вызовится 1 раз при запуске Navigation



      return (
            <nav className={style.navigation}>
                  <Container className={style.container}>
                        <ul className={style.list}>

                              {category.map((item, i) =>
                                    <li className={style.item} key={item.title}>
                                          <button className={classNames(style.button, activeCategory === i ? style.button_active : '')} style={{ backgroundImage: `url(${API_URI}/${item.image})` }}
                                                onClick={() => {
                                                      dispatch(changeCategory({ indexcategory: i })) // при клике, вызывается changeCategory() и возаращется action. <li> доабвили key иначе реакт ругается
                                                }}> {item.rus} </button>
                                    </li>

                              )}
                        </ul>
                  </Container>
            </nav>

      );
}


