import { handleCareerApplication, handleContactUs } from "../../controllers/user/public.js";
import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

async function publicRoutes(instance, options){

    

    instance.get('/test', async function(request, reply){
        return reply.code(200).send({message: 'test success'})
    })

    
    instance.post('/career-applications', handleCareerApplication)

    instance.post('/contact-us', handleContactUs)

    
}

export default publicRoutes;