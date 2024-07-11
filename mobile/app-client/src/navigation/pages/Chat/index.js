import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    Modal
} from 'react-native';
import Balloon from './Balloon';
import { FontAwesome } from '@expo/vector-icons';
import blogFetch from '../../../axios/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Rating } from '@kolking/react-native-rating';
import { Rating, AirbnbRating } from 'react-native-ratings';

const KEYBOARD_AVOIDING_BEHAVIOR = Platform.select({
    ios: 'padding',
    android: 'height',
});
export default Chat = ({ navigation, route }) => {

    const { nomeEmpresa, idEmpresa } = route.params;
    const [openModal, setOpenModal] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [conteudo, setConteudo] = useState("");
    const backHome = async () => {
        navigation.navigate('MainContainer');
    };
    const USER_IMAGE = require('../../../../assets/user.png')
    // const renderChat = ({ item }) => (
    //     <Balloon message={item.conteudoComentario} name={item.Usuario.nomeUsuario} date={item.dataPublicacao} />
    // );


    const listarComentarios = async (id) => {
        const response = await blogFetch.get(`/listarComentarios/${id}`);
        const data = response.data;
        setComentarios(data);
    }

    const [rating, setRating] = useState(0);


    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    useEffect(() => {
        listarComentarios(idEmpresa);
    }, []);



    const adicionarComentario = async () => {

        const idUsuario = await AsyncStorage.getItem('@usuario');
        try {
            const response = await blogFetch.post(`realizarComentario?idUsuario=${idUsuario}&idEmpresa=${idEmpresa}`, {
                conteudo: conteudo,
                situacaoFila: rating
            });
            const data = response.data;
            alert(data.message);
            listarComentarios(idEmpresa);
            setConteudo('');

        } catch (error) {
            console.log(error);
        }

    }

    const abrirDetalhesExame = () => {
        setOpenModal(true);
    };

    const fecharDetalhesExame = () => {
        setOpenModal(false);
    };


    return (
        <Fragment>
            <View style={{ width: '100%', height: '13%', backgroundColor: 'white', top: '0%', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ left: 8, top: '7%', width: '23%', height: '50%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={backHome}>
                        <FontAwesome
                            name="angle-left"
                            size={30}
                            color={'black'}
                        />

                    </TouchableOpacity>

                </View>
                <View style={{ left: 63, top: '7%', width: '23%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{

                        }}>{nomeEmpresa}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {comentarios.map((comentario) => (
                    <View>
                        <Balloon message={comentario.conteudoComentario} name={comentario.Usuario.nomeUsuario} date={comentario.dataPublicacao} id={comentario.Usuario.idUsuario} />
                    </View>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={KEYBOARD_AVOIDING_BEHAVIOR}
                keyboardVerticalOffset={76}>
                <SafeAreaView>
                    <View style={styles.messageTextInputContainer}>
                        <TextInput
                            style={styles.messageTextInput}
                            placeholder="Digite sua mensagem..."
                            placeholderTextColor={"white"}
                            multiline
                            value={conteudo} onChangeText={setConteudo}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            disabled={!conteudo}
                            onPress={abrirDetalhesExame}>
                            <Text style={styles.sendButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
            {openModal && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={openModal}
                    onRequestClose={fecharDetalhesExame}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>Avaliação da Fila</Text>
                            <AirbnbRating
                         
                                reviews={[
                                    'Vazio',
                                    'Moderado',
                                    'Moderado',
                                    'Cheio',
                                    'Muito Cheio',
                                ]}
                                count={5}
                                defaultRating={3}
                                selectedColor="#27a1f5"
                                unSelectedColor="lightgray"
                                reviewColor='#27a1f5'
                                size={25}
                                reviewSize={25}
                                showRating={true}
                                // isDisabled
                                // starContainerStyle={{ backgroundColor:"red" }}
                                ratingContainerStyle={{ marginVertical: 20 }}
                                starImage={require('../../../../assets/user.png')}
                                onFinishRating={(rating) => setRating(rating)}
                            />
                            <TouchableOpacity onPress={adicionarComentario}>
                                <Text style={{ color: 'blue', marginTop: 20 }}>Enviar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={fecharDetalhesExame}>
                                <Text style={{ color: 'blue', marginTop: 20 }}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    scrollViewContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        top: 50,
    },
    sendButton: {
        backgroundColor: 'rgba(39, 161, 245, 0.8)',
        color: 'white',
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
    },
    sendButtonText: {
        color: 'white',
    },
    messageTextInputContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderColor: 'transparent',
        borderTopColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 8
    },
    messageTextInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 90,
        paddingHorizontal: 12,
        fontSize: 17,
        paddingTop: 8,
        marginHorizontal: 5,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4A4444',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
    },
});


