# Migrations

---

Existem várias maneiras de criamos as tabelas dentro do banco de dados, porém o *knex* vem com uma funcionalidade dentro dele que se chama *migrations*.

*Migration* é uma forma de criar tabelas e manter um histórico das tabelas que foram criadas, alteradas, como se fosse um controle de versão do nosso banco de dados. Vamos saber quando uma nova tabela foi criada, se um campo foi alterado por outro, e por aí vai. É um histórico do banco de dados.

Antes de criarmos nossa primeira *migration*, vamos até a pasta *database* criada anteriormente e criamos uma pasta chamada *migrations*. Depois de termos feito isso, vamos ao nosso arquivo *knexfile.js* e adicionamos a linha de comando de *migrations* dentro do *development*, apontando para o diretório que acabamos de criar:

    ...
    development: {
        client: 'sqlite3',
        connection: {
          filename: './src/database/db.sqlite'
        },
        migrations: {
          directory: './src/database/migrations'
        },
        useNullAsDefault: true, // Adicionamos também para evitar o *warning* de *null*.
      },
    ...

Para finalmente criarmos a nossa primeira *migration*, vamos a linha de comando e digitamos `npx knex migrate:make create_ongs`. Isso irá criar nossa primeira migration com o nome *create_ongs* dentro daquela pasta que nós havíamos definido.

Agora na *migration* criada nós vamos usar a estrutura do *knex* para criar tabelas:

    exports.up = function(knex) {
      return knex.schema.createTable('ongs', function (table) { // Criar a tabela *ongs*
        table.string('id').primary(); // Campo *id* como chave primária
        table.string('name').notNullable(); // Campo *name* que não pode ser nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // Campo *uf* não nulo com 2 caracteres
      });
    };
    
    exports.down = function(knex) {
      return knex.schema.dropTable('ongs'); // Deleta a tabela *ongs*
    };

Obs.: *id* está como *string* justamente para termos mais possibilidades de *id*, não só números, já que as *ONGs* entrarão somente com um *id* único.

O método *up* é sempre responsável pela criação da tabela, o que vai acontecer quando essa *migration* for executada.

O metódo *down* serve para que se der algum problema e nós precisarmos voltar atrás, ele diz o que vamos desfazer. Nesse método *down* nós vamos deletar a tabela, caso precise voltar atrás da criação da tabela.

Para rodarmos a *migration* nós digitamos no terminal `npx knex migrate:latest`.

Criada a *migration* de *ongs*, vamos agora criar a *migration* dos casos: `npx knex migrate:make create_incidents`. Vamos aproveitar algumas coisas da outra *migration* que criamos anteriormente:

    exports.up = function(knex) {
      return knex.schema.createTable('incidents', function (table) {
       table.increments(); // Chave primária que incrementa automaticamente
    
       table.string('title').notNullable();
       table.string('description').notNullable();
       table.decimal('value').notNullable(); // Valor
    
    	 table.string('ong_id').notNullable(); // *ONG* que criou o caso (relacionamento)
    
    	 table.foreign('ong_id').references('id').inTable('ongs'); // *Chave estrangeira
      });
    };
    
    exports.down = function(knex) {
      return knex.schema.dropTable('incidents'); // Deleta a tabela *incidents.*
    };

**Chave estranheira* - Toda vez que esse *ong_id* for preenchido, este precisa ser um id que esteja cadastrado dentro da tabela *ONG.* A coluna *ong_id* referencia a coluna *id* dentro da tabela *ongs*.

Se uma *migration* foi executada e só depois foi percebido algum erro, basta digitar `npx knex migrate:rollback` para desfazer a última *migration* feita.

Para saber todas as *migrations* que já foram executadas, `npx knex migrate:status`.

---