import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET
const postgresPort = process.env.PORT

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "runproject",
    password: secret,
    port: postgresPort,
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public")); 

let items = [];

app.get("/", async (req, res) => {

    try {
        const result = await db.query("SELECT * FROM run ");
        items = result.rows;

        res.render("index.ejs", {
            projectTitle: "Run Log",
            runList: items,
        });
    } catch(err) {
        console.log(err);
    }
    
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});