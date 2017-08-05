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
          <Text style={{fontSize: 32, color:'#000', fontWeight:'700', textAlign:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0)',paddingBottom:40}}>Ana sponsor </Text>
          <Image source={require('../img/guclu.png')} style={{width:150, height:150,marginBottom:10}}/>
          <View style={{borderBottomWidth:1, borderColor:'#D4E1F3', width:270 }}></View>
          <Image source={require('../img/logo2.png')} style={{width:150, height:150, marginTop : 10}}/>
          <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center',fontSize:19, marginTop: 20,alignSelf:'center',fontWeight:'600'}}>İletişim :  otoyolsuresi@gmail.com </Text>
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
