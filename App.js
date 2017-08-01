import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Expo from 'expo';
import store from './store';
import OldTripsScreen from './screens/OldTripsScreen';
import InfoScreen from './screens/InfoScreen';
import CountDownScreen from './screens/CountDownScreen';
import TripFormScreen from './screens/TripFormScreen';


    function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Expo.Asset.fromModule(image).downloadAsync();
      }
    });
  }

  function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
}


export default class App extends React.Component {

  state = {
     appIsReady: false,
   }


  componentWillMount() {
   this._loadAssetsAsync();
 }







 async _loadAssetsAsync() {
   try{
     const imageAssets = cacheImages([
       require('./img/form.png'),
       require('./img/count.png'),
       require('./img/giris.png'),
       require('./img/guclu.png'),

     ]);

     const fontAssets = cacheFonts([
       { 'gotham-med': require('./fonts/GothamMedium.ttf') },
     ]);


     await Promise.all([
       ...imageAssets,
       ...fontAssets,
     ]);
   }catch(e){
     console.log(e);
   }
   finally {
     this.setState({appIsReady: true});
   }



 }


  render() {
    const MainNavigator = TabNavigator({
      oldTrips:{
        screen : StackNavigator({
          oldTrips : {screen: OldTripsScreen},
          info : {screen : InfoScreen},
          setTrip : {screen : TripFormScreen}
        }, {
          mode: 'modal'
        })
      },
      countDown: {
        screen : CountDownScreen
      }
  },{
    swipeEnabled: false,
    lazy: true,
    tabBarOptions : {
      activeTintColor: '#e91e63',
    }
  } );



    if (!this.state.appIsReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
