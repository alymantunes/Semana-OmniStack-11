# Primeiras rotas, crypto e conexão com o banco de dados

---

Vamos agora fazer a parte de rotas da nossa aplicação, então voltemos ao arquivo *routes.js* e vamos fazer o *post* para criar uma nova *ONG*:

    const express = require('express');
    const crypto = require('crypto'); // Importa a biblioteca *crypto*.
    
    const routes = express.Router();
    
    routes.post('/ongs', (req, res) => { // localhost:3333/ongs.
      const { name, email, whatsapp, city, uf } = req.body; // Dados pegos do corpo.
    
      const id = crypto.randomBytes(4).toString('HEX'); // *Gera um *id* aleatório.
    
      return res.json();
    });
    
    module.exports = routes;

**Gera um id aleatório* - Utilizando o *crypto*, vamos gerar 4 *bytes* de caracteres aleatórios e vamos converter em uma *string* do tipo hexadecimal.

Vamos agora até a nossa pasta *database* e vamos criar um novo arquivo chamado *connection.js*, é neste arquivo que vamos fazer a exportação de conexão com o banco de dados:

    const knex = require('knex');
    const configuration = require('../../knexfile');
    
    const connection = knex(configuration.development);
    
    module.exports = connection;

Voltando agora ao arquivo *routes.js*, vamos importar essa conexão. Vamos importar essa conexão dentro dos arquivos que precisamos nos conectar com o banco de dados. Vamos também fazer a configuração de quais dados serão inseridos dentro da tabela *ongs:*

    const express = require('express');
    const crypto = require('crypto');
    
    const connection = require('./database/connection'); // Importa o arquivo
    																										 // de conexão com o BD.
    const routes = express.Router();
    
    routes.post('/ongs', async (req, res) => { // *Assincronia
      const { name, email, whatsapp, city, uf } = req.body;
    
      const id = crypto.randomBytes(4).toString('HEX');
    
      await connection('ongs').insert({ // *Assincronia e insere na tabela *ongs.*
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });
    
      return res.json({ id }); // Retorna para a *ONG* o *id* gerado aleatoriamente.
    });
    
    module.exports = routes;

**Assincronia* - Pelo fato da inserção dos dados na tabela *ongs* não ser algo de imediato, devemos usar *async/await*.

Vamos agora também fazer a listagem de *ONGs* já existentes em nosso banco de dados, utilizando *get*:

    ...
    const routes = express.Router();
    
    routes.get('/ongs', async (req, res) => {
      const ongs = await connection('ongs').select('*');
    
      return res.json(ongs);
    });
    
    routes.post('/ongs', async (req, res) => {
    ...

---