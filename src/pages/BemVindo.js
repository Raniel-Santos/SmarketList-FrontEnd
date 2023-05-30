import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

const BemVindo = ({ navigation }) => ( 
  <View style={{ flex:1, backgroundColor: '#31DB9E', alignItems:'center' }}>
    <StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
    <Text style={styles.texto}>Smarket List: Sua lista de compras inteligente ! ;D</Text>
    <Image 
      style={styles.imagem_home}
      source={require('../assets/pedido.png')}
    />
    <View>
        <TouchableOpacity
          style={styles.botao_login}
          title="Login"
          onPress={() => navigation.navigate('Login')}>
        <Text style={styles.texto_botao_login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao_cadastrar}
          title="Cadastrar-se"
          onPress={() => navigation.navigate('Cadastrar-se') }>
        <Text style={styles.texto_botao_cadastrar}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

  </View>
  
);

BemVindo.navigationOptions = {
  title: 'Home',
}

const styles = StyleSheet.create({
  texto:{
    marginTop: 50,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: "black",
    textShadowOffset: {width:0, height:0},
    textShadowRadius: 15,
    fontSize: 20 
  },
  imagem_home:{
    marginTop: 80,
    width: 200, 
    height: 200,
  },  
  botao_login: {
    marginTop: 120,
    backgroundColor: '#31A8DB',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,    
  },
  botao_cadastrar:{
    marginTop: 10,
    backgroundColor: '#fff',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  texto_botao_login:{
    color: '#fff',
    fontSize: 16
  },
  texto_botao_cadastrar:{
    color: '#31DB9E',
    fontSize: 16
  }
})

export default BemVindo;