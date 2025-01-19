import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;
export const API_URL = `http://localhost:${port}`;

app.use(cors());
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
  const user = req.db.users.find(
    (userItem) =>
      userItem.username === username && userItem.password === password
  );
  if (user) {
    res.send({ token: user.token });
  } else {
    console.log("Invalid credentials");
    res.status(401).send("Invalid credentials");
  }
});

app.use("/logout", (req, res) => {
  res.send({
    token: "",
  });
});

app.listen(port, () => console.log(`API is running on ${API_URL}`));
