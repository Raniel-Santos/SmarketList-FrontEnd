import React from 'react';
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {SectionList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useState, useEffect} from 'react';
import {
  getStorageItem,
  storageItem,
} from '../functions/encryptedStorageFunctions';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const VisualizarLista = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [produtos, setProdutos] = useState([]);

  const toggleSelection = index => {
    const updatedProdutos = [...produtos];
    updatedProdutos[index].checked = !updatedProdutos[index].checked;
    setProdutos(updatedProdutos);
    atualizarChecked(updatedProdutos[index]);
  };

  const getProdutos = async () => {
    const token = await getStorageItem('token');
    const id = await getStorageItem('lista');

    axios
      .get(`http://10.0.2.2:5000/lista/buscar/${id}`, {
        headers: {Authorization: token},
      })
      .then(res => {
        const updatedProdutos = res.data.produtos.map(produto => ({
          ...produto,
          selecionado: false,
        }));
        setProdutos(updatedProdutos);
      })
      .catch(error => {});
  };

  const finalizarLista = async () => {
    const id = await getStorageItem('lista');
    const selecionados = produtos.filter(p => p.checked);
    if (!produtos.length) {
      Toast.show({
        type: 'error',
        text1: 'A lista Esta Vazia',
      });
    } else {
      if (selecionados.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Para Finalizar selecione todos items !',
        });
      } else {
        axios
          .put(`http://10.0.2.2:5000/lista/finalizar/${id}`)
          .then(res => {
            Toast.show({
              type: 'success',
              text1: 'Finalizada a lista com Sucesso !',
            });
            navigation.navigate('Home-listas');
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  };
  const deletarLista = async () => {
    const id = await getStorageItem('lista');
    axios.delete(`http://10.0.2.2:5000/lista/excluir/${id}`)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Deletada a lista com Sucesso !',
        });
        navigation.navigate('Home-listas');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const atualizarChecked = produto => {
    console.log(produto);
    axios
      .put(`http://10.0.2.2:5000/produto/atualizar-status/${produto._id}`)
      .then(res => {
        console.log('deu certo');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#31DB9E'}}>
      <StatusBar backgroundColor="#31DB9E" barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 0.2, alignItems: 'center'}}>
        <Text style={styles.texto_nova_lista}>Minha Lista</Text>
        <View style={styles.container}>
          {produtos.map((p, index) => (
            <View style={styles.item}>
              <Text>{p.nome}</Text>
              <CheckBox
                style={styles.checkbox}
                tintColors={{true: '#31DB9E', false: '#31DB9E'}}
                disabled={false}
                value={p.checked}
                onValueChange={() => toggleSelection(index)}
              />
            </View>
          ))}

          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.botao_novalista}
              title="Login"
              onPress={() => navigation.navigate('Listagem-produto')}>
              <Text style={styles.texto_botao}>Adicionar Produtos</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.botao_novalista}
              title="Login"
              onPress={() => finalizarLista()}>
              <Text style={styles.texto_botao}>Finalizar Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao_add_produtos}
              title="Login"
              onPress={() => deletarLista()}>
              <Text style={styles.texto_botao}>Excluir Lista </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

VisualizarLista.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  texto_nova_lista: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#31DB9E',
  },
  checkbox: {
    color: 'black',
  },
  botao_novalista: {
    marginTop: 10,
    backgroundColor: '#31A8DB',
    width: 200,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  botao_add_produtos: {
    marginTop: 10,
    backgroundColor: '#FF0505',
    width: 200,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  texto_botao: {
    color: '#fff',
  },
});

export default VisualizarLista;
