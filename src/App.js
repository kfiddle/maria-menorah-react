import { useState, useEffect, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import MainNavigation from "./components/mainNavigation/MainNavigation";
import EventsList from "./components/events/EventsList";
import EntryForm from "./components/entry/EntryForm";

import "./App.css";
import AllEvents from "./pages/AllEvents";
import AllFoundations from './pages/AllFoundations';
import AllPurposes from './pages/AllPurposes';


function App() {
  const [entryFormRendered, setEntryFormRendered] = useState(false);
  const openModalHandler = () => {
    setEntryFormRendered(true)
  };

  const closeModalHandler = () => {
    setEntryFormRendered(false)
  }

  return (
    <div className="app">
      <MainNavigation navClicked={openModalHandler} />
      {entryFormRendered && <EntryForm closeModal={closeModalHandler} />};

      <Switch>
        <Route path={"/events"}>
          <AllEvents />
        </Route>
        <Route path={'/foundations'}>
          <AllFoundations />
        </Route>
        <Route path={'/purposes'}>
          <AllPurposes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
