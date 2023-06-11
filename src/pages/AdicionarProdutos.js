import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView,StatusBar} from 'react-native';

const AdicionarProdutos = ({navigation}) => {
    return(
        <>
        <StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
        <ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
            <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                    style={{ flex: 0.2, alignItems:'center'}} >
                    <Text style={styles.texto_listas}>Produtos</Text>
                    <Image 
                        style={styles.imagem_home}
                        source={require('../assets/carrinho-de-compras.png')}
                    />
                   
                    <TouchableOpacity
                        style={styles.botao_add_produtos}
                        title="Login"
                        onPress={() => navigation.navigate('Criar-produto')}>
                    <Text style={styles.texto_botao_novo_produto}>Cadastrar Novo</Text>
                </TouchableOpacity>              

                </KeyboardAvoidingView>        
        </ScrollView>
        </>
    )
}
AdicionarProdutos.navigationOptions ={
    title: ''
}


const styles = StyleSheet.create({
    texto_listas:{
        marginTop: 50,
        textAlign: 'center',
        color: '#fff',
        fontSize: 24 
    },

    imagem_home:{
        marginLeft: 50,
        marginTop: 80,
        width: 200, 
        height: 200,
    },

    botao_selecionar_produto: {
        marginTop: 120,
        backgroundColor: '#fff',
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    botao_add_produtos: {
        marginTop: 200,
        backgroundColor: '#31A8DB',
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    texto_botao_selecionar_produto:{
        color: '#31DB9E',
        fontSize: 16
    },
    texto_botao_novo_produto:{
        color: '#fff',
        fontSize: 16
    },      

})

export default AdicionarProdutos;