
import { NavLink } from 'react-router-dom';
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Maria's Database</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.navItem} onClick={props.entryClicked}>
            Event Entry
          </li>
          <li className={classes.navItem} onClick={props.payeeEntryClicked}>
            Payee Entry
          </li>

          <li className={classes.navItem}><NavLink to={'/events'}>Events</NavLink></li>
          <li className={classes.navItem}><NavLink to={'/foundations'}>Foundations</NavLink></li>
          <li className={classes.navItem}><NavLink to={'/payees'}>Rolodex</NavLink></li>

          <li className={classes.navItem}><NavLink to={'/helen-master'}>Helen's Master</NavLink></li>
          <li className={classes.navItem}><NavLink to={'/stone-garden-master'}>SG Master</NavLink></li>
        
     
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
