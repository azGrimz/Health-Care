import * as React from 'react';

import { View,Text,StyleSheet ,TouchableOpacity,Platform, Pressable,TextInput, Image} from 'react-native';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './pages/Home';
import ProfileScreen from './pages/Profle';
import MapsScreen from './pages/Maps';
import HealthScreen from './pages/Health';
//CustomTab
import CustomTabBar from '../components/CustomTabBar';
//Screens names

const homeName = 'Home';
const profileName = 'Configurações';
const mapsName = 'Mapa';
const healthName = 'Saude'
const Tab = createBottomTabNavigator();
 const MainContainer = ({ navigation }) => {

    return (
       
       
        <Tab.Navigator initialRouteName={homeName} screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'rgba(0, 112, 239, 0.8)',
            tabBarStyle: {
                borderTopWidth: 0,
                backgroundColor: "#FFF"
            }
        }



        } tabBar={(props) => <CustomTabBar {...props}  />}>

            <Tab.Screen
                
                name={mapsName} 
                component={MapsScreen}
                options={{
                    tabBarIcon: "location"
                }} 
             />
            <Tab.Screen 
                name={homeName} 
                component={HomeScreen}
                options={{
                    tabBarIcon: "home"
                }}  
            />
              <Tab.Screen 
                name={healthName} 
                component={HealthScreen}
                options={{
                    tabBarIcon: "accessibility"
                }}  
            />
            <Tab.Screen 
                name={profileName} 
                component={ProfileScreen}
                options={{
                    tabBarIcon: "settings"
                }}  
            />
        </Tab.Navigator>
        
 
    
    );
  };




export default MainContainer;