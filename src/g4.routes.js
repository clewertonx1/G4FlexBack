const express = require("express"); 

const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");

const prisma = new PrismaClient();

const allRoutes = express.Router() 



function generateKey() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
}


allRoutes.get("/:time/CountOfHearth", async (request, response) => {
    let { time } = request.params;
    console.log(time)
    const result = await prisma.$queryRaw`SELECT
    (SELECT COUNT(*) FROM "public"."Torcedor" WHERE time_of_hearth[1] = ${time}) AS timeColuna1,
    (SELECT COUNT(*) FROM "public"."Torcedor" WHERE time_of_hearth[2] = ${time}) AS timeColuna2,
    (Select Count(*) From "Torcedor" where time_of_hearth[1] = ${time} and time_of_hearth [2] = ${time} ) as Coluna1e2,
    (select Count(*) from "Torcedor" where ${time} = any(time_of_hearth) ) as ambasColuna `
    
    response.json(result)  
}) 

const limitOfTeams = 2

allRoutes.post("/torcedores", async (request, response) => {
    const {name,cpf,idade,sexo,socio_torcedor,premium_torcedor,time_of_hearth} = request.body;
    console.log(request.body)
    
    if(time_of_hearth.length > limitOfTeams){
        return response.status(400).json("Limite de Times Excedido")
    }
    console.log(socio_torcedor)

    const intIdade = parseInt(idade);
    
   

    const key = socio_torcedor ? generateKey() : "";

    let faixa_etaria = "";

    if(idade >= 0 && idade <= 11){
        faixa_etaria = "Criança"
    };

    if(idade >= 12 && idade <= 17){
        faixa_etaria = "Adolescente"
    };
    if(idade >= 18 && idade <= 59){
        faixa_etaria = "Adulto"
    };
    if(idade >= 60 ){
        faixa_etaria = "Idoso"
    };
  
    const torcedor = await prisma.torcedor.create({ 
        data: {
            name,
            cpf,
            idade:intIdade,
            sexo,
            socio_torcedor: socio_torcedor ? true : false,
            premium_torcedor: premium_torcedor ? true : false, 
            faixa_etaria,
            id_socio: key,
            time_of_hearth
        },    
    });
    return response.status(201).json(torcedor);
});


allRoutes.get("/torcedores", async (request, response) => {
    const torcedores = await prisma.torcedor.findMany({orderBy:{name: "asc"}})
    return response.status(200).json(torcedores)
})



allRoutes.put("/torcedores", async (request, response) => {
    const {id,name,idade,sexo,socio_torcedor,premium_torcedor,time_of_hearth} = request.body;
    console.log(socio_torcedor)
  
    const intIdade = parseInt(idade);

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
            name,
            idade:intIdade,
            sexo,
            socio_torcedor: socio_torcedor ? true : false,
            premium_torcedor: premium_torcedor ? true : false,
            time_of_hearth

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

module.exports = allRoutes; 

