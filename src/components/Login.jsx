import React from "react";
import PropTypes from "prop-types";
// import './../public/styles.css';
import './../styles-link.css';


export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();


    return (
        <div className="login-wrapper">
            <h1>Log In Panel</h1>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={event => setUserName(event.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={event => setPassword(event.target.value)}/>
                </label>
            </form>
        </div>
    );
}

Login.PropTypes = {
    setToken: PropTypes.func.isRequired
}