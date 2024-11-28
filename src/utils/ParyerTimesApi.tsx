/**
 * 
 * This is a key service in masjid app. Which helps initialize
 * the prayer times notification of the device. 
 * 
 * Each time the app is launched all locally scheduled prayer times notifcaiton
 * should be removed & rescheduled. This is due limition of setting local notification
 * on ios and android devices.
 * 
 * TODO: Must implement background local notification reset for prayer times
 * schedule. Possible reset every few days...
 * 
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import ReadFB from '../services/readFB';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications'; 

/*********************GLOBAL VARIABLES*********************/
const prayer_times = {
    fajrAthan: new Date(),
    duhrAthan: new Date(), 
    asarAthan: new Date(), 
    maghribAthan: new Date(),
    ishaAthan: new Date(),
    fajrIqma: new Date(),
    duhrIqma: new Date(), 
    asarIqma: new Date(), 
    maghribIqma: new Date(),
    ishaIqma: new Date(),
}

var notificationIOSCount = 0;
/*****************************************************/

function onRegister(token: any): void {
    console.log("Notification System registered to phone successfully.");
}

function onNotif(notif: any): void {
    console.log("notification was pressed");
    console.log(notif);
    const didUserClick = Boolean(notif.userInteraction);
    const dataType = String(notif.data.type);
    // Only navigate if user clicks on Notification & is for events/alert notification.
    if (dataType.includes("Event") && didUserClick) {
        console.log("event notification nav to event page.");
    } else if (dataType.includes("Alert") && didUserClick) {
        console.log("alert notification nav to alert page.");
    }
}

/**
 * Schedule a notification using Expo Notifications
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {number} seconds - Delay in seconds
 */
async function scheduleNotification(title: string, body: string, seconds: number) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: { seconds: seconds },
    });
}

/**
 * Takes a Date object and
 * Returns a string time format 
 * time format: hh:mm AM/PM
 * @param {Date} time - current time
 */
function getTimeFormat(time: Date): string {
    var hours = 0;
    var minutes = 0;
    if (time != null) {
        hours = time.getHours();
        minutes = time.getMinutes();
    }
    var amOrPm = 'PM';
    var timeStr = '';

    if (hours < 12)
        amOrPm = 'AM';

    if (hours > 12)
        hours = hours - 12;

    timeStr += hours + ':';

    if (minutes < 10)
        timeStr += '0' + minutes;
    else
        timeStr += minutes;

    timeStr += ' ' + amOrPm;
    return timeStr;
}

/**
 * Takes info of date and time and converts into
 * a Date object
 * 
 * @param {string} month - current month
 * @param {string} date - current day
 * @param {string} year - current year
 * @param {string} string - a time formatted in a string.
 * @returns {Date} returns a date object.
 */
function stringToDate(month: any, day: any, year: any, string: string) {
    var arr1: string[], arr2: string[];
    try {
        arr1 = string.split(':');
        arr2 = arr1[1].split(' ');
        var hour = parseInt(arr1[0]);
        var min = parseInt(arr2[0]);
        var mer = arr2[1];
        if (mer === 'AM' && hour == 12)
            hour = 0;
        else if (mer === 'PM' && hour != 12)
            hour += 12;
        return new Date(year, month, day, hour, min, 0, 0);
    } catch (err) {
        console.log("error occurred for future notification: ", month + 1, day, year, string);
    }

    return new Date();
}

/**
 * Sets up the notification for current day
 * @param {Date} now 
 */
function handleCurrentDayPrayerTimes(now: Date) {
    if (notificationIOSCount >= 60 && notificationIOSCount < 64 && Platform.OS == "ios")
        return;
    if (now.getHours() <= prayer_times.fajrAthan.getHours()) {
        if ((now.getHours() === prayer_times.fajrAthan.getHours() && now.getMinutes() < prayer_times.fajrAthan.getMinutes())
            || now.getHours() !== prayer_times.fajrAthan.getHours()) {
            scheduleNotification("Fajr Prayer", `Fajr is at ${getTimeFormat(prayer_times.fajrAthan)}`, 0);
            notificationIOSCount++;
        }
    }
    if (now.getHours() <= prayer_times.duhrAthan.getHours()) {
        if (now.getHours() === prayer_times.duhrAthan.getHours() && now.getMinutes() < prayer_times.duhrAthan.getMinutes()
            || now.getHours() !== prayer_times.duhrAthan.getHours()) {
            scheduleNotification("Dhuhr Prayer", `Dhuhr is at ${getTimeFormat(prayer_times.duhrAthan)}`, 0);
            notificationIOSCount++;
        }
    }
    if (now.getHours() <= prayer_times.asarAthan.getHours()) {
        if (now.getHours() === prayer_times.asarAthan.getHours() && now.getMinutes() < prayer_times.asarAthan.getMinutes()
            || now.getHours() !== prayer_times.asarAthan.getHours()) {
            scheduleNotification("Asr Prayer", `Asr is at ${getTimeFormat(prayer_times.asarAthan)}`, 0);
            notificationIOSCount++;
        }
    }
    if (now.getHours() <= prayer_times.maghribAthan.getHours()) {
        if (now.getHours() === prayer_times.maghribAthan.getHours() && now.getMinutes() < prayer_times.maghribAthan.getMinutes()
            || now.getHours() !== prayer_times.maghribAthan.getHours()) {
            scheduleNotification("Maghrib Prayer", `Maghrib is at ${getTimeFormat(prayer_times.maghribAthan)}`, 0);
            notificationIOSCount++;
        }
    }
    if (now.getHours() <= prayer_times.ishaAthan.getHours()) {
        if (now.getHours() === prayer_times.ishaAthan.getHours() && now.getMinutes() < prayer_times.ishaAthan.getMinutes()
            || now.getHours() !== prayer_times.ishaAthan.getHours()) {
            scheduleNotification("Isha Prayer", `Isha is at ${getTimeFormat(prayer_times.ishaAthan)}`, 0);
            notificationIOSCount++;
        }
    }
}

/**
 * Setup up notification for five prayer times for one day.
 * @param {String} month 
 * @param {String} date 
 * @param {String} year 
 * @param {Array} prayer_times_arr 
 */
function handleFuturePrayerTimes(month: any, date: any, year: any, prayer_times_arr: string[]) {
    if (notificationIOSCount >= 60 && notificationIOSCount < 64 && Platform.OS == "ios")
        return;
    var fajrAthan = stringToDate(month, date, year, prayer_times_arr[1]);
    var fajrIqma = stringToDate(month, date, year, prayer_times_arr[2]);
    var duhrAthan = stringToDate(month, date, year, prayer_times_arr[3]);
    var duhrIqma = stringToDate(month, date, year, prayer_times_arr[4]);
    var asarAthan = stringToDate(month, date, year, prayer_times_arr[5]);
    var asarIqma = stringToDate(month, date, year, prayer_times_arr[6]);
    var maghribAthan = stringToDate(month, date, year, prayer_times_arr[7]);
    var maghribIqma = stringToDate(month, date, year, prayer_times_arr[8]);
    var ishaAthan = stringToDate(month, date, year, prayer_times_arr[9]);
    var ishaIqma = stringToDate(month, date, year, prayer_times_arr[10]);

    // Schedule notifications for future prayer times
    const now = new Date();
    if (fajrAthan > now) {
        scheduleNotification("Fajr Prayer", `Fajr is at ${getTimeFormat(fajrAthan)}`, (fajrAthan.getTime() - now.getTime()) / 1000);
    }
    if (duhrAthan > now) {
        scheduleNotification("Dhuhr Prayer", `Dhuhr is at ${getTimeFormat(duhrAthan)}`, (duhrAthan.getTime() - now.getTime()) / 1000);
    }
    if (asarAthan > now) {
        scheduleNotification("Asr Prayer", `Asr is at ${getTimeFormat(asarAthan)}`, (asarAthan.getTime() - now.getTime()) / 1000);
    }
    if (maghribAthan > now) {
        scheduleNotification("Maghrib Prayer", `Maghrib is at ${getTimeFormat(maghribAthan)}`, (maghribAthan.getTime() - now.getTime()) / 1000);
    }
    if (ishaAthan > now) {
        scheduleNotification("Isha Prayer", `Isha is at ${getTimeFormat(ishaAthan)}`, (ishaAthan.getTime() - now.getTime()) / 1000);
    }
}
/**
 * Set global prayer_times variable with offline data.
 * 
 * @param {integer} month - current month
 * @param {integer} date - current day
 * @param {integer} year - current year
 */
async function setData(month: number, date: number, year: number) {
    try {
        var monthDict: any = { 0: 'jan', 1: 'feb', 2: 'mar', 3: 'apr', 4: 'may', 5: 'jun', 6: 'jul', 7: 'aug', 8: 'sep', 9: 'oct', 10: 'nov', 11: 'dec' }
        var monthStr = monthDict[month];
        var name = monthStr + '_prayer_times_data';
        await AsyncStorage.getItem(name, (err, result) => {
            if (result == null || result == undefined) {
                throw new TypeError("Failed to get prayer times data from storage in setData!");
            }
            var prayer_times2 = JSON.parse(result);
            if (prayer_times2 === null) {
                Alert.alert("Sync Error occurred. Restart App.");
                return;
            }
            var prayer_times_arr = prayer_times2[date];
            prayer_times.fajrAthan = stringToDate(month, date, year, prayer_times_arr[1]);
            prayer_times.fajrIqma = stringToDate(month, date, year, prayer_times_arr[2]);
            prayer_times.duhrAthan = stringToDate(month, date, year, prayer_times_arr[3]);
            prayer_times.duhrIqma = stringToDate(month, date, year, prayer_times_arr[4]);
            prayer_times.asarAthan = stringToDate(month, date, year, prayer_times_arr[5]);
            prayer_times.asarIqma = stringToDate(month, date, year, prayer_times_arr[6]);
            prayer_times.maghribAthan = stringToDate(month, date, year, prayer_times_arr[7]);
            prayer_times.maghribIqma = stringToDate(month, date, year, prayer_times_arr[8]);
            prayer_times.ishaAthan = stringToDate(month, date, year, prayer_times_arr[9]);
            prayer_times.ishaIqma = stringToDate(month, date, year, prayer_times_arr[10]);
        }).catch(error => console.log('error in getting offline data.'));
        console.log('successful offline for prayer data');
    } catch (error) {
        console.log('offline error:');
        console.log(error);
    }
}

/**
 * helper method for _storeMonthsData() 
 * stores the current month data for offline storage.
 * @param {integer} currentMonth - a keeps track the current month 
 * @param {string} name {string} - a string unique name used to store in AsyncStorage.
 * @param {String} data - a json.stringify 2D array holding prayer times data.
 */
async function _storeCurrentMonth(currentMonth: number, name: string, data: string) {
    await AsyncStorage.setItem(name, JSON.stringify(data))
        .then(() => {
            prayerNotifications(currentMonth, data); // Ensure this function is defined
        }).catch((error) => console.log(error));
}

/**
 * stores all months data in async storage.
 * 
 */
async function _storeMonthsData() {
    notificationIOSCount = 0;
    var monthDict: { [key: number]: string } = { 0: 'jan', 1: 'feb', 2: 'mar', 3: 'apr', 4: 'may', 5: 'jun', 6: 'jul', 7: 'aug', 8: 'sep', 9: 'oct', 10: 'nov', 11: 'dec' }
    try {
        console.log('Storing prayer times');
        for (var currentMonth = 0; currentMonth < 12; currentMonth++) {
            var monthStr = monthDict[currentMonth];
            var name = monthStr + '_prayer_times_data';
            var current_promise_month = getPrayerData(currentMonth);
            if (current_promise_month == undefined) {
                throw new TypeError("failed to get prayer times data from DB.");
            }
            await current_promise_month.then((snapshot) => {
                const prayertimes_fb_data = snapshot.data();
                if (prayertimes_fb_data == undefined) {
                    throw new TypeError("failed to extract prayer times data from DB.");
                }
                const newData = prayertimes_fb_data.data;
                const data = JSON.parse(newData);
                _storeCurrentMonth(currentMonth, name, data);
            });
        }
        console.log('successfully stored all prayer times.');
    } catch (error) {
        console.log(error);
    }
}

/**
 * gets the current month prayer data.
 * index from 0-11 (0=Jan - 11=Dec)
 * @param {integer} month - a keeps track the current month 
 * @returns {promise} - returns a promise holding the current month data.
 */
function getPrayerData(month: number) {
    var promise = null;
    promise = ReadFB.getPrayerData(month); //ReadGS.getMonthPrayerData(month);
    return promise;
}

/**
 * Resets all notification 
 */
function resetPrayerTimesNotif() {
    // No need for this in Expo, handled differently
}

/**Cancels all notif */
function cancelPrayerTimesNotif() {
    // No need for this in Expo, handled differently
}

async function getGSPrayerData(current_promise_month: any, month: any, date: any, year: any) {
    await current_promise_month.then((snapshot: any) => {
        const dataFB = snapshot.data().data;
        const data = JSON.parse(dataFB);
        if (data === null || data === undefined) {
            setData(month, date, year);
            return;
        }
        var prayer_times_arr = data[date];
        prayer_times.fajrAthan = stringToDate(month, date, year, prayer_times_arr[1]);
        prayer_times.fajrIqma = stringToDate(month, date, year, prayer_times_arr[2]);
        prayer_times.duhrAthan = stringToDate(month, date, year, prayer_times_arr[3]);
        prayer_times.duhrIqma = stringToDate(month, date, year, prayer_times_arr[4]);
        prayer_times.asarAthan = stringToDate(month, date, year, prayer_times_arr[5]);
        prayer_times.asarIqma = stringToDate(month, date, year, prayer_times_arr[6]);
        prayer_times.maghribAthan = stringToDate(month, date, year, prayer_times_arr[7]);
        prayer_times.maghribIqma = stringToDate(month, date, year, prayer_times_arr[8]);
        prayer_times.ishaAthan = stringToDate(month, date, year, prayer_times_arr[9]);
        prayer_times.ishaIqma = stringToDate(month, date, year, prayer_times_arr[10]);

        _storeMonthsData();
        console.log("Send test local notif...");
        scheduleNotification("Test-Local-Notif", `Fajr is at ${getTimeFormat(prayer_times.fajrAthan)}`, 0);
    })
    .catch((error: any) => {
        console.error(error);
    });
}

function setStartPageNotification() {
    /**
     * Gets prayer information if network is available.
     * if not available get previous prayer data or makes it all null.
     */
    NetInfo.fetch().then(async connectionInfo => {
        var now = new Date(Date.now());
        var month = now.getMonth();
        var date = now.getDate(); //date getDate starts from 0. so add 1 to get accurate date.
        var year = now.getFullYear();
        if (connectionInfo.type === 'wifi' || connectionInfo.type === 'cellular') {
            var current_promise_month = getPrayerData(month);
            getGSPrayerData(current_promise_month, month, date, year);
        } else {
            console.log('getting offline prayer data.');
        }
    })
}

function setPrayerTimesAndroidChannelNotif() {
    // No need for this in Expo, handled differently
}

/**
 * Gets prayer information if network is available.
 * if not available get previous prayer data or makes it all null.
 */
NetInfo.fetch().then(async connectionInfo => {
    var now = new Date(Date.now());
    var month = now.getMonth();
    var date = now.getDate(); //date getDate starts from 0. so add 1 to get accurate date.
    var year = now.getFullYear();
    if (connectionInfo.type === 'wifi' || connectionInfo.type === 'cellular') {
        var current_promise_month = getPrayerData(month);
        getGSPrayerData(current_promise_month, month, date, year);
    } else {
        console.log('getting offline prayer data.');
    }
})

/**
 * Handles scheduling notifications for prayer times for a given month.
 * @param {String} currentMonth - The current month
 * @param {Array} data - The prayer times data
 */
function prayerNotifications(currentMonth: any, data: any) {
    var now = new Date(Date.now());
    var month = now.getMonth();
    var date = now.getDate(); //date getDate starts from 0. so add 1 to get accurate date.
    var year = now.getFullYear();
    if (currentMonth < month || currentMonth >= (month + 3) || (notificationIOSCount >= 60 && notificationIOSCount < 64 && Platform.OS == "ios"))
        return; //ends function if currentMonth passed.
    for (var i = 1; i < data.length; i++) {
        if (i == date && currentMonth == month) {
            handleCurrentDayPrayerTimes(now);
        } else if (i > date && currentMonth == month) {
            handleFuturePrayerTimes(currentMonth, i, year, data[i]);
        } else if (currentMonth != month) {
            handleFuturePrayerTimes(currentMonth, i, year, data[i]);
        }
    }
}

export {
    prayer_times,
    resetPrayerTimesNotif,
    setStartPageNotification,
    cancelPrayerTimesNotif,
    setPrayerTimesAndroidChannelNotif
}