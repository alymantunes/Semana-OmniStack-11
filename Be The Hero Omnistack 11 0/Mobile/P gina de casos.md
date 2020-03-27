# Página de casos

---

Nós vamos utilizar a imagem de *logo* em nosso cabeçalho, então vamos baixar e criar uma página chamada *assets* dentro da pasta *src*. Essa pasta *assets* é diferente da outra pasta *assets* que está fora da pasta *src*, pois naquela pasta nós só colocamos o que vai ficar "por fora" da nossa aplicação, no caso a *splash screen* e o ícone.

Os arquivos terão um @ no final com 2x e 3x, mas nós vamos importar somente o arquivo *logo.png*, pois esses arquivos com @ serão automaticamente exibidos dependendo da resolução do dispositivo utilizado.

Quando nós formos começar a colocar nossos objetos em tela, vamos perceber que ele fica no topo, passando até da barra de *status*. Para resolvermos isso, é interessante sabermos exatamente a altura dessa barra de *status,* e para isso nós vamos instalar uma dependência do *expo* chamada de *expo-constants*, e nós vamos utilizar isso no nosso *styles.js*. Instalamos:

`expo install expo-constants`.

Vamos ao código do nosso arquivo *index.js*:

    import React from 'react'; // Para utilizarmos o *JSX*, sempre devemos importar.
    import { Feather } from '@expo/vector-icons'; // Importar o ícone, como no *React*.
    import { useNavigation } from '@react-navigation/native';
    import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
    // * *FlatList* para usarmos o *scroll.*
    // *TouchableOpacity* é um texto que funciona como um botão que diminui a opacidade.
    
    import logoImg from '../../assets/logo.png';
    
    import styles from './styles';
    
    export default function Incidents() {
      const navigation = useNavigation(); // Funciona como *useHistory* do *React*.
    
      function navigateToDetail() {
        navigation.navigate('Detail'); // Navega para o *Datail* definido nas rotas.
      }
    
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
              Total de <Text style={styles.headerTextBold}>0 casos.</Text>
            </Text>
          </View>
    
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.description}>Escolha um dos 
    			casos abaixo e salve o dia.</Text>
        
          <FlatList 
            data={[1, 2, 3, 4]}
            style={styles.incidentList}
            keyExtractor={incident => String(incident)}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
              <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cadelinha atropelada</Text>
    
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>
    
                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={navigateToDetail} 
                >
                  <Text style={styles.detailsButtonText}>Ver mais detalhes </Text>
                  <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
    }

** FlatList para usarmos o scroll* - Quando formos utiliza-lo, temos o *data*, que são as informações que serão vindas do *back-end,* e como não temos nada ainda, colocamos 4 valores aleatórios e assim serão geradas 4 vezes o que está no *renderItem*. O *keyExtractor* é como o *key* do *React*, onde temos que passar um valor único como um *id.* Como não temos nada ainda, passamos o próprio *incident*. Como este precisa ser uma *string*, então utilizamos o construtor para transformar. Não é interessante mantermos a barra de rolagem, então vamos tirar com o *showsVerticalScrollIndicator* passando o valor de falso.

Vamos agora ao nosso arquivo *styles.js:*

    import { StyleSheet } from 'react-native';
    import Constants from 'expo-constants'; /* Para sabermos a altura da *status bar */*
    
    export default StyleSheet.create({
      container: {
        flex: 1, /* Para ocupar a tela toda */
        paddingHorizontal: 24, /* Espaçamento nas laterais */
        paddingTop: Constants.statusBarHeight + 20, /* Altura da *status bar* + 20 */
      },
    
      header: {
        flexDirection: 'row', /* Diferente da web, o padrão aqui é *column* e não *row */*
        justifyContent: 'space-between',
        alignItems: 'center'
      },
    
      headerText: {
        fontSize: 15,
        color: '#737380',
      },
    
      headerTextBold: {
        fontWeight: 'bold'
      },
    
      title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
      },
      
      description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
      },
    
      incidentList: {
        marginTop: 32,
      },
    
      incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
      },
    
      incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
      },
    
      incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
      },
    
      detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
    
      detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
      }
    });

---