# Paginação

---

Vamos agora fazer um esquema de paginação para que não venham todos os casos de uma vez só, vamos fazer de 5 em 5. Então vamos até o nosso arquivo *IncidentController.js* e modificamos:

    module.exports = {
      async index(req, res) {
        const { page = 1 } = req.query; // Busca por *page*, se não existir, padrão = 1.
    
        const incidents = await connection('incidents')
          .limit(5) // Limita a 5 o número de registros por vez.
          .offset((page - 1) * 5) // *Pula de 5 em 5.
          .select('*'); // Seleciona todos os registros.
    
        return res.json(incidents);
      },
    
    ...

**Pula de 5 em 5 -* Vamos supor que a página é a primeira, ou seja, (1-1) * 5 = 0, então serão exibidos os 5 primeiros registros.

Se for a segunda página, seria (2-1) * 5 = 5, então seria exibido do 6º ao 10º registro, e por aí vai.

Mas independente disso, é interessante enviarmos ao *front-end* quantos casos temos no total, mesmo que só sejam exibidos de 5 em 5, para isso, fazemos:

    module.exports = {
      async index(req, res) {
        const { page = 1 } = req.query;
    
        const [count] = await connection('incidents').count();
    
        const incidents = await connection('incidents')
          .limit(5)
          .offset((page - 1) * 5)
          .select('*');
    
        res.header('X-Total-Count', count['count(*)']); // Envia o total pelo
    																										// cabeçalho da resposta da
        return res.json(incidents);                     // requisição.
      },

Quando fazemos a listagem de casos, só é retornado os dados dos casos mesmo, sem os dados das *ONGs*, e nós vamos precisar disso no nosso *front-end*, por isso vamos utilizar o conceito de *join*, ainda dentro do nosso *IncidentController.js:*

    ...
    const incidents = await connection('incidents')
    	.join('ongs', 'ongs.id', '=', 'incidents.ong_id') // **Join* do *SQL*.
      .limit(5)
      .offset((page - 1) * 5)
      .select([ // Para não haver conflitos com a *id*, foi feita essa separação.
        'incidents.*', // Todos os campos de *incidents*.
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);
    
    res.header('X-Total-Count', count['count(*)']);
    
    return res.json(incidents);
    	},

**Join do SQL* - Da tabela *ongs*, traga os dados onde o *[ongs.id](http://ongs.id)* seja igual ao *incidents.ong_id*.

---