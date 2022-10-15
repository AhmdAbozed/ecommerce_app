# Hardware E-Store Application

## Used Technologies
- html/css/js
- Postgres for the database
- Node.js as the backend framework
- backblaze cloud for hosting product images

## Used npm packages
- typescript,        for typed JS
- express,           for the server and middleware setup
- pug,               as the view engine
- dotenv, cross-env, for managing environment variables
- db-migrate,        for sql migrations
- jsonwebtoken,      for JWTs
- jasmine,           for unit testing
- cookie-parser,     for implementing cookies
- esm, ts-node,      for fixing a certain ts error
- pg,                for integrating node with psql
- formidable,        for parsing files inside requests
- express-validator, for validating sign up inputs

## Scripts

- migrateUp:  runs up migrations
- migrateDown:  runs down migrations
- start:  builds ts, then runs the server.ts file
- testDB: creates testing DB
- migrateTest: runs the jasmine tests, must create testing DB first

## Endpoints

### 1. http://domain/ 

- Products catalog.

### 1. http://domain/user/

- user/signin : sign in page.
- user/signup : sign up page.

### 2. http://domain/product/:id

- details page of specified product

### 3. http://domain/addProduct

- Product creation page, limited to the admin's account using admin token

## Implemented Features

- User login and signup.
- Products catalog.
- Product details page for each product.
- Product creation page, limited to admin.

## Unimplemented Features

- Product deletion, limited to admin.
- Adding products to an order list, limited to user accounts.
- User orders page, limited to admin.
- Online postgres hosting, postgres is hosted locally as of yet
- Adding new brands at product creation dynamically, right now you need to add new select elements to the html manually for new brands.
- Filtering by price is not implemented yet. 