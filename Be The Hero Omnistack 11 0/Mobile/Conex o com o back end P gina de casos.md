# Conexão com o back-end - Página de casos

---

Começamos instalando o *axios*, assim como fizemos na parte *web*: `npm i axios`.

Também criamos a pasta *services* com o arquivo *api.js*, como fizemos na parte *web* também.

Para colocarmos o padrão de moeda brasileiro, nós podemos fazer como no *React* utilizando o *Intl*. Conseguimos fazer para o *iOS* sem instalar nenhuma dependência, porém para o *Android* nós precisamos. Então vamos instalar a própria dependência *INTL*: `npm i intl`.

Vamos importar essas coisas nosso arquivo *App.js*:

    import 'intl';
    import 'intl/locale-data/jsonp/pt-BR';
    
    import React from 'react';
    
    import Routes from './src/routes';
    
    export default function App() {
      return (
        <Routes />
      );
    }

Conectando com o *back-end*, nosso arquivo *index.js* da página de casos ficará assim:

    import React, { useState, useEffect } from 'react';
    import { Feather } from '@expo/vector-icons';
    import { useNavigation } from '@react-navigation/native';
    import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
    
    import api from '../../services/api';
    
    import logoImg from '../../assets/logo.png';
    
    import styles from './styles';
    
    export default function Incidents() {
      const [incidents, setIncidents] = useState([]);
      const [total, setTotal] = useState(0);
    
      const navigation = useNavigation();
    
      function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); // Para enviarmos essa variável
      }                                              // para a página de *Detail*.
    
      async function loadIncidents() {
        const response = await api.get('incidents');
    
        setIncidents(response.data);
        setTotal(response.headers['x-total-count']);
      }
    
      useEffect(() => {
        loadIncidents();
      }, []);
    
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
              Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
            </Text>
          </View>
    
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.description}>Escolha um dos casos abaixo e 
    			salve o dia.</Text>
        
          <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: incident }) => ( // * FlatList
              <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
    
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                  {Intl.NumberFormat('pt-BR', {
                     style: 'currency', 
                     currency: 'BRL' 
                    }).format(incident.value)} // Como no *React*.
                </Text>
    
                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={() => navigateToDetail} // Como no *React.*
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

** FlatList -* 

- *data* - As informações virão como um *array,* e cada elemento deste *array* é um novo *"card"* em nossa aplicação.
- *keyExtractor* - A informação que é única é o *id* do caso.
- *renderItem* - Fazemos a desestruturação e pegamos somente o *item*, mas para não ficar confuso, colocamos o nome de *incident* mesmo.

---