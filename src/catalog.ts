import express, { Router } from "express";
import usersRoutes from "./controller/users.js";
import productsRoutes from "./controller/products.js";
const catalog = function(app: express.Application){
    usersRoutes(app);
    productsRoutes(app);
}

export default catalog;
