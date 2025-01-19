import axios from "axios";
// import {API_URL} from '../../server.js';

const port = 8080;
const API_URL = `http://localhost:${port}`;

export async function getUsers() {
  console.log("getUsers is called");
  try {
    const response = await axios.get(API_URL + "/users");
    const result = response.data;
    console.log("Result inside getUsers:", result); // Sprawdzenie danych wewnątrz funkcji 
    return result; 
    // Upewnij się, że zwracane są dane
    } catch (error) {
    console.error("Failed to make request:", error.message);
  }
}
