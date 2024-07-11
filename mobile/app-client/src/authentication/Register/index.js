
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable, TextInput, Image,KeyboardAvoidingView } from 'react-native';
import * as React from 'react';
import { useFonts } from 'expo-font';
import {useState} from 'react';
import Input from '../../components/CustomInputs/index';
import blogFetch from '../../axios/config';
import { FontAwesome } from '@expo/vector-icons';

const KEYBOARD_AVOIDING_BEHAVIOR = Platform.select({
    ios: 'padding',
    android: 'height',
});

export default Register = ({ navigation }) =>{
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmasenha, setConfirmasenha] = useState('');
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../components/fonts/Montserrat-Medium.ttf'),
    })
    if (!fontsLoaded) {
        return undefined;
    }

    const handleRegister = async () => {
 
        try {
            if(senha  != confirmasenha){
                alert("Senhas diferentes")
            }else{
                const response = await blogFetch.post('/adicionarUsuario', {
                    nome: nome, email: email, senha: senha
                });
    
                const data = response.data;
                alert(data.message);
                 navigation.navigate('Login');
            }      
        } catch (error) {
            console.log(error)
        }
    };
    const backLogin = async () => {
        navigation.navigate('Login')
    };
    return (
        <View style={styles.container}>
         
           <View style={styles.backTitle} >
           <FontAwesome 
                name="angle-left" 
                size={50} 
                color={'#4A4444'} 
                style={styles.icon} 
            />
            <Text style={styles.backTitleText} onPress={backLogin} >Voltar</Text>
           </View>
            <View style={styles.formsInput}>
                <View style={styles.contentTitle}>
                    <Text style={styles.subTitle}>Prossiga com o seu</Text>
                    <Text style={styles.titleText}>Registro</Text>
                </View>
                <KeyboardAvoidingView   behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={76}>
                <Input placeholder="Nome" iconName="user" iconSize={24} onChangeText={(text) => setNome(text)}/>
                <Input placeholder="Email" iconName="envelope" iconSize={23} onChangeText={(text) => setEmail(text)} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24} onChangeText={(text) => setSenha(text)} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24} onChangeText={(text) => setConfirmasenha(text)}/>
                <Pressable style={styles.buttonLogin} onPress={handleRegister}>
                    <Text style={styles.formsButtonText}>CADASTRAR</Text>
                </Pressable>
                </KeyboardAvoidingView>
                
            

            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        AlignContent:'center',
    },
    backTitle:{
        width:100,
        position:'absolute',
        top:90,
        left:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },  
    backTitleText:{
        paddingLeft:10,
        fontFamily:"Montserrat-Medium",
        color:'#4A4444',
        fontSize:24
    },  
    contentTitle: {
        right: 0,
        bottom: 150,
    },
    subTitle: {
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        color: '#4A4444'
    },
    titleText: {
        fontFamily: "Montserrat-Bold",
        color: '#48BBC6',
        fontSize: 50,
    },
    formsInput:{
        position:'absolute',
        bottom:140
    },

    buttonLogin: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 350,
        height: 50,
        margin: 10,
        backgroundColor: '#6CA8DA',
        alignItems: 'center',
        justifyContent: 'center',

    },
    formsButtonText: {
        color: '#fff',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 30,
    },

})