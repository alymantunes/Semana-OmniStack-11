# Configurando as rotas

---

Começamos instalando a dependência `npm i react-router-dom` e criamos um arquivo chamado *routes.js* na pasta *src* e fazemos:

    import React from 'react';
    import { BrowserRouter, Route, Switch } from 'react-router-dom';
    
    import Logon from './pages/Logon'; // Importa o Login, que vai ser uma das rotas
    
    export default function Routes() {
      return (
        <BrowserRouter> // Que ficará "por volta" das rotas
          <Switch>  // Permite que somente uma rota seja executada por vez
            <Route path="/" component={Logon} /> // A página inicial é a tela de logon
          </Switch>
        </BrowserRouter>
      );
    }

Modificamos algumas coisas no *App.js*, visto que agora o arquivo *routes.js* é quem agora controlará as rotas:

    import React from 'react';
    
    import './global.css'; 
    
    import Routes from './routes';
    
    function App() {
      return (
        <Routes />
      );
    }
    
    export default App;

Vamos fazer a pasta *Register* agora, contendo os arquivos *index.js* e *styles.css* também. Vamos deixar algo bem básico por enquanto, só para podermos configurar nossas rotas, lá no arquivo *index.js*:

    import React from 'react';
    
    import './styles.css';
    
    export default function Register() {
      return <h1>Register</h1>
    }

Agora vamos continuar configurando nosso arquivo *routes.js* com as outras rotas:

    import React from 'react';
    import { BrowserRouter, Route, Switch } from 'react-router-dom';
    
    import Logon from './pages/Logon';
    import Register from './pages/Register';
    import Profile from './pages/Profile';
    import NewIncident from './pages/NewIncident';
    
    export default function Routes() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Logon} /> // *Exatamente esta rota
            <Route path="/register" component={Register} />
          
    				<Route path="/profile" component={Profile} />
    				<Route path="/incidents/new" component={NewIncident} />
    			</Switch>
        </BrowserRouter>
      );
    }

** Exatamente esta rota* - Como as outras rotas também vão conter a barra `/`, precisamos dizer ao nosso *front-end* que exatamente a rota que é a raiz é a página de *Logon*, senão qualquer outra rota cairá nessa tela de *Logon.*

Se nós formos clicar no nosso `a href` de "não tenho cadastro" em nossa página inicial, vamos perceber que a página recarrega, e não é isso que queremos visto que o conceito do *React* é justamente ser *SPA*, ou seja, sem recarregar a página, uma página única. Vamos modificar então nosso *index.js* de *Logon* na parte de *link*:

    import React from 'react';
    import { Link } from 'react-router-dom'; // Devemos importar o *Link*.
    import { FiLogIn } from 'react-icons/fi';
    
    ...
      <input placeholder="Sua ID" />
      <button className="button" type="submit">Entrar</button>
            
      <Link className="back-link" to="/register"> // Trocamos *a href* para *Link to.*
        <FiLogIn size={16} color="#E02041" />
        Não tenho cadastro
      </Link> // Trocamos *a* por *Link*.
    </form>
    ...

---