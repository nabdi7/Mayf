import React from 'react';
// import {Header} from '@rneui/themed';
import { Platform,StyleSheet, View, TouchableHighlight} from 'react-native';

/**
 * SupportHeader Class Component - 
 * Header UI for the support pages.
 * @extends React.Component
 * @exports HeaderTwo
 */
export class SupportHeader extends React.Component<{navigation:any, support:boolean, title:string},any> {
    constructor(props: any){
        super(props);  
    }

    /**
     * 
     */
    handleBottonPress = () => {
        if(this.props.support)
            this.props.navigation.navigate('support');
        else
            this.props.navigation.navigate('admin');
    }

    /**
     * renders UI for header.
     */
    render () {
        return(
            <View>
                {/* <Header
                    leftComponent={
                        <TouchableHighlight underlayColor='#AFC4C5' onPress={this.handleBottonPress} style={{paddingRight:10, paddingLeft:15}} hitSlop={{top:10,bottom:10,right:10,left:10}}>
                            <View style={styles.triangle}/>
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
    triangle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        transform: [
            {rotate: '-90deg'}
        ]
    },
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
