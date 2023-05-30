import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BemVindo from '../pages/BemVindo';
import Login from '../pages/Login';
import Cadastrar from '../pages/Cadastrar';
import HomeListas from '../pages/HomeListas';
import CriarLista from '../pages/CriarLista';
import CriarCategoria from '../pages/CriarCategoria';
import AdicionarProdutos from '../pages/AdicionarProdutos';


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
                    <Stack.Screen name = "Criar-categoria" component={CriarCategoria}/>
                    <Stack.Screen name = "Adicionar-produto" component={AdicionarProdutos}/>
                </Stack.Navigator>
            </NavigationContainer> 
    )
}