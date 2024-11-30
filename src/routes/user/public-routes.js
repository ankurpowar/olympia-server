import { handleCareerApplication } from "../../controllers/user/public.js";
import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

async function publicRoutes(instance, options){

    

    instance.get('/test', async function(request, reply){
        return reply.code(200).send({message: 'test success'})
    })

    
    instance.post('/career-applications', handleCareerApplication)

    
}

export default publicRoutes;