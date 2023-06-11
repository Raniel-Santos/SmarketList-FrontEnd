import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  clearStorageItem,
  getStorageItem,
  storageItem,
} from '../functions/encryptedStorageFunctions';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';

const HomeListas = ({navigation}) => {
  const [listas, setListas] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('todos');

  const deslogar = async () => {
    const token = await getStorageItem('token');
    if (token) {
      console.log('deslogar');
      await clearStorageItem('token');
      await clearStorageItem('acesso');
      await clearStorageItem('lista');
    }
    navigation.navigate('Login');
  };

  const getLista = async () => {
    const token = await getStorageItem('token');

    axios
      .get(`http://10.0.2.2:5000/usuario/buscar-lista`, {
        headers: {Authorization: token},
      })
      .then(res => {
        let dados = res.data;
        if (selectedLanguage != 'todos') {
          dados = dados.filter(lista => lista.status === selectedLanguage);
        }

        setListas(dados);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const selecionarLista = async id => {
    await storageItem('lista', id);
    navigation.navigate('Visualizar-lista');
  };

  useEffect(() => {
    getLista();
  }, [selectedLanguage]);

  useFocusEffect(
    React.useCallback(() => {
      getLista();
    }, []),
  );

  return (
    <>
      <StatusBar backgroundColor="#31DB9E" barStyle={'dark-content'} />
      <ScrollView style={{flex: 1, backgroundColor: '#31DB9E'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={{flex: 0.2, alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.botao_cadastrar}
              title="Cadastrar-se"
              onPress={() => deslogar()}>
              <Text style={styles.texto_botao_cadastrar}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.texto_listas}>Minhas Listas</Text>

          <Picker
            style={styles.seletor_categoria}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item key={'todos'} label="Todas as Listas" value="todos" />
            <Picker.Item key={'ativa'} label="Listas Ativas" value="ativa" />
            <Picker.Item
              key={'finalizada'}
              label="Listas Finalizadas"
              value="finalizada"
            />
          </Picker>

          {listas.map(lista => (
            <TouchableOpacity
              onPress={() => selecionarLista(lista._id)}
              key={lista._id}>
              <View style={styles.item}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={styles.texto_botao_novoproduto}>
                      {lista.nome}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

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
            <Text style={styles.texto_botao_novoproduto}>Produtos</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

HomeListas.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  texto_botao_cadastrar: {
    paddingTop: 13,
  },
  botao_cadastrar: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: 130,
    height: 45,
    alignItems: 'center',
    borderRadius: 20,
  },
  texto_listas: {
    marginTop: 50,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
  seletor_categoria:{
    backgroundColor: '#FFF',
    marginTop: 30,
    fontSize: 16,
    borderRadius: 20,
    padding: 10
},
  item: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  selectInput: {
    width: '100%',
    padding: 15,
    borderColor: '#E0E0E0',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  botao_novalista: {
    marginTop: 350,
    marginBottom:10,
    backgroundColor: '#31A8DB',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  botao_add_produtos: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  texto_botao_novalista: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeListas;
