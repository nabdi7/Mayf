import { firestore, storage } from './FirebaseConfig';
import { 
    collection, 
    getDocs, 
    query, 
    orderBy,
    doc,
    getDoc,
    DocumentData,
    QuerySnapshot 
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
  

/**
 * Firebase Primary Data
 */

/**
 * Get events data
 * @returns {Promise<QuerySnapshot<DocumentData>>} - containing data.
 */
export async function getPrimaryEventData() {
    const eventsRef = collection(firestore, 'PrimaryData', 'Events', '0');
    const eventsQuery = query(eventsRef, orderBy('date', 'asc'));
    return getDocs(eventsQuery);
}

/**
 * Get alert data
 * @returns {Promise<QuerySnapshot<DocumentData>>} - containing data.
 */
export async function getPrimaryAlertData() {
    const alertsRef = collection(firestore, 'PrimaryData', 'Alerts', '0');
    const alertsQuery = query(alertsRef, orderBy('date', 'asc'));
    return getDocs(alertsQuery);
}

/**
 * Get services data
 * @returns {Promise<QuerySnapshot<DocumentData>>} - containing data.
 */
export async function getPrimaryServiceData() {
    const servicesRef = collection(firestore, 'PrimaryData', 'Services', '0');
    return getDocs(servicesRef);
}

/**
 * Get contact data
 * @returns {Promise<DocumentData>} - containing data.
 */
export async function getPrimaryContactData() {
    const contactRef = doc(firestore, 'PrimaryData', 'ContactInfo');
    return getDoc(contactRef);
}

/**
 * Get Announcement data
 * @returns {Promise<DocumentData>} - containing data.
 */
export async function getPrimaryAnnouncmentData() {
    const announcementRef = doc(firestore, 'PrimaryData', 'Announcement');
    return getDoc(announcementRef);
}

/**
 * Get event image.
 * @returns {Promise<string>} - containing download URL.
 */
export async function getEventImageFB(imageName: string) {
    const imageRef = ref(storage, `Images/Events/${imageName}`);
    return getDownloadURL(imageRef);
}

function getPrayerMonthFile() {
  
}

/**
 * get prayer data
 * @returns {Promise} - containing data.
 */
export function getPrayerData(month: number) {
    switch(month) {
        case 0:
          return getJanPrayerData();
        case 1:
          return getFebPrayerData();
        case 2:
          return getMarPrayerData();
        case 3:
          return getAprPrayerData();
        case 4:
          return getMayPrayerData();
        case 5:
          return getJunPrayerData();
        case 6:
          return getJulPrayerData();
        case 7:
          return getAugPrayerData();
        case 8:
          return getSepPrayerData();
        case 9:
          return getOctPrayerData();
        case 10:
          return getNovPrayerData();
        case 11:
          return getDecPrayerData();
        default:
          //nothing....
    }
}

/**
 * Jan
 * @param {*} data 
 */
async function getJanPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'JanPD');
    return getDoc(ref);
}

/**
 * Feb
 * @param {*} data 
 */
async function getFebPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'FebPD');
    return getDoc(ref);
}

/**
 * Mar
 * @param {*} data 
 */
async function getMarPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'MarPD');
    return getDoc(ref);
}

/**
 * Apr
 * @param {*} data 
 */
async function getAprPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'AprPD');
    return getDoc(ref);
}

/**
 * May
 * @param {*} data 
 */
async function getMayPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'MayPD');
    return getDoc(ref);
}

/**
 * Jun
 * @param {*} data 
 */
async function getJunPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'JunPD');
    return getDoc(ref);
}

/**
 * Jul
 * @param {*} data 
 */
async function getJulPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'JulPD');
    return getDoc(ref);
}

/**
 * Aug
 * @param {*} data 
 */
async function getAugPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'AugPD');
    return getDoc(ref);
}

/**
 * Sep
 * @param {*} data 
 */
async function getSepPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'SepPD');
    return getDoc(ref);
}

/**
 * Oct
 * @param {*} data 
 */
async function getOctPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'OctPD');
    return getDoc(ref);
}

/**
 * Nov
 * @param {*} data 
 */
async function getNovPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'NovPD');
    return getDoc(ref);
}

/**
 * Dec
 * @param {*} data 
 */
async function getDecPrayerData() {
    const ref = doc(firestore, 'PrayerData', 'DecPD');
    return getDoc(ref);
}

export async function getCurrentMonthFileName() {
    const currentMonthRef = doc(firestore, 'PrayerData', 'currentMonth');
    return getDoc(currentMonthRef);
}

/**
 * Gets the current month prayer times url.
 * @returns {Promise<string>} - containing download URL.
 */
export async function currentPrayerScheduleUrl() {
    const snapshot = await getCurrentMonthFileName();
    const data = snapshot.data() as DocumentData;
    
    if(data == undefined) {
        throw TypeError("data is undefined");
    }
    
    const imageName = data.fileName;
    const storageRef = ref(storage, `PrayerTimes/${imageName}`);
    return getDownloadURL(storageRef);
}

export default {
   getPrimaryEventData,
   getPrimaryAlertData,
   getPrimaryServiceData,
   getPrimaryContactData,
   getEventImageFB,
   getPrayerData,
   getPrimaryAnnouncmentData,
   currentPrayerScheduleUrl,
   getCurrentMonthFileName
}