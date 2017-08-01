import React, { Component } from 'react';
import {View, Text, Platform, Image} from 'react-native';

class InfoScreen extends Component {

      static navigationOptions = ({ navigation }) => {
        return {
            tabBarVisible : false,
            headerTintColor: "#fff",
            headerStyle : {
              marginTop : Platform.OS === 'android' ? 24 : 0,
              backgroundColor : "#267689"
            },
        }
     };

  render(){
    return(

      <Image source={require('../img/form.png')}
      style={styles.backgroundImage}>
        <View style={styles.container}>
          <Image source={require('../img/guclu.png')} style={{width:170, height:170}}/>
         </View>
       </Image>

    );
  }
}


const styles = {
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop:10,
 },
 backgroundImage: {
       flex: 1,
       width: null,
       height: null,
       resizeMode: 'cover'
   },
  textStyle :{
      backgroundColor: "rgba(0,0,0,0)",
      color : '#fff',
      fontSize: 26
  }
}

export default InfoScreen;
