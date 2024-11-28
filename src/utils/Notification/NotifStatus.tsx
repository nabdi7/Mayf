
import AsyncStorage from '@react-native-async-storage/async-storage';

set_NS();
const notificationStatus = {
    sound: true,
    vibration: true,
    on: true,
}
store_NS(notificationStatus.on, notificationStatus.sound, notificationStatus.vibration);

async function store_NS(onStatus:boolean,soundStatus:boolean, vibrationStatus:boolean) {
    var temp = {
        on: onStatus,
        sound: soundStatus,
        vibration: vibrationStatus,
    }
    notificationStatus.on = onStatus;
    notificationStatus.sound = soundStatus;
    notificationStatus.vibration = vibrationStatus;
    await AsyncStorage.setItem('notif_status',JSON.stringify(temp))
        .then(() => {
            console.log('notification updated successfully.')
    }).catch((error) => console.log(error));
}

async function set_NS() {
    try {
        await AsyncStorage.getItem('notif_status',(err,result) => {
            if(result == null || result == undefined) {
                console.error("Failed to find notif_status from storage.");
                return;
            }
            var value = JSON.parse(result);
            if(value === null) {
                notificationStatus.on = true;
                notificationStatus.sound = true;
                notificationStatus.vibration = true;
            }else {
                notificationStatus.on = value.on;
                notificationStatus.sound = value.sound;
                notificationStatus.vibration = value.vibration;
            }
            //console.log(notificationStatus)
           
        }).catch(error => console.log('error in getting offline Notfi data.'))
    }catch(error) {
        console.log('offline error:');
        console.log(error);
        notificationStatus.on = true;
        notificationStatus.sound = true;
        notificationStatus.vibration = true;
    }
}

export {notificationStatus, store_NS, set_NS}