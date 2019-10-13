// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import "./main.scss";
import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation, Footer } from "global_components";
import * as userActionCreators from "../../redux/modules/users/users";

interface IMainContainerProps {
  component: any;
  path?: string;
  exact?: boolean;
}

const MainContainer: React.StatelessComponent<IMainContainerProps> = (props) => {
  const { component: Component, ...rest } = props;
  return <Route {...rest} render={matchProps =>
      (
        <div className="wrapper">
          <Navigation/>
          <Component {...matchProps} />
          <div className="push"></div>
          <Footer />
        </div>
      )
  } />
}

export const Main = connect(
  (state: any) => {
    return ({ });
  },
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer);