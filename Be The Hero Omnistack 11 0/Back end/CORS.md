# CORS

---

Para finalizar, vamos instalar o *CORS,* que garante uma segurança maior de nossa aplicação. Para isso, instalamos: `npm i cors`.

Esse módulo determina quem irá poder acessar a nossa aplicação, vamos agora adicioná-lo no *index.js*:

    const express = require('express');
    const cors = require('cors');
    const routes = require('./routes');
        
    const app = express();
        
    app.use(cors());
    app.use(express.json()); 
    app.use(routes);
        
    app.listen(3333);

Com isso, está finalizado o *back-end* da nossa aplicação.

---