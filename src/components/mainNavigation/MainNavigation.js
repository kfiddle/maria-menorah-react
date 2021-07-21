
import { NavLink } from 'react-router-dom';
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Maria's Database</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.navItem} onClick={props.entryClicked}>
            Entry
          </li>

          <li className={classes.navItem}><NavLink to={'/events'}>Events</NavLink></li>
          <li className={classes.navItem}><NavLink to={'/foundations'}>Foundations</NavLink></li>
          <li className={classes.navItem}><NavLink to={'/purposes'}>Master Budget</NavLink></li>
        
     
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
