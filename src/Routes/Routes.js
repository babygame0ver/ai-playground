import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import {
  AssignmentView
} from '../Views'

export default () => (
    <Router>
      <Switch>
        <Route exact path="*" component={AssignmentView} />            
      </Switch>
    </Router>
  ); 



