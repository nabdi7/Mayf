// import React, { Component } from 'react';
// import { Modal, Animated,Dimensions,ScrollView,
//   Platform,StyleSheet, Text, View, ImageBackground, 
//   TouchableHighlight} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {prayer_times} from '../../utils/ParyerTimesApi';
// import {Clock, ClockComp} from '../Clock';
// import SideMenu from '../SideMenu';
// import {getPrayerData, getPrimaryAnnouncmentData, currentPrayerScheduleUrl} from '../../services/readFB';
// import Pdf from 'react-native-pdf';
// import { WebView } from 'react-native-webview';
// import TextTicker from 'react-native-text-ticker'; 
// // import Icon1 from 'react-native-vector-icons/AntDesign';
// import DeviceInfo from 'react-native-device-info'; 


// const {height,width} = Dimensions.get('window');


// /**
//  * PrayerTimesScreen Class Component
//  * 
//  * @extends Component
//  * @exports PrayerPage
//  */
// export class PrayerTimesScreen extends Component<{navigation:any},{}> {
//   /**
//    * @param {*} props 
//    */
//   constructor(props: any) {
//       //console.log(height, width)
//       super(props);
//       this.state = {}

//       console.log("phone model, height, & width ", DeviceInfo.getModel(), height, width)
//   }

//   /**
//    * Renders PrayerPage UI.
//    */
//   render() {
//       return (
//       <ImageBackground source={require('../../resources/imgs/abuLogo.png')} resizeMode='contain' imageStyle={{top:'8%'}} style={{width: '100%', height: '100%', backgroundColor:'#2E4B82'}}>
//               <SideMenu nav={this.props.navigation} title="Home" logo={true} page="prayer" reactComp={<PrayerTimesComp/>}/>
//       </ImageBackground>
//       )
//   }
// }

// interface PrayerTimesProps {
// };

// interface PrayerTimesState {
//   fajrAthan: Date;
//   duhrAthan: Date;
//   asarAthan: Date;
//   maghribAthan: Date;
//   ishaAthan: Date;
//   fajrIqma: Date;
//   duhrIqma: Date;
//   asarIqma: Date;
//   maghribIqma: Date;
//   ishaIqma: Date;
//   waitTime: number;
//   isFajr: boolean;
//   isDuhr: boolean;
//   isAsar: boolean;
//   isMaghrib: boolean;
//   isIsha: boolean;
//   readonly am: string;
//   readonly pm: string;
//   clockTime: Date | null;
//   screenHeight: number;
//   noOfflineData: boolean;
//   currentDate: Date;
//   currentDayTracker: number;
//   isSlidingRight: boolean;
//   isSlidingLeft: boolean;
//   showImage: boolean;
//   image: string;
// }


// class PrayerTimesComp extends React.Component<PrayerTimesProps, PrayerTimesState>  {
//   // Slide animation variables.
//   private translateX: Animated.Value;
//   private translateX2: Animated.Value;
//   private switchTranslateX: boolean;
//   // component render timer.
//   private timer: any;

//   constructor(props: PrayerTimesProps) {
//     super(props);
//     this.translateX = new Animated.Value(0);
//     this.translateX2 = new Animated.Value(0);
//     this.switchTranslateX = false
//     this.timer = 0;

//     this.state = {
//         fajrAthan: prayer_times.fajrAthan,
//         duhrAthan: prayer_times.duhrAthan,
//         asarAthan: prayer_times.asarAthan,
//         maghribAthan: prayer_times.maghribAthan,
//         ishaAthan: prayer_times.ishaAthan,
//         fajrIqma: prayer_times.fajrIqma,
//         duhrIqma: prayer_times.duhrIqma,
//         asarIqma: prayer_times.asarIqma,
//         maghribIqma: prayer_times.maghribIqma,
//         ishaIqma: prayer_times.ishaIqma,
//         waitTime: 15, 
//         isFajr: false,
//         isDuhr: false,
//         isAsar: false,
//         isMaghrib: false,
//         isIsha: false,
//         am: 'AM',
//         pm: 'PM',
//         clockTime: null,
//         screenHeight: height,
//         noOfflineData: false,
//         currentDate: new Date(Date.now()),
//         // current date prayer times & animation
//         currentDayTracker: 0,
//         isSlidingRight: false,
//         isSlidingLeft: false,
//         showImage:false,
//         image: ""
//     }
//   }

//   /**
//      * Animation for handling next day prayer times.
//      */
//   slideRightAnimation = () => {
//     this.switchTranslateX = true;
//     Animated.timing(this.translateX, {
//         toValue: width,
//         duration: 950,
//         useNativeDriver: true
//     }).start();
//     this.translateX.addListener((object) => {            
//         if(object.value === width ) {
//             this.translateX.setValue(-width);
//             Animated.timing(this.translateX, {
//                 toValue: 0,
//                 duration: 950,
//                 useNativeDriver: true
//             }).start();
//         }
//     });
// }

// slideLeftAnimation = () => {
//     this.switchTranslateX = false;
//     Animated.timing(this.translateX2, {
//         toValue: -width,
//         duration: 950,
//         useNativeDriver: true
//     }).start();
//     this.translateX2.addListener((object) => {
//         if(object.value === -width) {
//             this.translateX2.setValue(width);
//             Animated.timing(this.translateX2, {
//                 toValue: 0,
//                 duration: 950,
//                 useNativeDriver: true
//             }).start();
//         }
//     });
// }

// /**
//  * React Component function.
//  */
// componentDidMount() {
// //   this.getPrayerTimes();
//   this.getSalatUpdate();
//   this.getCurrentMonthPrayerTimesSchedule();
//   this.timer = setInterval(() => {
//       this.getSalatUpdate();
//       //console.log(height,width);
//   }, 1000);

//   setInterval(() => {
//       this.checkAndUpdatePrayerTimes();
//   }, 1000)
// }

// /**
// * React Component function.
// */
// componentWillUnmount() {
//   clearInterval(this.timer)
// }


// /**
//  * Checks if we're on a new date and if we are need to update the prayer times.
//  */
// checkAndUpdatePrayerTimes() {
//   const now = new Date(Date.now());

//   const dateNow = now.toJSON().slice(0,10);
//   const dateCurrent = this.state.currentDate.toJSON().slice(0,10);

//   if(dateNow > dateCurrent) {
//       console.log("new day updating prayer times");
//     //   this.getPrayerTimes();
//       this.setState({
//           currentDate: now
//       })
//   }
// }

// /**
// * 
// * @param {Number} month 
// * @param {Number} day 
// * @param {Number} year 
// * @param {String} string - containing a data on time (i.e '8:00 AM')
// */
// stringToDate(month: number, day: number, year:number, string:string) {
//   //console.log(string)
//   var arr1 = string.split(':');
//   //console.log(arr1);
//   var arr2 = arr1[1].split(' ');
//   //console.log(arr2);
//   var hour = parseInt(arr1[0]);
//   var min = parseInt(arr2[0]);
//   var mer = arr2[1];
//   if(mer === 'AM' && hour == 12)
//       hour = 0;
//   else if(mer === 'PM' && hour != 12)
//       hour += 12;
//   //console.log(hour, min);
//   return new Date(year,month,day,hour,min,0,0);
// }

// /**
// * Gets a real-time prayer times data for the current day.
// */
// getGSPrayerTimes = async () => {
//   var now = new Date(Date.now());
//   now.setDate(now.getDate() + this.state.currentDayTracker);
//   var date = now.getDate();
//   var month = now.getMonth();
//   var year = now.getFullYear();
//   var promise = getPrayerData(month);//ReadGS.getMonthPrayerData(this.state.clockTime.getMonth());
//   if(promise == undefined) {
//     throw new TypeError("Get prayer data for " + month + " is undefined.")
//   }
//   await promise.then((snapshot : any) => {
//       //console.log('prayer page',result);
//       const result = JSON.parse(snapshot.data().data);
//       if(result == null) { //if result somehow is nothing.
//           this.getOfflinePrayerTimes();
//           return
//       }
//       const prayerTimesArr = result[date];
//       const fajrA = this.stringToDate(month, date, year, prayerTimesArr[1]);
//       const fajrI = this.stringToDate(month, date, year, prayerTimesArr[2]);
//       const duhrA = this.stringToDate(month, date, year, prayerTimesArr[3]);
//       const duhrI = this.stringToDate(month, date, year, prayerTimesArr[4]);
//       const asrA = this.stringToDate(month, date, year, prayerTimesArr[5]);
//       const asrI = this.stringToDate(month, date, year, prayerTimesArr[6]);
//       const maghribA = this.stringToDate(month, date, year, prayerTimesArr[7]);
//       const maghribI = this.stringToDate(month, date, year, prayerTimesArr[8]);
//       const ishaA = this.stringToDate(month, date, year, prayerTimesArr[9]);
//       const ishaI = this.stringToDate(month, date, year, prayerTimesArr[10]);
//       this.setState({
//           fajrAthan: fajrA,
//           duhrAthan: duhrA,
//           asarAthan: asrA,
//           maghribAthan: maghribA,
//           ishaAthan: ishaA,
//           fajrIqma: fajrI,
//           duhrIqma: duhrI,
//           asarIqma: asrI,
//           maghribIqma: maghribI,
//           ishaIqma: ishaI,
//       });
//   }).catch( (error:any) => {
//       console.log(error);
//       this.getOfflinePrayerTimes();
//   })
// }

// /**
// * Gets offline storage prayer times data.
// */

// getOfflinePrayerTimes = async() => {
//   var now = new Date(Date.now());
//   var date = now.getDate();
//   var month = now.getMonth();
//   var year = now.getFullYear();
//   try{
//       var monthDict: {[monthIndex: number]: string} = {0:'jan', 1:'feb', 2:'mar', 3:'apr', 4:'may', 5:'jun', 6:'jul', 7:'aug', 8:'sep', 9:'oct', 10:'nov', 11:'dec'}
//       var monthStr = monthDict[month];
//       var name = monthStr + '_prayer_times_data';
//       await AsyncStorage.getItem(name,(err,result) => {
//           if(result == null || result == undefined) {
//             throw new TypeError("Recieved " + result + " from async storage prayer times")
//           }
//           const prayer_times2 = JSON.parse(result);
//           var fajrA:Date , fajrI:Date, duhrA:Date, duhrI:Date, 
//           asrA:Date, asrI:Date, maghribA:Date, maghribI:Date,
//           ishaA:Date, ishaI:Date; 

//           if(prayer_times2 === null) {
//               this.setState({noOfflineData:true});
//               fajrA = this.stringToDate(month, date, year, "0:00");
//               fajrI = this.stringToDate(month, date, year, "0:00");
//               duhrA = this.stringToDate(month, date, year, "0:00");
//               duhrI = this.stringToDate(month, date, year, "0:00");
//               asrA = this.stringToDate(month, date, year, "0:00");
//               asrI = this.stringToDate(month, date, year, "0:00");
//               maghribA = this.stringToDate(month, date, year, "0:00");
//               maghribI = this.stringToDate(month, date, year, "0:00");
//               ishaA = this.stringToDate(month, date, year, "0:00");
//               ishaI = this.stringToDate(month, date, year, "0:00");
//           }else {
//               this.setState({noOfflineData:false});
//               const prayerTimesArr = prayer_times2[date];
//               fajrA = this.stringToDate(month, date, year, prayerTimesArr[1]);
//               fajrI = this.stringToDate(month, date, year, prayerTimesArr[2]);
//               duhrA = this.stringToDate(month, date, year, prayerTimesArr[3]);
//               duhrI = this.stringToDate(month, date, year, prayerTimesArr[4]);
//               asrA = this.stringToDate(month, date, year, prayerTimesArr[5]);
//               asrI = this.stringToDate(month, date, year, prayerTimesArr[6]);
//               maghribA = this.stringToDate(month, date, year, prayerTimesArr[7]);
//               maghribI = this.stringToDate(month, date, year, prayerTimesArr[8]);
//               ishaA = this.stringToDate(month, date, year, prayerTimesArr[9]);
//               ishaI = this.stringToDate(month, date, year, prayerTimesArr[10]);
//           }
//           this.setState({
//               fajrAthan: fajrA,
//               duhrAthan: duhrA,
//               asarAthan: asrA,
//               maghribAthan: maghribA,
//               ishaAthan: ishaA,
//               fajrIqma: fajrI,
//               duhrIqma: duhrI,
//               asarIqma: asrI,
//               maghribIqma: maghribI,
//               ishaIqma: ishaI,
//           });
//       }).catch(()=>console.log('error in prayer page'))
//   }catch(error){
//       console.log(error);
//   }
// }

// /**
// * Used to refresh the prayer times if they were updated 
// * and the app is still running. 
// */
// getPrayerTimes = () => {
//   NetInfo.fetch().then( async connectionInfo =>{
//       if(connectionInfo.type === 'wifi' || connectionInfo.type === 'cellular') {
//           this.getGSPrayerTimes();
//       }else {
//           this.getOfflinePrayerTimes();
//       }
//   });
// }

// /**
// * Changes the current time into a comparable unit to be used.
// * example: 1:10PM = 110 12:12PM = 1212
// * @param {Date} date 
// */
// getTotalTime(date: Date) {
//   var total = 0;
//   var min = 0;
//   total = date.getHours();
//   min = date.getMinutes();
//   return  (total*100) + min;
// }

// /**
// * Checks the current prayer time and updates it's state.
// */
// async getSalatUpdate() {
//   const c = new Clock();
//   this.setState({clockTime: c.getDate()});
//   const currentTime = this.getTotalTime(c.getDate());
//   const waitTime = this.state.waitTime;
//   // incase if prayertimes are null gets offline data.
//   if(this.state.fajrIqma === null) {
//       await this.getOfflinePrayerTimes();
//   }
//   // Gets the converted string time as a Date object.
//   const fajr = this.getTotalTime(this.state.fajrIqma);
//   const duhr = this.getTotalTime(this.state.duhrIqma);
//   const asar = this.getTotalTime(this.state.asarIqma);
//   const maghrib = this.getTotalTime(this.state.maghribIqma);
//   const isha = this.getTotalTime(this.state.ishaIqma);
  
//   // algorithm for to highlight the correct payertimes coming up.
//   if(currentTime > (isha-waitTime) && currentTime <= (fajr+waitTime)) {
//       this.setState({isFajr: true, isDuhr:false, isAsar: false, isMaghrib: false, isIsha:false});
//   }else if(currentTime > (maghrib+waitTime) && currentTime <= (isha+waitTime)) {
//       this.setState({isFajr: false, isDuhr:false, isAsar: false, isMaghrib: false, isIsha:true});
//   }else if(currentTime > (asar+waitTime) && currentTime <= (maghrib+waitTime)) {
//       this.setState({isFajr: false, isDuhr:false, isAsar: false, isMaghrib: true, isIsha:false});
//   }else if(currentTime > (duhr+waitTime) && currentTime <= (asar+waitTime)) {
//       this.setState({isFajr: false, isDuhr:false, isAsar:true, isMaghrib: false, isIsha:false});
//   }else if(currentTime > (fajr+waitTime) && currentTime <= (duhr+waitTime)) {
//       this.setState({isFajr: false, isDuhr:true, isAsar: false, isMaghrib: false, isIsha:false});
//   }else {
//       this.setState({isFajr: true, isDuhr:false, isAsar: false, isMaghrib: false, isIsha:false});
//   }   
// }

// /**
// * Get a date object and makes it into string
// * @param {any} time - containing info on time in a date object.
// * @returns {String} returns time i.e 'hh:mm AM/PM'
// */
// getTimeFormat(time: Date): string {
//   //console.log('prayer page',time);
//   var hours = 0;
//   var minutes = 0;
//   if(time != null) {
//       hours = time.getHours();
//       minutes = time.getMinutes();
//   }
//   var amOrPm = 'PM';
//   var timeStr = '';

//   if(hours < 12)
//       amOrPm = 'AM';

//   if(hours > 12)
//       hours = hours - 12;

//   timeStr += hours + ':';

//   if(minutes < 10)
//     timeStr += '0' + minutes;
//   else 
//     timeStr += minutes;


//   timeStr += ' ' + amOrPm;
//   return timeStr;

// }

// /**
// * Checks prayer state and returns its stylesheet.
// * @returns {StyleSheet} - UI for prayer times box.
// */
// fajrTimeResult= () => {
//   const state = this.state.isFajr;
//   return (state ? styles.prayerBackground2 : styles.prayerBackground1);
// }

// /**
// * Checks prayer state and returns its stylesheet.
// * @returns {StyleSheet} - UI for prayer times box.
// */
// duhrTimeResult = () => {
//   const state = this.state.isDuhr;
//   return (state ? styles.prayerBackground2 : styles.prayerBackground1);
// }

// /**
// * Checks prayer state and returns its stylesheet.
// * @returns {StyleSheet} - UI for prayer times box.
// */
// asarTimeResult = () => {
//   const state = this.state.isAsar;
//   return (state ? styles.prayerBackground2 : styles.prayerBackground1);
// }

// /**
// * Checks prayer state and returns its stylesheet.
// * @returns {StyleSheet} - UI for prayer times box.
// */
// maghribTimeResult= () => {
//   const state = this.state.isMaghrib;
//   return (state ? styles.prayerBackground2 : styles.prayerBackground1);
// }

// /**
// * Checks prayer state and returns its stylesheet.
// * @returns {StyleSheet} - UI for prayer times box.
// */
// ishaTimeResult= () => {
//   const state = this.state.isIsha;
//   return (state ? styles.prayerBackground2 : styles.prayerBackground1);
// }

// /**
// * Update state of screenHeight.
// * @param {Number} contentWidth - page width
// * @param {Number} contentHeight - page height
// */
// onContentSizeChange = (contentWidth:number, contentHeight:number) => {
//   this.setState({screenHeight: contentHeight*10})
// }

// /**
// * Handles to view previous day prayer data
// */
// handlePreviousDay = () => {
//   this.setState({isSlidingRight: true});
//   this.slideLeftAnimation();
//   var newCount = this.state.currentDayTracker - 1
//   this.setState({
//       currentDayTracker: newCount
//   });
// //   this.getPrayerTimes();
//   this.setState({isSlidingRight: false});
// }

// /**
// * handles to view next day prayer data.
// */
// handleNextDay = () => {
//   this.slideRightAnimation();
//   var newCount =this.state.currentDayTracker + 1
//   this.setState({
//       currentDayTracker: newCount
//   });
// //   this.getPrayerTimes();
// }

// /**
// * @returns {JSX} - returns current date JSX text field.
// */
// getCurrentDayTextField = () => {
//   const months: any = {
//       0:'January', 1:'February', 2:'March', 3:'April',
//       4:'May', 5:'June', 6:'July', 7:'August', 8:'September',
//       9:'October', 10:'November', 11:'December'
//   }
//   const days: any = {
//       0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wednesday',
//       4:'Thursday', 5:'Friday', 6:'Saturday'
//   }
//   var currentDate = new Date(Date.now());
//   currentDate.setDate(currentDate.getDate()+this.state.currentDayTracker);
//   if(new Date(Date.now()).getDate() === currentDate.getDate()) {
//       return (<View style={styles.todayDayTextBackground}><Text style={styles.currentDayText}>Today</Text></View>);
//   }else {
//       return(<View style={styles.currentDayTextBackground}><Text style={styles.currentDayText}>{(months[currentDate.getMonth()]) + " " + currentDate.getDate() +
//         ", " + currentDate.getFullYear() + " - " + days[currentDate.getDay()]}</Text></View>);
//   }
// }

// /**
// * Navigated the next day. If it on todays date, 
// * stops moving backwards.
// */
// getCurrentPrevDayButton = () => {
//   if(this.state.currentDayTracker <= 0 ) {
//       return(null);
//   }else {
//       return(
//           <TouchableHighlight onPress={this.handlePreviousDay}>
//               {/* <Icon1 size={28} color="#FFF" name="caretleft" /> */}
//           </TouchableHighlight>
//       );
//   }
// }

// /**
// * Navigated the next day. If the date it 7 days ahead, 
// * stops moving foward.
// */
// getCurrentNextDayButton = () => {
//   if(this.state.currentDayTracker > 7) { // if user goes to the 8th day next day button is gone.
//       return(null);
//   }else {
//       return(
//           <TouchableHighlight onPress={this.handleNextDay}>
//               {/* <Icon1 size={28} color="#FFF" name="caretright" /> */}
//           </TouchableHighlight>
//       );
//   }
// }

// /**
// * Handles setting the monthly prayer schedule PDF.
// */
// getCurrentMonthPrayerTimesSchedule() {
//   var result: any = currentPrayerScheduleUrl();

//   if(result instanceof Promise) {
//     result.then((url:any) => {
//         console.log("image url: " + url)
//         this.setState({image: String(url)});
//     });
//   }
// }

// /**
// * Views current prayer time schedule.
// */
// viewCurrentMonthPrayerTimesSchedule = () => {
//   //console.log(this.state.image);
//   this.setState({showImage:true});
// }

// /**
//  * Gets the corrrect Operating System PDF viewer.
//  * for Android & iOS
//  */
// getPdfViewerforOS() {
//     if(this.state.image == "error") {
//         return(
//             <View style={{height:"90%"}}>
//                 <View style={{marginTop:'50%'}}>
//                     <Text style={{textAlign:'center'}}>
//                         No Monthly prayer schedule at this time. Try again later.
//                     </Text>
//                 </View>
//             </View>
//         );
//     }
//     if(Platform.OS == "android") {
//         return(
//             <Pdf
//                 trustAllCerts={false}
//                 source={{uri:this.state.image, cache:false}}
//                 onLoadComplete={(numberOfPages,filePath)=>{
//                     console.log(`number of pages: ${numberOfPages}`);
//                 }}
//                 onPageChanged={(page,numberOfPages)=>{
//                     console.log(`current page: ${page}`);
//                 }}
//                 onError={(error)=>{
//                     console.log(error);
//                 }}
//                 onPressLink={(uri)=>{
//                     console.log(`Link presse: ${uri}`)
//                 }}
//                 style={styles.pdf}
//             />
//         );
//     }else {
//         return (
//             <WebView
//                 //ref={ref => (this._webview = ref)}
//                 source={{ uri:`${this.state.image}` }}
//                 originWhitelist={['*','https://*']}
//                 style={{ marginTop: 20 }}
//                 startInLoadingState={true}
//                 renderError={() => {
//                     return(<Text>No Monthly prayer schedule at this time. Try again later.</Text>)
//                 }}
//                 onError={(err) => console.log("an error occured loading up PDF url.", err)}
//             />
//         )
//     }
// }


// render() {
//     const scrollEnabled = this.state.screenHeight > height;
//     return (
//       <View nativeID='main-prayer-page'>
//         {/*Alerts*/}
//         {/*Time*/}
//         <View nativeID='time' style={styles.clockPositioning}>
//             <ClockComp style={styles.clockText}/>
//         </View>
//         {/*Moving Message */}
//         <EventAlert/>
//         {/*Prayer Section*/}
//         <ScrollView
//                 //style={{flexGrow:1}}
//                 contentContainerStyle={{
//                     flexGrow:1,
//                     flexDirection:'column', justifyContent:'flex-start', alignItems:'center', 
//                     paddingBottom:(height > 700 ? 20 : (height > 600 ? 100 : 850)), 
//                     height:(height > 750 ? '85.25%' : (height > 700 ? '86%' : (height > 600 ? '80%' : '90%')))
//                 }}
//                 scrollEnabled={scrollEnabled}
//                 onContentSizeChange={this.onContentSizeChange}
//         >
//             <View nativeID='time' style={styles.prayerTitleBackground}>
//                 <Text style={styles.prayerTitle}>Abubakr Islamic Center Salat Times</Text>
//             </View>
//             <View nativeID='dayswitch' style={styles.daySwitch}>
//                 <View style={styles.leftIconView} >
//                     {this.getCurrentPrevDayButton()}
//                 </View>
//                 <View>
//                   {this.getCurrentDayTextField()}
//                 </View>
//                 <View style={styles.rightIconView}>
//                     {this.getCurrentNextDayButton()}
//                 </View>
//             </View>
//                 <View nativeID='prayerBorder1' style={styles.prayerBackground}>
//                     <Text style={styles.prayerText3}></Text>
//                     <Text style={styles.prayerText3}>Athan</Text>
//                     <Text style={styles.prayerText3}>Iqama</Text>
//                 </View>
//                 <Animated.View nativeID='prayerBorder2' style={[this.fajrTimeResult(), {transform:[{translateX: (this.switchTranslateX ? this.translateX : this.translateX2)}]}]}>
//                     <Text style={styles.prayerText}> Fajr </Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.fajrAthan)}</Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.fajrIqma)}</Text>
//                 </Animated.View>
//                 <Animated.View nativeID='prayerBorder3' style={[this.duhrTimeResult(), {transform:[{translateX: (this.switchTranslateX ? this.translateX : this.translateX2)}]}]}>
//                     <Text style={styles.prayerText}> Dhuhr </Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.duhrAthan)}</Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.duhrIqma)}</Text>
//                 </Animated.View>
//                 <Animated.View nativeID='prayerBorder4' style={[this.asarTimeResult(), {transform:[{translateX: (this.switchTranslateX ? this.translateX : this.translateX2)}]}]}>
//                     <Text style={styles.prayerText}> Asr </Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.asarAthan)}</Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.asarIqma)}</Text>
//                 </Animated.View>
//                 <Animated.View nativeID='prayerBorder5' style={[this.maghribTimeResult(), {transform:[{translateX: (this.switchTranslateX ? this.translateX : this.translateX2)}]}]}>
//                     <Text style={styles.prayerText}> Maghrib </Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.maghribAthan)}</Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.maghribIqma)}</Text>
//                 </Animated.View>
//                 <Animated.View nativeID='prayerBorder6' style={[this.ishaTimeResult(),{transform:[{translateX: (this.switchTranslateX ? this.translateX : this.translateX2)}]}]}>
//                     <Text style={styles.prayerText}> Isha </Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.ishaAthan)}</Text>
//                     <Text style={styles.prayerText2}>{this.getTimeFormat(this.state.ishaIqma)}</Text>
//                 </Animated.View>
//                 {/** Buttons for Current Prayer Times schedule */}
//                 <View style={styles.downloadBody}>
//                     <TouchableHighlight style={{flex:0, marginLeft:'10%'}} onPress={this.viewCurrentMonthPrayerTimesSchedule} underlayColor="#253c68" hitSlop={{top:10,bottom:10,right:25,left:25}} >
//                         {/* <Icon1 size={28} color="white" name="calendar" /> */}
//                     </TouchableHighlight>
//                     <TouchableHighlight style={{flex:0, marginLeft:'10%'}} onPress={this.viewCurrentMonthPrayerTimesSchedule} underlayColor="#253c68" hitSlop={{top:5,bottom:5,right:10}} >
//                         <Text style={styles.downloadText}>View Monthly Prayer Schedule</Text>
//                     </TouchableHighlight>
//                 </View>
//         </ScrollView>
//         {/** Modal used to display current month prayer times schedule */}
//         <View style={styles.container}>
//             <Modal visible={this.state.showImage}  /*useNativeDriver={true}*/ transparent={false} onRequestClose={()=>console.log('image was closed.')}>
//                 {/* PDF Viewer */}
//                 {this.getPdfViewerforOS()} 
//                 {/* Close button */}
//                 <View style={{width:'100%', height:"10%", backgroundColor:'black'}}>
//                     <TouchableHighlight 
//                         onPress={() =>{this.setState({showImage:false})}}
//                         style={{width:'100%', margin: 5}}
//                         hitSlop={{top:10,bottom:10,right:25,left:25}}
//                     >
//                         <Text style={{textAlign:'center', textAlignVertical:'top', color:'white', fontSize:(Platform.OS === 'android' ? height/44:height/56), padding: 5}}>
//                             Close
//                         </Text>
//                     </TouchableHighlight>
//                 </View>
//             </Modal>
//         </View>
//     </View>
//     );
//   }
// }

// interface EventAlertStatus {
//   alert: string;
// }

// /**
//  * EventAlert Class Component.
//  * @extends EventAlert
//  * @exports React.Component
//  */
// class EventAlert extends React.Component<{},EventAlertStatus> {
//   /**
//    * @param {*} props 
//    */
//   constructor(props: any){
//       super(props)
//       this.state ={
//           alert: ""
//       }
//   }
  
// //   componentDidMount() {
// //       this.getData()
// //   }

//   _storeServiceData = async () => {
//       var dict = {
//           message: this.state.alert
//       }
//       try {
//           await AsyncStorage.setItem('announcement_data',JSON.stringify(dict))
//               .then(() => console.log('service data succesfully saved!!!'));
//       }catch(error) {
//            console.log(error);
//        }
//   }

//   getData = async () => {
//       NetInfo.fetch().then( async connectionInfo =>{
//           if(connectionInfo.type === 'wifi' || connectionInfo.type === 'cellular') {
//               //console.log('connected getting prayertimes data')
//               var promise = getPrimaryAnnouncmentData();
//               await promise.then((snapshot) => {
//                   const data = snapshot.data();
//                   if(data != undefined) {
//                     this.setState({
//                         alert: data.message,
//                     })
                  
//                     this._storeServiceData();
//                   }
//               }).catch((err) => {
//                   console.log(err, "failed to get announcement message data.");
//               });
//           }else {
//               try{
//                   AsyncStorage.getItem('announcement_data').then(value =>{
//                     if(value != null) {
//                         let dict = JSON.parse(value);
//                         //console.log('error prayer page: ' + prayer_times2)
//                         this.setState({
//                             alert: dict.message,
//                         });
//                         console.log("offline announcement message successfully recieved!");
//                       }
//                   });
                  
//               }catch(error){
//                   console.log(error);
//               }
//           }
//       });
//   }

//   /**
//    * Renders Event Alerts UI.
//    */
//   render(){
//       return(
//           <View nativeID='event-alert' style={styles.alertBackground}>
//               <TextTicker
//                   style={styles.alertText}
//                   duration={15000}
//                   //marqueeOnStart
//                   loop
//                   marqueeDelay={1000}
//                   //marqueeResetDelay={1000}
//               >
//                  {this.state.alert}
//               </TextTicker>
//           </View>
//       );
//   }
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#000080',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   pdf: {
//       flex:1,
//       width:Dimensions.get('window').width,
//       height:Dimensions.get('window').height,
//   },
//   downloadTextBody: {
//       position:'absolute',
//       justifyContent:'center',
//       right:(height > 700 ? "17%" : (height > 600 ? "17%": "18%")), 
//       backgroundColor:'#253c68', 
//       height:'5%',
//       width:'80%',
//       borderColor:'white',
//       borderTopWidth:1,
//       borderBottomWidth:1,
//       borderLeftWidth:1,
//       borderTopLeftRadius:20,
//       borderBottomLeftRadius:20,
//       marginTop:'3%',
//   },
//   downloadText: {
//       textAlign:'center',
//       textAlignVertical:'center',
//       fontSize:(Platform.OS === 'android' ? height/46:height/56),
//       color:'white',
//       paddingTop:5
//   },
//   downloadBody: {
//       padding: 3,
//       marginTop: 5, //give space between text
//       backgroundColor:'#253c68',
//       height: (height > 800 ? "5.75%":(height > 700 ? "6.25%" : (height > 600 ? "10%" : height/12))),
//       width:"95%",
//       borderRadius: 15,
//       borderWidth:1,
//       flexDirection:'row',
//       alignContent:'space-around',
//       borderColor:'lightgray',
//   },
//   daySwitch: {
//       flexDirection:'row',
//       justifyContent:'space-evenly',
//       alignContent:'center',
//       width:'95%',
//       marginBottom:3,
//       marginTop:8,
//       height: (height > 700 ? "4.25%" : (height > 600 ? "7%" : height/15))
//   },
//   currentDayTextBackground: {
//       backgroundColor:'white',
//       paddingLeft: 20,
//       paddingRight: 20,
//       borderWidth:2,
//       borderColor:'lightgray',
//       borderRadius: 50,
//   },
//   todayDayTextBackground: {
//       backgroundColor:'#CEAD69',
//       paddingLeft: 20,
//       paddingRight: 20,
//       borderWidth:2,
//       borderColor:'lightgray',
//       borderRadius: 50,
//   },
//   currentDayText: {
//       color:'black',
//       fontSize:(Platform.OS === 'android' ? height/44:height/46),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light'),
//       fontWeight:'bold',
//       textAlign:'center'
//   },
//   rightIconView: {
//       position:'absolute',
//       right:0,
//   },
//   leftIconView: {
//       position:'absolute',
//       left:0,
//   },
//   titleFont: {
//       fontWeight:'bold',
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
//   },
//   alertBackground: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor:'#2E4B82',
//       height: 40,
//       width: '100%',
//       borderColor:'#fff',
//       borderBottomWidth:1,
//       margin:0
//   },
//   alertText: {
//       textAlign: 'center',
//       color:'#fff',
//       fontSize:(Platform.OS === 'android' ? height/40:height/44),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light'),
//   },
//   prayerTitleBackground: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor:'#fff',
//       height: (height > 700 ? "8%" : (height > 600 ? "12%" : height/13)),
//       paddingTop: 5,
//       paddingBottom: 5,
//       borderRadius:25,
//       borderWidth:2,
//       borderColor:'darkgray',
//       borderTopRightRadius:5,
//       borderTopLeftRadius:5,
//       width:'97%',
//       marginBottom:3,
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
//   },
//   prayerTitle: {
//       textAlign: 'center',
//       color:'black',
//       fontWeight:'bold',
//       fontSize:(Platform.OS === 'android' ? height/40:height/40),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light'),
//   },
//   clockPositioning: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor:'white',
//       paddingTop: 5,
//       paddingBottom: 5,
//       borderWidth: 1,
//       borderColor:'darkgray',
//   },
//   clockText: {
//       color: 'black',
//       fontWeight:'500',
//       fontSize: 15,
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light'),
//   },
//   prayerText: { 
//       flex:1,
//       textAlignVertical: 'center',
//       color: 'black',
//       fontWeight:'bold',
//       fontSize:(Platform.OS === 'android' ? height/44:height/46),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
//   },
//   prayerText2: {
//       flex:1,
//       textAlignVertical: 'center',
//       color: 'black',
//       fontWeight:'400',
//       fontSize:(Platform.OS === 'android' ? height/42:height/46),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
//   },
//   //Used for Athan & iqma prayer times header text.
//   prayerText3: {
//       flex:1,
//       textDecorationLine:'underline',
//       textAlignVertical: 'center',
//       color: 'black',
//       fontWeight:'bold',
//       fontSize:(Platform.OS === 'android' ? height/44:height/46),
//       fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
//   },
//   //Used for Athan & iqma prayer times header background.
//   prayerBackground: {
//       padding: 10,
//       margin: (height > 750 ? 10 :(height > 700 ? 8 : (height > 600 ? 5 : 5))), //give space between text
//       backgroundColor:'white',
//       height: (height > 800 ? "6%" : (height > 700 ? "7%" : (height > 600 ? "10%" : height/13))),//height/15,
//       width:"95%",
//       borderRadius: 15,
//       borderWidth:2,
//       flexDirection:'row',
//       alignContent:'space-around',
//       borderColor:'lightgray',
//   },
//   prayerBackground1: {
//       padding: 8,
//       margin: (height > 750 ? 10 :(height > 700 ? 8 : (height > 600 ? 5 : 5))), //give space between text
//       backgroundColor:'white',
//       height: (height > 800 ? "6%" :(height > 700 ? "6.75%" : (height > 600 ? "10%" : height/12))),//height/13,
//       width:"95%",
//       borderRadius: 45,
//       borderWidth:2,
//       flexDirection:'row',
//       alignContent:'space-around',
//       borderColor:'lightgray',
//   },
//   prayerBackground2: {
//       padding: 8,
//       margin: (height > 750 ? 10 :(height > 700 ? 8 : (height > 600 ? 5 : 5))), //give space between text
//       backgroundColor:'#CEAD69',
//       height: (height > 800 ? "6%" :(height > 700 ? "6.75%" : (height > 600 ? "10%" : height/12))),
//       width:"95%",
//       borderRadius: 45,
//       borderColor:'lightgray',
//       borderWidth:2,
//       flexDirection:'row',
//       alignContent:'space-around',
//       opacity: 1
//   },
// });