import { useEffect } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import _ from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/user'

import Kids from './kids'
import Home from './home'
import CSSTest from './css-test'
import { Login, Register } from './auth'
import Dash from './dash'
import Book from './book'
import CreateBook from './create-book'

import { Navbar as BSNavbar, Nav } from 'react-bootstrap'

function NavbarLink(props) {
    return (
        <li className="nav-item">
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                {props.children || ''}
            </Link>
        </li>
    )
}

function Navbar(props) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <BSNavbar expand="lg">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Beary
                </Link>
                <BSNavbar.Toggle aria-controls="navbar-nav" />

                <BSNavbar.Collapse id="navbar-nav">
                    {_.isEmpty(user) === true ? (
                        <>
                            <Nav className="mr-auto">
                                <NavbarLink to="/about">About</NavbarLink>
                                <NavbarLink to="/projects">Product</NavbarLink>
                                <NavbarLink
                                    to={{ pathname: '/', hash: 'contact' }}
                                >
                                    Contact
                                </NavbarLink>
                            </Nav>
                            <Nav>
                                <NavbarLink to="/login">Login</NavbarLink>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="mr-auto">
                                <NavbarLink to="/">Dashboard</NavbarLink>
                            </Nav>
                            <Nav>
                                <NavbarLink
                                    to="/"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(logout())
                                    }}
                                >
                                    Logout
                                </NavbarLink>
                            </Nav>
                        </>
                    )}
                </BSNavbar.Collapse>
            </div>
        </BSNavbar>
    )
}

function App() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(login({}))
    }, [])

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
                        <Route exact path="/kids">
                            <Kids />
                        </Route>
                    </>
                ) : (
                    <>
                        <Navbar />
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

export default App
