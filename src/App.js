import React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SearchTvShow from "./containers/SearchTvShow/SearchTvShow";
import FoundShow from "./containers/FoundShow/FoundShow";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={SearchTvShow} />
      <Route path="/shows/:id" exact component={FoundShow} />
      <Route render={() => <h1>Not found</h1>}/>
    </Switch>
  </Layout>
);

export default App;
