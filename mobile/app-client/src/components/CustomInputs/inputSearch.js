import { View,Text,StyleSheet ,TouchableOpacity,Platform, Pressable,TextInput, Image} from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';


 const InputSearch =(props) => {
  return(
    <View style={styles.container}>
      <TextInput 
          style={styles.inputText} 
          underlineColorAndroid="transparent" 
          {...props}
          secureTextEntry={props.secureTextEntry}
          />
      <FontAwesome 
          name={props.iconName} 
          size={props.iconSize} 
          color={'#4A4444'} 
          style={styles.icon} />
    </View>
  );
};





const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  },
  inputText:{
    width: 350,
    height: 50,
    borderRadius: 3,
    borderStyle: 'solid',
    backgroundColor:'white',
    borderWidth: 0.2,
    height: 50,
    marginVertical: 4,
    borderRadius:50 ,
    paddingLeft:40,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  icon:{
    position:'absolute',
    left:10,
    top: 17,
  }
})

export default InputSearch;
