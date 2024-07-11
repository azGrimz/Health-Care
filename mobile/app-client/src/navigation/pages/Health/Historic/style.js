import { StyleSheet, Platform } from "react-native";


const styles = StyleSheet.create({
    descriptionContent: {
        flex: 0.1,
        marginTop: Platform.OS == 'ios' ? 40 : 30,
        marginLeft: 5,
    },
    seacthContent: {
        flex: 1,
    },
    searchBox: {
        marginTop: Platform.OS == 'ios' ? 50 : 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { widht: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    actionsContent: {
        widht: '100%',
        flexDirection: "row",
        marginTop: 15,
        marginLeft: 5
    },

    orderName: {
        width: '50%',

        justifyContent: 'center'

    },
    qrCode: {
        width: '50%',

        alignItems: 'flex-end',
        padding: 1
    },
    code: {
         width: 40,
         height: 30, 
         borderRadius: 5, 
         right: 5, 
         display:'flex',
         flexDirection: 'row', 
         backgroundColor: '#6CA8DA', 
         alignItems: 'center',
        justifyContent:'center'
    },
    cardsContent:{
        flex:1,
        marginTop:5,
        flexDirection:'column',
        flexWrap: 'wrap',
        
    },
    card:{
        width: Platform.OS == 'ios' ? "90%" : "90%",
        height:100,
        marginTop:Platform.OS == 'ios' ? 25 : 20,
        marginLeft:Platform.OS == 'ios' ? 20 : 13,
        borderRadius:10,
        backgroundColor:'#fff',
        padding:5,
        shadowColor: '#000', 
        shawdowOffset: {
            width: 0,
            heigth: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.80,
        elevation:5
    },
    descriptionTop:{
        widht:'100%',
        height:35,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    descriptionBottom:{
        marginTop:Platform.OS == 'ios' ? 10 : 5,
        marginLeft:5,
        widht:'100%',
        height:35,
        padding:1,
        flexDirection:'column',
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
})

export default styles;