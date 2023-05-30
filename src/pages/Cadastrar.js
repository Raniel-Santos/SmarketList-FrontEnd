import React, { useState } from 'react';
import { View, Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView,StatusBar  } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { withFormik } from 'formik';
import Yup from 'yup';

const Cadastrar = ({ navigation }) =>{

const [nomeUsuario,setNomeUsuario] = useState('');
const [email,setEmail] = useState('');
const [senha,setSenha] = useState('')

// const setToast = (msg) => {
//   ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
// }


const cadastroUsuario = () =>{
  const obj ={
    nome:nomeUsuario,
    email:email,
    senha:senha
}
console.log('AQUIIII');
axios.post('http://10.0.2.2:5000/usuario/cadastrar',obj).then(res => {

  Toast.show({
    type: 'success',
    text1: 'Usuario Cadastrado com Sucesso !',
});
  navigation.navigate('Login')
}).catch(error=>{
  Toast.show({
    type: 'error',
    text1: 'Ops! Algum problema ocorreu!',
});
})
}

return(
<ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
<StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
  <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    style={{ flex: 0.2, alignItems:'center'}} >
      <Text style={styles.texto_novo_usuario}>Novo Usuário</Text>
      <Image 
        style={styles.imagem_upload}
        source={require('../assets/add_foto.png')}
      />
      <KeyboardAvoidingView>
          <TextInput
                  style={styles.input_nome}
                  placeholder="Nome Usuário"
                  value={nomeUsuario}
                  keyboardType="email-address"
                  textContentType=""
                  autoCapitalize="none"
                  autoCompleteType="none"
                  autoCorrect={false}
                  onChangeText={(e) => {setNomeUsuario(e)}}
          />
          <TextInput
                  style={styles.input_email}
                  placeholder="Email"
                  value={email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  onChangeText={(e) => {setEmail(e)}}
          />
          <TextInput
                  style={styles.input_senha}
                  placeholder="Senha"
                  value={senha}
                  textContentType="password"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={(e) => {setSenha(e)}}

          />
          <TouchableOpacity 
              style={styles.botao_cadastrar}
              title="Cadastrar-se"
              onPress={()=> cadastroUsuario() }>
          <Text style={styles.texto_botao_cadastrar}>Cadastre-se</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>

  </KeyboardAvoidingView>
</ScrollView>   
  
);

}
Cadastrar.navigationOptions = {
  title: 'Home',
}

const styles = StyleSheet.create({
  texto_novo_usuario:{
    marginTop: 50,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24 
  },

  input_nome: {
    marginTop:50,
    backgroundColor: '#FFF',
    width: 300,
    marginBottom: 15,
    color: '#222',
    fontSize: 16,
    borderRadius: 20,
    padding: 10
  },

  input_email: {    
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

  imagem_upload:{
    marginTop: 30,
    marginLeft: 90,
    width: 150, 
    height: 150,
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

export default Cadastrar;