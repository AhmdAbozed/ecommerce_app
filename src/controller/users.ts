import { body, validationResult } from 'express-validator';
import express from "express"
import { Request, Response } from 'express'

const signUpGet = function (req: Request, res: Response) {
    res.render("signUp.pug")
}

const signUpPost = [

    body('username').isLength({ min: 4, max: 30 }).withMessage("Username must be atleast 4 characters")
    .isAlphanumeric().withMessage("No special characters allowed."),

    body('email').isLength({ min: 4, max: 30 }).withMessage("Email invalid"),

    body('password').isLength({ min: 4, max: 30 }).withMessage("Password needs to be atleast 4 characters"),

    async function (req: Request, res: Response) {
        console.log(validationResult(req))
        console.log(req.body)

    }]

const signInGet = function (req: Request, res: Response) {
    res.render("signIn.pug")
}

const signInPost = function (req: Request, res: Response) {
    const signInData = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(JSON.stringify(signInData) + "<-- sign in data")
}

const usersRoutes = (app: express.Application) => {
    app.get("/user/signin", signInGet)
    app.post("/user/signin", signInPost)
    app.get("/user/signup", signUpGet)
    app.post("/user/signup", signUpPost)

}

export default usersRoutes;