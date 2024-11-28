import React from 'react';
import { Image,Platform,StyleSheet, View,TouchableHighlight} from 'react-native';
// import {Header, Icon} from '@rneui/themed';

interface HeaderProps {
    logo: boolean
    menuaction: () => void
    children: any
}

interface HeaderState {
    
}

/**
 * Header Class Compenent
 * Header UI for the main pages i.e PrayerPage, event, etc.
 * @extends React.Component
 * @exports Header
 */
export default class HeaderOne extends React.Component<HeaderProps, HeaderState> {
    
    constructor(props: HeaderProps){
        super(props);
        this.state = {
            
        }
    }

    renderLogo = () => {
        if(this.props.logo === true) {
            return (
                <Image
                    style={{width:40, height:40}}
                    source={require('../../resources/imgs/abuLogo.png')}
                />
            )
        }
    }

    /**
     * Renders UI.
     */
    render () {
        return(
            /*Header*/
            <View>
                {/* <Header
                    // leftComponent={
                    //     <TouchableHighlight onPress={this.props.menuaction} style={{ }} underlayColor='#2E4B82' hitSlop={{top:10,bottom:10,right:15,left:10}}>
                    //         <Icon
                    //             name='menu'
                    //             color='#fff' 
                    //         />
                    //     </TouchableHighlight>
                    // }
                    // rightComponent={
                    //     this.renderLogo()
                    // }
                    centerComponent={{ text: this.props.children, style: styles.headerText }}
                    containerStyle={styles.header}
                /> */}
                
            </View>

        );
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2E4B82',
        padding: 20,
        //opacity:0.9
    },
    headerText: {
        color: '#fff',
        fontSize: (Platform.OS === 'android' ? 22:24),
        textAlign: 'center',
        padding: 1,
        fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'GillSans-Light'),
    }, 
    sideMenuBody: {
        backgroundColor:'black',
        color: '#fff',
        //height:'100%',
        //width:'75%',
        //position:'absolute'
    }
});
