const express = require("express"); 

const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const { response } = require("express");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth');

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

allRoutes.post("/funcionarios", async (request, response) => {
    const {name,senha,cargo} = request.body;

    const funcionarios = await prisma.funcionarios.create({ 
        data: {
            name,
            senha,
            cargo,
        },    
    });
    return response.status(201).json(funcionarios);
});

allRoutes.post("/authenticate", async (request, response) => {
    const { name,senha,cargo } = request.params;
    const user = {
      name,
      senha,
      cargo,
    };

    // const passwordCheck =  compare(senha,user.senha);

    // if (!passwordCheck){
    //     throw new AppError("name ou senha inválidos")
    // }

    const token = jwt.sign(user, process.env.SECRET, {
        expiresIn: 300 
    })
    response.status(500).json({message: 'Login inválido!'});
    return res.json({ auth: true, token: token });
    });


    // if(cargo = "diretor"){
    //     return response.json({
    //         // vai user,retornar todos os dados de user
    //        token: jwt.sign(user, 'DIRETORKEY'), // vai retornar o token PRIVATEKEY para a verificação
    //      }); 
    // } 
    // if(cargo = "administrador"){
    //     return response.json({
    //         // vai user,retornar todos os dados de user
    //        token: jwt.sign(user, 'ADMINISTRADORKEY'), // vai retornar o token PRIVATEKEY para a verificação
    //      }); 
    // } 
    // if(cargo = "vendendor"){

const limitOfTeams = 2

allRoutes.post("/torcedores",authMiddleware, async (request, response) => {
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



allRoutes.put("/torcedores",authMiddleware, async (request, response) => {
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


allRoutes.delete("/torcedores/:id",authMiddleware, async (request, response) =>
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

