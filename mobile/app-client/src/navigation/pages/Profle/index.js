import * as React from 'react';
import {View ,Modal, Text, StyleSheet,Pressable, TextInput,TouchableOpacity} from 'react-native';
import Input from '../../../components/CustomInputs';
import InputModal from '../../../components/CustomInputs/inputModal';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import blogFetch from '../../../axios/config';



 const ProfileScreen = ({navigation}) => {
   
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [modalActive,setModalActive] = useState(false)

    const getUsuario = async () => {
        const id = await AsyncStorage.getItem('@usuario');
        try {
            const response = await blogFetch.get(`/selecionarUsuario/${id}`);
            const data = response.data;

            setNome(data.selecionarUsuario.nomeUsuario);
            setEmail(data.selecionarUsuario.emailUsuario);
        } catch (error) {
            console.log(error);
        }
    }
//
   const handleLogout = async () => {
       try {
         await AsyncStorage.removeItem('@usuario')
         navigation.navigate('Login')
        // navigation.navigate('App', { screen: 'Login' });
       } catch(e) {
         alert('Não foi possivel fazer o logout')
       }
     
       console.log('Done.')
     } 

  const updateUser = async () => {
         const id = await AsyncStorage.getItem('@usuario');
         try {
             const response = await blogFetch.put(`/atualizarUsuario/${id}`,{nome,email,senha});
             const data = response.data;
             alert('Atualizado com sucesso');
             setSenha('');
         } catch (error) {
             console.log(error);
         }
     }

     const deleteUser = async () => {
        const id = await AsyncStorage.getItem('@usuario');
        try {
            const response = await blogFetch.delete(`/deletarUsuario/${id}`);
            alert('Usuario deletado com sucesso');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsuario();
    }, []);

    return(
        <View style={{flex:1, justifyContent:'center',alignItems: 'center' }}>
           {/* <Text onPress={() => navigation.navigate('Home')}
            style={{fontSize:26,fontWeight:'bold'}}>Pagina de perfil</Text> */}
            <Modal 
                animationType="fade"
                transparent={true}
                visible={modalActive}
                onRequest={() => setModalActive(false)}>
                <View style={styles.outerView}>
                    <View style={styles.modalView}>
                        <Pressable style={styles.buttonCloseModal} onPress={() => setModalActive(false)}>
                        <FontAwesome 
                            name="close" 
                            size={15} 
                            color={'white'} 
                        />
                        </Pressable>
                        <View >
                            <Text style={styles.modalTitle}>Alterar dados</Text>
                            <View style={styles.modalInputs}>  
                                <InputModal value={nome} onChangeText={(text) => setNome(text)} placeholder="Nome" iconName="user" iconSize={24}   />
                                <InputModal value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" iconName="envelope" iconSize={23} />
                                <InputModal value={senha} onChangeText={(text) => setSenha(text)} secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24}  />
                                <Pressable style={styles.buttonChangeData} onPress={updateUser} >
                                    <Text style={styles.formsButtonText}>ALTERAR</Text>
                                 </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>




            <View style={styles.backTitle} >
                <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                    <FontAwesome 
                        name="angle-left" 
                        size={15} 
                        color={'white'} 
                    />
                </TouchableOpacity>
            <Text style={styles.backTitleText}  >Sair</Text>
           </View>
           <View style={styles.formsInput}>
                <View style={styles.contentTitle}>
                    <Text style={styles.titleText}>DADOS PESSOAIS</Text>
                </View>
                <Input value={nome} placeholder="Nome" iconName="user" iconSize={24} />
                <Input value={email} placeholder="Email" iconName="envelope" iconSize={23} />
                <Input value={senha} secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24}  />
                <View style={styles.buttonsContet}>
                    <Pressable style={styles.buttonChangeData} onPress={() => setModalActive(true)} >
                        <Text style={styles.formsButtonText} >ALTERAR DADOS</Text>
                    </Pressable>
                    <Pressable style={styles.buttonDeleteAccount} >
                        <Text style={styles.formsButtonText}  onPress={deleteUser}>DELETAR CONTA</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    outerView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)'
    },  
    modalView:{
        backgroundColor:'white',
        width:350,
        height:600,
        padding:30,
        borderRadius:20
    },
    buttonCloseModal:{
        backgroundColor:'#4A4444',
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30,
        borderRadius:50
    },  
    modalTitle:{
    
        fontFamily: "Montserrat-Bold",
        color: '#4A4444',
        fontSize:20,
        top:20,
        right:100
    },
    modalInputs:{
        position:'absolute',
        top:100
    },



    buttonLogout:{
        backgroundColor:'#4A4444',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        borderRadius:50
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
        left: 20,
        bottom: 50,
    },
 
    titleText: {
        fontFamily: "Montserrat-Bold",
        color: '#4A4444',
        fontSize: 30,
    },
    formsInput:{
        position:'absolute',
        alignContent:'center',
        justifyContent:'center',
        top:250
    },
    buttonsContent:{
        flex:1,
    
    },
    buttonChangeData: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 150,
        height: 50,
        margin: 10,
        backgroundColor: '#FFB800',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonDeleteAccount: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 150,
        height: 50,
        margin: 10,
        backgroundColor: '#FF4545',
        alignItems: 'center',
        justifyContent: 'center',

    },
    formsButtonText: {
        color: '#fff',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 15,
    },

})

export default ProfileScreen;