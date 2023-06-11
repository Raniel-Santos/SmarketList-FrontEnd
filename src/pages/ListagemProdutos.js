import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import { getStorageItem } from '../functions/encryptedStorageFunctions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CheckBox from '@react-native-community/checkbox';

const ListagemProdutos = ({navigation}) => {
  const [categorias, setCategorias] = useState([]);

  const toggleCollapse = index => {
    setCategorias(categorias => {
      const updatedCompra = [...categorias];
      updatedCompra[index].isCollapsed = !updatedCompra[index].isCollapsed;
      return updatedCompra;
    });
  };

  const toggleSelection = (index, indexP) => {
    const updatedCategorias = [...categorias];
    const updatedProdutos = [...categorias[index].produtos];
    updatedProdutos[indexP] = {
      ...updatedProdutos[indexP],
      selecionado: !updatedProdutos[indexP].selecionado,
    };
    updatedCategorias[index] = {
      ...updatedCategorias[index],
      produtos: updatedProdutos,
    };
    setCategorias(updatedCategorias);
  };

  const buscaProdutos = () => {
    axios
      .get('http://10.0.2.2:5000/categoria/buscar')
      .then(res => {
        setCategorias(res.data);
        const categoriasComCollapse = res.data.map(categoria => ({
          ...categoria,
          isCollapsed: true,
          produtos: categoria.produtos.map(produto => ({
            ...produto,
            selecionado: false,
          })),
        }));

        console.log('Objeto:', categoriasComCollapse);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const getProdutosSelecionados = () => {
    const produtosSelecionados = categorias.reduce((acc, categoria) => {
      const selecionados = categoria.produtos.filter(produto => produto.selecionado);
      if (selecionados.length > 0) {
        return [...acc, ...selecionados];
      }
      return acc;
    }, []);
    const ids = produtosSelecionados.map(p => {return p._id})
    return ids
  };

  const adicionarNaLista = async () => {
    const id = await getStorageItem('lista');
    const obj = {
        produtos: getProdutosSelecionados()
    }

    axios.post(`http://10.0.2.2:5000/lista/cadastrar-produto/${id}`, obj).then(res => {
        navigation.navigate("Visualizar-lista")
        Toast.show({
            type: 'success',
            text1: 'Finalizada a lista com Sucesso !',          
        })
    }).catch(error => {
        console.log(error.response)
    })

  }

  useEffect(() => {
    buscaProdutos();
  }, []);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#31DB9E'}}>
      <StatusBar backgroundColor="#31DB9E" barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 0.2, alignItems: 'center'}}>
        <Text style={styles.texto_nova_categoria}>Listagem dos Produtos</Text>
        {categorias.map((categoria, index) => (
          <>
            <TouchableOpacity
              onPress={() => toggleCollapse(index)}
              key={categoria._id}>
              <View style={styles.item} key={categoria.id}>
                <View style={{flex: 1}}>
                  <View style={{flex: 1}}>
                    <Text style={{ fontWeight: "bold",}}>
                      {categoria.nome}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {categoria.isCollapsed &&
              categoria.produtos.map((produto, indexp) => (
                <View key={produto._id} style={{flex: 1,backgroundColor:'white'}}>
                  <View style={styles.item_produto}>
                    <Text>{produto.nome}</Text>
                  <CheckBox
                    style={styles.checkbox}
                    tintColors={{true: '#31DB9E', false: '#31DB9E'}}
                    disabled={false}
                    value={produto.selecionado}
                    onValueChange={() => toggleSelection(index, indexp)}
                  />
            </View>
                </View>
              ))}
          </>
        ))}
        <TouchableOpacity
          style={styles.botao_criar}
          title="criar"
          onPress={adicionarNaLista}>
          <Text style={styles.texto_botao_criar}>Adicionar a Lista</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

ListagemProdutos.navigationOptions = {
  title: '',
};

const styles = StyleSheet.create({
  texto_nova_categoria: {
    marginTop: 30,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  checkbox: {
    color: 'black',
    backgroundColor:'white'
  },
  item: {
    width: 350,
    backgroundColor: '#FFF',
    padding: 15,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20
  },
  item_produto: {
    width: 350,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  botao_criar: {
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 20,
    backgroundColor: '#31A8DB',
    width: 300,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  texto_botao_criar: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListagemProdutos;
