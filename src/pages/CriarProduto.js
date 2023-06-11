import React, { useEffect, useState } from 'react';
import { View, Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView,StatusBar  } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';

const CriarProduto = ({ navigation }) =>{
    const [selectedLanguage, setSelectedLanguage] = useState('default');
    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState('');


    const buscarCategorias = () => {
        axios.get('http://10.0.2.2:5000/categoria/buscar').then(res => {
            setCategorias(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const cadastrarProduto = async () => {
        const obj = {
            categoria:selectedLanguage,
            nome:nome
        }
        axios.post('http://10.0.2.2:5000/produto/cadastrar', obj).then(res => {
            Toast.show({
                type: 'success',
                text1: 'Produto Criado com Sucesso !',          
            })
            navigation.navigate('Adicionar-produto')
        }).catch(error => {
            console.log(error.response)
        })
    }

    useEffect(() => {
        buscarCategorias();
    }, []);

return(
    <>
    <ScrollView style = {{flex:1, backgroundColor: '#31DB9E'}}>
    <StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}></StatusBar>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{ flex: 0.2, alignItems:'center'}} >

            <Text style = {styles.texto_nova_Produto}>Novo Produto</Text>
                <Picker
                    style ={styles.seletor_categoria}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item key={"default"} label="Selecione uma Categoria" value="default" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria._id} label={categoria.nome} value={categoria._id} />
                    ))}

                </Picker>
                <TextInput
                        style={styles.input_nome}
                        placeholder="Nome Produto"
                        keyboardType=""
                        textContentType=""
                        autoCapitalize="none"
                        autoCompleteType="none"
                        autoCorrect={false}
                        onChangeText={(e) => setNome(e)}
                        value={nome}
                />

                <TouchableOpacity 
                    style={styles.botao_criar}
                    title="criar"
                    onPress={cadastrarProduto}>
                <Text style={styles.texto_botao_criar}>Criar</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
    </ScrollView>
    </>
)};

CriarProduto.navigationOptions = {
    title: '',
}

const styles = StyleSheet.create({
    texto_nova_Produto:{
        marginTop: 50,
        textAlign: 'center',
        color: '#fff',
        fontSize: 24 
    },
    seletor_categoria:{
        backgroundColor: '#FFF',
        marginTop: 30,
        fontSize: 16,
        borderRadius: 20,
        padding: 10
    },
    input_nome: {
        marginTop:20,
        backgroundColor: '#FFF',
        width: 300,
        marginBottom: 15,
        color: '#222',
        fontSize: 16,

        padding: 10
    },
    botao_criar:{
        marginTop: 100,
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

export default CriarProduto;