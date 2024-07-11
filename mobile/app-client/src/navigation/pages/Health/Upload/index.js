
import { View, StyleSheet, TextInput, Platform, Animated, ScrollView, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { styles } from './style';
import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import blogFetch from '../../../../axios/config';
const UploadScreen = ({ navigation }) => {
    const [image, setImage] = useState()
    const [titulo, setDescricao] = useState('')
    const pickFile = async () => {
        try {
            const docFile = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf'
            })
            if (!docFile.canceled) {
                await setImage(docFile.assets[0].uri)
            }
        } catch (error) {
            console.log("Erro ao pegar arquivo", error)
        }
    }   



    async function uploadFile() {
        try {
    
          const id = await AsyncStorage.getItem('@usuario');
          let localUri = image;
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          const formData = new FormData();
          formData.append('image', { uri: localUri, name: filename, type });
            const response = await blogFetch.post(`/adicionarExame?id=${id}&titulo=${titulo}`, formData, {
                headers:
                {
                    Accept:'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            alert(data.message);
        } catch (error) {
            console.log(error);
        }

    }

    const deleteFile = async () => {
        setImage(null)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContent}>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: '#4A4444', left: 20 }}>Arquivar Exames</Text>
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder='Digite o nome do exame'
                        placeholderTextColor='#000'
                        autoCapitalize='none'
                        style={{ flex: 1, padding: 0 }}
                        value={titulo}
                        onChangeText={(text) => setDescricao(text)} 
                    />
                </View>

            </View>
            <View style={styles.contentBottom}>
                <TouchableOpacity style={styles.selectButton} onPress={pickFile}>
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#fff' }}>Selecione o arquivo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton} onPress={uploadFile}>
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#fff' }}>Fazer Upload</Text>
                </TouchableOpacity>
                <View style={styles.viewFiles}>
                    <TouchableOpacity onPress={deleteFile}>
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


export default UploadScreen;