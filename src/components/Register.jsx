import React from "react";

export default function Register() {
  // const [username, setUserName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [repeatedPassword, setRepeatedPassword] = useState();
  // const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <form>
        <h1>Sign Up Panel</h1>
        <label>
          <p>Username</p>
          <input
            type="text"
            placeholder="Type your username"
            // onChange={(event) => setUserName(event.target.value)}
          />
        </label>
        <label>
          <p>Email address</p>
          <input
            type="email"
            placeholder="Type your email address"
            // onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            placeholder="Type your password"
            // onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          <p>Repeated password</p>
          <input
            type="password"
            placeholder="Repeat your password"
            // onChange={(event) => setRepeatedPassword(event.target.value)}
          />
        </label>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
