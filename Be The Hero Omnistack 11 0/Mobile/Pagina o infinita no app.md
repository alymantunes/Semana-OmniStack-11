# Paginação infinita no app

---

Como já tínhamos definido no nosso *back-end*, só iriam ser exibidos 5 resultados por vez. Aqui no *mobile*, quando chegarmos ao final, vamos fazer o *scroll* infinito, sendo recuperados mais 5 resultados a cada vez que formos dando *scroll* para baixo. Vamos ao nosso arquivo *index.js* da página de casos:

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
    
      const [page, setPage] = useState(1); // 1
      const [loading, setLoading] = useState(false); // 2
    
      const navigation = useNavigation();
    
      function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
      }
    
      async function loadIncidents() {
        if (loading) { // 3 
          return;
        }
    
        if (total > 0 && incidents.length === total) { // 4
          return;
        }
    
        setLoading(true); // 5
    
        const response = await api.get('incidents', {
          params: { page }
        });
    
        setIncidents([... incidents, ... response.data]); // 8 (era *response.data*)
        setTotal(response.headers['x-total-count']);
        setPage(page + 1); // 7
        setLoading(false); // 6
      }
    
      useEffect(() => {
        loadIncidents();
      }, []);
    
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
              Total de <Text style={styles.headerTextBold}>{total} casos. </Text>
            </Text>
          </View>
    
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.description}>Escolha um dos casos abaixo e salve
    			 o dia.</Text>
        
          <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({ item: incident }) => (
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
                    }).format(incident.value)}
                </Text>
    
                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={() => navigateToDetail(incident)}
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

Como esse é um processo um pouco mais complicado, vamos fazer um passo a passo para isso:

1 - Precisamos controlar a página que estamos no momento, que vai iniciar com o valor 1, que é a primeira página.

2 - Para armazenar a informação de quando estaremos buscando dados novos, para evitar que esses dados sejam buscados novamente, carregando uma página por vez. Começará com o valor de *false*.

3 - Se o *loading* for *true*, dê o *return*. Fazemos isso para que evitemos que enquanto outra requisição esteja sendo feita, mais uma requisição venha a acontecer. Se o usuário ficar dando *scroll* pra baixo, que outra requisição não venha a acontecer no meio do caminho.

4 - Se o *total* for maior que 0 (o total de registros que temos no nosso banco de dados), então já entendemos que foi carregada pelo menos a primeira página. E se também o número de *incidents* que temos na lista for igual ao *total*, não faz sentido buscar mais informações, então damos o *return* caso já temos carregado todas.

5 - Se deu tudo certo, definimos o *setLoading* como *true* antes mesmo de começarmos a fazer a requisiçao.

6 - No final da requisição, damos o *setLoading* como false.

7 - Pulamos para a próxima página no estado.

8 - Outra coisa que precisamos mudar é que atualmente nós estamos sobrescrevendo o estado todo de *incidents*, então quando for carregada a página 2, ele irá trocar a página 1 pela 2 ao invés de anexar todos os dados que temos na página 2 junto com os da página 1. O que nós vamos fazer então é criar um *array* dentro, copiar todos os valores que já temos dentro dos *incidents* com `... incidents`, e daí vamos também copiar todos os valores que vêm no *response.data* com `... response.data`. Esta é uma forma de nós anexarmos dois vetores dentro de um único vetor, então no fim das contas nós trocamos o `(response.data)` por `([... incidents, ... response.data]);`.

E assim está finalizada a nossa aplicação *mobile*.

---