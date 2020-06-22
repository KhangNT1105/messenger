import React, { useEffect, useState } from 'react'
import './LoginPage.scss';
import { connect } from 'react-redux';
import { Login, SignUp } from '../../redux/action/UserAction'
export function LoginPage(props) {
    const [state, setstate] = useState({
        "username": "",
        "password": "",
    })
    const [isSignIn, setIsSignIn] = useState(true);
    const fetchData = () => {

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setstate({
            ...state, [name]: value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        try {
            if (isSignIn) await props.login(state);
            else await props.signUp(state);
        } catch{

        }
        document.querySelector('form').reset();
    }
    const someAnimation = () => {
        const login__container = document.querySelector('.login__container');
        const glance = login__container.querySelector('.glance');
        const eye = glance.querySelector('.eye');
        const ball = glance.querySelector('.ball');
        const shut = eye.querySelector('.shut');
        const password = document.querySelector('.password');
        let walkY = 80;
        let walkX = 200;
        function handleMouseMove(e) {
            if ((e.target === eye || e.target === shut)) {
                glance.classList.add('down');
            }
            else if (!(password === document.activeElement)) {
                glance.classList.remove('down');
            }
            if (this !== e.target) {
                return;
            }
            let { offsetX: x, offsetY: y } = e;
            let maxX = window.innerWidth;
            let maxY = window.innerHeight;
            x = Math.floor((x / maxX * walkX) - (walkX / 2));
            y = Math.floor((y / maxY * walkY));
            ball.style.transform = `translate(${x}%,${y}%) rotate(45deg)`;
        }
        login__container.addEventListener('mousemove', handleMouseMove);
        password.addEventListener('focus', () => glance.classList.add('down'))
        password.addEventListener('focusout', () => glance.classList.remove('down'))
        // password.addEventListener('keyup', handleChange);
    }
    useEffect(() => {
        someAnimation();
        console.log("props", props.userInformation);
    }, [])
    useEffect(() => {
        console.log(isSignIn);
    }, [isSignIn])
    useEffect(() => {
        if (props.isLogin) {
            props.history.push('/')
        }
    }, [props.isLogin])

    return (

        <div className="login">
            <div className="login__container">
                <div className="content">
                    <div className="glance">
                        <div className="eye">
                            <span className="shut" />
                        </div>
                        <div className="ball">
                            <div className="iris" />
                        </div>
                    </div>
                    <div className="login__form">
                        <form onSubmit={handleSubmit}>
                            <h1>{isSignIn ? "Login" : "SignUp"}</h1>
                            <div className="input-group">
                                <input type="text" id="username" name="username" required autoComplete="off" focu onChange={handleChange} className="userName" />
                                <label htmlFor="username">Username</label>
                                <span />
                                <b />
                            </div>
                            <div className="input-group">
                                <input type="password" id="password" name="password" required onChange={handleChange} className="password" />
                                <label htmlFor="password">Password</label>
                                <span />
                                <b />
                            </div>
                            <button>{isSignIn ? "Login" : "SignUp"}</button>
                            <p className="status" onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "SignUp ?" : "Login ?"}</p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => ({
    isLogin: state.UserReducer.isLogin
})
const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {
            dispatch(Login(credentials));
        },
        signUp: (credentials) => {
            dispatch(SignUp(credentials))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)