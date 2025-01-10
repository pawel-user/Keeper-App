import express from "express";
import cors from "cors";

const app = express();
const port = 8080;
const API_URL = `http://localhost:${port}`;


app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: '123'
    });
});

app.use('/logout', (req, res) => {
    res.send({
        token: ''
    });
});

app.listen(port, () => console.log(`API is running on ${API_URL}/login`));