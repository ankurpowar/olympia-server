import { handleCareerApplication } from "../../controllers/user/public.js";


async function publicRoutes(instance, options){
    instance.get('/test', async function(request, reply){
        return reply.code(200).send({message: 'test success'})
    })

    

    instance.post('/career-application', handleCareerApplication)

    
}

export default publicRoutes;