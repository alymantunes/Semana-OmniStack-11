# Conexão com o back-end - Novo Perfil

---

Vamos conectar agora o nosso *front-end* com o *back-end*, e para isso nós começamos instalando o *axios* com o `npm i axios`, que é um cliente *HTTP*. Ele será o responsável por conseguir fazer as chamadas à nossa *API* do *back-end* e obter as respostas.

Criamos uma pasta em *src* chamada de *services*, e dentro dessa pasta vamos criar um arquivo chamado *api.js:*

    import axios from 'axios';
    
    const api = axios.create({
      baseURL: 'http://localhost:3333',
    })
    
    export default api;

Vamos até o arquivo *index.js* da página de novo registro e adicionamos:

    import React, { useState } from 'react'; // Conceito de estado já aprendido.
    import { Link, useHistory } from 'react-router-dom'; // * useHistory
    import { FiArrowLeft } from 'react-icons/fi';
    
    import api from '../../services/api'; // Chamada ao arquivo *api* com *axios*.
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    
    export default function Register() {
      const [name, setName] = useState(''); // Conceito de estado já aprendido.
      const [email, setEmail] = useState('');
      const [whatsapp, setWhatsapp] = useState('');
      const [city, setCity] = useState('');
      const [uf, setUf] = useState('');
    
      const history = useHistory(); // * Definido o *useHistory* em uma variável.
    
      async function handleRegister(e) {
        e.preventDefault(); // Prevenir que a página aja como padrão, recarregando.
    
        const data = { // *data* armazenará o objeto com os dados.
          name,
          email,
          whatsapp,
          city,
          uf
        };
    
        try {
          const response = await api.post('ongs', data); // * Insere na rota /ongs.
    
          alert(`Seu ID de acesso: ${response.data.id}`);
    
          history.push('/'); // * Redireciona o usuário para a tela de *login*.
        } catch (err) {
          alert('Erro no cadastro, tente novamente.');
        }
      }
    
      return (
        <div className="register-container">
          <div className="content">
            <section>
              <img src={logoImg} alt="Be The Hero"/>
            
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a 
              fencontrarem os casos da sua ONG.</p>
    
            <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#E02041" />
                Já tenho cadastro
              </Link>
            </section>
            
            <form onSubmit={handleRegister}> // Chamará a função para armazenar dados.
              <input 
                placeholder="Nome da ONG"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              
              <input 
                type="email" 
                placeholder="E-mail" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
              />
    
              <input 
                placeholder="WhatsApp"
                value={whatsapp} 
                onChange={e => setWhatsapp(e.target.value)}
              />
              
              <div className="input-group">
                <input 
                  placeholder="Cidade" 
                  value={city} 
                  onChange={e => setCity(e.target.value)}
                />
    
                <input 
                  placeholder="UF" 
                  style={{ width: 80 }}
                  value={uf} 
                  onChange={e => setUf(e.target.value)}
                />
              </div>
    
              <button className="button" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      );
    }

** useHistory* - O usuário será redirecionado para a página inicial assim que um novo cadastro for efetuado com sucesso, armazenando na variável *history* e usando o método *push*.

* Insere na rota *ongs* - A variável *response* irá esperar o objeto *data* ser enviado ao *back-end* na rota */ongs*, e assim que for feito com sucesso, irá aparecer um alerta ao usuário informando seu *id* gerado de maneira aleatória.

---