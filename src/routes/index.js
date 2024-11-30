
import userRoutes from "./user/index.js"


async function routes(instance,options){
    

    instance.register(userRoutes)
    
}

export default routes;