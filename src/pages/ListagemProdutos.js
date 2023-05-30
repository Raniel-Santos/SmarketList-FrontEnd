import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, StatusBar  } from 'react-native';
import { StyleSheet } from 'react-native';

const ListagemProdutos = ({ navigation }) =>{
<ScrollView style = {{flex:1, backgroundColor: '#31DB9E'}}>
<StatusBar backgroundColor= '31DB9E' barStyle={'dark-content'}></StatusBar>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    style={{ flex: 0.2, alignItems:'center'}} >
    
    <Text style = {styles.texto_nova_categoria}>Selecione uma categoria</Text>
    </KeyboardAvoidingView>
    </ScrollView>
}

export default ListagemProdutos;