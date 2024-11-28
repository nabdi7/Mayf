import { Platform, Alert } from 'react-native';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  deleteObject,
  getDownloadURL 
} from 'firebase/storage';
import { ref as dbRef, set } from 'firebase/database';
import { firestore, storage, database } from './FirebaseConfig';
import { getCurrentMonthFileName } from './readFB';

/**
 * Get events data
 * @param status  - a string wether to for new, edit, or delete data.
 * @param data - an array containing data.
 * @returns {Promise} - containing data.
 */
async function updatePrimaryEventData(status: any, data: any) {
  if (status === "new") {
    const eventsRef = collection(firestore, 'PrimaryData', 'Events', '0');
    const date = new Date(data[0], (data[1] - 1), data[2]);
    
    try {
      await addDoc(eventsRef, {
        date: date,
        image: data[8],
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        location: data[7]
      });
    } catch (err) {
      Alert.alert("Failed to add new event data.");
    }
  } else if (status === "edit") {
    const eventRef = doc(firestore, 'PrimaryData', 'Events', '0', data[9]);
    const date = new Date(data[0], (data[1] - 1), data[2]);
    
    try {
      await updateDoc(eventRef, {
        date: date,
        image: data[8],
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        location: data[7]
      });
    } catch (err) {
      Alert.alert("Failed to update event data.");
    }
  } else if (status === "delete") {
    const eventRef = doc(firestore, 'PrimaryData', 'Events', '0', data[0]);
    try {
      await deleteDoc(eventRef);
      console.log("Event data removed successfully.");
    } catch (err) {
      Alert.alert("Failed to remove event data.");
    }
  }
}

/**
 * Get alert data
 * @returns {Promise} - containing data.
 */
async function updatePrimaryAlertData(status: any, data: any) {
  if (status === "new") {
    const alertsRef = collection(firestore, 'PrimaryData', 'Alerts', '0');
    const date = new Date(data[0], (data[1] - 1), data[2]);
    
    try {
      await addDoc(alertsRef, {
        date: date,
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        alertType: data[7]
      });
    } catch (err) {
      Alert.alert("Failed to add new alert data.");
    }
  } else if (status === "edit") {
    const alertRef = doc(firestore, 'PrimaryData', 'Alerts', '0', data[8]);
    const date = new Date(data[0], (data[1] - 1), data[2]);
    
    try {
      await updateDoc(alertRef, {
        date: date,
        startTime: data[3],
        endTime: data[4],
        title: data[5],
        description: data[6],
        alertType: data[7]
      });
    } catch (err) {
      Alert.alert("Failed to update alert data.");
    }
  } else if (status === "delete") {
    const alertRef = doc(firestore, 'PrimaryData', 'Alerts', '0', data[0]);
    try {
      await deleteDoc(alertRef);
      console.log("Alert data removed successfully.");
    } catch (err) {
      Alert.alert("Failed to remove alert data.");
    }
  }
}

/**
 * Get services data
 * @returns {Promise} - containing data.
 */
async function updatePrimaryServiceData(status: any, data: any) {
  if (status === "new") {
    const servicesRef = collection(firestore, 'PrimaryData', 'Services', '0');
    try {
      await addDoc(servicesRef, {
        title: data[0],
        description: data[1],
      });
      Alert.alert("New service data added successfully.");
    } catch (err) {
      Alert.alert("Failed to add new service data.");
    }
  } else if (status === "edit") {
    const serviceRef = doc(firestore, 'PrimaryData', 'Services', '0', data[2]);
    try {
      await updateDoc(serviceRef, {
        title: data[0],
        description: data[1],
      });
      Alert.alert("Service data updated successfully.");
    } catch (err) {
      Alert.alert("Failed to update service data.");
    }
  } else if (status === "delete") {
    const serviceRef = doc(firestore, 'PrimaryData', 'Services', '0', data[0]);
    try {
      await deleteDoc(serviceRef);
      Alert.alert("Service data removed successfully.");
    } catch (err) {
      Alert.alert("Failed to remove service data.");
    }
  }
}

/**
 * Get contact data
 * @returns {Promise} - containing data.
 */
async function updatePrimaryContactData(data: any) {
  const contactRef = doc(firestore, 'PrimaryData', 'ContactInfo');
  try {
    await updateDoc(contactRef, {
      phoneNumber: data[0],
      location: data[2],
      email: data[1],
    });
    Alert.alert("Contact info updated successfully.");
  } catch (err) {
    Alert.alert("Failed to update contact info.");
  }
}

/**
 * Get Announcement data
 * @returns {Promise} - containing data.
 */
async function updatePrimaryAnnouncmentData(mess: any) {
  const announcementRef = doc(firestore, 'PrimaryData', 'Announcement');
  try {
    await updateDoc(announcementRef, {
      message: mess
    });
    Alert.alert("Home page announcement updated successfully.");
  } catch (err) {
    Alert.alert("Failed to update home page announcement.");
  }
}

/**
 * Update file name in the database.
 * @param {*} name 
 */
async function updateCurrentMonthFileName(name: any) {
  const monthRef = doc(firestore, 'PrayerData', 'currentMonth');
  try {
    await updateDoc(monthRef, {
      fileName: name
    });
    Alert.alert("Update current month prayer times pdf successfully.");
  } catch (err) {
    Alert.alert("Failed to update current month prayer times pdf.");
  }
}

/**
 * Upload current prayer times pdf to storage.
 * @param {*} img 
 */
async function uploadCurrentPrayerTimesPdf(img: any) {
  console.log("Info on Image: ", img);
  try {
    const uri = Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri;
    const filename = img.fileName;
    const storageRef = ref(storage, `PrayerTimes/${filename}`);
    
    const response = await fetch(uri);
    const blob = await response.blob();
    
    await uploadBytes(storageRef, blob);
    Alert.alert("PDF prayer times schedule successfully uploaded");
  } catch (err) {
    console.log("Error has occurred: ", err);
    Alert.alert("Failed to upload please try again.");
  }
}

/**
 * Removes the current prayer times file from storage.
 * @param {*} oldPrayerTimesFileName 
 */
async function removePrayerTimesPdf(oldPrayerTimesFileName: any) {
  const storageRef = ref(storage, `PrayerTimes/${oldPrayerTimesFileName}`);
  try {
    await deleteObject(storageRef);
  } catch (err) {
    console.log("Error deleting file:", err);
  }
}

async function sendPushNotification(data: any) {
  const notifRef = dbRef(database, `PushNotif/${data}`);
  try {
    await set(notifRef, data);
    console.log("Success update on notif");
  } catch (err) {
    console.log("Failed to update notif.");
  }
}

/**
 * Update prayer data
 * @returns {Promise} - containing data.
 */
async function updatePrayerData(month: any, data: any) {
  switch (month) {
    case 0: updateJanPrayerData(data); break;
    case 1: updateFebPrayerData(data); break;
    case 2: updateMarPrayerData(data); break;
    case 3: updateAprPrayerData(data); break;
    case 4: updateMayPrayerData(data); break;
    case 5: updateJunPrayerData(data); break;
    case 6: updateJulPrayerData(data); break;
    case 7: updateAugPrayerData(data); break;
    case 8: updateSepPrayerData(data); break;
    case 9: updateOctPrayerData(data); break;
    case 10: updateNovPrayerData(data); break;
    case 11: updateDecPrayerData(data); break;
  }
}

// Helper function to update prayer data for a specific month
async function updateMonthPrayerData(month: string, data: any) {
  const prayerRef = doc(firestore, 'PrayerData', `${month}PD`);
  try {
    await updateDoc(prayerRef, { data: data });
    Alert.alert(`${month} prayer data updated successfully.`);
  } catch (err) {
    Alert.alert("Failed to update prayer data.");
  }
}

// Month-specific prayer data update functions
async function updateJanPrayerData(data: any) { await updateMonthPrayerData('Jan', data); }
async function updateFebPrayerData(data: any) { await updateMonthPrayerData('Feb', data); }
async function updateMarPrayerData(data: any) { await updateMonthPrayerData('Mar', data); }
async function updateAprPrayerData(data: any) { await updateMonthPrayerData('Apr', data); }
async function updateMayPrayerData(data: any) { await updateMonthPrayerData('May', data); }
async function updateJunPrayerData(data: any) { await updateMonthPrayerData('Jun', data); }
async function updateJulPrayerData(data: any) { await updateMonthPrayerData('Jul', data); }
async function updateAugPrayerData(data: any) { await updateMonthPrayerData('Aug', data); }
async function updateSepPrayerData(data: any) { await updateMonthPrayerData('Sep', data); }
async function updateOctPrayerData(data: any) { await updateMonthPrayerData('Oct', data); }
async function updateNovPrayerData(data: any) { await updateMonthPrayerData('Nov', data); }
async function updateDecPrayerData(data: any) { await updateMonthPrayerData('Dec', data); }

async function uploadEventImages(img: any) {
  console.log("Info on Image: ", img);
  try {
    const uri = Platform.OS === 'ios' ? img.uri.replace('file://', '') : img.uri;
    const filename = img.fileName;
    const storageRef = ref(storage, `Images/Events/${filename}`);
    
    const response = await fetch(uri);
    const blob = await response.blob();
    
    await uploadBytes(storageRef, blob);
    Alert.alert("Image successfully uploaded");
  } catch (err) {
    console.log("Error has occurred: ", err);
    Alert.alert("Failed to upload please try again.");
  }
}

async function deleteEventImage(imageName: any) {
  const storageRef = ref(storage, `Images/Events/${imageName}`);
  try {
    await deleteObject(storageRef);
    console.log('Event Image was successfully deleted');
  } catch (error) {
    console.log("Delete Image: ", error.message);
  }
}

export {
  updatePrimaryEventData,
  updatePrimaryAlertData,
  updatePrimaryServiceData,
  updatePrimaryContactData,
  uploadEventImages,
  deleteEventImage,
  updatePrayerData,
  sendPushNotification,
  updatePrimaryAnnouncmentData,
  updateCurrentMonthFileName,
  uploadCurrentPrayerTimesPdf,
  removePrayerTimesPdf
};