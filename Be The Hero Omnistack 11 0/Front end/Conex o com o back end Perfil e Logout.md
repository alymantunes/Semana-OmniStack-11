# Conexão com o back-end - Perfil e Logout

---

Teremos muita alterações em nosso arquivo *index.js* da página de perfil, então vamos lá:

    import React, { useState, useEffect } from 'react'; // * useEffect.
    import { Link, useHistory } from 'react-router-dom';
    import { FiPower, FiTrash2 } from 'react-icons/fi';
    
    import api from '../../services/api';
    
    import './styles.css';
    
    import logoImg from '../../assets/logo.svg';
    
    export default function Profile() {
      const [incidents, setIncidents] = useState([]);
    
    	const history = useHistory();
    
      const ongId = localStorage.getItem('ongId'); // Recuperará o *id* da *ONG.*
      const ongName = localStorage.getItem('ongName'); // Recuperará o nome **da *ONG.*
    
      useEffect(() => {
        api.get('profile', { // * Recuperação dos dados vindo da rota /*profile*.
          headers: {
            Authorization: ongId,
          }
        }).then(response => {
          setIncidents(response.data);
        })
      }, [ongId]);
    
      async function handleDeleteIncident(id) {
        try {
          await api.delete(`incidents/${id}`, { // * Deletará o *incident*.
            headers: {
              Authorization: ongId,
            }
          });
    
          setIncidents(incidents.filter(incident => incident.id !== id)); // * Filter.
        } catch (err) {
          alert('Erro ao deleter caso, tente novamente.');
        }
      }
    
    	function handleLogout() {
        localStorage.clear(); // Limpa o *localStorage*.
    
        history.push('/'); // Volta para a página de *login*.
      }
    
      return (
        <div className="profile-container">
          <header>
            <img src={logoImg} alt="Be The Hero"/>
            <span>Bem vinda, {ongName}</span>
          
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button"> // Chama a função de *logout*.
              <FiPower size={18} color="#E02041" />
            </button>
          </header>
    
          <h1>Casos cadastrados</h1>
    
          <ul>
            {incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
    
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>
    
                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
    							.format(incident.value)}</p> // * Formato de moeda brasileira.
    
                <button 
    							onClick={() => handleDeleteIncident(incident.id)} // * Botão delete.
    							type="button"
    						>
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

** useEffect* - Dispara uma função em um determinado evento do componente, como por exemplo, assim que é mostrado em tela.

Recebe dois parâmetros - o primeiro é qual função queremos que seja executada.
O segundo é quando a função vai ser executada, e será um array de dependências. Toda vez que as informações que estiverem dentro desse array mudarem, ele executará a função de novo.

Por exemplo, se temos um `useEffect(() => {}, [ongName]);`, toda vez que o valor de *ongName* mudar, ele executará a função do primeiro parâmetro. Se deixarmos o *array* vazio, ele executará apenas uma única vez no fluxo do nosso componente.

** Recuperação dos dados vindo da rota /profile* - Da rota *profile*, será levado o *header* de *autorization* que é o *ongId* que estava armazenado no *localStorage*. Depois disso, pegamos a *response* e precisamos armazená-la em algum lugar, que seria o estado, o *incidents*. Utilizamos o *setIncidents* porque este que é o responsável por alterar o valor da variável. O *ongId* que está em um *array* no final não é obrigatório para a atual situação, porém é uma boa prática já que estamos utilizando o *React*.

 

** Deletará o incident* - Receberá o *id* como parâmetro, e é de acordo com este *id* que será deletado o *incident*, mas também pegando o *header* de autorização.

** Filter* - Se tudo estiver certo para ser deletado, o caso será deletado mas não será excluído de nossa interface, só se recarregarmos a página. Resolvemos isso utilizando o *filter*, vamos fazer uma varredura em nosso *array* de *incidents*, procurar o que tem o *id* passado e remover ele de dentro. 

Traduzindo - `setIncidents(incidents.filter(incident => [incident.id](http://incident.id/) !== id));` Pegamos todos os *incidents* que já temos e vamos fazer um filtro neles: para cada um dos *incidents*, queremos manter apenas os *incidents* em que o *id* for diferente daquele que deletamos.

** Formato da moeda brasileira* - Utilizamos o método *NumberFormat* de *Intl* que já vem por padrão com o *JavaScript*. Passamos que a língua é pt-br, que queremos o tipo moeda (*currency)* e que o formato de moeda é o BRL, que é o padrão brasileiro de moeda. Colocamos o *`.format`* dizendo o que queremos formatar, que no caso é o valor do caso, *incident.value*. 

** Botão delete* - O que estamos passando para o *onClick* é uma função e não o retorno de uma função, por isso utilizamos o *arrow function*.

---