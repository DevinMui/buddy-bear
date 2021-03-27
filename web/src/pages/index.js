import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/user'

import Home from './home'
import CSSTest from './css-test'
import { Login, Register } from './auth'
import Dash from './dash'
import Setup from './setup'

function App() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(login({}))
    }, [])

    return (
        <Router>
            {_.isEmpty(user) === true ? (
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/css-test">
                        <CSSTest />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/">
                        <Dash />
                    </Route>
                    <Route exact path="/setup">
                        <Setup />
                    </Route>
                </Switch>
            )}
        </Router>
    )
}

export default App
