// container - свойсnво объекта
import style from './Container.module.css'; // style - название объекта, название сами придумали
import classNames from 'classnames';


export const Container = ({ children, className }) => (  // children нужен чтобы можно было вствлять дочерние элеметы в container

      <div className={classNames(style.container, className)}>
            {children}
      </div>
);






// export const Container = (props) => {  // props нужно чтобы предавать наазвания класов и арибутов
//       console.log('props ', props);

//       return (
//             <div className={classNames(style.container, props.className)}></div>
//       );
// }






