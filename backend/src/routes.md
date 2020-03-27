
  Rota / Recurso
  
 * Métodos HTTP:
  
    * GET: Buscar/listar uma informação
    * POST: Criar uma informação
    * PUT: Alterar uma informação
    * DELETE: Deletar uma informação
 
  
 * Tipos de parâmetros:
  
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
    *      request.params
 * Route Params: Parâmetros utilizados para identificar recursos
    *      request.params
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
    *      request.body
 


 * Celebrate - usado para validações nas rotas, ver documentaçao do Joi para mais informações
 