import React, {Component} from 'react';
import { SafeAreaView,Platform,Dimensions,Image,TouchableHighlight,StyleSheet, Text, View} from 'react-native';
import PageNav from './PageNav';
import HeaderOne from './Headers/Header';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

const {height,width} = Dimensions.get('window');

interface SideMenuProps {
    page: string
    logo: boolean
    title: string
    reactComp: any
    nav?: any
}

interface SideMenuState { 
    onPrayer:boolean,
    onEvents:boolean,
    onAlerts:boolean,
    onDonation:boolean,
    onSupport:boolean,
    onServices:boolean,
    mode: string,
}

/**
 * A page navigator to different pages on the app.
 * PageNav includes prayer times page, events page, 
 * alerts page, donation page, & support page
 * @extends Component
 * @exports PageNav
 */
export default class SideMenu extends Component<SideMenuProps, SideMenuState> {
   private drawer: DrawerLayout | null | undefined
   
    /**
     * @param {*} props 
     */
    constructor(props: SideMenuProps) {
        super(props);
        this.state = {
            onPrayer:false,
            onEvents:false,
            onAlerts:false,
            onDonation:false,
            onSupport:false,
            onServices:false,
            mode:this.props.page,
        }
    }

    /**
     * Reactjs Component function
     */
    componentDidMount(){
        this.setPageNavMode();
    }

    /**
     * updates pageNav state on what page it is on.
     * Pages: prayer times, events, alerts, donation, & support.
     */
    setPageNavMode() {
        if(this.props.page === "prayer"){
            this.setState({
                onPrayer:true,
                mode:'prayer'
            })
        }else if(this.props.page === "event"){
            this.setState({
                onEvents:true,
                mode:'event'
            })
        }else if(this.props.page === "alert"){
            this.setState({
                onAlerts:true,
                mode:'alert'
            })
        }else if(this.props.page === "donation"){
            this.setState({
                onDonation:true,
                mode:'donation'
            })
        }else if(this.props.page === "support"){
            this.setState({
                onSupport:true,
                mode:'support'
            })
        }
        else if(this.props.page === "services"){
            this.setState({
                onServices:true,
                mode:'services'
            })
        }
    }

    buttonAction = ()  =>
    {
        console.log('button pressed!');
    }

    /**
     * Closes the drawer if open.
     */
    closeDrawer = () => {
        if(this.drawer != null && this.drawer != undefined) {
            this.drawer.closeDrawer();
        }
    }

    /**
     * Navigates to the Prayer page.
     */
    handlePrayerButton = () => {
        if(this.state.onPrayer) 
            return; // if on page ignores
        this.closeDrawer();
        this.props.nav.navigate('prayer')  
    }

    /**
     * Navigates to the Event page.
     */
    handleEventButton = () => {
        if(this.state.onEvents) 
            return; // if on page ignore
        this.closeDrawer();
        this.props.nav.navigate('events')  
    }

    /**
     * Navigates to the Alert page.
     */
    handleAlertButton = () => {
        if(this.state.onAlerts) 
            return; // if on page ignore
        this.closeDrawer();
        //Actions.alerts()
        this.props.nav.navigate('alerts') 
    }

    /**
     * Navigates to Donation page.
     */
    handleDonationButton = () => {
        if(this.state.onDonation) 
            return; // if on page ignore
        this.closeDrawer();
        this.props.nav.navigate('donation') 
    }

    /**
     * Navigates to Support page.
     */
    handleSupportButton = () => {
        if(this.state.onSupport) 
            return; // if on page ignore
        this.closeDrawer();
        this.props.nav.navigate('support') 
    }

    /**
     * Navigates to Services page.
     */
    handleServicesButton = () => {
        if(this.state.onServices) 
            return; // if on page ignore
        this.closeDrawer();
        this.props.nav.navigate('allservices') 
    }

    renderDrawer = () => {
        return (
            <View nativeID='page-selector' style={styles.pageSelector}>
                <Image source={require('../resources/imgs/abuLogo.png')} style={styles.Icon}/>
                <TouchableHighlight onPress={this.handlePrayerButton} underlayColor='#AFC4C5' style={this.state.onPrayer ? styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button1' style={styles.Button} >
                        <Text style={this.state.onPrayer?styles.ButtonFont2:styles.ButtonFont1}>Home</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleEventButton}  underlayColor='#AFC4C5' style={this.state.onEvents?styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button2' style={styles.Button} >
                        <Text style={this.state.onEvents?styles.ButtonFont2:styles.ButtonFont1}>Events</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleAlertButton} underlayColor='#AFC4C5' style={this.state.onAlerts?styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button3' style={styles.Button} >
                        <Text style={this.state.onAlerts?styles.ButtonFont2:styles.ButtonFont1}>Alerts</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleDonationButton} underlayColor='#AFC4C5' style={this.state.onDonation?styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button4' style={styles.Button} >
                        <Text style={this.state.onDonation?styles.ButtonFont2:styles.ButtonFont1}>Donation</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleServicesButton} underlayColor='#AFC4C5' style={this.state.onServices?styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button5' style={styles.Button} >
                        <Text style={this.state.onServices?styles.ButtonFont2:styles.ButtonFont1}>Services</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleSupportButton} underlayColor='#AFC4C5' style={this.state.onSupport?styles.ButtonSelection2:styles.ButtonSelection}>
                    <View nativeID='Button5' style={styles.Button} >
                        <Text style={this.state.onSupport?styles.ButtonFont2:styles.ButtonFont1}>Support</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
      };

    /**
     * Open drawer.
     */
    openDrawer = () => {
        if(this.drawer != null && this.drawer != undefined) {
            this.drawer.openDrawer();
        }
    }

    /**
     * renders PageNav UI.
     */
    render() {
        return (
            <View style={{flex: 1}}>
                <DrawerLayout
                    ref={(drawer: DrawerLayout) => {
                        this.drawer = drawer;
                    }}
                    drawerWidth={width/1.75}
                    drawerPosition={'left'}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.renderDrawer}>
                    <View>
                        <HeaderOne logo={this.props.logo} menuaction={() => this.openDrawer()} >{this.props.title}</HeaderOne>
                        {this.props.reactComp}
                    </View>
                    
                </DrawerLayout>
                {/*Page navigator*/}
                <PageNav
                    mode={this.state.mode}
                    nav={this.props.nav}
                />
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    Icon: {
        justifyContent:'center',
        alignItems:'center',
        maxWidth: 125,
        maxHeight: 125,
        marginLeft:'20%',
        marginBottom:'20%',
        marginTop: '5%'
    },
    ButtonFont1: {
        textAlign:'left',
        color:(Platform.OS === 'android' ? '#fff':'#fff'),
        fontSize: width/20,
        borderColor:'#fff',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
        
    },
    ButtonFont2: {
        textAlign:'left',
        color:(Platform.OS === 'android' ? '#fff':'gray'),
        fontSize: width/20,
        borderColor:'#fff',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'AppleSDGothicNeo-Light')
        
    },
    ButtonIcon: {
        left: '28%',
        width: 17,
        height: 14,
    },
    Button: {        
        padding:5,
        marginTop:1,
        marginBottom:1,
        
    },
    ButtonSelection: {
        borderBottomWidth:0.5,
        borderColor:'#fff',
        
    },
    ButtonSelection2: {
        backgroundColor:'#fff',
        opacity:0.50,
        borderBottomWidth:0.5,
        borderColor:'#fff',
    },
    pageSelector: {
        height:'100%',
        backgroundColor:'#2E4B82',
        flex:1,
        flexDirection:'column',
        borderColor:'#fff',
        borderRightWidth:0.5
    }
  });
