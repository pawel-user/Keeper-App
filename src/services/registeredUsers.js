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

//Funkcja dodawania nowego użytkownika
export async function addUser(newUser) {
  try {
    const response = await axios.post(API_URL + "/register", newUser);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    console.log("New user added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

//Funkcja dodawania nowego użytkownika
// export async function addUser(newUser) {
//   try {
//     // Wczytaj aktualne dane użytkowników
//     const usersData = await fs.promises.readFile(dbPath, "utf-8");
//     const jsonData = JSON.parse(usersData);
//     const users = jsonData.users;

//     // Dodaj nowego użytkownika
//     const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//     const userWithId = { id: newId, ...newUser};
//     users.push(userWithId);

//     // Zapisz zaktualizowane dane do pliku
//     await fs.promises.writeFile(dbPath, JSON.stringify({ users }, null, 2), "utf-8");
//     console.log("New user added successfully!");
//   } catch (error) {
//     console.error("Error adding user: ", error);
//   }
// }
