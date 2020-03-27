# Base de desenvolvimento e banco de dados

---

Partindo para a parte de desenvolvimento, nós primeiramente vamos criar uma pasta *src* onde ficarão todos os códigos desenvolvidos por nós e vamos criar dois arquivos: *index.js* e *routes.js*.

No arquivo *routes.js* é onde ficarão todas as nossas rotas, então começamos fazendo:

    const express = require('express'); // Solicitando a dependência *express.*
    
    const routes = express.Router(); // Desacoplando o *Router* do *express*.
    
    /**
    * *Aqui ficarão nossas rotas*.
    **/
    
    module.exports = routes; // Exportando a variável *routes* para outro arquivo.

No arquivo *index.js* nós fazemos:

    const express = require('express');
    const routes = require('./routes'); // Irá importar o que foi exportado de *routes*.
    
    const app = express(); // A variável *app* armazenará o conteúdo de *express*.
    
    app.use(express.json()); // Para que o *express* entenda o formato *JSON*.
    app.use(routes);
    
    app.listen(3333); // Porta em que a aplicação rodará no *localhost*.

Vamos agora fazer algumas modificações em nosso *knexfile.js*, mas antes disso, dentro da pasta *src* vamos criar uma pasta chamada *database*. Agora no arquivo *knexfile*, modificamos no *development* o nome do arquivo para `'./src/database/db.sqlite'`.

### Entidades no banco de dados:

---

Entidade é basicamente tudo aquilo que representa algo que vai ser salvo no banco de dados.

As *ONGs* vão ter cadastro, vão fazer *login*, vão poder cadastrar os casos, e por assim vai, então assim nós sabemos que a *ONG* será uma entidade dentro do nosso banco de dados.

As *ONGs* vão cadastrar casos, e os casos também vão precisar ser armazenados no banco de dados, então caso também será uma entidade. Nós vamos colocar tudo em inglês em nosso banco de dados, então vamos chamar o "caso" de *incident*. Como *ONG* é um substantivo próprio, vamos deixar dessa maneira mesmo.

Então no total nós só teremos duas entidades em nossa aplicação, *ONG* e *incident*.

### Funcionalidades:

---

De acordo com as entidades, vamos definir as funcionalidades que cada uma vai poder fazer dentro da aplicação:

- Login de *ONG.*
- Logout de *ONG.*
- Cadastro de *ONG.*
- Cadastrar novos casos.
- Deletar casos.
- Listar casos específicos de uma *ONG*.
- Listar todos os casos.
- Entrar em contato com a *ONG*.

---