import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const Login = ({navigation}) => {

const [email,setEmail] = useState('');
const [senha,setSenha] = useState('')

const loginUsuario = () =>{
  const obj ={
    email:email,
    senha:senha
}
console.log('AQUIIII');
axios.post('http://10.0.2.2:5000/login',obj).then(res => {
  console.log('DEU CERTO!');
  navigation.navigate('Home-listas')
}).catch(error=>{
  console.error('DEU ERRADO =( ', error.response) 
})
}

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return(
    <>
    <StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
    <ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
  <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    style={{ flex: 0.2, alignItems:'center'}} >
      <Text style={styles.texto_login}>Login</Text>      
      <KeyboardAvoidingView>          
          <TextInput
                  style={styles.input_email}
                  placeholder="Email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  value={email}
                  autoCompleteType="email"
                  autoCorrect={false}
                  onChangeText={(e) => {setEmail(e)}}
          />
          <TextInput
                  style={styles.input_senha}
                  placeholder="Senha"
                  //keyboardType="visible-password"
                  textContentType="password"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  autoCorrect={false}
                  value={senha}
                  secureTextEntry={true}
                  onChangeText={(e) => {setSenha(e)}}
          />
          <View style={styles.container}>
          <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: 'white', false: 'white' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.texto_checkbox}>Manter-se conectado</Text></View>
          <TouchableOpacity 
              style={styles.botao_cadastrar}
              title="Cadastrar-se"
              onPress={() => loginUsuario()}>
          <Text style={styles.texto_botao_cadastrar}>Logar</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>

  </KeyboardAvoidingView>
</ScrollView>   
</>
)};

Login.navigationOptions = {
  title: 'Home',
}

const styles = StyleSheet.create({
  texto_login:{
    marginTop: 50,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24 
  },

  input_email: { 
    marginTop:100,   
    backgroundColor: '#FFF',
    width: 300,
    marginBottom: 15,
    color: '#222',
    fontSize: 16,
    borderRadius: 20,
    padding: 10
  },

  input_senha: {    
    backgroundColor: '#FFF',
    width: 300,
    marginBottom: 15,
    color: '#222',
    fontSize: 16,
    borderRadius: 20,
    padding: 10
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
    color:"#fff"
  },

  texto_checkbox:{
    color: "#fff"
  },

  botao_cadastrar:{
    marginTop: 50,
    backgroundColor: '#31A8DB',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  texto_botao_cadastrar:{
    color: '#fff',
    fontSize: 16
  }
})

Login.navigationOptions = {
  title: 'About',
}


export default Login;