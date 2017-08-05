import React ,{ Component } from 'react';
import {View , Text, StyleSheet,Dimensions, Platform, Image } from 'react-native';
import { Constants, Permissions, Notifications, FacebookAds } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PercentageCircle from 'react-native-percentage-circle';
import AndroidCircle from '../src/AndroidCircle';
import { Header } from '../src/Header';
import { Card } from '../src/Card';
import { Button } from '../src/Button';
const moment = require('moment');
const duration = require("moment-duration-format");

var {height, width} = Dimensions.get('window');

class CountDownScreen extends Component {
        state = {
            percent: 0,
            endTime : null,
            km: 0,
            status: "idle",
            humanize : null,
            humanizeEndTime: "-"
        };


          static navigationOptions = ({ navigation }) => {
            return {
                tabBarVisible : false,
                headerTintColor: "#fff",
                swipeEnabled: false,
                headerStyle : {
                  marginTop : Platform.OS === 'android' ? 24 : 0,
                  backgroundColor : "#EB3349"
                },
            }
         };
         async componentDidMount(){
           let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

           if (Constants.isDevice && result.status !== 'granted') {
             alert(
               'You should enable notifications for this app otherwise you will not know when your timers expire!'
             );
             return;
             }

            if(Platform.OS === 'android'){
              FacebookAds.InterstitialAdManager.showAd('449422098768727_449426018768335')
                 .then(didClick => {})
                 .catch(error => {})
            }else{
              FacebookAds.InterstitialAdManager.showAd('449422098768727_449426618768275')
                 .then(didClick => {console.log("clicked ad");})
                 .catch(error => {console.log("error:", error);})
            }


         }




        async _fireNotification(fireDate){
                 const notificationId = await Notifications.scheduleLocalNotificationAsync(
                 {
                   title: 'Süre Doldu!',
                   body: "Süre doldu otobandan çıkış yapabilirsiniz.",
                   ios: {
                     sound: true,
                   },
                   android: {
                     sound: true,
                   },
                 },
                 {
                   time: fireDate,
                 }
               );
           }

           async _cancelAllNotification(){
              await Notifications.cancelAllScheduledNotificationsAsync()
           }


        _ınfoTitle (){
          return this.props.selectedRoute.FirstGate +" - " + this.props.selectedRoute.LastGate;
        }
        _ınfoKM (){
          let km = parseInt(this.props.selectedRoute.Km).toFixed(1);
          return km;
        }
        _totalTime = km => {
          if(km){
            kmInt = parseInt(km);
            let second = Math.floor(kmInt / parseInt(this.props.selectedRoute.speed) * 3600)+100 ;
            return second;
          }
          return 0;
        }

        secondToHuminzeString (km){
            let second = this._totalTime(km);
            var humVal = moment.duration(second,'seconds').format("hh:mm:ss");
            return humVal;
        }

        async _startTimer (){
          if(this.state.status == "idle"){
            let second = this._totalTime(this.props.selectedRoute.Km);
            await this.props.setEndTime(moment().add(second,'seconds'));
            const { endTime } = this.props;
            let hour = endTime.hour() < 10 ? "0" + endTime.hour() : endTime.hour();
            let min = endTime.minute() < 10 ? "0"+ endTime.minute() : endTime.minute();
            let sec = endTime.second() < 10 ? "0"+endTime.second() : endTime.second();
            var huminzeEndTime = hour+":"+min+":"+sec;
            this.setState({
              status: "started",
              humanizeEndTime: hour+":"+min+":"+sec
            })
            this._renderTimer();
            return;
          } // İptal Et
          else if(this.state.status == "started"){
            await this.props.setEndTime(0);
            clearInterval(this._timer);
            this._timer = null;
            this.setState({
              percent : 0,
              humanize : null,
              status : "idle",
              humanizeEndTime: "-"
            })
            this._cancelAllNotification();
            this.props.navigation.navigate('oldTrips');
          }

        }

        _renderSecond(second){
          var humVal = moment.duration(second,'seconds').format("hh:mm:ss");
          this.setState({
            humanize : humVal
          })
        }
        _renderTimer(){
          if(this.props.endTime > 0){
            let startTime = moment();
            this._fireNotification(this.props.endTime.valueOf());

            this._timer = setInterval(
              () => {
                let lastTick = moment();
                if (lastTick.valueOf() > this.props.endTime.valueOf()) {
                      this._renderSecond(0);
                      this.setState({
                        percent : 100,
                        humanize: 'Çıkış yapabilirsiniz',
                        status: 'ended'
                      })
                } else {
                  let percent =  Math.floor((lastTick.valueOf()-startTime.valueOf())/(this.props.endTime.valueOf()-startTime.valueOf())*100);

                  this.setState({
                    percent : percent
                  })
                  var differenceSec = this.props.endTime.diff(lastTick, 'seconds',true);
                  this._renderSecond(differenceSec);
                }
              },
              166
            );
          }
        }

        _renderBanner(){
            if(Platform.OS === 'android'){
              return(
              <FacebookAds.BannerView
                placementId="449422098768727_449423225435281"
                type="standard"
                onPress={() => console.log('click')}
                onError={(err) => console.log('error', err)}
              />
          )
          }else{
            return(
              <FacebookAds.BannerView
                placementId="449422098768727_449426432101627"
                type="standard"
                onPress={() => console.log('click')}
                onError={(err) => console.log('error', err)}
              />
            )


          }
        }

        _renderCircle(){
          if(Platform.OS === 'android'){
            return(
                <AndroidCircle radius={105} percent={this.state.percent} borderWidth ={12} color={"#640204"} innerColor={"#7E8B7D"}>
                  <Text style={[styles.percentText]}> {this.state.status == "idle" ? "Sayacı Başlatınız" :  " % " + this.state.percent  }</Text>
                  <Text style={[styles.countDownText]}>{this.state.humanize ? this.state.humanize : this.secondToHuminzeString(this.props.selectedRoute.Km) } </Text>
               </AndroidCircle>
            )
          }else{
            return(
                <PercentageCircle radius={105} percent={this.state.percent} borderWidth ={12} color={"#640204"} innerColor={"#7E8B7D"}>
                  <Text style={[styles.percentText]}> {this.state.status == "idle" ? "Sayacı Başlatınız" : " % " + this.state.percent  }</Text>
                  <Text style={[styles.countDownText]}>{this.state.humanize ? this.state.humanize : this.secondToHuminzeString(this.props.selectedRoute.Km) } </Text>
               </PercentageCircle>
            )
          }
        }

        _renderButton(){
          if(this.state.status == "idle"){
            return 'Başlat';
          }else if(this.state.status == "started"){
            return'İptal Et'
          }else if(this.state.status == "ended"){
            return 'Bitti'
          }
        }

  render(){
    return(
      <Image source={require('../img/count.png')}
      style={styles.backgroundImage}>
      <Header headerText ={ this._ınfoTitle()}  />
      <View  style={styles.container}>
        {this._renderCircle()}
       <View style={styles.infoContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between',width:width,paddingRight:15,paddingLeft:15}}>
           <Card style={styles.cardStyle}>
            <Text style={styles.cardText}>Toplam Mesafe</Text>
            <View style={{flexDirection:'row',justifyContent :'center', alignItems:'flex-end'}}>
            <Text style={{fontSize:24, fontWeight: '700',color:'#fff'}}>{this._ınfoKM()} </Text>
            <Text style={{fontSize:18,fontWeight:'700', color :'#fff',paddingBottom:2 }}>KM</Text>
            </View>
           </Card>
           <Card style={styles.cardStyle}>
            <Text style={styles.cardText}>Tahmini Varış</Text>
            <View style={{flexDirection:'row',justifyContent :'center', alignItems:'flex-end'}}>
            <Text style={{fontSize:24, fontWeight: '700',color:'#fff',textAlign:'center'}}>{this.state.humanizeEndTime} </Text>
            </View>
           </Card>
          </View>

          <View style={{height: 70, width : width ,paddingTop:20}}>
            <Button onPress={() => this._startTimer()}>{this._renderButton()}</Button>
          </View>
        </View>
      </View>
      {this._renderBanner()}
      </Image>
    );
  }
}


const styles ={
  container: {
   flex: 1,
   justifyContent: 'space-around',
   alignItems: 'center',
   paddingTop:20,
 },
  percentText: {
    fontSize: 21,
    paddingBottom : 15,
    fontWeight:'600',
    alignItems : 'center',
    alignSelf: 'center',
    color: "#fff"

  },
  countDownText :{
    fontSize : 24,
    fontWeight : '600',
    alignItems : 'center',
    alignSelf :'center',
    color: "#fff"
  },
  itemContainer :{
    height : 200,
    width : 250,
    backgroundColor :'rgba(0,0,0,0)',
  },
  buttonContainer : {
    height : 50,
    width :250,
  },
  InfoContainer : {
    width:width,
    justifyContent:'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    },
  cardStyle:{
    height : 60,
    width : null,
    alignItems: 'center',
  },
  infoContainer : {

  },
  cardText:{
    fontSize : 14,
    color :'#fff',
    fontWeight :'700',
    paddingLeft:10,
    paddingRight : 10
  }

};

const mapStateToProps = state => {
    return {
      selectedRoute  : state.selectedRoute,
      endTime : state.endTime
    }
};


export default connect(mapStateToProps,actions)(CountDownScreen);
