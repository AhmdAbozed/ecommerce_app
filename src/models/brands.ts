
import client from '../database.js'


export type brand = {
    id?:number
    brand: string;
    
}

export class brandsStore {
    async index(): Promise<brand[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM brands';
            const results = await conn.query(sql);
            conn.release();
            //@ts-ignore
            return results.rows;
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async create(brand: brand): Promise<brand> {
        try {
            console.log("Recieved req.body: "+JSON.stringify(brand))
            const conn = await client.connect();
            const sql = 'INSERT INTO brands (name) VALUES ($1) RETURNING *';
            const results = await conn.query(sql, [brand.brand]);
            conn.release();
            //@ts-ignore
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }

    async read(id: string): Promise<brand> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM brands WHERE id=($1)';
            const results = await conn.query(sql, [id]);
            console.log("brand read Gottem: "+results)
            conn.release();
            //@ts-ignore
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`${err}`)
        }
    }
}