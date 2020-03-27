# Página de Logon e CSS Global

---

Vamos começar a construção das nossas páginas, e para isso, criamos uma pasta dentro de *src* chamada de *pages*. Cada uma das páginas será um componente, e como esse componente também terá estilização, vamos criar uma pasta ao invés de apenas um arquivo como fizemos no *Header*. Como esta será a página de *logon*, fazemos a pasta com este nome.

Criamos dentro dessa pasta um arquivo chamado *index.js* e o arquivo *styles.css.*

Criamos também dentro da pasta *src* um arquivo *css* chamado *global.css*, que são algumas estilizações que teremos em todas as páginas. Vamos já importando uma fonte do google neste arquivo, adicionando algumas coisas básicas e dando *reset* em outras:

    @import url
    ('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
    }
    
    body {
      font: 400 14px Roboto, sans-serif;
      background: #f0f0f5;
      -webkit-font-smoothing: antialiased; /* Suavização da fonte no *chrome* */
    }
    
    input, button, textarea {
      font: 400 18px Roboto, sans-serif; /* É necessário colocar a fonte aqui */
    }                                    /* também, não é pego o padrão definido */
    
    button {
      cursor: pointer;
    }
    
    form input {
      width: 100%;
      height: 60px;
      color: #333;
      border: 1px solid #dcdce6;
      border-radius: 8px;
      padding: 0 24px;
    }
    
    form textarea {
      width: 100%;
      resize: vertical;
      min-height: 140px;
      color: #333;
      border: 1px solid #dcdce6;
      border-radius: 8px;
      padding: 16px 24px;
      line-height: 24px;
    }
    
    .button { /* Classe *button*, não a propriedade! */
      width: 100%;
      height: 60px;
      background: #e02041;
      border: 0;
      border-radius: 8px;
      color: #FFF;
      font-weight: 700;
      margin-top: 16px;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      line-height: 60px;
      transition: filter 0.2s; /* Efeito de transição do *filter* por 0.2s */
    }
    
    .button:hover {
      filter: brightness(90%); /* Redução de 10% do brilho quando em cima do botão */
    }
    
    .back-link {
      display: flex;
      align-items: center;
      margin-top: 40px;
      color: #41414d;
      font-size: 18px;
      text-decoration: none;
      font-weight: 00;
      transition: opacity 0.2s;
    }
    
    .back-link svg {
      margin-right: 8px;
    }
    
    .back-link:hover {
      opacity: 0.8;
    }

Importamos esse *css* global em nosso arquivo *App.js* e também o *Logon*:

    import React from 'react';
    
    import './global.css'; 
    
    import Logon from './pages/Logon';
    
    function App() {
      return (
        <Logon />
      );
    }
    
    export default App;

Vamos agora fazer a página de *logon*. Vamos começar fazendo a nossa estrutura *HTML* para depois fazermos o *CSS*, no arquivo *index.js* da pasta *Logon*:

    import React from 'react';
    import { FiLogIn } from 'react-icons/fi'; // *Importação do pacote de ícones
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg'
    import heroesImg from '../../assets/heroes.png';
    
    export default function Logon() {
      return (
        <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
    
            <form>
              <h1>Faça seu logon</h1>
    
              <input placeholder="Sua ID" />
              <button className="button" type="submit">Entrar</button>
            
              <a className="back-link" href="/register"> // Rota que ainda será criada
                <FiLogIn size={16} color="#E02041" /> // Ícone do pacote importado
                Não tenho cadastro
              </a>
            </form>
          </section>
    
          <img src={heroesImg} alt="Heroes" />
        </div>
      );
    }

* *Importação do pacote de ícones -* Se o usuário não tiver cadastro, haverá a opção dele se cadastrar e ao lado disso terá um ícone de *login.* Existem vários e vários sites de ícones, e vamos utilizar do [Feather Icons](https://feathericons.com/). Para utilizarmos o pacote de ícones, vamos instalar com `npm i react-icons`. Logo após a instalação, vamos digitar `import { } from 'react-icons'`. Logo após a palavra `icones` adicionamos `/` e vemos que vão aparecer várias opções, sendo uma delas `fi`, que é justamente a do *Feather Icons*. Selecionamos esta, e lá nos `{ }` damos um *control + espaço*, e serão exibidos várias opções. Como queremos o ícone de *login* do *Feather Icons*, vamos procurar por *FiLogIn*, e é isto que irá ficar dentro das chaves.

Vamos agora partir para o *css* da página de *logon*:

    .logon-container {
      width: 100%;
      max-width: 1120px;
      height: 100vh;
      margin: 0 auto;
    
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logon-container section.form {
      width: 100%;
      max-width: 350px;
      margin-right: 30px;
    }
    
    .logon-container section.form form {
      margin-top: 100px;
    }
    
    .logon-container section.form form h1 {
      font-size: 32px;
      margin-bottom: 32px;
    }

---