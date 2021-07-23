import { useState, useEffect, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./components/UI/Layout";
import AllEvents from "./pages/AllEvents";
import AllFoundations from "./pages/AllFoundations";
import AllPurposes from "./pages/AllPurposes";
import AllPayees from "./pages/AllPayees";

function App() {


  return (
    <Layout >
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={"/events"} />
        </Route>

        <Route path={"/events"}>
          <AllEvents />
        </Route>
        <Route path={"/foundations"}>
          <AllFoundations />
        </Route>
        <Route path={"/purposes"}>
          <AllPurposes />
        </Route>
        <Route path={"/payees"}>
          <AllPayees />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
