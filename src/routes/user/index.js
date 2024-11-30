

import publicRoutes from "./public-routes.js";


async function userRoutes(instance, options){
    
    instance.register(publicRoutes)

    
}

export default userRoutes;