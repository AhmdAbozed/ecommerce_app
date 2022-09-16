import express from "express"
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import path from "path"

dotenv.config()

const { tokenSecret, adminTokenSecret } = process.env;

const createToken = (res: Response, data: any, permission?: string) => {
  const options = {
    expires: new Date(Date.now() + 10 * 60 * 1000), // time until expiration
    secure: false, // set to true if you're using https
    httpOnly: true,
  }
  if(permission == "admin"){
    const adminToken = jwt.sign({ data: data }, adminTokenSecret as string)
    res.cookie('admin', adminToken, options)
  }
  
  const token = jwt.sign({ data: data }, tokenSecret as string)

  console.log("about to send cookies")
  res.cookie('user', token, options);
  console.log("sent all cookies")
  return; 
}

const verifyLogIn = (req: Request, res: Response, next:any) => {
  const __dirname = path.resolve();
  try {
    console.log(req.cookies)
    if (req.cookies.user) {
      const token: string = req.cookies.user;
      const decoded = jwt.verify(token, tokenSecret as string)
      res.locals.basedir =  path.join(__dirname, 'views/user');
      next()
    } else throw ("error");
  } catch (error) {
    console.log("Token Auth Failed")
    
    res.locals.basedir =  path.join(__dirname, 'views/guest');
    next()
    res.locals.layout = "guestLayout"
  }
}


const verifyAuthToken = (secret: string)=>{ return (req: Request, res: Response, next:any) => {
  const __dirname = path.resolve();
  try {
    let token = req.cookies.user; 
    if (req.cookies.admin){
      token = req.cookies.admin
    }

    if (req.cookies.admin) {
      const token: string = req.cookies.token;
      const decoded = jwt.verify(token, secret)
      next()
    } else throw ("error");
  } catch (error) {
    res.send("<p>Invalid Authentication Token.</p>")
  }
}}

const redirectToHome = (req: Request, res: Response, next: () => void) => {
  try {
    if (req.cookies.user) {
      const token: string = req.cookies.user;
      const decoded = jwt.verify(token, tokenSecret as string)
      res.redirect("/")
    } else throw ("error");
  } catch (error) {
    next()
  }
}

export {
  verifyLogIn,
  createToken,
  verifyAuthToken,
  redirectToHome
}