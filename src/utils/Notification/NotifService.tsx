import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';
import { notificationStatus } from './NotifStatus';

interface NotifServiceState {
    fajrID: string;
    dhuhrID: string;
    asrID: string;
    maghribID: string;
    ishaID: string;
}

export default class NotifService {
    private state: NotifServiceState;
    private lastId: number;
    private history: any[];

    constructor() {
        this.lastId = 0;
        this.history = [];
        this.state = {
            fajrID: 'fajr',
            dhuhrID: 'duhr',
            asrID: 'asr',
            maghribID: 'maghrib',
            ishaID: 'isha'
        };
    }

    async configure() {
        // Request permissions for notifications
        await Notifications.requestPermissionsAsync();
        // Create a notification channel for Android
        await Notifications.setNotificationChannelAsync('default_notification_channel_id', {
            name: 'Prayer Times Notification',
            importance: AndroidImportance.HIGH,
            vibrationPattern: notificationStatus.vibration ? [0, 250, 250, 250] : undefined, // Set vibration pattern if enabled
        });
    }

    async prayerLocalNotif(prayerName: string, athanTime: string, iqamaTime: string) {
        this.lastId++;
        if (notificationStatus.on === false) {
            this.cancelAll();
            return;
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `Salat ${prayerName} Athan`,
                body: `Athan: ${athanTime}  Iqama: ${iqamaTime}`,
                sound: notificationStatus.sound ? 'al_hossaini30.mp3' : undefined,
            },
            trigger: null, // Trigger immediately
        });

        this.history.push({ id: notificationId, prayerName, athanTime, iqamaTime });
    }

    async prayerScheduleNotifToday(prayerName: string, athanTime: string, iqamaTime: string) {
        if (notificationStatus.on === false) {
            this.cancelAll();
            return;
        }

        await this.prayerLocalNotif(prayerName, athanTime, iqamaTime);
    }

    async prayerScheduleNotifFuture(prayerName: string, athanTime: string, iqamaTime: string, scheduleTime: Date) {
        if (notificationStatus.on === false) {
            this.cancelAll();
            return;
        }

        const triggerDate = new Date(scheduleTime);
        const timeDiff = (triggerDate.getTime() - Date.now()) / 1000; // Calculate seconds until the trigger

        if (timeDiff <= 0) {
            console.error("Cannot schedule notification: time interval must be greater than 0.");
            return; // Exit if the time is not valid
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Salat ${prayerName} Athan`,
                body: `Athan: ${athanTime}  Iqama: ${iqamaTime}`,
                sound: notificationStatus.sound ? 'al_hossaini.mp3' : undefined,
            },
            trigger: {
                seconds: timeDiff, // Schedule for future
            },
        });
    }

    async resetNotifications() {
        console.log('notification being reset...');
        await this.cancelAll();
        for (const current of this.history) {
            await this.prayerLocalNotif(current.prayerName, current.athanTime, current.iqamaTime);
        }
    }

    async cancelAll() {
        this.history = [];
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    getHistory() {
        return this.history;
    }
}