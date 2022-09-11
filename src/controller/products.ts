import { body, validationResult } from 'express-validator';
import express from "express"
import e, { Request, Response } from 'express'
import { productsStore, product } from '../models/products.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { verifyAuthToken, redirectToHome } from "../util/tokenauth.js"
import blazeApi from "../util/backblaze.js"
import fs from "fs"
import formidable from "formidable"
import crypto from "crypto"
import https from "https"

dotenv.config()

const { tokenSecret, blazeKeyId, blazeKey } = process.env

const store = new productsStore();

const uploadImg = async function (filepath: string, size: number, url_token: any, fileId:string) {
    var sha1sum = crypto.createHash('sha1').update(filepath).digest("hex");
    console.log(sha1sum);
    const url = new URL(url_token.uploadUrl)
    console.log("urlLLLLLLL: " + url)
    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
            Authorization: url_token.authorizationToken,
            "X-Bz-File-Name": fileId+".png",
            "Content-Type": "image/png",
            "Content-Length": fs.readFileSync(filepath).byteLength,
            "X-Bz-Content-Sha1": "do_not_verify"
            
        }
    }

    console.log("OPTIONS INSIDE UPLOAD IMG IN CONTROLLER " + JSON.stringify(options))
    return new Promise((resolve, reject) => {
        let uploadresult:any;
        const blazeUploading = https.request(options, (res) => {

            console.log("about to get blaze urls")
            res.on('data', (chunk) => {

                uploadresult = JSON.parse(chunk);

            })
            res.on('end', () => {console.log("DONEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"+JSON.stringify(uploadresult)), resolve(uploadresult); });


        })
        blazeUploading.on('error', (err) => {
            reject(err);
        });
        blazeUploading.write(fs.readFileSync(filepath))
        //blazeUploading.write("hello")
        console.log(filepath)
        console.log((fs.readFileSync(filepath)))
        console.log("TFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFf")
        blazeUploading.end()
    })
}

const addProduct = async function (req: Request, res: Response) {
    console.log("the body " + JSON.stringify(req.body));

    const form = new formidable.IncomingForm();

    let submission: product;
    let result;
    form.parse(req, async (err, fields, files) => {
        console.log("INSIDE FORM PARSE")
        console.log("FIELDS " + JSON.stringify(fields));
        console.log("FILES " + JSON.stringify(files));



        //@ts-ignore, It works so i dont see whats the big deal with typescript
        submission = { name: (fields.name), type: (fields.type), brand: (fields.brand), price: Number(fields.price), description: (fields.description) }


        result = await store.create(submission)

        if (result) {
            console.log("I RAN!!!!!")
            const blazeUrls = await blazeApi(blazeKeyId!, blazeKey!);
            console.log("blaze stuff in controller: " + JSON.stringify(blazeUrls))
            //@ts-ignore, gives error: filepath doesnt exist on img
            uploadImg(files.img.filepath, files.img.size, blazeUrls, result.id)
        }

        if (err) {
            console.log("Error parsing the files: " + err);

        }
    });
    console.log("end")
    //fs.writeFileSync("C:/Users/DELL/Desktop/hello.png",URL.createObjectURL(req.body.file))
    res.end("recieved");
    console.log("sent")

}

const getProduct = async function (req: Request, res: Response) {
    const product = await store.read(req.params.id);
 
    if (product.id) {
        res.render("product_info.pug", { name: product.name, type: product.type, brand: product.brand, description: product.description, price: product.price })
    }
}
const productsRoutes = (app: express.Application) => {
    app.post("/product/add", addProduct);
    app.get("/product/:id", getProduct);

}

export default productsRoutes;