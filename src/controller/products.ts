import { body, validationResult } from 'express-validator';
import express from "express"
import e, { Request, Response } from 'express'
import { productsStore, product } from '../models/products.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {verifyAuthToken, redirectToHome} from "../util/tokenauth.js"
import blazeApi from "../util/backblaze.js"
import fs from "fs"
import formidable from "formidable"

dotenv.config()

const { tokenSecret, blazeKeyId, blazeKey } = process.env

const store = new productsStore();

const addProduct = async function (req: Request, res: Response) {
    console.log("the body "+JSON.stringify(req.body));

    const form = new formidable.IncomingForm();

    
    
    form.parse(req, async (err, fields, files) => {
        console.log("INSIDE FORM PARSE")
        console.log("FIELDS "+JSON.stringify(fields));
        
        console.log("FILES "+JSON.stringify(files));
        if (err) {
          console.log("Error parsing the files: "+err);
          
        }
      });
      console.log("end")
    //fs.writeFileSync("C:/Users/DELL/Desktop/hello.png",URL.createObjectURL(req.body.file))
    res.end("recieved");
    console.log("sent")
    
    const submission:product = {name: req.body.name, type: req.body.type, brand: req.body.brand, price: req.body.price, description: req.body.description}

    const result = await store.create(submission);

    if(result){
        const blazeUrls = await blazeApi(blazeKeyId!, blazeKey!);

    }

}

const getProduct = async function (req: Request, res: Response) {
    const product = await store.read(req.params.id);
console.log("description: "+ product.description)
    if(product.id){
        res.render("product_info.pug",{name:product.name, type:product.type, brand:product.brand, description:product.description, price:product.price})
    }
}
const productsRoutes = (app: express.Application) => {
    app.post("/product/add", addProduct);
    app.get("/product/:id", getProduct);
    
}

export default productsRoutes;