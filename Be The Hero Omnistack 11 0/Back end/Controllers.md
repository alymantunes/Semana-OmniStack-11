# Controllers

---

Depois de termos feito tudo isso nós vamos melhorar a estrutura de nosso código, abstraindo mais e deixando com uma melhor organização. Dentro da pasta *src*, criamos uma nova pasta chamada *controllers* e já criamos um arquivo chamado *OngController.js*. Para cada uma das entidades nós vamos ter um controlador. Vamos então começar modificando este arquivo criado, passando algumas coisas do nosso arquivo *routes.js* para cá:

    const crypto = require('crypto');
    const connection = require('../database/connection');
    
    module.exports = {
      async index (req, res) { // *index* será responsável por listar as *ONGs*.
        const ongs = await connection('ongs').select('*');
      
        return res.json(ongs);
      },
    
      async create(req, res) { // *create* será responsável pela criação de uma *ONG*.
        const { name, email, whatsapp, city, uf } = req.body;
    
        const id = crypto.randomBytes(4).toString('H-EX');
    
        await connection('ongs').insert({
          id,
          name,
          email,
          whatsapp,
          city,
          uf
        });
    
        return res.json({ id });
      }
    };

Depois de termos "transferido" várias linhas de código para o nosso arquivo *OngController.js*, nosso arquivo *routes.js* ficou desta maneira:

    const express = require('express');
    
    const OngController = require('./controllers/OngController');
    
    const routes = express.Router();
    
    routes.get('/ongs', OngController.index);
    routes.post('/ongs', OngController.create);
    
    module.exports = routes;

Assim, nós temos uma abstração maior e uma melhor organização de nosso código, pois sabemos claramente o que cada coisa arquivo faz.

Vamos também criar o nosso arquivo *IncidentController.js* para os casos:

    const connection = require('../database/connection');
    
    module.exports = {
      async index(req, res) { // Listar os casos.
        const incidents = await connection('incidents').select('*');
    
        return res.json(incidents);
      },
    
      async create (req, res) { // Criação do caso.
        const { title, description, value } = req.body; // Dados vindo do corpo.
        const ong_id = req.headers.authorization; // *Autorização.
    
        const [id] = await connection('incidents').insert({
          title,
          description,
          value,
          ong_id,
        });
    
        return res.json({ id });
      },
    
      async delete(req, res) { // Deletar um caso.
        const { id } = req.params; // Pega o *id* vindo como parâmetro.
        const ong_id = req.headers.authorization; // *Autorização.
    
        const incident = await connection('incidents')
          .where('id', id) // Buscar onde o *id* for igual ao *id* passado.
          .select('ong_id') // Selecionar a coluna *ong_id.*
          .first(); // Retorna apenas um resultado.
    
        if (incident.ong_id !== ong_id) { // Erro se não autorizado.
          return res.status(401).json({ error: 'Operation not permitted.' });
        }
    
        await connection ('incidents').where('id', id).delete(); // Deleta o caso.
    
        return res.status(204).send(); // Envia o estado de sucesso sem conteúdo.
      }
    }

** Autorização* - Acessar o *id* da *ONG* através da *header* de *authorization*.

Criamos as rotas para os casos:

    const express = require('express');
    
    const OngController = require('./controllers/OngController');
    const IncidentController = require('./controllers/IncidentController');
    
    const routes = express.Router();
    
    routes.get('/ongs', OngController.index);
    routes.post('/ongs', OngController.create);
    
    routes.post('/incidents', IncidentController.create);
    routes.get('/incidents', IncidentController.index);
    routes.delete('/incidents/:id', IncidentController.delete);
    
    module.exports = routes;

Vamos agora fazer a parte de listarmos os casos específicos de uma *ONG.* Para isso, começamos criando dentro da pasta *controllers* o arquivo *ProfileController.js,* e este será responsável pelo perfil de uma entidade, de uma *ONG*:

    const connection = require('../database/connection');
    
    module.exports = {
      async index(req, res) { // Lista os casos.
        const ong_id = req.headers.authorization; // Autorização.
    
        const incidents = await connection('incidents')
          .where('ong_id', ong_id) // Busca todos os *incidents* que tal *ONG* criou.
          .select('*'); // Seleciona todos os campos.
    
        return res.json(incidents); // Retorana em *JSON* os *incidents*.
      }
    }

Vamos também criar agora nosso controle de sessão, este terá o nome de *SessionController*, e também já fazemos a rota para este no arquivo *routes.js*:

    const express = require('express');
    
    const OngController = require('./controllers/OngController');
    const IncidentController = require('./controllers/IncidentController');
    const ProfileController = require('./controllers/ProfileController');
    const SessionController = require('./controllers/SessionController');
    
    const routes = express.Router();
    
    routes.post('/sessions', SessionController.create); // Criar Sessão.
    
    routes.get('/ongs', OngController.index);
    routes.post('/ongs', OngController.create);
    
    routes.get('/profile', ProfileController.index); // Listar os casos de uma *ONG*.
    
    routes.get('/incidents', IncidentController.index);
    routes.post('/incidents', IncidentController.create);
    routes.delete('/incidents/:id', IncidentController.delete);
    
    module.exports = routes;

No arquivo *SessionController*:

    const connection = require('../database/connection');
    
    module.exports = {
      async create (req, res) { // Cria uma sessão.
        const { id } = req.body; // Pega o *id* vindo do corpo da requisição.
    
        const ong = await connection('ongs') // Conecta à tabela *ongs*.
          .where('id', id) // Procura pelo *id* no banco vindo do *body*.
          .select('name') // Seleciona somente o nome.
          .first(); // Somente um resultado, para não vir em formato de *Array*.
    
        if (!ong) { // Se não encontrar a *ONG,* erro.
          return res.status(400).json({ error: 'No ONG found!' });
        }
    
        return res.json(ong); // Retorna o resultado, ou seja, o nome da *ONG*.
      }
    }

---