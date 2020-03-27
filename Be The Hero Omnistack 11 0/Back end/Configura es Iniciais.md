# Configurações Iniciais

### Criando o *package.json*:

---

Criamos o *package.json* digitando no terminal `npm init -y`. Lá ficarão nossos *scripts*, dependências, etc.

### Instalando a dependência *express*:

---

Instalamos o *mini-framework express* digitando `npm i express`.

### Instalando e configurando o *nodemon*:

---

Para não termos que ficar toda hora reiniciando nosso servidor de forma manual, vamos adicionar a dependência chamada *nodemon*. Para isso, digitamos no terminal `npm i nodemon -D`. O `-D` significa que esta é uma dependência de desenvolvimento, ou seja, não será utilizada em produção.

Vamos agora até o *package.json* e em *scripts*, removemos o *test* e adicionamos `"start": "nodemon src/index.js"`. Rodamos no terminal `npm start` e agora toda vez que salvarmos nossa aplicação, o servidor será reiniciado de maneira automática.

### Instalando e configurando o knex com SQLite:

---

O knex é utilizado para que nós possamos escrever nossos códigos SQL com JavaScript (chamado de Query Builder), o que é muito bom visto que se quisermos migrar nosso banco do MySQL para o PostgreSQL por exemplo, o código permanece o mesmo.

Instalamos primeiramente o knex com o comando `npm i knex`.

Nós vamos utilizar o SQLite, então instalamos sua dependência: `npm i sqlite3`.

Agora vamos criar nosso arquivo knexfile.js, e para isso nós não vamos instalar um pacote com o npm, e sim somente executar, com o npx. Então digitamos `npx knex init`. Feito isso, nós vamos estar inicializando nosso arquivo knex. É neste arquivo que vão ficar as configurações de acesso ao banco de dados para cada um dos ambientes da nossa aplicação.

---