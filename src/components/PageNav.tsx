import React, {Component} from 'react';
import { Dimensions,TouchableHighlight,StyleSheet, View, Text} from 'react-native';
// import Icon1 from 'react-native-vector-icons/MaterialIcons';
// import Icon2 from 'react-native-vector-icons/FontAwesome5';
// import Icon3 from 'react-native-vector-icons/FontAwesome';
const {height,width} = Dimensions.get('window');

interface PageNavProps {
    mode: string;
    nav?: any;
}

interface PageNavState {
    onPrayer:boolean;
    onEvents:boolean;
    onAlerts:boolean;
    onDonation:boolean;
    onMore:boolean;
    currentIndex: number;
    index: number;
}

/**
 * A page navigator to different pages on the app.
 * PageNav includes prayer times page, events page, 
 * alerts page, donation page, & support page
 * @extends Component
 * @exports PageNav
 *
 */
export default class PageNav extends Component<PageNavProps, PageNavState> {
    /**
     * @param {*} props 
     */
    constructor(props: PageNavProps) {
        super(props);
        this.state = {
            onPrayer:false,
            onEvents:false,
            onAlerts:false,
            onDonation:false,
            onMore:false,
            currentIndex: 0,
            index: 0,
        }
    }

    // New version of componentWillMount()
    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if(nextProps.mode === "prayer"){
            return({
                onPrayer:true,
                currentIndex:0,
            })
        }else if(nextProps.mode === "event"){
            return({
                onEvents:true,
                currentIndex:1,
            })
        }else if(nextProps.mode === "donation"){
            return({
                onDonation:true,
                currentIndex:2,
            })
        }else if(nextProps.mode === "alert"){
            return({
                onAlerts:true,
                currentIndex:3,
            })
        }else if(nextProps.mode === "more"){
            return({
                onMore:true,
                currentIndex:4,
            })
        }else {
            return({
                currentIndex:-1, // just leave any other nav at the services tab.
            })
        }
    }

    /**
     * Navigates to the Prayer page.
     */
    handlePrayerButton = () => {
        if(this.state.onPrayer) 
            return; // if on prayer page ignore  
        this.props.nav.navigate('prayer')
    }

    /**
     * Navigates to the Event page.
     */
    handleEventButton = () => {
        if(this.state.onEvents) 
            return; // if on events page ignore
        this.props.nav.navigate('events')
    }

    /**
     * Navigates to the Alert page.
     */
    handleAlertButton = () => {
        if(this.state.onAlerts) 
            return; // if on alerts page ignore
        this.props.nav.navigate('alerts')  
    }

    /**
     * Navigates to Donation page.
     */
    handleDonationButton = () => {
        if(this.state.onDonation) 
            return; // if on donation page ignore
        this.props.nav.navigate('donation')  
    }

    /**
     * Navigates to all list of services page.
     */
    handleAllServicesButton = () => {
        if(this.state.onMore) 
            return; // if on servicess page ignore
        this.props.nav.navigate('allservices')  
    }

    /**
     * Returns current button layout for specific page nav page.
     * @param {Boolean} isCurrentPage 
     */
    getCurrentButtonLayout(isCurrentPage: boolean) {
        if(isCurrentPage) {
            return styles.Button2;
        }
        return styles.Button;
    }

    /**
     * Returns current text jsx for specific page.
     * @param {Boolean} isCurrentPage 
     */
    getCurrentTextLayout = (isCurrentPage: boolean) => {
        if(isCurrentPage) {
            return this.getTextLayout();
        }
        return null;
    }

    /**
     * Returns current page jsx.
     */
    getTextLayout = () => {
        if(this.props.mode === "prayer"){
            return <Text style={styles.ButtonFont}>Home</Text>;
        }else if(this.props.mode === "event"){
            return(<Text style={styles.ButtonFont}>Events</Text>);
        }else if(this.props.mode === "donation"){
            return( <Text style={styles.ButtonFont}>Donation</Text>);
        }else if(this.props.mode === "alert"){
            return(<Text style={styles.ButtonFont}>Alerts</Text>);
        }else if(this.props.mode === "more"){
            return(<Text style={styles.ButtonFont}>More</Text>);
        }else {
            return(null);
        }
    }

    /**
     * renders PageNav UI.
     */
    render() {
        return (
            <View nativeID='page-selector' style={styles.pageSelector}>
                <TouchableHighlight onPress={this.handlePrayerButton} underlayColor='#AFC4C5' style={this.getCurrentButtonLayout(this.state.onPrayer)} hitSlop={{top:10,bottom:10,right:25,left:25}}>
                    <View nativeID='Button1' >
                        {/* <Icon1 size={(this.props.mode==="prayer") ? 24 : 30} color="#2E4B82" name="home" style={{alignSelf:'center'}}/> */}
                        {this.getCurrentTextLayout(this.state.onPrayer)}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleEventButton}  underlayColor='#AFC4C5' style={this.getCurrentButtonLayout(this.state.onEvents)} hitSlop={{top:10,bottom:10,right:25,left:25}}>
                    <View nativeID='Button2'  >
                        {/* <Icon1 size={(this.props.mode==="event") ? 24 : 30} color="#2E4B82" name="event" style={{alignSelf:'center'}} /> */}
                        {this.getCurrentTextLayout(this.state.onEvents)}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleDonationButton} underlayColor='#AFC4C5' style={this.getCurrentButtonLayout(this.state.onDonation)}>
                    <View nativeID='Button4' >
                        {/* <Icon2 size={(this.props.mode==="donation") ? 24 : 30} color="#2E4B82" name="donate" style={{alignSelf:'center'}}/> */}
                        {this.getCurrentTextLayout(this.state.onDonation)}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleAlertButton} underlayColor='#AFC4C5' style={this.getCurrentButtonLayout(this.state.onAlerts)} hitSlop={{top:10,bottom:10,right:25,left:25}}>
                    <View nativeID='Button3'  >
                        {/* <Icon3 size={(this.props.mode==="alert") ? 24 : 28} color="#2E4B82" name="bell" style={{alignSelf:'center'}}/> */}
                        {this.getCurrentTextLayout(this.state.onAlerts)}
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleAllServicesButton} underlayColor='#AFC4C5' style={this.getCurrentButtonLayout(this.state.onMore)}>
                    <View nativeID='Button5'  >
                        {/* <Icon1 size={(this.props.mode==="more") ? 24 : 28} color="#2E4B82" name="list" style={{alignSelf:'center'}}/> */}
                        {this.getCurrentTextLayout(this.state.onMore)}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    ButtonFont: {
        textAlign:'center',
        textAlignVertical:'center',
        color:'black',
        fontSize: width/27
    },
    ButtonIcon: {
        left: '28%',
        width: 17,
        height: 14,
        justifyContent:'center',
        alignItems:'center'
    },
    Button: {
        //backgroundColor:'black',
        padding: 5,
        justifyContent:'center',
        alignItems:'center',
        //alignContent:'center'
    },
    Button2: {
        backgroundColor:'#F0F8FF',
        padding:5,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        //opacity:0.90,
    },
    pageSelector: {
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignContent:'center',
        backgroundColor:'#fff',
        borderRadius: 1,
        height: 60,
        width: '100%',
        borderColor:'#2E4B82',
        borderTopWidth:1,
    }
  });
