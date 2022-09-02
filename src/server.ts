import express from "express"
import { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import catalog from "./catalog.js";
import cookies from 'cookie-parser'

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.listen(port,()=>{
    console.log("Server running on: 3000"+`${__dirname}`)
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookies())

app.use("/resources/", express.static(path.join(__dirname, 'resources')));
app.use("/resources/js/", express.static(path.join(__dirname, '/dist/frontendjs')));

catalog(app)

export {app}