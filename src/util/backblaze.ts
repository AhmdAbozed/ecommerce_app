import { rejects } from 'assert'
import https from 'https'
import { resolve } from 'path'

const blazeApi = async function(keyId:string, key:string): Promise<any>{
    
    const geturl = function(){
        return new Promise((resolve,reject)=>{
            let urls:any;
            const getBlaze = https.request(options,(res)=>{
                
                console.log("about to get blaze urls")
                res.on('data', (chunk)=>{
                    
                   urls = JSON.parse(chunk);
                   
                })
                res.on('end', () => {          resolve(urls);                     });
           
                
            })
            getBlaze.on('error', (err) => {
                reject(err);
              });
              
            getBlaze.end()
            
        })
    }
    const encodedkey = btoa(keyId+":"+key)

    const options = {
        hostname: 'api.backblazeb2.com',
        path: '/b2api/v2/b2_authorize_account',
        method: 'GET',
        headers: {
            Authorization: `Basic ${encodedkey}`
      }
    }

    const blazeUrls = await geturl()

    
    return blazeUrls;
}

export default blazeApi;