import React, {Component} from 'react';
import {  Text, View } from 'react-native';


interface ClockState {
    currentTime : string;
    date: Date;
}

export class Clock {
    private clockState: ClockState; 

    constructor() {
        this.clockState = {
            currentTime: "",
            date: new Date()
        }
        this.updateCurrentTime();
    }

    /**
     * Updates current time in specialized format and updates
     * it the state currentTime.
     */
    public updateCurrentTime = () => {
        var timeNow = new Date();
        var month = timeNow.getMonth();
        var day = timeNow.getDay();
        var hour = timeNow.getHours(); //24 hour time
        var min = timeNow.getMinutes();
        var sec = timeNow.getSeconds();
        var amOrPm = 'PM';
        
        const months: {[monthIndex: number]: string} = {
            0:'January', 1:'February', 2:'March', 3:'April',
            4:'May', 5:'June', 6:'July', 7:'August', 8:'September',
            9:'October', 10:'November', 11:'December'
        }

        const days: {[dayIndex: number]: string}  = {
            0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wensday',
            4:'Thursday', 5:'Friday', 6:'Saturday'
        }

        // minutes & secs string format.
        var minString:string, secString:string;

        if(hour < 12)
            amOrPm = 'AM';

        if(min < 10)
            minString = '0' + min;
        else 
            minString = min.toString();

        if( sec < 10 )
            secString = '0' + sec;
        else
            secString = sec.toString();
        
        if(hour > 12)
            hour = hour - 12;
        
        if(hour == 0)
            hour = 12;


        this.clockState.currentTime = (days[day]+' '+  months[month] + ', ' + timeNow.getDate() + '  |  ' + hour + ':' + minString + ':' + secString + ' ' + amOrPm);
        this.clockState.date = timeNow;
    }

    public getCurrentTimeStr(): string {
        return this.clockState.currentTime;
    }

    public getDate(): Date {
        return this.clockState.date;
    }

}

interface ClockCompProps {
    style: any; // basically style sheet for clock. if adjustment need to be made.
}

interface ClockCompState {
    clock: Clock
}

/**
 * Clock Class Component 
 * @extends Component
 * @exports Clock
 */
export class ClockComp extends Component<ClockCompProps, ClockCompState> {
    private timer: any
    /**
     * 
     */
    constructor(props: any){
        super(props);
        this.state = {
           clock: new Clock()
        }
        this.timer = 0;
        this.updateCurrentTime();
    }

    /**
     * Get current time in specialized format and updates
     * it the state currentTime.
     */
    updateCurrentTime = () => {
        this.state.clock.updateCurrentTime();
    }

    /**
     * update timer/clock.
     */
    componentDidMount() {
        this.timer = setInterval(() => {
            this.updateCurrentTime();
        }, 1000);
    }  

    /** 
     * refreshes timer.
    */
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * @returns {Date} clocks time.
     */
    getClockTime() {
        return this.state.clock.getDate();
    }

    /**
     * Renders Clock UI
     */
    render() {
        
        return (
            <View>
                <Text style={this.props.style}>{this.state.clock.getCurrentTimeStr()}</Text>
            </View>
        );
    }
}

