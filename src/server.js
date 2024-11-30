import Fastify from "fastify";
import mongoose from "mongoose";
import routes from "./routes/index.js";


import { createRequire } from 'module';

import { fileURLToPath } from 'url';
import { dirname } from 'path';





const require = createRequire(import.meta.url);
const path = require('node:path')
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const start = async ()=>{
    const fastify = Fastify({trustProxy:true,
        
    })
    
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/olympia-test');
        
        
        // let districtsList = await adminModel.distinct('district');
        // fastify.districtsList.push(...districtsList)
        
        
    } catch (error) {
        console.log(error);
    }

    try {
        

        
        
        fastify.register(routes, {prefix: '/api'})
        await fastify.listen({ port: 3200, host: '0.0.0.0' })
        console.log(`listening on port:4500.`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start();