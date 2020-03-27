# Adicionando validação com celebrate no back-end

---

Vamos adicionar agora validações em nosso *back-end*, e começamos adicionando a biblioteca *celebrate*: `npm i celebrate`. O *celebrate* por baixo dos panos usa uma outra biblioteca chamada *joi*, o que o *celebrate* faz é integrar isso tudo com o *express*.

Vamos começar indo em nosso arquivo de rotas, e vamos começar nossa validação em nossa rota de criação de *ONG:*

    const express = require('express');
    const { celebrate, Segments, Joi } = require ('celebrate');
    
    const OngController = require('./controllers/OngController');
    const IncidentController = require('./controllers/IncidentController');
    const ProfileController = require('./controllers/ProfileController');
    const SessionController = require('./controllers/SessionController');
    
    const routes = express.Router();
    
    routes.post('/sessions', SessionController.create);
    
    routes.get('/ongs', OngController.index);
    routes.post('/ongs', celebrate({
      [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
      })
    }), OngController.create);
    
    routes.get('/profile', ProfileController.index);
    
    routes.get('/incidents', IncidentController.index);
    routes.post('/incidents', IncidentController.create);
    routes.delete('/incidents/:id', IncidentController.delete);
    
    module.exports = routes;

Sempre devemos adicionar o *celebrate* antes da chamada do *controller,* visto que a validação  deve acontecer antes da ação no *express*. 

Então definimos que nossos dados serão enviados através do *body*, que é um objeto e que tem as "chaves": *name, email, whatsapp, city* e uf. Cada chave é uma propriedade dentro do nosso objeto. 

Se formos no *Insomnia* agora e tentarmos forçar uma falha na validação, vamos ver que ele retornará um erro de servidor, um erro 500, o que é muito ruim pois parece que é um erro da nossa aplicação. Para resolvermos isso, vamos até o nosso arquivo *index.js* que está na raiz da pasta *src* e vamos adicionar:

    const express = require('express');
    const cors = require('cors');
    const { errors } = require('celebrate');
    const routes = require('./routes');
        
    const app = express();
        
    app.use(cors());
    app.use(express.json()); 
    app.use(routes);
    app.use(errors());
        
    app.listen(3333);

Somente isso, e agora, quando tentarmos forçar uma falha na validação, aparecerá um erro mais... "legível", como este:

    {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "\"email\" must be a valid email",
      "validation": {
        "source": "body",
        "keys": [
          "email"
        ]
      }
    }

E assim, ficará mais fácil para o nosso *front-end* lidar com esses erros.

Vamos continuar a validação das nossas rotas, e vamos agora para o *header*. O *header* é um pouco diferente a questão da validação:

    ...
        uf: Joi.string().required().length(2),
      })
    }), OngController.create);
    
    routes.get('/profile', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    }), ProfileController.index);
    
    routes.get('/incidents', IncidentController.index);
    ...

Nós devemos colocar o nosso *Header* dentro do *object* e substituímos o *keys* por *unknown*.

Para a validação de *params* e *query*, fazemos da mesma maneira como no *body*:

    ...
      }).unknown(),
    }), ProfileController.index);
    
    routes.get('/incidents', celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), // Já tem um valor padrão, só é obrigatório ser número.
      }),
    }), IncidentController.index);
    
    routes.post('/incidents', IncidentController.create);
    
    routes.delete('/incidents/:id', celebrate({
      [Segment.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }), IncidentController.delete);
    
    module.exports = routes;

E então, no final de tudo, nosso arquivo *routes.js* com validações ficará dessa maneira:

    const express = require('express');
    const { celebrate, Segments, Joi } = require ('celebrate');
    
    const OngController = require('./controllers/OngController');
    const IncidentController = require('./controllers/IncidentController');
    const ProfileController = require('./controllers/ProfileController');
    const SessionController = require('./controllers/SessionController');
    
    const routes = express.Router();
    
    routes.post('/sessions', celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
      })
    }), SessionController.create);
    
    routes.get('/ongs', OngController.index); // Não existe validação.
    
    routes.post('/ongs', celebrate({
      [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
      })
    }), OngController.create);
    
    routes.get('/profile', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    }), ProfileController.index);
    
    routes.get('/incidents', celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      }),
    }), IncidentController.index);
    
    routes.post('/incidents', celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().min(10),
        value: Joi.number().required(),
      }),
    }), IncidentController.create);
    
    routes.delete('/incidents/:id', celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }), IncidentController.delete);
    
    module.exports = routes;