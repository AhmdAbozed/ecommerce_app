import { body, validationResult } from 'express-validator';
import express from "express"
import e, { Request, Response } from 'express'
import { usersStore, user } from '../models/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {verifyAuthToken, redirectToHome} from "../util/tokenauth.js"
dotenv.config()

const { tokenSecret } = process.env

const store = new usersStore();

const userHome = function (req: Request, res: Response) {
    res.render("homeLayout.pug")
}

const signUpGet = function (req: Request, res: Response) {
    res.render("signUp.pug")
}

const signUpPost = [

    body('username').isLength({ min: 4, max: 30 }).withMessage("Username must be atleast 4 characters")
        .isAlphanumeric().withMessage("No special characters allowed."),

    body('email').isEmail().withMessage("Email invalid"),

    body('password').isLength({ min: 4, max: 30 }).withMessage("Password needs to be atleast 4 characters"),

    async function (req: Request, res: Response) {

        const errorArr = validationResult(req).array()

        if (errorArr[0]) {
            res.send(errorArr);
            console.log("ErrorArr: " + errorArr)
            console.log(validationResult(req))
            return;
        }

        const submission: user = {username: req.body.username, password: req.body.password, email: req.body.email  }
        
        const validation = await store.validateSignUp(submission)
        console.log("recieved validation whatever: "+validation)
        if (validation[0]){
            res.send(validation);
            return;
        }
        const result = await store.signup(submission)

        const token = jwt.sign({ user: result }, tokenSecret as string)
        
        console.log("about to send cookies")
        res.cookie('token', token, {
            expires: new Date(Date.now() + 10*60*1000), // time until expiration
            secure: false, // set to true if you're using https
            httpOnly: true,
        });
        
        res.send(errorArr)

        console.log("result/End Of Sign Up Function: "+result)
    }]

const signInGet = function (req: Request, res: Response) {
    res.render("signIn.pug")
}

const signInPost = async function (req: Request, res: Response) {
    
    const submission: user = {username: req.body.username, password: req.body.password, email: ""}
    
    console.log("submission"+ submission.username + submission.password)
    
    const result = await store.signin(submission)

    if(result[0]){
        const token = jwt.sign({ user: result[0] }, tokenSecret as string)
        
        console.log("about to send cookies")
        res.cookie('token', token, {
            expires: new Date(Date.now() + 10*60*1000), // time until expiration
            secure: false, // set to true if you're using https
            httpOnly: true,
        });
    }
    res.send(result)

}

const signOut = function(req: Request, res: Response){
    res.cookie('token', "yee yee", {
        expires: new Date(2000), // time until expiration
        secure: false, // set to true if you're using https
        httpOnly: true,
    });
    console.log("signing out")
    res.render("signIn.pug")
}

const usersRoutes = (app: express.Application) => {
    app.get("/user", verifyAuthToken, userHome)
    app.get("/user/signin",redirectToHome, signInGet)
    app.post("/user/signin", signInPost)
    app.get("/user/signup",redirectToHome, signUpGet)
    app.post("/user/signup", signUpPost)
    app.post("/user/signout", signOut)

}

export default usersRoutes;