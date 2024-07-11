

import { View, StyleSheet, TextInput, Platform, Animated, ScrollView, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
///SCREENS
import HistoricScreen from './Historic'
import UploadScreen from './Upload';
import CustomDrawer from '../../../components/CustomDrawer';
import { useFonts } from 'expo-font';
const Drawer = createDrawerNavigator();




const HealthScreen = ({navigation}) =>{

    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../../components/fonts/Montserrat-Medium.ttf'),
        })
        if (!fontsLoaded) {
            return undefined;
        }

    return(
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor:'#3BA3FA',
            drawerActiveTintColor:'#fff',
            drawerInactiveTintColor:'#4A4444',
            drawerLabelStyle:{
                marginLeft: -15,
                fontFamily:'Montserrat-SemiBold',
                fontSize:15
            }
        }}
        drawerContent={props => <CustomDrawer {...props} />} >
            <Drawer.Screen  name="Histórico" component={HistoricScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="folder-open-outline" size={22} color={color}/>
                )
            }}
            />
            <Drawer.Screen name="Upload" component={UploadScreen}
             options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="cloud-upload-outline" size={22} color={color}/>
                )
            }}
            />
        </Drawer.Navigator>
    )
}


export default HealthScreen;