# Página de Novo Caso

---

Esta página será muito parecida com a página de cadastrar uma nova *ONG*, portanto, podemos copiar todo o código do *index.js* e do *styles.css* dessa página e modificar algumas coisas:

    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FiArrowLeft } from 'react-icons/fi';
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    
    export default function NewIncident() {
      return (
        <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero"/>
          
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói
            para resolver isso. </p>
    
          <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
            </Link>
          </section>
          
          <form>
            <input placeholder="Título do caso" />
            <textarea placeholder="Descrição" />
            <input placeholder="Valor em reais" />
    
            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
      );
    }

Arquivo *styles.css*:

    .new-incident-container {
      width: 100%;
      max-width: 1120px;
      height: 100vh;
      margin: 0 auto;
    
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .new-incident-container .content {
      width: 100%;
      padding: 96px;
      background: #f0f0f5;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .new-incident-container .content section {
      width: 100%;
      max-width: 380px;
    }
    
    .new-incident-container .content section h1 {
      margin: 64px 0 32px;
      font-size: 32px;
    }
    
    .new-incident-container .content section p {
      font-size: 18px;
      color: #737380;
      line-height: 32px;
    }
    
    .new-incident-container .content form {
      width: 100%;
      max-width: 450px;
    }
    
    .new-incident-container .content form input,
    .new-incident-container .content form textarea {
      margin-top: 8px;
    }

---