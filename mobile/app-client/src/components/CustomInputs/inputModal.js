import { View,Text,StyleSheet ,TouchableOpacity,Platform, Pressable,TextInput, Image} from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';




const InputModal =(props) => {
  return(
    <View style={styles.container}>
      <TextInput 
          style={styles.inputTextModal} 
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

  inputTextModal:{
    width: 280,
    height: 50,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    height: 50,
    marginVertical: 4,
    paddingLeft:20
  },
  icon:{
    position:'absolute',
    right:10,
    top: 17,
  }
})

export default InputModal;
