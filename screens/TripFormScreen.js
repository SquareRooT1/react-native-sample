import React, { Component } from 'react';
import {View, Text, Platform,TextInput,Dimensions, AsyncStorage, Image} from 'react-native';
import  { connect } from 'react-redux';
import gate from '../data/gate';
import otoyol from '../data/otoyol';
import type from '../data/type';
import ModalPicker from 'react-native-modal-picker';
import { Icon } from 'react-native-elements';
import { Button } from '../src/Button';
import { Header } from '../src/Header';
import _ from 'lodash';
import * as actions from '../actions';

var {height, width} = Dimensions.get('window');

class TripFormScreen extends Component {
    state = {
      otoyol:"ANADOLU OTOYOLU" ,
      route : { },
      data :  gate.ANADOLU.data,
      start :'',
      end : '',
      type: 'Otomobil',
      speed: '120',
      formPosted :false,
      errorMessage: ''
    }

        static navigationOptions = ({ navigation }) => {
          return {
              tabBarVisible : false,
              headerTintColor: "#fff",
              header:null,
              headerStyle : {
                marginTop : Platform.OS === 'android' ? 24 : 0,
                paddingBottom: 10,
                backgroundColor : "#267689"
              },
          }
       };

    componentDidMount(){

    }

    _updateForm(selected){
        this.setState({
          start : "",
          end : ""
        })
      switch (selected.label) {
        case "ANADOLU OTOYOLU":
          this.setState({
            otoyol : selected.label,
            data : gate.ANADOLU.data
          })
          break;
        case "AVRUPA OTOYOLU":
            this.setState({
              otoyol : selected.label,
              data : gate.AVRUPA.data
            })
          break;
        case "CESME OTOYOLU":
          this.setState({
            otoyol : selected.label,
            data : gate.CESME.data
          })
          break;
        case "AYDIN OTOYOLU":
            this.setState({
              otoyol : selected.label,
              data : gate.AYDIN.data
            })
          break;
        case "URFA OTOYOLU":
            this.setState({
              otoyol : selected.label,
              data : gate.URFA.data
            })
          break;
        case "MERSİN OTOYOLU":
          this.setState({
            otoyol : selected.label,
            data : gate.MERSİN.data
            })
          break;
        default:

      }

    }

    async _submitForm (){
      if(!this.state.formPosted && this.state.end && this.state.start){
            if(this.state.start != this.state.end){
              var currentRoute  =  this._selectedRoute(this.state.start,this.state.end);
              if(currentRoute){
                currentRoute.type = this.state.type;
                currentRoute.speed = this.state.speed;
                this.setState({
                  errorMessage:''
                })
                this.props.addOldTrip(currentRoute);
                this.props.selectRoute(currentRoute);
                this.props.navigation.navigate('countDown');
              }
            }else{
              this.setState({
                errorMessage: 'Girdiğiniz gişeler arasında çıkış bulunmamaktadır.'
              })
            }
      }else{
        this.setState({
          errorMessage:'Eksik veya hatalı gişe bilğisi girdiniz, lütfen bilgileri kontrol edin.'
        })
      }
    }

     _selectedRoute(start,end){
      return _.find(this.props.routeList,{'FirstGate': start,'LastGate':end})
    }


  render(){
          return(
            <Image source={require('../img/form.png')}
            style={styles.backgroundImage}>
            <Header  headerText="Rota Oluştur">
              <Icon
                name='chevron-left'
                size={40}
                onPress={()=> this.props.navigation.navigate('oldTrips')}
                />
            </Header>
            <View style ={styles.formContainer}>
            <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}> Araç Türü : </Text>
            <ModalPicker
              data={type}
              initValue="Type"
              cancelText="İptal"
              onChange={(option)=>{this.setState({type: option.label, speed : option.speed})}}>
              <View style={styles.textInputContainer}>
              <TextInput
                  style={styles.textInputStyle}
                  editable={false}
                  placeholder="Araç Türü Seçiniz"
                  value={this.state.type} />
              </View>
            </ModalPicker>
            </View>
            <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}> Otoyol : </Text>
            <ModalPicker
              data={otoyol}
              initValue="Gişe"
              cancelText="İptal"
              onChange={(option)=>{ this._updateForm(option) }}>
              <View style={styles.textInputContainer}>
              <TextInput
                  style={styles.textInputStyle}
                  editable={false}
                  placeholder="Otoyol Seçiniz"
                  value={this.state.otoyol} />
              </View>
            </ModalPicker>
            </View>

            <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}> Giriş Gişesi : </Text>
            <ModalPicker
              data={this.state.data || []}
              initValue="Select!"
              cancelText="İptal"
              onChange={(option)=>{ this.setState({start:option.label})}}>
              <View style={styles.textInputContainer}>
              <TextInput
                  style={styles.textInputStyle}
                  editable={false}
                  placeholder="Gişe Seç"
                  value={this.state.start} />
              </View>
            </ModalPicker>
            </View>

            <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}> Çıkış Gişesi : </Text>
            <ModalPicker
             data={this.state.data || []}
             initValue="Select!"
             cancelText="İptal"
             onChange={(option)=>{ this.setState({end:option.label})}}>
             <View style={styles.textInputContainer}>
             <TextInput
                 style={styles.textInputStyle}
                 editable={false}
                 placeholder="Gişe Seç"
                 value={this.state.end} />
             </View>
            </ModalPicker>
            </View>
            <Text style={{color:'red',backgroundColor:'rgba(0,0,0,0)', fontSize:14,alignSelf :'center'}}>{this.state.errorMessage}</Text>
            <View style={{width:width, height: 65, padding:10, alignItems: 'center'}}>
            <Button onPress={() => this._submitForm()}>
              Rotayı Kaydet
            </Button>
            </View>
            </View>

       </Image>

          );
  }
}




const styles ={
  container: {
   flex: 1,
   paddingTop:5,
 },
 formContainer :{
   height :height/2 + 45,
   justifyContent: 'space-around',
   alignItems: 'center',
 },
 pickerContainer :{
   flexDirection : 'row',
   width : width,
 },
 pickerLabel:{
  fontSize: 18,
  fontWeight: '500',
  textAlign : 'justify',
  backgroundColor :"rgba(0,0,0,0)",
  alignItems: 'center',
  height :40,
  paddingTop: 5,
  width : 140
 },
 textInputContainer:{
   borderBottomWidth :1,
   borderBottomColor : '#fff',
   height:30,
 },
 backgroundImage: {
   flex: 1,
   width: width,
   height: height,
   resizeMode: 'cover'
   },
textInputStyle:{
   justifyContent: 'flex-start',
   alignItems :'center',
   width: width-150,
   paddingLeft : 5,
   fontSize : 16,
   color : "#fff",
   height:30
 }
}


const mapStateToProps = state => {
    return {
      routeList : state.routeList,
      selectedRoute  : state.selectedRoute
    }
};

export default connect(mapStateToProps,actions)(TripFormScreen);
