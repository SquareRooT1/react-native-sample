import React, { Component } from 'react';
import { Image } from 'react-native';


export default class Background extends Component {

    render() {
        return (
            <Image source={require(this.props.src)}
            style={styles.backgroundImage}>
                    {this.props.children}
            </Image>
        );
    }
}

const style = {
  backgroundImage: {
       flex: 1,
       width: null,
       height: null,
       resizeMode: 'cover'
   }
}
