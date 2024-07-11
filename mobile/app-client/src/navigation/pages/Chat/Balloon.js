import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'



const Balloon = ({ message,name,date, id }) => {

  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    // Função assíncrona para recuperar o valor do AsyncStorage
    const getUser = async () => {
      const id = await AsyncStorage.getItem('@usuario');
      setIdUsuario(id)
    }
    getUser();
  }, []); 

  return (
    <View>
      {/* <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleWrapperSent}>
          <View style={styles.balloon}>
            <View style={styles.balloonSent}>
              <Text style={styles.balloonText}>
                <Text style={styles.balloonTextSent} >{message}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>  */}
      
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubbleWrapperReceived}>
          <View style={styles.nameContent}>
          <Text style={styles.nameText}>{idUsuario == id ? 'Você' : name}</Text>
          </View>
          <View style={styles.balloon}>
            <View style={styles.balloonReceived}>
              <Text style={styles.balloonText}>
                <Text style={styles.balloonTextReceived} >{message}</Text>
                
              </Text>
            </View>
           
          </View> 
          <View style={styles.dateContent}>
                <Text style={styles.dateText}>{date}</Text>
            </View>
        </View>
      </View>
      
      
    </View>


  )
}

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',

  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,

  },
  balloon: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection:'row'

  },

  balloonSent: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  balloonReceived: {
    backgroundColor: "rgba(39, 161, 245, 0.8)",
    borderRadius: 10,
  },
  balloonText: {
    fontSize: 18,
  },
  balloonTextSent: {
    color: "black",
  },
  balloonTextReceived: {
    color: "white",
  },
  nameContent:{
    bottom:0,
    left:10
  },
  nameText:{
    color:'#4A4444'
  },
  dateContent:{
    top:0,
    left:230
  },
  dateText:{
    fontSize:10
  }
})


export default Balloon