import express, { Router } from "express";
import usersRoutes from "./controller/users.js";
import productsRoutes from "./controller/products.js";
import { brands_typesRoutes } from "./controller/brands_types.js";
import {verifyLogIn} from "./util/tokenauth.js"
import dotenv from 'dotenv'

const { adminTokenSecret, tokenSecret, blazeKeyId, blazeKey } = process.env

const catalog = function(app: express.Application){
    app.use("/", verifyLogIn)
    usersRoutes(app);
    productsRoutes(app);
    brands_typesRoutes(app);
}

export default catalog;
