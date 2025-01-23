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

// Wczytywanie danych użytkowników przy uruchomieniu serwera
fs.readFile(dbPath, "utf8", (error, data) => {
  if (error) {
    console.log("Error reading db.json:", error);
  }
  try {
    usersData = data ? JSON.parse(data).users : [];
    console.log("Users data loaded once:", usersData); // Logowanie danych tylko raz
  } catch (error) {
    console.log("Error parsing JSON:", error);
  }
});

// Middleware do ustawiania danych użytkowników w req.db
const setUsersData = (req, res, next) => {
  req.db = { users: usersData };
  next();
};

app.use(setUsersData);

app.get("/users", (req, res) => {
  res.send(req.db);
});

app.post("/login", (req, res) => {
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
        ? req.db.users[req.db.users.length - 1].id + 1
        : 1;

    // Generate a token
    const token = jwt.sign(
      { username: uploadedUser.username, id: newId },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Nowy użytkownik bez repeatedPassword
    const newUser = {
      id: newId,
      username: uploadedUser.username,
      email: uploadedUser.email,
      password: uploadedUser.password,
      token // Assign generated token
    };
    req.db.users.push(newUser);

    fs.writeFile(
      dbPath,
      JSON.stringify({ users: req.db.users }, null, 2),
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

app.use("/logout", (req, res) => {
  res.send({
    token: "",
  });
});

app.listen(port, () => console.log(`API is running on ${API_URL}`));
