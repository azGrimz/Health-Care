import * as React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TouchableOpacity, TextInput, Platform, FlatList, Image, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSearch from '../../../components/CustomInputs/inputSearch';
import { FontAwesome } from '@expo/vector-icons';
import blogFetch from '../../../axios/config';
import Login from '../../../authentication/Login/index'
import { Rating, AirbnbRating } from 'react-native-ratings';
const transparent = 'rgba(0,0,0,0.5)'
export default HomeScreen = ({ navigation }) => {



    const [empresas, setEmpresas] = useState([]);

    const [selectedCompanyId, setSelectedCompanyId] = useState(null);


    const imagem = 'https://cdn-icons-png.flaticon.com/512/61/61444.png';



    const listarEmpresas = async () => {
        const response = await blogFetch.get('/listarEmpresasAbertas');
        const data = response.data;
        setEmpresas(data.listarEmpresasAbertas);
    }

    useEffect(() => {
        listarEmpresas();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    function RenderModal({ id }) {

        const [nomeEmpresa, setNomeEmpresa] = useState('');
        const [endereco, setEndereco] = useState('');
        const [rating,setRating] = useState()
        const [bairro, setBairro] = useState('');
        const [especialidades, setEspecialidades] = useState([])

        useEffect(() => {
            if (openModal === true && selectedCompanyId === id) {
                const selecionarEmpresa = async (id) => {
                    const response = await blogFetch.get(`/selecionarEmpresa/${id}`);
                    const data = response.data;
                    setNomeEmpresa(data.selecionarEmpresa.nomeEmpresa);
                    setEndereco(data.selecionarEmpresa.enderecoEmpresa);
                    setBairro(data.selecionarEmpresa.bairroEmpresa);
                    setRating(data.mediaSituacaoFila)
                };

                const listarProfissionais = async (id) => {
                    const response = await blogFetch.get(`/listarProfissionais/${id}`);
                    const data = response.data;
                    setEspecialidades(data.listarProfissionaisDisponiveis);
                }

                selecionarEmpresa(selectedCompanyId);
                listarProfissionais(selectedCompanyId);
            }

            
        }, [])



        if (openModal === true) {


            const handleChat = async () => {
                navigation.navigate('Chat', { idEmpresa: selectedCompanyId, nomeEmpresa });
            };

            const renderQuantidade = ({ item }) => (
                <Text>{item.quantidadeEspecialidade}</Text>
            );

            const renderNome = ({ item }) => (
                <Text>{item.Especialidade.nomeEspecialidade}</Text>
            );

            return (
                <Modal visible={true} animationType="slide" transparent={true}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: transparent,
                        }}>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                width: '90%',
                                height: 500,
                                borderRadius: 10,
                            }}>
                            <TouchableOpacity onPress={() => {
                                setOpenModal(false)
                                setSelectedCompanyId(null);
                            }}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 20
                                }}>
                                <FontAwesome
                                    name="close"
                                    size={25}
                                    color={'#4A4444'}
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: '97%',
                                    height: 200,
                                    flexDirection: "row",
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    top: 40
                                }}>
                                <View style={{
                                    width: 60,
                                    height: 40,
                                    borderColor: '#6CA8DA',
                                    borderWidth: 2,
                                    left: 10,
                                    top: 10,
                                    borderRadius: 10,
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <FontAwesome
                                        name="ambulance"
                                        size={30}
                                        color={'#4A4444'}
                                    />

                                </View>
                                <View style={styles.contentText}>
                                    <Text>{nomeEmpresa}</Text>
                                </View>
                                <View style={{
                                    width: '100%',
                                    height: 50,
                                    bottom: 70,
                                    position: 'absolute',
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderColor: '#6CA8DA'
                                }}>
                                    <Text
                                        style={{
                                            color: '#4A4444',
                                            fontFamily: "Montserrat-Medium",
                                            fontSize: 15,
                                        }}>
                                        Endereço

                                    </Text>
                                    <Text
                                        style={{
                                            color: '#4A4444',
                                            fontFamily: "Montserrat-Medium",
                                            fontSize: 11,
                                        }}>
                                        {endereco} - {bairro}, Praia Grande
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        width: '100%',
                                        height: 50,

                                        flexDirection: 'row'
                                    }}>
                                    <View
                                        style={{
                                            width: 60,
                                            height: 40,

                                            left: 6,
                                            top: 5,
                                            borderRadius: 10,
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <TouchableOpacity onPress={handleChat} >
                                            <FontAwesome
                                                name="wechat"
                                                size={30}
                                                color={'#4A4444'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: 5,
                                            width: 160,
                                            height: 50,

                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                           
                                        }}>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#4A4444',

                                                }}>
                                                Lotação:
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                            }}>
                                              <AirbnbRating
                         
                        
                         count={5}
                         defaultRating={rating}
                         selectedColor="#27a1f5"
                         unSelectedColor="lightgray"
                         reviewColor='#27a1f5'
                         size={15}
                         reviewSize={0}
                         showRating={true}
                         // isDisabled
                         // starContainerStyle={{ backgroundColor:"red" }}
                         ratingContainerStyle={{ marginBottom:20 }}
                         starImage={require('../../../../assets/user.png')}
                     />
                                        </View>

                                    </View>
                                </View>
                            </View>
                            <View
                                style={{

                                    top: 50,
                                    widht: 50,
                                    height: 225,
                                    flexDirection: 'row',

                                }}>
                                <View
                                    style={{
                                        width: '50%',
                                        height: '100%',
                                        flexDirection: 'column'

                                    }}>
                                    <View style={{
                                        height: '100%',
                                        widht: '100',

                                    }}>
                                        <Text
                                            style={{
                                                color: '#4A4444',
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: 10,
                                                top: 10,
                                                left: 30
                                            }}>
                                            ESPECIALIDADE
                                        </Text>

                                        <View
                                            style={{
                                                width: '100%',
                                                height: '300',
                                                top: 20,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <FlatList
                                                data={especialidades}
                                                renderItem={renderNome}
                                                keyExtractor={(item, index) => index.toString()} // ou outra lógica para gerar chaves únicas
                                            />
                                        </View>


                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '50%',
                                        height: '100%',
                                    }}>
                                    <View>
                                        <Text
                                            style={{
                                                color: '#4A4444',
                                                fontFamily: "Montserrat-Medium",
                                                fontSize: 10,
                                                top: 10,
                                                left: 40
                                            }}>
                                            Quantidade
                                        </Text>

                                        <View
                                            style={{
                                                width: '100%',
                                                height: '300',
                                                top: 20,
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <FlatList
                                                data={especialidades}
                                                renderItem={renderQuantidade}
                                                keyExtractor={(item, index) => index.toString()} // ou outra lógica para gerar chaves únicas
                                            />
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        listarEmpresas();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(233, 233, 233)', alignItems: 'center' }}>
            {/* <Text onPress={() => alert('Esta é a "Pagina" inicial')}
            style={{fontSize:26,fontWeight:'bold'}}>Tela de inicio</Text> */}
            <View style={styles.searchBox}>
                <TextInput
                    placeholder='Pesquisar'
                    placeholderTextColor='#000'
                    autoCapitalize='none'
                    onChangeText={(text) => searchUser(text)}
                    style={{ flex: 1, padding: 0 }}
                />
                <FontAwesome
                    name="search"
                    size={15}
                    color={'#000'}
                />
            </View>

            <View style={styles.content}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {empresas.map((empresa) => (
                        <View style={styles.componentModal}>
                            <View style={styles.contentModalInt}>
                                <View style={styles.hIcon}>
                                    <FontAwesome
                                        name="ambulance"
                                        size={30}
                                        color={'#4A4444'}
                                    />
                                </View>
                                <View style={styles.contentText}>
                                    <Text>{empresa.nomeEmpresa}</Text>
                                </View>
                                <View style={styles.button}>
                                    <Pressable onPress={() => {
                                        setSelectedCompanyId(empresa.idEmpresa)
                                        setOpenModal(true);
                                    }}>
                                        <FontAwesome
                                            name="angle-down"
                                            size={35}
                                            color={'black'}
                                        />
                                    </Pressable>
                                    {selectedCompanyId === empresa.idEmpresa && <RenderModal id={empresa.idEmpresa} />}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>

            <View>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS == 'ios' ? 40 : 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { widht: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    content: {
        position: 'absolute',
        widht: 500,
        height: 600,
        marginTop: Platform.OS == 'ios' ? 70 : 150,
        top: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    componentModal: {
        width: 380,
        height: 100,
        padding: 20,

        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentModalInt: {
        width: 350,
        height: 60,

        flexDirection: "row",
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    hIcon: {
        width: 60,
        height: 40,
        borderColor: '#6CA8DA',
        borderWidth: 2,
        left: 10,
        top: 10,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentText: {
        width: 200,
        height: 40,
        left: 20,
        top: 7,
        fontFamily: "Montserrat-Bold",
        color: '#4A4444',
        fontSize: 40,
        paddingTop: 5,

    },
    button: {
        width: 50,
        height: 30,
        top: 13,
        left: 50
    },
    hLine: {

    },
    atualizar: {
        width: 200,
        alignSelf: 'center',
        marginTop: 100
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50
    }
})

