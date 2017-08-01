// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle ,container,centerView} = styles;
if(props.children == undefined){
  return (
    <View style={centerView}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
} else{
    return (
      <View style={viewStyle}>
        {props.children}
        <View style={container}>
        <Text style={textStyle}>{props.headerText}</Text>
        </View>
        <Text style={textStyle}></Text>
      </View>
    );
}

};

const styles = {
  viewStyle: {
    backgroundColor:'rgba(255,255,255,0.2)',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row',
  },
  centerView:{
    backgroundColor:'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  container:{
    justifyContent:'center',
    paddingRight:20
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600'
  }
};

// Make the component available to other parts of the app
export { Header };
