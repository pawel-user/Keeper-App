// userNotes.js
import axios from "axios";

const port = 8080;
const API_URL = `http://localhost:${port}`;

export async function getNotes(token) {
  // console.log("getNotes is called");
  // console.log("Token: ", token); // Log the token
  try {
    const response = await axios.get(API_URL + "/user/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    // console.log("Result inside getNotes:", result); // Check the result
    return result || []; // Ensure an array is returned
  } catch (error) {
    console.error("Failed to make request:", error.message);
    return []; // Return an empty array on error
  }
}

//Funkcja dodawania nowej notatki użytkownika
// export async function addNote(newNote) {
//   try {
//     const response = await axios.post(API_URL + "/", newNote);
//     if (response.status !== 200) {
//       throw new Error("Network response was not ok");
//     }
//     console.log("New user note added successfully!");
//     return response.data;
//   } catch (error) {
//     console.error("Error adding new note: ", error);
//   }
// }
