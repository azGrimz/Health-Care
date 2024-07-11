import * as React from 'react';
import MainContainer from './src/navigation';
import Login from './src/authentication/Login/index';
import Register from './src/authentication/Register/index';
import Chat from './src/navigation/pages/Chat/index'
import HomeScreen from './src/navigation/pages/Home/index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/navigation/pages/Profle';
import HealthScreen from './src/navigation/pages/Health';
const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HealthScreen" component={HealthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;