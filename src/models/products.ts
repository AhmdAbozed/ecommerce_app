
import client from '../database.js'


export type product = {
    id?: Number;
    type:string;
    name: string;
    brand: string;
    description: string;
    price: Number;

}

export class productsStore {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const results = await conn.query(sql);
            conn.release();
            //@ts-ignore
            return results.rows;
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async create(product: product): Promise<product> {
        try {
            console.log("Recieved req.body: "+JSON.stringify(product))
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, type, brand, description, price) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const results = await conn.query(sql, [product.name, product.type, product.brand, product.description, product.price]);
            conn.release();
            //@ts-ignore
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async read(id: string): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const results = await conn.query(sql, [id]);
            console.log("product read Gottem: "+results)
            conn.release();
            //@ts-ignore
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async find(product: product): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE name = ($1) AND type = ($2) AND brand = ($3) AND description = ($4) AND name = ($5)';
            const results = await conn.query(sql, [product.name, product.type, product.brand, product.description, product.price]);
            conn.release();
            //@ts-ignore
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async delete(id: string): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const results = await conn.query(sql, [Number(id)]);
            conn.release();
            //@ts-ignore
            return results;
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }
}
