import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    return token || ""; // Zwraca pusty ciąg, jeśli token jest null
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    const tokenString = typeof userToken === 'object' && userToken.token ? userToken.token : userToken;
    if (tokenString) {
      localStorage.setItem('token', tokenString);
      setToken(tokenString);
    } else {
      localStorage.setItem('token', ""); // Zapisuje pusty ciąg, jeśli token jest null
      setToken("");
    }
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken("");
  };

  return {
    setToken: saveToken,
    token,
    deleteToken,
  };
}




// import { useState } from "react";

// export default function useToken() {

//     const getToken = () => {
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken?.token
//       }

//       const [token, setToken] = useState(getToken());

//       const saveToken = userToken => {
//         setToken(userToken.token);
//         sessionStorage.setItem('token', JSON.stringify(userToken));
//       }
      
//       return {
//         token,
//         setToken: saveToken
//       };
//     }