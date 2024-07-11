import * as React from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, Modal,Platform, RefreshControl } from 'react-native';
import styles from './style';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import blogFetch from '../../../../axios/config';
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import QRCode from 'react-native-qrcode-svg';

const AWS_URL = "https://exames-usuarios.s3.sa-east-1.amazonaws.com/"

const HistoricScreen = ({ navigation }) => {
    const [exames, setExames] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalQR, setOpenModalQR] = useState(false);
    const [uRLQr, setuRLQr] = useState('');
    const [selectedExame, setSelectedExame] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../../../components/fonts/Montserrat-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const listarExames = async () => {
        const id = await AsyncStorage.getItem('@usuario');
        const response = await blogFetch.get(`/listarExames/${id}`);
        const data = response.data;

        setExames(data.listarExames);
    };

    useEffect(() => {
        listarExames();
    }, []);

    const abrirDetalhesExame = (exame) => {
        setSelectedExame(exame);
        setOpenModal(true);
    };

    const fecharDetalhesExame = () => {
        setOpenModal(false);
        setSelectedExame(null);
    };

    const abrirQrCode = () => {
        setSelectedExame(exame);
        setOpenModal(true);
    };

    const fecharQrCode = () => {
        setOpenModalQR(false);
    };
    const QrGenerate = async(nomeImagem, nomeExame)=>{
       try{
        setOpenModal(false)
        setOpenModalQR(true)
        const FILE_URL = AWS_URL + nomeImagem;
        setuRLQr(FILE_URL)
       }catch{

       }
    }
    const downloadArquivo = async (nomeImagem, nomeExame) => {
       
        try {
            setIsDownloading(true);
            const type = nomeImagem.slice(nomeImagem.lastIndexOf('.') + 1);
            let fileName = `${nomeExame}.${type}`
            const fileUri = FileSystem.documentDirectory + fileName;

            const downloadResumable = FileSystem.createDownloadResumable(
                AWS_URL + nomeImagem,
                fileUri,
                {},
                onDownloadProgress
            );

            const downloadResponse = await downloadResumable.downloadAsync();

            if (downloadResponse?.uri) {
                await fileSave(downloadResponse.uri, nomeExame);
                setIsDownloading(false);
            }
        } catch (error) {
           console.log("Download", "Não foi possível realizar o download.");
            console.error(error);
        }
    };

    const onDownloadProgress = (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log('Download progress:', progress);
    };

    async function fileSave(uri, filename) {
        console.log(uri);
        if (Platform.OS === "android") {
            const directoryUri = FileSystem.cacheDirectory + filename;
            const base64File = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await FileSystem.writeAsStringAsync(directoryUri, base64File, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await Sharing.shareAsync(directoryUri);
        } else {
            await Sharing.shareAsync(uri);
        }
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        listarExames();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);



    return (
        <View style={{ flex: 1, flexDirection: 'column', padding: 15, backgroundColor: '#F1F5F8' }}>
            <View style={styles.descriptionContent}>
                <Text style={{ fontSize: 35, fontFamily: 'Montserrat-Bold', color: '#4A4444' }}>Sua Saúde</Text>
                <View style={{ height: 50 }}>
                    <Text style={{ fontSize: 14, color: '#A4A4A4' }}>
                        Aqui você pode ver todo o seu histórico médico,
                        que foi compartilhado com você,
                        livrando-se de papéis e organizando melhor sua saúde
                    </Text>
                </View>
            </View>
            <View style={styles.searchContent}>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder='Pesquisar'
                        placeholderTextColor='#000'
                        autoCapitalize='none'
                        style={{ flex: 1, padding: 0 }}
                    />
                    <FontAwesome
                        name="search"
                        size={15}
                        color={'#000'}
                    />
                </View>
            </View>
            <View style={styles.actionsContent}>
                <View style={styles.orderName}>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#4A4444' }}>Exames</Text>
                        <FontAwesome style={{ marginLeft: 10, marginTop: 2 }} name="sort" size={15} color={'#4A4444'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.qrCode}>
                    <TouchableOpacity style={styles.code} onPress={listarExames}>
                        <FontAwesome name="qrcode" size={25} color={'#ffff'} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.cardsContent}>
                    {exames.map((exame) => (
                        <TouchableOpacity key={exame.id} style={{ width: '100%' }} onPress={() => abrirDetalhesExame(exame)}>
                            <View style={styles.card}>
                                <View style={styles.descriptionTop}>
                                    <Ionicons name="clipboard" size={30} color={'#6CA8DA'} />
                                    <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Medium', color: '#A4A4A4', right: 15, top: 5 }}>#{exame.idExame}2024</Text>
                                </View>
                                <View style={styles.descriptionBottom}>
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: '#4A4444' }}>{exame.nomeExame}</Text>
                                    <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 10, color: '#A4A4A4' }}>{exame.dataCriacao}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {openModal && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={openModal}
                    onRequestClose={fecharDetalhesExame}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>Detalhes do Exame</Text>
                            {selectedExame && (
                                <>
                                    <Text>Nome: {selectedExame.nomeExame}</Text>
                                    <Text>Data: {selectedExame.dataCriacao}</Text>
                                    <View style={{width:'100%',flexDirection:'row',display:'flex',flexWrap:'wrap', padding: 5}}>
                                    <TouchableOpacity onPress={() => downloadArquivo(selectedExame.nomeImagem, selectedExame.nomeExame)}
                                        style={{marginRight:15,marginLeft:60}}>
                                        <Text style={{ color: 'blue', marginTop: 20}}>Baixar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => QrGenerate(selectedExame.nomeImagem, selectedExame.nomeExame)}>
                                        <Text style={{ color: 'blue', marginTop: 20 }}>Compartilhar</Text>
                                    </TouchableOpacity>
                                    </View>
                                </>
                            )}
                            <TouchableOpacity onPress={fecharDetalhesExame} >
                                <Text style={{ color: 'blue', marginTop: 20}}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            {openModalQR &&(
                <Modal
                transparent={true}
                animationType="slide"
                visible={openModalQR}
                onRequestClose={fecharQrCode}>
                <View style={styles.modalContainer}>
                   <View style={styles.modalContent}>
                   <QRCode
                    value={uRLQr}
                    />
                    <TouchableOpacity onPress={fecharQrCode} >
                        <Text style={{ color: 'blue', marginTop: 20}}>Fechar</Text>
                    </TouchableOpacity>
                   </View>
                </View>
                </Modal>
            )}
        </View>
    );
};

export default HistoricScreen;
