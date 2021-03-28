import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, register } from '../../redux/user'

import { useState } from 'react'
import styled from 'styled-components'
const Bear = styled.img`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 5%;
`
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(login({ email, password }))
        history.push('/')
    }

    return (
        <div className="primary-i" style={{ height: '100%' }}>
            <Bear src={require('./bear.svg').default} />
            <div className="container primary-i">
                <div style={{ height: 100 }}></div>
                <div className="row">
                    <div className="text-center offset-md-4 col-md-4">
                        <div className="comparison-card mt-4">
                            <h3>Log In</h3>
                            <div style={{ height: 20 }}></div>
                            <form onSubmit={onSubmit}>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    value={email}
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        borderRadius: 20,
                                        boxShadow: '5px 5px 5px lightgray',
                                        backgroundColor: '#ECECECE',
                                    }}
                                />
                                <div style={{ height: 20 }}></div>
                                <input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    style={{
                                        borderRadius: 20,
                                        boxShadow: '5px 5px 5px lightgray',
                                        backgroundColor: '#ECECECE',
                                    }}
                                />
                                <div style={{ height: 20 }}></div>
                                <button
                                    type="submit"
                                    className="form-control"
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: '#219EBC',
                                        color: 'white',
                                        boxShadow: '5px 5px 5px lightgray',
                                    }}
                                >
                                    Login
                                </button>
                                <div style={{ height: 30 }}></div>
                                <p>
                                    or <Link to="/register">register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(register({ name, email, password }))
        history.push('/')
    }

    return (
        <div className="primary-i" style={{ height: '100%' }}>
            <div className="container primary-i">
                <div style={{ height: 100 }}></div>
                <div className="row">
                    <div className="text-center offset-md-4 col-md-4">
                        <div className="comparison-card mt-4">
                            <h3>Register</h3>
                            <div style={{ height: 20 }}></div>
                            <form onSubmit={onSubmit}>
                                <input
                                    placeholder="Name"
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        borderRadius: 20,
                                        boxShadow: '5px 5px 5px lightgray',
                                        backgroundColor: '#ECECECE',
                                    }}
                                />
                                <div style={{ height: 20 }}></div>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    value={email}
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        borderRadius: 20,
                                        boxShadow: '5px 5px 5px lightgray',
                                        backgroundColor: '#ECECECE',
                                    }}
                                />
                                <div style={{ height: 20 }}></div>
                                <input
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    style={{
                                        borderRadius: 20,
                                        boxShadow: '5px 5px 5px lightgray',
                                        backgroundColor: '#ECECECE',
                                    }}
                                />
                                <div style={{ height: 20 }}></div>
                                <button
                                    type="submit"
                                    className="form-control"
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: '#219EBC',
                                        color: 'white',
                                        boxShadow: '5px 5px 5px lightgray',
                                    }}
                                >
                                    Register
                                </button>
                                <div style={{ height: 30 }}></div>
                                <p>
                                    or <Link to="/login">login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <svg
                width="1152"
                height="608"
                viewBox="0 200 1152 608"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse
                    rx="491.236"
                    ry="489.262"
                    transform="matrix(0.766709 -0.641994 0.643978 0.765044 564.486 865.067)"
                    fill="#AC5606"
                />
                <ellipse
                    rx="157.446"
                    ry="156.817"
                    transform="matrix(0.766709 -0.641994 0.643978 0.765044 191.461 539.26)"
                    fill="#AC5606"
                />
                <ellipse
                    rx="157.446"
                    ry="156.817"
                    transform="matrix(0.766709 -0.641994 0.643978 0.765044 960.9 538.009)"
                    fill="#AC5606"
                />
            </svg>
        </div>
    )
}

export { Login, Register }
