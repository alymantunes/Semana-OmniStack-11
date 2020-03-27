# Conexão com o back-end - Logon

---

Vamos conectar agora com o *back-end* a nossa página de *login*, então vamos ao arquivo *index.js* da pasta *Logon:*

    import React, { useState } from 'react';
    import { Link, useHistory } from 'react-router-dom';
    import { FiLogIn } from 'react-icons/fi';
    
    import api from '../../services/api';
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    import heroesImg from '../../assets/heroes.png';
    
    export default function Logon() {
      const [id, setId] = useState('');
      const history = useHistory();
    
      async function handleLogin(e) {
        e.preventDefault();
    
        try {
          const response = await api.post('sessions', { id }); // * Buscará pelo *id.*
        
          localStorage.setItem('ongId', id); // * Armazerá no browser
          localStorage.setItem('ongName', response.data.name);
    
          history.push('/profile'); // Redirecionará para a rota */profile*.
        } catch (err) {
          alert('Falha no login, tente novamente.');
        }
      }
      
      return (
        <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
    
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>
    
              <input 
                placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}
              />
    
              <button className="button" type="submit">Entrar</button>
            
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
              </Link>
            </form>
          </section>
    
          <img src={heroesImg} alt="Heroes" />
        </div>
      );
    }

** Buscará pelo id* - A variável *response* irá armazenar o que virá da rota *sessions* buscando pelo *id* informado pelo nosso *front-end*.

** Armazenará no browser -* O *id* ficará armazenado no *browser* para que este possa ser exibido nas telas que quisermos. Terá o nome de *ongId*, e o segundo parâmetro é a variável. O outro será *ongName* e armazenará o nome vindo da *response*.

---