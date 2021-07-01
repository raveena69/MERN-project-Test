import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import React, { Component } from 'react';
import Login from "./components/auth/Login";
import NotFound from "./components/layout/NotFound";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Home from './Home';
import SignUp from "./SignUp";
import SignUpMain from "./signUpMain";
import SignInMain from "./signInMain";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/popper.js/dist/popper';

import Admins from "./components/pages/Admins";
import Editors from "./components/pages/Editors";
import Reviewer from "./components/pages/Reviewers";
import Reseacher from "./components/pages/Researchers";
import Conference from "./components/pages/Conferences";
import ApproveConference from "./components/pages/ApproveConferences";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path={"/"}>
                                <Home/>
                            </Route>
                            <Route exact path={"/signUpMain"}>
                                <SignUpMain/>
                            </Route>
                            <Route exact path={"/signInMain"}>
                                <SignInMain/>
                            </Route>
                            <Route exact path={"/signUp"}>
                                <SignUp/>
                            </Route>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/admins" component={Admins} />
                                <PrivateRoute exact path="/editors" component={Editors} />
                                <PrivateRoute exact path="/reviewers" component={Reviewer} />
                                <PrivateRoute exact path="/reseachers" component={Reseacher} />
                                <PrivateRoute exact path="/conferences" component={Conference} />
                                <PrivateRoute exact path="/approveConferences" component={ApproveConference} />
                            </Switch>
                            <Route exact path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
