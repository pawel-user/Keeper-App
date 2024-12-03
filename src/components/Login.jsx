import React, {useState} from "react";
import PropTypes from "prop-types";
// import './../public/styles.css';
import './../styles-link.css';
import axios from "axios";

async function loginUser(credentials) {
    try {
        const response = await axios.post('http://localhost:8080/login');
        return response;
    } catch {
        console.error(error);
    }
}


export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }


    return (
        <div className="login-wrapper">
            <h1>Log In Panel</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={event => setUserName(event.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={event => setPassword(event.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.PropTypes = {
    setToken: PropTypes.func.isRequired
}