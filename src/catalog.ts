import express, { Router } from "express";
import usersRoutes from "./controller/users.js";

const catalog = function(app: express.Application){
    usersRoutes(app);
}

export default catalog;
