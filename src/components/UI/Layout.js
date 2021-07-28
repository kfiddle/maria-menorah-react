import { Fragment, useState } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "../mainNavigation/MainNavigation";
import EntryForm from "../entry/EntryForm";

const Layout = (props) => {
  const [entryFormRendered, setEntryFormRendered] = useState(false);

  const openModalHandler = () => {
    setEntryFormRendered(true);
  };

  

  const closeModalHandler = () => {
    setEntryFormRendered(false);
   
  };

  return (
    <Fragment>
      <MainNavigation entryClicked={openModalHandler} />
      {entryFormRendered && <EntryForm closeModal={closeModalHandler} />};
      <main className={classes.main}>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
