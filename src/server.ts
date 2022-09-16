import express from "express"
import { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import catalog from "./routes.js";
import cookies from 'cookie-parser';



const app = express();
const port = 10000;
const __dirname = path.resolve();

app.listen(port,()=>{
    console.log("Server running on: "+port+`${__dirname}`)
})

app.use(express.json());

app.use(cookies())

catalog(app)

app.set('view engine', 'pug')

app.get("/status", (req: Request, res: Response)=>{res.status(200).send("<p>Status Code")})

app.use("/resources/", express.static(path.join(__dirname, 'resources')));
app.use("/resources/js/", express.static(path.join(__dirname, '/dist/frontendjs')));
app.get("/",(req: Request, res: Response)=>{res.render("product_catalog.pug")})
app.get("/product/add",(req: Request, res: Response)=>{res.render("management.pug")})

app.get("/product",(req: Request, res: Response)=>{res.render("product_info.pug")})



export {app}


