import { Fragment, useState } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "../mainNavigation/MainNavigation";
import EntryForm from "../entry/EntryForm";
import PayeeEntry from "../payees/PayeeEntry";

const Layout = (props) => {
  const [entryFormRendered, setEntryFormRendered] = useState(false);
  const [payeeEntryFormRendered, setPayeeEntryFormRendered] = useState(false);
  const [payeeEditFormRendered, setPayeeEditFormRendered] = useState(props.editPayeeClicked);

  const openEventModalHandler = () => {
    setEntryFormRendered(true);
  };

  const openPayeeModalHandler = () => {
    setPayeeEntryFormRendered(true);
  };

  const closeModalHandler = () => {
    setEntryFormRendered(false);
    setPayeeEntryFormRendered(false);
  };

  const editPayeeClicked = () => {
    console.log('hytt')
    setPayeeEditFormRendered(true);
  };

  return (
    <Fragment>
      <MainNavigation
        entryClicked={openEventModalHandler}
        payeeEntryClicked={openPayeeModalHandler}
      />
      {entryFormRendered && <EntryForm closeModal={closeModalHandler} />};
      {payeeEntryFormRendered && <PayeeEntry closeModal={closeModalHandler} />}
      {payeeEditFormRendered && <PayeeEntry closeModal={closeModalHandler} />}
      <main className={classes.main} >
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
