import axios from "axios";
// import {API_URL} from '../../server.js';

const port = 8080;
const API_URL = `http://localhost:${port}`;

export async function getUsers() {
  // console.log("getUsers is called");
  try {
    const response = await axios.get(API_URL + "/users");
    const result = response.data;
    // console.log("Result inside getUsers:", result); // Sprawdzenie danych wewnątrz funkcji
    return result;
    // Upewnij się, że zwracane są dane
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
}

export async function setUsers(newUser) {
  try {
    const response = await axios.post(API_URL + "/users", { newUser });
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    console.error('There was a problem with your axios operation: ', error);
    throw error; // Rzuć błąd dalej, aby komponent mógł go obsłużyć
  }
}
