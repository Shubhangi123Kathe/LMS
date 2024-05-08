import { useState } from "react";
import Login from "./authentication_parts/Login";
import Signup from "./authentication_parts/Singup";
import bgImage from '../assets/background.jpg'



export default function Authentication() {

    const [choice, changeChoice] = useState('login')


    return (
        <>
            <img className="auth-bg" src={bgImage} alt="img"/>
            <div className="authentication-cont effected-by-dark-mode">
                <div className="auth-buttons-cont">
                    <button type="button" className="btn btn-primary" onClick={() => changeChoice('login')}>Login</button>
                    <button type="button" className="btn btn-success" onClick={() => changeChoice('signup')}>Signup</button>
                </div>
                <div className="auth-form-cont">
                {
                    choice == 'login' ? <Login /> : <Signup />
                }
                </div>
            </div>
        </>
    )
}