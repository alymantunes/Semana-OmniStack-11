# Configuração e conceitos do React

### Configuração básica:

---

Vamos começar o nosso *front-end* digitando no terminal `npx create-react-app frontend`. Será criada automaticamente uma pasta chamada *frontend* com um *template* básico do *React*.

Vamos excluir alguns arquivos, deixando somente estes:

![Configura%20o%20e%20conceitos%20do%20React/Untitled.png](Configura%20o%20e%20conceitos%20do%20React/Untitled.png)

Vamos também excluir algumas linhas de código de alguns arquivos, e nossos arquivos ficarão assim, começando pelo *App.js:* 

    import React from 'react';
    
    function App() {
      return (
        <h1>Hello World</h1>
      );
    }
    
    export default App;

*index.js*:

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );

*index.html:*

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        <title>Be The Hero</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
      </body>
    </html>

Criamos uma pasta chamada *assets* dentro da *src* e colocamos as imagens *heroes* e *logo*.

### Conceito de propriedade:

---

Vamos supor que nós temos um cabeçalho que se repete em toda página. É interessante então que nós criemos um arquivo específico para isso, separando em um componente. Então dentro da pasta *src* criamos o *Header*. Todos os componentes sempre precisam começar com letra maiúscula, senão não irá funcionar.

Nós vamos criar um componente novo ao invés de colocar tudo num mesmo arquivo quando formos ter algum código que vai se repetir muitas vezes dentro da nossa aplicação ou até algum código que a gente consiga isolar sem que ele faça diferença no restante da aplicação. Nós conseguimos isolar aquele pedaço de código em um componente, e assim teremos trechos menores de código para depois dar a devida manutenção.

Começamos no nosso arquivo *Header* importando o *React*, pois este é essencial em todo lugar que formos usar o *JSX*. Criamos um componente *html header* dentro de nossa função, contendo um *h1*:

    import React from 'react';
    
    export default function Header() {
      return (
        <header>
          <h1>Be The Hero</h1>
        </header>
      )
    }

Vamos ao nosso arquivo *App.js* e importamos esse *Header:*

    import React from 'react';
    
    import Header from './Header';
    
    function App() {
      return (
        <Header />
      );
    }
    
    export default App;

Agora, no *index.js* o *App* é renderizado, e o *App* renderiza o *Header*.

Em nosso *App* nós poderíamos passar uma propriedade com o texto que nós quiséssemos que fosse exibido lá naquele *h1*. Vamos supor que nós queremos que seja exibido o texto "Semana Omnistack":

    function App() {
      return (
        <Header title="Semana Omnistack" />
      );
    }

Agora nós precisamos recuperar esse título dentro do *Header*. Isso vai como parâmetro da função, e nós fazemos da seguinte maneira:

    export default function Header(props) { // Propriedade recebida como parâmetro.
      return (
        <header>
          <h1>{props.title}</h1> // **title* da propriedade recebida como parâmetro.
        </header>
      )
    }

*Sempre precisamos utilizar chaves por volta de variáveis quando estamos utilizando *JSX*.

Ainda podemos fazer isso de outra forma. Existe uma propriedade dentro do *React* que é criada de forma automática, quando fechamos a *tag* *Header*. Nós vamos colocar o texto dentro dessa *tag,* em nosso arquivo *App.js:*

    function App() {
      return (
        <Header>
          Semana Omnistack
        </Header>
      );
    }

No arquivo *Header.js*, colocamos *children*:

    export default function Header(props) { 
      return (
        <header>
          <h1>{props.children}</h1>
        </header>
      )
    }

É interessante fazer uma desestruturação para sabermos quais são as propriedades que esse *Header* recebe:

    export default function Header({ children }) {
      return (
        <header>
          <h1>{ children }</h1>
        </header>
      )
    }

### Conceito de estado:

---

Podemos entender como uma "informação mantida pelo componente". Não podemos usar simplesmente "variáveis convencionais", vamos utilizar o conceito de estado. Vamos utilizar o exemplo de um contador em nosso arquivo *App.js*:

    import React from 'react';
    
    import Header from './Header';
    
    function App() {
      let counter = 0;
    
      function increment(){
        counter++;
        console.log(counter);
      }
    
      return (
        <div>
          <Header>Contador: {counter}</Header>
          <button onClick={increment}>Incrementar</button>
        </div>
      );
    }
    
    export default App;

Podemos perceber que o número é alterado no *console* mas não é alterado em nossa interface, e por isso o conceito de estado existe dentro do *React*. Toda vez que o estado é alterado, o componente vai renderizar novamente exibindo as novas informações em tela.

Para resolvermos isso, vamos usar o *useState*:

    import React, { useState } from 'react';
    
    import Header from './Header';
    
    function App() {
      let counter = useState(0); // Começará com o valor 0
    
      function increment(){
        counter++;
        console.log(counter);
      }
    ...

Porém nós não podemos simplesmente fazer o `counter++` ou `counter += 1`, por causa de outro conceito, o conceito de imutabilidade.

### Conceito de imutabilidade

---

Por uma questão de performance, nunca podemos manipular o valor do estado de uma forma direta, precisamos sobrepor o valor da variável.

Quando nós utilizamos o método `useState`, este nos retorna um *array* com duas posições. A primeira posição é o valor da variável, e a segunda, uma função de atualização desse valor, uma função que consegue trocar esse valor:

    import React, { useState } from 'react';
    
    import Header from './Header';
    
    function App() {
      let [counter, setCounter] = useState(0);
    
      function increment(){
        setCounter(counter + 1);
      }
    
      return (
        <div>
          <Header>Contador: {counter}</Header>
          <button onClick={increment}>Incrementar</button>
    ...

Toda vez que nosso componente precisar armazenar uma informação dentro dele, nós não vamos criar uma variável comum e sim um estado, pois assim nós conseguimos atualizar essa informação e esta reflete as alterações dentro da interface.

---