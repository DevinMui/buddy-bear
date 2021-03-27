import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/user";

import Kids from "./kids";
import Home from './home'
import CSSTest from './css-test'
import { Login, Register } from './auth'
import Dash from './dash'
import Book from './book'
import CreateBook from './create-book'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(login({}));
  }, []);

    return (
        <Router>
            <Switch>
                {_.isEmpty(user) === true ? (
                    <>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                        <Route exact path="/css-test">
                            <CSSTest />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/books">
                            <CreateBook />
                        </Route>
                        <Route exact path="/books/:id">
                            <Book />
                        </Route>
                        <Route exact path="/">
                            <Dash />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default App;
