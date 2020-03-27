# Página de detalhe

---

Para conseguirmos abrir o nosso aplicativo de *e-mail* no celular, vamos instalar uma depencência do *expo* chama de *mail-composer*, com o comando `expo install expo-mail-composer`.

Vamos agora ao nosso arquivo *index.js* da página de *Detail:*

    import React from 'react';
    import { Feather } from '@expo/vector-icons';
    import { useNavigation } from '@react-navigation/native';
    import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
    import * as MailComposer from 'expo-mail-composer'; // Tudo como *MailComposer.*
    
    import logoImg from '../../assets/logo.png';
    
    import styles from './styles';
    
    export default function Detail() {
      const navigation = useNavigation();
      const message = `Olá APAD, estou entrando em contato pois gostaria 
    	de ajudar no caso "Cadelinha atropelada" com o valor de R$120,00`;
    
      function navigateBack() {
        navigation.goBack(); // Para voltar para a tela anterior.
      }
    
      function sendMail() {
        MailComposer.composeAsync({
          subject: 'Herói do caso: Cadelinha atropelada', // Assunto.
          recipients: ['matheus08.pimentel@gmail.com'], // Para quem.
          body: message, // A mensagem que está na variável.
        })
      }
    
      function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5521999999999&text=${message}`);
      }
    
      return (
        <View style={styles.container}>
           <View style={styles.header}>
            <Image source={logoImg} />
            
            <TouchableOpacity onPress={navigateBack}> // Chama função para voltar
              <Feather name="arrow-left" size={28} color="#E82041" />
            </TouchableOpacity>
          </View>
    
          <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
            <Text style={styles.incidentValue}>APAD</Text>
            
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>Cadelinha atropelada</Text>
    
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>R$ 120,00</Text>
          </View>
    
          <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
         
            <Text style={styles.heroDescription}>Entre em contato:</Text>
         
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                <Text style={styles.actionText}>WhatsApp  </Text>
              </TouchableOpacity>
    
              <TouchableOpacity style={styles.action} onPress={sendMail}>
                <Text style={styles.actionText}>E-mail </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

Arquivo *styles.js*:

    import { StyleSheet } from 'react-native';
    import Constants from 'expo-constants';
    
    export default StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
      },
    
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        marginTop: 48,
      },
    
      incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24,
      },
    
      incidentValue: {
        marginTop: 8,
        fontSize: 15,
        color: '#737380'
      },
    
      contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
      },
    
      heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30,
      },
    
      heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 30,
      },
    
      actions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    
      action: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold' 
      }
    });

---