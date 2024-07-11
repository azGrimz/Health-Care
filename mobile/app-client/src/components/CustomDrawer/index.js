import React from 'react'

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';




const CustomDrawer = (props) => {
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../fonts/Montserrat-Medium.ttf'),
    })
    if (!fontsLoaded) {
        return undefined;
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} >
                <View style={styles.headerContent}>
                    <View style={styles.userImage}>
                        <Ionicons name='person-circle' size={120} color="#B5B5B5" />
                    </View>
                    <View style={styles.userData}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#0A8' }}>Health</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-SemiBold', marginRight: 15, color: '#0A8FFF' }}>Care</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: 'Montserrat-SemiBold', color: '#4A4444' }}>Pedro Vinicius</Text>
                    </View>
                </View>
                <View style={styles.drawerList}>
                    <DrawerItemList {...props} />
                </View>
                <View style={styles.signOutContent}>
                    <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 3 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="exit-outline" size={22} color='#4A4444' />
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-SemiBold', marginLeft: 15, color: '#4A4444' }}>Sair</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

            <View style={styles.bottomContent}>
                <Text style={{color:'#9C9C9C',fontSize:13}}>Copyright © 2024 - HealthCare</Text>
                <Text style={{color:'#9C9C9C',fontSize:13}}>Todos os direitos reservados</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContent: {
        height: 200,
        padding: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    userImage: {
        height: 120,
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userData: {
        width: '100%',
        height: 50,

    },
    drawerList: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    signOutContent: {
        
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#E6E6E6',
        padding: 25
    },
    bottomContent: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        
        justifyContent:'center',
        alignItems:'center'
    }
})

export default CustomDrawer;