import express from "express"
import { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import catalog from "./catalog.js";

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.listen(port,()=>{
    console.log("Server running on: 3000"+`${__dirname}`)
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/resources/", express.static(path.join(__dirname, 'resources')));



app.get("/", hello)
catalog(app)
function hello(req: Request, res: Response){
 res.render("guestLayout.pug")
}
