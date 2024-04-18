import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public")); 

const supabaseUrl = 'https://reamqvucjdwylegwdnai.supabase.co'; //supabase details
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

let items = [];

app.get("/", async (req, res) => {

    try {
        const { data, error } = await supabase
            .from('run')
            .select('*');
        items = data;

        res.render("index.ejs", {
            projectTitle: "Run Log",
            runList: items,
        });
    } catch(err) {
        console.error(err);
    }
});

//ADD
//UPDATE
//DELETE

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});