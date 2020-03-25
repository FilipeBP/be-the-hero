//O micro framework (mini, pois possui poucas funcionalidades) express serve para mapear as rotas da aplicação.
//Foi instalado o nodemon, com um parâmetro -D, para não precisar reiniciar o server toda vez que ocorrer um alteração.
const express = require('express'); //importando o micro framework 'express' para a variável express.
const routes = require('./routes')
const cors = require('cors')

const app = express(); //A aplicação será armazenada nesta variável.

app.use(cors()) //Adiciona segurança ao app.\
app.use(express.json()); //Avisa ao express que estará sendo utilizado o objeto json para o corpo das requisições.

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Modificar uma informação no back-end
 * DELETE: Apagar uma informação no back-end
 * 
 * OBS: No browser, o único método possível de se ter retorno é o método GET.
 * Para que seja póssível ter o retorno dos métodos, será usado o Insomnia.
 */ 

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o '?'. Serve para filtros, paginação
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 app.use(routes); //Para usar as rotas criadas no arquivos routes.js

app.listen(3333); //Para acessar esse app, coloca-se a porta 3333. Ex: localhost/3333. 3333 geralmente é para o node.js.
