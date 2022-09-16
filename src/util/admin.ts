import { Request, Response } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const {adminToken, tokenSecret} = process.env;



