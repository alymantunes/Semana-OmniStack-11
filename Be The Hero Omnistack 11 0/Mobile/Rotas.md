# Rotas

---

Para fazer o desenvolvimento da parte de rotas de nossa aplicação, vamos fazer como no *React*, vamos criar um arquivo chamado *routes.js* na pasta *src*.

Para a navegação da nossa aplicação nós vamos utilizar o *[React Navigation](https://reactnavigation.org/docs/getting-started/),* começamos instalando-o: `npm i @react-navigation/native` (ou o *yarn*, que é mais rápido).

Como estamos utilizando o *expo* em nossa navegação, vamos agora rodar o seguinte comando: `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`.

Existem vários tipos de [navegações](https://reactnavigation.org/docs/hello-react-navigation/), como por exemplo, aquele menu que abre no lado esquerdo da tela, o famoso "ícone de hambúrguer". Mas nós vamos utilizar a navegação por botões, o *Stack Navigator*. Instalamos com `npm install @react-navigation/stack`.

Arquivo *routes.js*:

    import React from 'react'; // Para utilizarmos o *JSX*, assim como no *React*.
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    
    const AppStack = createStackNavigator(); // Conteúdo de *createStackNavigator*
    																				 // armazenado na varíavel *AppStack*.
    import Incidents from './pages/Incidents'; // Importação da página, *index.js*.
    import Detail from './pages/Detail';
    
    export default function Routes() {
      return (
        <NavigationContainer> // Deverá sempre estar por volta das rotas,
    													// como se fosse o *BrowserRouter* do *React*.
         <AppStack.Navigator screenOptions={{ headerShown: false }}> // * Cabeçalho
            <AppStack.Screen name="Incidents" component={Incidents} /> // * Rota
            <AppStack.Screen name="Detail" component={Detail} />
          </AppStack.Navigator>
    
        </NavigationContainer>
      );
    }

** Cabeçalho* - Também deve estar em volta das rotas. O *screenOption* está definindo que não deve ser exibido nenhum cabeçalho com o nome da página, já que vamos criar nosso próprio cabeçalho.

** Rota* - Diferente do *React*, aqui é obrigatório que tenha um nome.

Vamos adicionar algumas coisas básicas agora às nossas páginas, vamos ao arquivo *index.js* da página *Incidents* primeiramente:

    import React from 'react';
    import { View } from 'react-native';
    
    export default function Incidents() {
      return (
        <View />
      );
    }

E ao arquivo *index.js* da página *Detail*:

    import React from 'react';
    import { View } from 'react-native';
    
    export default function Detail() {
      return (
        <View />
      );
    }

---