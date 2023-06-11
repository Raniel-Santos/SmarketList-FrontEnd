import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import Cadastrar from '../pages/Cadastrar';
import HomeListas from '../pages/HomeListas';
import CriarLista from '../pages/CriarLista';
import CriarProduto from '../pages/CriarProduto';
import AdicionarProdutos from '../pages/AdicionarProdutos';
import VisualizarLista from '../pages/VisualizarLista';
import ListagemProdutos from '../pages/ListagemProdutos';
import Produto from '../pages/Produto';


export default function Routes(){
    const Stack = createNativeStackNavigator();
    return(     
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Bem-vindo" screenOptions={{headerShown:false}}>
                    <Stack.Screen name = "Bem-vindo" component= {BemVindo}/>
                    <Stack.Screen name = "Login" component= {Login}/>
                    <Stack.Screen name = "Cadastrar-se" component={Cadastrar}/>
                    <Stack.Screen name = "Home-listas" component={HomeListas}/>
                    <Stack.Screen name = "Criar-lista" component={CriarLista}/>
                    <Stack.Screen name = "Visualizar-lista" component={VisualizarLista}/>
                    <Stack.Screen name = "Criar-produto" component={CriarProduto}/>
                    <Stack.Screen name = "Adicionar-produto" component={AdicionarProdutos}/>
                    <Stack.Screen name = "Listagem-produto" component={ListagemProdutos}/>
                    <Stack.Screen name = "Produto" component={Produto}/>

                </Stack.Navigator>
            </NavigationContainer> 
    )
}