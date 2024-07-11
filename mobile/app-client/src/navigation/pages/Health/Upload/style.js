import { StyleSheet,Platform } from "react-native"

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F1F5F8',
        padding:20
    },
    topContent:{
        flex: 0.1,
        marginTop: Platform.OS == 'ios' ? 50 : 40,
        marginLeft: 5,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS == 'ios' ? 50 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:  Platform.OS == 'ios' ? '90%' : '100%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { widht: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
      contentBottom:{
        flex:0.5,
        marginTop: Platform.OS == 'ios' ? 50 : 50,
        marginLeft:Platform.OS == 'ios' ? 20 : 13,
        display:'flex',
        flexDirection:"column",
 
        
      },
      selectButton:{
        width:'90%',
        height:40,
        position:'absolute',
        display:'flex',
        flexDirection: 'row', 
        backgroundColor: '#6CA8DA', 
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:Platform.OS == 'ios' ? 20 : 13,
        marginTop: Platform.OS == 'ios' ? 20 : 30,
      },
      uploadButton:{
        width:'90%',
        height:40,
       
        display:'flex',
        flexDirection: 'row', 
        backgroundColor: '#6CA8DA', 
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:Platform.OS == 'ios' ? 20 : 13,
        marginTop: Platform.OS == 'ios' ? 80: 80,
      },
      viewFiles:{
        width:300,
        height:200,
        marginLeft:Platform.OS == 'ios' ? 40 : 25,
        marginTop: Platform.OS == 'ios' ? 10: 30,
  
      }
})