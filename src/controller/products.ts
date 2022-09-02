import { body, validationResult } from 'express-validator';
import express from "express"
import e, { Request, Response } from 'express'
import { productsStore, product } from '../models/products.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {verifyAuthToken, redirectToHome} from "../util/tokenauth.js"
dotenv.config()

const { tokenSecret } = process.env

const store = new productsStore();

const addProduct = async function (req: Request, res: Response) {
    console.log(req.body);
    res.send("recieved");
    const submission:product = {
        name: req.body.name,
        type: req.body.type,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description
    }
    await store.create(submission);
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