# Página de Registro

---

Já temos a nossa base do arquivo *index.js* da página de registro, agora vamos montar a nossa estrutura *HTML*:

    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FiArrowLeft } from 'react-icons/fi'; // Importação do ícone da seta.
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    
    export default function Register() {
      return (
        <div className="register-container">
          <div className="content">
            <section>
              <img src={logoImg} alt="Be The Hero"/>
            
            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a
    				 encontrarem os casos da sua ONG.</p>
    
            <Link className="back-link" to="/"> // Volta para a tela de *logon*.
                <FiArrowLeft size={16} color="#E02041" />
                Já tenho cadastro
              </Link>
            </section>
            
            <form>
              <input placeholder="Nome da ONG" />
              <input type="email" placeholder="E-mail" />
              <input placeholder="WhatsApp" />
              
              <div className="input-group">
                <input placeholder="Cidade" />
                <input placeholder="UF" style={{ width: 80 }} /> // * Tamanho 80.
              </div>
    
              <button className="button" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      );
    }

** Tamanho 80* - As chaves de fora significa que vamos adicionar um código *JavaScript*, e as chaves de dentro é um objeto em *JavaScript*. Estamos definindo um estilo diretamente no *input*, nesse caso, definindo a largura de 80, já que este campo *UF* ficará logo ao lado da Cidade.

Arquivo *styles.css*:

    .register-container {
      width: 100%;
      max-width: 1120px;
      height: 100vh;
      margin: 0 auto;
    
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .register-container .content {
      width: 100%;
      padding: 96px;
      background: #f0f0f5;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.1); /* 0 eixo *x* e *y*, 100 de *blur*, cor */
      border-radius: 8px;                       /* preta com 10% de opacidade */
    
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .register-container .content section {
      width: 100%;
      max-width: 380px;
    }
    
    .register-container .content section h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    }
    
    .register-container .content section p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    }
    
    .register-container .content form {
      width: 100%;
      max-width: 450px;
    }
    
    .register-container .content form input {
      margin-top: 8px;
    }
    
    .register-container .content form .input-group {
      display: flex;
    }
    
    .register-container .content form .input-group input + input {
      margin-left: 8px;
    }

---