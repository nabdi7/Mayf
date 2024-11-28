import React from 'react';
import { Platform,StyleSheet, View, TouchableHighlight} from 'react-native';
// import {Header} from '@rneui/themed';
// import Icon1 from 'react-native-vector-icons/AntDesign';


/**
 * HeaderThree Class Component - 
 * Header UI for the service pages.
 * @extends React.Component
 * @exports HeaderTwo
 */
export class ServiceHeader extends React.Component<{navigation:any, title:any},any> {
    constructor(props: any){
        super(props);  
    }

    /**
     * 
     */
    handleBottonPress = () => {
        this.props.navigation.navigate('allservices')  
    }

    /**
     * renders UI for header.
     */
    render () {
        return(
            /*Header*/
            <View>
                {/* <Header
                    leftComponent={
                        <TouchableHighlight onPress={this.handleBottonPress} style={{ }} underlayColor='#2E4B82' hitSlop={{top:10,bottom:10,right:15,left:10}}>
                            <Icon1
                                name='back'
                                color='#fff'
                                size={30} 
                            />
                        </TouchableHighlight>
                    }
                    centerComponent={{ text: this.props.title, style: styles.headerText }}
                    containerStyle={styles.header}
                />  */}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        color:'black',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        fontFamily: (Platform.OS === 'android' ? 'sans-serif-light':'GillSans-Light'),
        backgroundColor:'#2E4B82'
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
        color: '#fff'
    } 
});