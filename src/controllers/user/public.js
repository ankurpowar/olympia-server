async function handleCareerApplication(request, reply){
    return reply.code(200).send({message:'success'})
}

async function testServer(request,reply){
    return reply.code(200).send({message:'success'})
}

export {testServer, handleCareerApplication}