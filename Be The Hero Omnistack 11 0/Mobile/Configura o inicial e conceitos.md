# Configuração inicial e conceitos

---

Vamos começar o nosso projeto *mobile* instalando o *expo* de maneira global em nossa máquina, onde vamos poder utilizá-lo em qualquer outro projeto: `npm i -g expo-cli`.

Depois damos um `expo init mobile` e será criada uma pasta chamada *mobile* já com alguns arquivos.

Abrimos nossa pasta no *VSCode* e já digitamos  `npm start`. Será aberta uma nova guia no navegador. Abrimos o aplicativo do *Expo* em nosso celular, e apontamos para o *QRCode* gerado e pronto, nossa aplicação estará rodando em nosso dispositivo físico.

Vamos ao nosso arquivo *app.json* e trocamos o *name* e o *slug* da nossa aplicação:

    {
      "expo": {
        "name": "Be The Hero",
        "slug": "betheherotm",
        "privacy": "public",
        "sdkVersion": "36.0.0",
    ...

Vamos também já configurar nosso ícone e nossa *splash screen*, basta colocarmos nossas imagens na pasta *assets*. A *splash screen* com o nome *spash*, e o ícone como *icon*.

O ícone deve ter proporções de 192 x 192.

A *spalash screen* deve ter proporções de 1242 x 2438.

Podemos ver que a nossa *splash screen* ficou com algumas bordar brancas, isso pode ser arruma indo até o *app.json* e trocando o *backgroundColor* do objeto *splash* para a mesma cor: 

    "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "splash": {
          "image": "./assets/splash.png",
          "resizeMode": "contain",
          "backgroundColor": "#E02041"
        },
        "updates": {
          "fallbackToCacheTimeout": 0
        },

## Diferenças do *ReactJS* para o *React Native:*

---

### Elementos *HTML*:

Antigamente era usado a *tag* `<div>` basicamente para tudo, e com o tempo foram surgindo novas *tags* como `<header>`, `<footer>`, e por aí vai.

Como o *React Native* não tem as mesmas *tags* que nós temos lá na *web*, então nós podemos voltar a utilizar a *tag `<div>`* praticamente para tudo, e nesse caso seria a *tag* `<View>`. Esta *tag* é utilizada como contêiner, e a *tag* `<Text>` é utilizada para textos, como se fosse o `<h1>`.

### Semântica:

No *HTML*, por exemplo, a *tag* `<h1>` é uma *tag* de titulo, uma *tag* de texto "mais forte", vamos dizer assim. No *React Native* isso não existe. A *tag `<View>`,* `<Text>`, e por aí vai, todas têm o mesmo valor.

### *StyleSheet:*

Podemos perceber que o nosso arquivo *App.js* por padrão, vem desta maneira:

    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <Text>Hello World!</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#7159c1',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

Então, assim nós vemos algumas diferenças no *CSS* comparando com o *React*.

Nós precisamos criar uma constante, e esta constante irá receber o `StyleSheet.create` que vem já como padrão importado do *'react-native'*, e dentro nós definimos os nossos estilos. Por padrão é criado um objeto chamado de *container*, e é este *container* que é chamado na *View* que vem como padrão. É chamado o *container* da constante *styles.* No nosso projeto nós iremos separar o *css* em um arquivo diferente, mas o conceito é o mesmo.

### Flexbox:

Não existe *block, in-line block*, todos eles são *flex*.

### Propriedades do *CSS*:

Diferenças de como definirmos a cor do texto e a cor de fundo no *React* e no *React Native*:

    /* React: */
    
    background-color: #fff;
    color: #fff;
    
    /* React Native: */
    
    backgroundColor: '#fff',
    color: '#fff',

Podemos ver que é utilizado o padrão *CamelCase* no *React Native*, onde nós tiramos o hífen e colocamos a próxima letra em caixa alta. 

Além disso, nós também separamos cada uma das propriedades com vírgula e não com ponto e vírgula. 

Em valores em que a propriedade não é número, nós colocamos aspas simples em volta.

### Herança:

Na *web* por padrão nós temos a herança, mas isso não acontece no *React Native:*

    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    
    export default function App() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Hello World!</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#7159c1',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      title: {
        color: '#FFF'
      },
    });

Se quisermos definir uma cor para o texto, nós não podemos simplesmente colocar o *color* ali dentro do *container*, pois precisamos dizer exatamente onde será aplicado o nosso estilo, sem usar o conceito de herança.

Nós não podemos estilizar vários elementos ao mesmo tempo.

---

Criamos uma pasta chamada *src* que é onde ficará todo o código da nossa aplicação, e dentro dessa pasta vamos criar uma outra pasta chamada *pages*.

Vamos já criar nossas páginas dentro da pasta *pages*, onde cada página será uma pasta e vai conter um arquivo chamado *index.js* e outro arquivo chamado *styles.js,* não *.css.* Serão duas páginas somente, portanto, vamos criar duas pastas, uma chamada *Detail* e outra *Incidents*:

![Configura%20o%20inicial%20e%20conceitos/Untitled.png](Configura%20o%20inicial%20e%20conceitos/Untitled.png)

---