import React from 'react';
import { View, Button, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, StatusBar  } from 'react-native';
import { StyleSheet } from 'react-native';
import {SectionList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useState, useEffect} from 'react';

const VisualizarLista = ({ navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
return(
    
<ScrollView style={{ flex:1, backgroundColor: '#31DB9E'}}>
<StatusBar backgroundColor= '#31DB9E' barStyle={'dark-content'}/>
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{ flex: 0.2, alignItems:'center'}} >
        <Text style={styles.texto_nova_lista}>Lista de Compras Mensal</Text>          
            <View style={styles.container}>
            <SectionList
                sections={[
                {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
                {title: 'J', data: ['Jackson','James','Jillian','Jimmy','Joel','John','Julie' ]},
                {title: 'E', data: ['Evandro', 'Evanildo', 'Etelvino']},
                {title: 'E', data: ['Evandro', 'Evanildo', 'Etelvino']},
                ]}
                renderItem={({item}) => (

                <View style={styles.item}>               
                <Text >{item}</Text>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#31DB9E', false: '#31DB9E' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
                </View>
                )}
                renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}

                
            />
            <View style={{ flex:1, display:'flex',  alignItems: 'center', justifyContent: 'center',}} >
            <TouchableOpacity
                    style={styles.botao_novalista}
                    title="Login"
                    onPress={() => navigation.navigate('Criar-lista')}>
                    <Text style={styles.texto_botao}>Finalizar Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao_add_produtos}
                    title="Login"
                    onPress={() => navigation.navigate('Adicionar-produto')}>
                    <Text style={styles.texto_botao}>Excluir Lista </Text>
                </TouchableOpacity>    

            </View>              
            </View>
            
          
           
    </KeyboardAvoidingView>
</ScrollView>    
)};

VisualizarLista.navigationOptions = {
    title: 'Home',
}

const styles = StyleSheet.create({
    texto_nova_lista:{
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 24 
    },
    container: {
        width: 350,
        flex: 1,
        paddingTop: 22,
      },
      sectionHeader: {
        color: '#31DB9E',
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
      item: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'100%',
        backgroundColor: '#FFF',
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#31DB9E'
      },
      checkbox: {
        color:"black"
      },
      botao_novalista: {
        marginTop: 30,
        backgroundColor: '#31A8DB',
        width: 200,
        height: 45,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    botao_add_produtos: {
        marginTop: 20,
        backgroundColor: '#FF0505',
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,    
    },
    texto_botao:{
        color: '#fff'
    }
   
})

export default VisualizarLista;