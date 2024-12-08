import React, {useState} from "react";
import propTypes from "prop-types";
// import './../public/styles.css';
import './../styles-link.css';
import axios from "axios";

//First solution
// async function loginUser(credentials) {
//     try {
//         const response = await axios.post('http://localhost:8080/login');

//         // JSON.stringify(credentials);

//         console.log(response.data);
//         // return response;
//     } catch {
//         console.error(error);
//     }
// }

async function loginUser(credentials) 
{ try { const response = await axios.post('http://localhost:8080/login', credentials, { headers: { 'Content-Type': 'application/json' } }); return response.data; } catch (error) { console.error('Error logging in:', error); throw error; } }
// Second solution
// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

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

Login.propTypes = {
    setToken: propTypes.func.isRequired
}