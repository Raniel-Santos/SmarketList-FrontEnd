import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView,StatusBar} from 'react-native';



const HomeListas = ({navigation}) => {
    return(
        <>
        <StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
        <ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                style={{ flex: 0.2, alignItems:'center'}} >
                <Text style={styles.texto_listas}>Minhas Listas</Text>
                <Image 
                    style={styles.imagem_home}
                    source={require('../assets/novalista.png')}
                />
                <TouchableOpacity
                    style={styles.botao_novalista}
                    title="Login"
                    onPress={() => navigation.navigate('Criar-lista')}>
                    <Text style={styles.texto_botao_novalista}>Nova Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao_add_produtos}
                    title="Login"
                    onPress={() => navigation.navigate('Adicionar-produto')}>
                    <Text style={styles.texto_botao_novalista}>Adicionar Produto</Text>
                </TouchableOpacity>              

            </KeyboardAvoidingView>
        </ScrollView>
        </>
    )
    
}

HomeListas.navigationOptions = {
    title: 'Home',
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

    botao_novalista: {
        marginTop: 120,
        backgroundColor: '#fff',
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    botao_add_produtos: {
        marginTop: 20,
        backgroundColor: '#fff',
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    texto_botao_novalista:{
        color: '#31DB9E',
        fontSize: 16
    },      

})

export default HomeListas