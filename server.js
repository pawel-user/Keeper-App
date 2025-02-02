import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ładowanie zmiennych środowiskowych z pliku .env

const app = express();
const port = 8080;
export const API_URL = `http://localhost:${port}`;
const SECRET_KEY = process.env.SECRET_KEY; // Odczytywanie SECRET_KEY z pliku konfiguracyjnego .env

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Uzyskanie __dirname w module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");
console.log(dbPath);

let usersData = null;
let notesData = null;

// Wczytywanie danych użytkowników przy uruchomieniu serwera
fs.readFile(dbPath, "utf8", (error, data) => {
  if (error) {
    console.log("Error reading db.json:", error);
  }
  try {
    const parsedData = data ? JSON.parse(data) : { users: [], notes: [] };
    usersData = parsedData.users;
    notesData = parsedData.notes;
    console.log("Data loaded once:", parsedData); // Logowanie danych tylko raz
  } catch (error) {
    console.log("Error parsing JSON:", error);
  }
});

// Middleware do ustawiania danych użytkowników w req.db
const setUsersData = (req, res, next) => {
  req.db = { users: usersData, notes: notesData };
  next();
};

app.use(setUsersData);

app.get("/users", (req, res) => {
  res.send(req.db.users);
});

// Middleware do uwierzytelniania użytkownika
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received in authenticateUser:", token); // Logowanie tokena
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decoded); // Logowanie zdekodowanego tokena
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Logowanie błędu
    res.status(400).send("Invalid token.");
  }
};

// Funkcja do pobierania notatek zalogowanego użytkownika
app.get("/user/notes", authenticateUser, (req, res) => {
  const userNotes = req.db.notes.filter((note) => note.userId === req.user.id);
  console.log("userNotes: ", userNotes);
  res.send(userNotes);
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received login data:", { username, password }); // Dodaj logowanie
    const user = req.db.users.find(
      (userItem) =>
        userItem.username === username && userItem.password === password
    );
    if (user) {
      // Generowanie tokena podczas logowania użytkownika
      const token = jwt.sign(
        { username: user.username, id: user.id },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.send({ token });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ error: "Invalid credentials" }); // Zwracanie JSON zamiast tekstu
    }
  } catch (error) {
    console.error("Error in /login route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/register", (req, res) => {
  try {
    const uploadedUser = req.body;
    console.log("New user data received:", uploadedUser);

    const userExists = req.db.users.find(
      (userItem) =>
        userItem.username === uploadedUser.username ||
        userItem.email === uploadedUser.email
    );

    // Walidacja danych użytkownika
    if (
      !uploadedUser.username ||
      !uploadedUser.email ||
      !uploadedUser.password
    ) {
      console.log("Empty fields detected!");
      return res.status(407).send("All fields are required");
    }

    // Sprawdzenie czy email jest w poprawnym formacie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(uploadedUser.email)) {
      console.log("Invalid email format!");
      return res.status(408).send("Invalid email format");
    }

    if (userExists) {
      console.log("The user with this data already exists!");
      return res.status(409).send("User already exists");
    } else if (uploadedUser.password !== uploadedUser.repeatedPassword) {
      console.log("The user credentials are not the same!");
      return res.status(400).send("User credentials failed");
    }

    // Generowanie unikalnego identyfikatora dla nowego zarejestrowanego użytkownika
    const newId =
      req.db.users.length > 0
        ? req.db.users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1
        : 1;

    // Generate a token
    const token = jwt.sign(
      { username: uploadedUser.username, id: newId },
      SECRET_KEY,
      { expiresIn: "1m" }
    );

    // Nowy użytkownik bez repeatedPassword
    const newUser = {
      id: newId,
      username: uploadedUser.username,
      email: uploadedUser.email,
      password: uploadedUser.password,
      token, // Assign generated token
    };
    req.db.users.push(newUser);

    fs.writeFile(
      dbPath,
      JSON.stringify({ users: req.db.users, notes: req.db.notes }, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to db.json:", err);
          return res.status(500).send("Internal Server Error");
        } else {
          console.log("New user added successfully!");
          return res.status(201).send("User registered successfully");
        }
      }
    );
  } catch (error) {
    console.error("Error in /register route:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/logout", (req, res) => {
  console.log("Logout route called. User logged out seccessfully.");
  res.status(200).send({ message: "User logged out successfully." });
});

app.listen(port, () => console.log(`API is running on ${API_URL}`));
