const express = require('express');

const app = express();

app.get('/',(request,response)=>{
    return response.json({evento:'Hello World.',
aluno:'Alym Antunes'});
})

app.listen(3333);