import React, { Component } from 'react';
import {
  View,
  Text ,
  Platform,
  ListView,
	StyleSheet,
	TouchableHighlight,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../src/Button';
import { connect } from 'react-redux';
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
import * as actions from '../actions';

var {height, width} = Dimensions.get('window');

class OldTripsScreen extends Component {

  constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			basic: true,
			listViewData: null,
      buttonAvailable : true
		};
	}


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle : 'Otoban Sayaç',
      headerRight: <Icon
        iconStyle = {styles.iconStyle}
        name='info-outline'
        color="rgba(0,122,255,1)"
        onPress={() => navigation.navigate('info')}
        />,
      headerLeft : null,
        headerTintColor: "#fff",
        headerStyle : {
          marginTop : Platform.OS === 'android' ? 24 : 0,
          paddingBottom: 10,
          backgroundColor : "#267689"
        },
        tabBarVisible : false,
    }
 };


  navigationController (text){
    if(this.state.buttonAvailable){
      this.setState({
        buttonAvailable: false
      })
      this.props.navigation.navigate('setTrip');
      setTimeout(()=>{
        this.setState({
          buttonAvailable: true
        })
      },2500)
    }

  }

  removeItem = (item,secId,rowId) => {
      this.props.removeOldTrip(rowId);
  }

  _selectedRoute(data){
    this.props.selectRoute(data);
    this.props.navigation.navigate('countDown');
  }

  _vehicleType(data){
    switch (data.type) {
      case "Otomobil":
        return parseInt(data.Km).toFixed(1)+ "KM 🚘";
        break;
      case "Otobüs":
        return parseInt(data.Km).toFixed(1)+ "KM 🚍";
        break;
      case "Minibüs":
          return parseInt(data.Km).toFixed(1)+ "KM 🚍";
        break;
      case "Kamyonet":
          return parseInt(data.Km).toFixed(1)+ "KM 🚚";
        break;
      case "Panelvan":
          return parseInt(data.Km).toFixed(1)+ "KM 🚐";
        break;
      case "Motosiklet (L3)":
          return parseInt(data.Km).toFixed(1)+ "KM 🏍";
        break;
      case "Motosiklet (L4, L5, L7)":
          return parseInt(data.Km).toFixed(1)+ "KM 🏍";
        break;
      default:

    }
  }

 render() {
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     if(this.props.tripList.length > 0){
       return (
         <Image source={require('../img/giris.png')}
         style={styles.backgroundImage}>
         <View style= {styles.container}>
           <SwipeListView
              disableRightSwipe={false}
              removeClippedSubviews= {false}
              enableEmptySections={true}
              dataSource={ds.cloneWithRows(this.props.tripList)}
               renderRow={ data => (
                   <TouchableHighlight onPress={() => this._selectedRoute(data)}>
                         <View style={styles.rowFront}>
                           <Text style={styles.removeText}>{data.FirstGate} - {data.LastGate}</Text>
                           <Text style={styles.warningText}>{this._vehicleType(data)}</Text>
                         </View>
  	                </TouchableHighlight>
               )}
               renderHiddenRow={ (data,secId,rowId) => (
                   <View style={styles.rowBack}>
                      <Text></Text>

                   </View>
               )}
               rightOpenValue={-2}
           />
           <View style={styles.skipButton}>
           <Button
              onPress={() => this.navigationController()}>Yeni Rota Oluştur
              </Button>
            </View>
          </View>
        </Image>
       )
     }else{
       return(
         <Image source={require('../img/giris.png')}
         style={styles.backgroundImage}>
         <View style= {styles.Emptycontainer}>
           <Text style={styles.textWarning}>  Kayıtlı Rotanız Bulunmamaktadır</Text>
           <View style={styles.skipButton}>
           <Button onPress={() => this.navigationController()}>  Yeni Rota Oluştur </Button>
            </View>
         </View>
         </Image>
       )
     }

 }
}

const styles = {
  container :{
    backgroundColor: 'rgba(0,0,0,0)',
  	flex: 1
  } ,
  Emptycontainer:{
    justifyContent: 'space-between',
    alignItems :'center',
    flex :1
  },
  iconStyle : {
    marginRight : 10
  },
	rowFront: {
		alignItems: 'center',
    flexDirection: 'row',
		backgroundColor: 'rgba(0,0,0,0)',
		borderBottomColor: '#95a5a6',
		borderBottomWidth: 2,
		justifyContent: 'space-between',
		height: 50,
	},
  warningText : {
    color : '#e8210b',
    fontSize :14,
    alignItems : 'flex-end',
    paddingRight:10
  },
	rowBack: {
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0)',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
  removeText :{
    paddingLeft: 10,
    alignContent:'flex-start',
    fontSize :14,
    color : '#000'
  },
  skipButton:{
    width:width,
    height: 55,
    marginBottom : 30,
    marginTop: 15
  },
  textWarning : {
    fontSize: 30,
    fontWeight: '400',
    marginTop:50,
    backgroundColor :'rgba(0,0,0,0)',
    alignItems:'center',
    alignSelf :'center',
    color: '#C9CFD4'
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }

}

const mapStateToProps = state => {
    return {
      tripList : state.tripList,
    }
};
export default connect(mapStateToProps,actions)(OldTripsScreen);
