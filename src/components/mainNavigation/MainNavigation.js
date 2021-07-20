

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Maria's Database</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.navItem} onClick={props.entryFormClicked}>
            Entry
          </li>

          <li className={classes.navItem}>Events</li>
          <li className={classes.navItem}>Foundations</li>
          <li className={classes.navItem}>Purposes</li>

     
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
