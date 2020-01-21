import React, {Fragment} from 'react';
import NavBar from "../UI/NavBar/NavBar";

import './Layout.css';

const Layout = props => (
  <Fragment>
    <NavBar/>
    <main className="Layout-Content">
      {props.children}
    </main>
  </Fragment>
);

export default Layout;
