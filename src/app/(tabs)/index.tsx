import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Platform, Image, ScrollView } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function HomeScreen() {
  const prayerTimes = {
    fajr: {
      adhan: "5:45 AM",
      iqama: "6:15 AM",
    },
    sunrise: "7:15 AM",
    dhuhr: {
      adhan: "1:30 PM",
      iqama: "2:00 PM",
    },
    asr: {
      adhan: "4:45 PM",
      iqama: "5:15 PM",
    },
    maghrib: {
      adhan: "7:30 PM",
      iqama: "7:35 PM",
    },
    isha: {
      adhan: "9:00 PM",
      iqama: "9:30 PM",
    },
  };

  const fridayPrayer = {
    title: "Jumu'ah",
    khutbah: "1:00 PM",
    prayer: "1:30 PM",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Prayer Times Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Prayer Times</ThemedText>

        <View style={styles.prayerTimesContainer}>
          {/* Time labels row */}
          <View style={styles.timeLabelsRow}>
            <View style={styles.prayerNameSpace} />
            <View style={styles.timesContainer}>
              <ThemedText style={styles.timeLabel}>Adhan</ThemedText>
              <ThemedText style={styles.timeLabel}>Iqama</ThemedText>
            </View>
          </View>

          {/* Prayer times rows */}
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <View key={prayer} style={styles.prayerTime}>
              <View style={styles.prayerNameContainer}>
                <Ionicons
                  name={prayer === "sunrise" ? "sunny-outline" : "time-outline"}
                  size={24}
                  color="#4A5568"
                />
                <ThemedText style={styles.prayerName}>
                  {prayer === "maghrib"
                    ? "Maghrib"
                    : prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                </ThemedText>
              </View>
              {typeof time === "string" ? (
                <View style={styles.timesContainer}>
                  <ThemedText style={styles.timeText}>{time}</ThemedText>
                  <View style={styles.timeSpace} />
                </View>
              ) : (
                <View style={styles.timesContainer}>
                  <ThemedText style={styles.timeText}>{time.adhan}</ThemedText>
                  <ThemedText style={styles.timeText}>{time.iqama}</ThemedText>
                </View>
              )}
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Friday Prayer Section */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.fridayContainer}>
          <Ionicons name="calendar-outline" size={24} color="#4A5568" />
          <ThemedView style={styles.fridayDetails}>
            <ThemedText style={styles.fridayTitle}>
              {fridayPrayer.title}
            </ThemedText>
            <ThemedText style={styles.fridayTime}>
              Khutbah: {fridayPrayer.khutbah} | Prayer: {fridayPrayer.prayer}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  section: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  prayerTimesContainer: {
    gap: 10,
  },
  timeLabelsRow: {
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  prayerNameSpace: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: "#718096",
    width: 70,
    textAlign: "center",
  },
  prayerTime: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  prayerNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  prayerName: {
    marginLeft: 10,
    fontSize: 16,
  },
  timesContainer: {
    flexDirection: "row",
    width: 140,
    justifyContent: "space-between",
  },
  timeSpace: {
    width: 70,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "500",
    width: 70,
    textAlign: "center",
  },
  fridayContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  fridayDetails: {
    marginLeft: 10,
    flex: 1,
  },
  fridayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "#2D3748",
  },
  fridayTime: {
    fontSize: 14,
    color: "#4A5568",
    marginTop: 4,
  },
});
