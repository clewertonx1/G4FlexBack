const express = require("express"); //importar o express
const res = require("express/lib/response");

const allCrud = [{ id: "", status: "false", name:"",cpf:"",
idade:"",sexo:"",socio_torcedor:"false",faixa_etaria:"" }]; // Setando allCrud com os valores

const { PrismaClient } = require("@prisma/client");
const { response } = require("express");

const prisma = new PrismaClient();

const allRoutes = express.Router() // setando um valor de express.router ao uma const


//Create
allRoutes.post("/torcedores", async (request, response) => {
    const { id,status,name,cpf,idade,sexo,socio_torcedor,faixa_etaria } = request.body;
    const torcedor = await prisma.torcedor.create({
        data: {
            id,
            status: false,
            name,
            cpf,
            idade,
            sexo,
            socio_torcedor: false,
            faixa_etaria, 
        },
    });
    //allCrud.push({ name, tipoDecachorro: "viraLata"});
    return response.status(201).json(allCrud);
});

//Read
allRoutes.get("/torcedores", async (request, response) => {
    const allCrud = await prisma.torcedor.findMany()
    return response.status(200).json(allCrud)
})

//Update
allRoutes.put("/torcedores", async (request, response) => {
    const {id,status,name,cpf,idade,sexo,socio_torcedor,faixa_etaria} = request.body;

    if(!id){
        return response.status(400).json("Id é obrigatório")
    }

    const torcedorAlreadyExist = await prisma.torcedor.findUnique({
        where: { id } 
    });

    if(!torcedorAlreadyExist) {
        return response.status(404).json("Torcedor not exist")
    }

    const torcedorUpdate = await prisma.torcedor.update({
        where: { id, },
        data: {
            status,
            name,
            cpf,
            idade,
            sexo,
            socio_torcedor,
            faixa_etaria,
            
        },
    });

    return response.status(200).json(torcedorUpdate);
})

allRoutes.delete("/torcedores/:id", async (request, response) =>
{
    const { id } = request.params;

    const intId = parseInt(id);

    if(!intId){
        return response.status(400).json("Id é obrigatório")
    }

    const torcedorAlreadyExist = await prisma.torcedor.findUnique({
        where: { id: intId } 
    });

    if(!torcedorAlreadyExist) {
        return response.status(404).json("Torcedor not exist")
    }
    
    await prisma.torcedor.delete({ where: {id: intId} });

    return response.status(200).send();
})

module.exports = allRoutes; //exportar as rotas para o server.js

