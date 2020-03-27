# Página de Profile

---

O nosso arquivo *index.js* da nossa página *Profile* ficará dessa maneira:

    import React from 'react';
    import { Link } from 'react-router-dom';
    import { FiPower, FiTrash2 } from 'react-icons/fi'; // Ícone de energia e lixo.
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    
    export default function Profile() {
      return (
        <div className="profile-container">
          <header>
            <img src={logoImg} alt="Be The Hero"/>
            <span>Bem vinda, APAD</span>
          
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button"> 
              <FiPower size={18} color="#E02041" />
            </button>
          </header>
    
          <h1>Casos cadastrados</h1>
    
    			// Por enquanto serão 4 casos estáticos, para definirmos nosso *layout:*
    
          <ul>
            <li>
              <strong>CASO:</strong>
              <p>Caso teste</p>
    
              <strong>DESCRIÇÃO:</strong>
              <p>Descrição teste</p>
    
              <strong>VALOR:</strong>
              <p>R$ 120,00</p>
    
              <button type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
            <li>
              <strong>CASO:</strong>
              <p>Caso teste</p>
    
              <strong>DESCRIÇÃO:</strong>
              <p>Descrição teste</p>
    
              <strong>VALOR:</strong>
              <p>R$ 120,00</p>
    
              <button type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
            <li>
              <strong>CASO:</strong>
              <p>Caso teste</p>
    
              <strong>DESCRIÇÃO:</strong>
              <p>Descrição teste</p>
    
              <strong>VALOR:</strong>
              <p>R$ 120,00</p>
    
              <button type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
            <li>
              <strong>CASO:</strong>
              <p>Caso teste</p>
    
              <strong>DESCRIÇÃO:</strong>
              <p>Descrição teste</p>
    
              <strong>VALOR:</strong>
              <p>R$ 120,00</p>
    
              <button type="button">
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          </ul>
        </div>
      );
    }

Arquivo *styles.css*:

    /* HEADER */
    
    .profile-container {
      width: 100%;
      max-width: 1180px;
      padding: 0 30px;
      margin: 32px auto;
    }
    
    .profile-container header {
      display: flex;
      align-items: center;
    }
    
    .profile-container header span {
      font-size: 20px;
      margin-left: 24px;
    }
    
    .profile-container header img {
      height: 64px;
    }
    
    .profile-container header a {
      width: 260px;
      margin-left: auto;
      margin-top: 0;
    }
    
    .profile-container header button {
      height: 60px;
      width: 60px;
      border-radius: 4px;
      border: 1px solid #dcdce6;
      background: transparent;
      margin-left: 16px;
      transition: border-color 0.2s;
    }
    
    .profile-container header button:hover {
      border-color: #999;
    }
    
    /* CASOS */
    
    .profile-container h1 {
      margin-top: 80px;
      margin-bottom: 24px;
    }
    
    .profile-container ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* 2 colunas de um tamanho flexível*/ 
      grid-gap: 24px;
      list-style: none;
    }
    
    .profile-container ul li {
      background: #FFF;
      padding: 24px;
      border-radius: 8px;
      position: relative;
    }
    
    .profile-container ul li button {
      position: absolute;
      right: 24px;
      top: 24px;
      border: 0;
    	background-color: #fff;
    }
    
    .profile-container ul li button:hover {
      opacity: 0.8;
    }
    
    .profile-container ul li strong {
      display: block;
      margin-bottom: 16px;
      color: #41414d;
    }
    
    .profile-container ul li p + strong {
      margin-top: 32px;
    }
    
    .profile-container ul li p {
      color: #737380;
      line-height: 21px;
      font-size: 16px;
    }

---