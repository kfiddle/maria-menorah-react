import { useState, useEffect, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./components/UI/Layout";
import AllFoundationItems from "./pages/AllFoundationItems";
import AllFoundations from "./pages/AllFoundations";
import AllPurposes from "./pages/AllPurposes";
import AllPayees from "./pages/AllPayees";

import StoneGardenMaster from "./pages/StoneGardenMaster";
import HelenMaster from "./pages/HelenMaster";

function App() {
  const [editPayeeClicked, setEditPayeeClicked] = useState(false);

  return (
    <Layout>
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={"/foundation-items"} />
        </Route>

        <Route path={"/foundation-items"}>
          <AllFoundationItems />
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
        <Route path={"/stone-garden-master"}>
          <StoneGardenMaster />
        </Route>
        <Route path={"/helen-master"}>
          <HelenMaster />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
