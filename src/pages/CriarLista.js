import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, StatusBar  } from 'react-native';
import { StyleSheet } from 'react-native';

const CriarLista = ({ navigation }) => (
<ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
<StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{ flex: 0.2, alignItems:'center'}} >
        <Text style={styles.texto_nova_lista}>Nova Lista</Text>     
            <TextInput
                    style={styles.input_nome}
                    placeholder="Nome Lista"
                    keyboardType=""
                    textContentType=""
                    autoCapitalize="none"
                    autoCompleteType="none"
                    autoCorrect={false}
                    onChangeText={() => {}}
            />
            <TouchableOpacity 
                style={styles.botao_criar}
                title="criar"
                onPress={() => navigation.navigate('Home-listas') }>
            <Text style={styles.texto_botao_criar}>Criar</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
</ScrollView>    
);

CriarLista.navigationOptions = {
    title: 'Home',
}

const styles = StyleSheet.create({
    texto_nova_lista:{
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

    botao_criar:{
        marginTop: 50,
        backgroundColor: '#31A8DB',
        width: 300,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    texto_botao_criar:{
        color: '#fff',
        fontSize: 16
    }
})

export default CriarLista;