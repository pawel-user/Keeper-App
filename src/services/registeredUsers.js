import axios from "axios";

const port = 8080;
const API_URL = `http://localhost:${port}`;

export async function getUsers() {
  try {
    const response = await axios.get(API_URL + "/users");
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
}

//Funkcja dodawania nowego użytkownika
// export async function addUser(newUser) {
//   try {
//     const response = await axios.post(API_URL + "/register", newUser);
//     if (response.status !== 200) {
//       throw new Error("Network response was not ok");
//     }
//     console.log("New user added successfully!");
//     return response.data;
//   } catch (error) {
//     console.error("Error adding user: ", error);
//   }
// }
