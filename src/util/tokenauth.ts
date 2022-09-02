import express from "express"
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const {tokenSecret} = process.env;

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
      req.cookies.token //
        if (req.cookies.token) {
          const token: string = req.cookies.token;
          const decoded = jwt.verify(token, tokenSecret as string)
        next()
      } else throw("error");
    } catch (error) {
      res.status(200).send("JWT auth failed.")
    }
  }

  const redirectToHome = (req: Request, res: Response, next: () => void) => {
    try {
        if (req.cookies.token) {
        const token: string = req.cookies.token;
        const decoded = jwt.verify(token, tokenSecret as string)
        res.redirect("/user")
      } else throw("error");
    } catch (error) {
      next()
    }
  }

  export {
    verifyAuthToken,
    redirectToHome
  }