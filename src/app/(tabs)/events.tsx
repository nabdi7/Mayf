import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

const EventCard = ({ title, date, time, description, category, icon, status }) => (
  <View style={styles.eventCard}>
    <View style={styles.eventHeader}>
      <View style={styles.headerLeft}>
        <Ionicons name={icon} size={24} color="#2196F3" />
        <ThemedText style={styles.categoryText}>{category}</ThemedText>
      </View>
      <View style={[styles.statusIndicator, 
        status === 'ongoing' ? styles.statusOngoing : 
        status === 'upcoming' ? styles.statusUpcoming : 
        styles.statusCompleted
      ]}>
        <ThemedText style={styles.statusText}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </ThemedText>
      </View>
    </View>
    <ThemedText style={styles.eventTitle}>{title}</ThemedText>
    <View style={styles.eventDetails}>
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={16} color="#666" />
        <ThemedText style={styles.detailText}>{date}</ThemedText>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <ThemedText style={styles.detailText}>{time}</ThemedText>
      </View>
    </View>
    <ThemedText style={styles.eventDescription}>{description}</ThemedText>
  </View>
);

export default function Events() {
  const events = [
    {
      title: "Fajr Prayer",
      date: "Daily",
      time: "5:30 AM",
      description: "Daily congregational Fajr prayer followed by morning adhkar.",
      category: "Daily Prayer",
      icon: "sunny-outline",
      status: "upcoming"
    },
    {
      title: "Dhuhr Prayer",
      date: "Daily",
      time: "1:30 PM",
      description: "Daily congregational Dhuhr prayer.",
      category: "Daily Prayer",
      icon: "sunny-outline",
      status: "upcoming"
    },
    {
      title: "Asr Prayer",
      date: "Daily",
      time: "4:45 PM",
      description: "Daily congregational Asr prayer.",
      category: "Daily Prayer",
      icon: "sunny-outline",
      status: "upcoming"
    },
    {
      title: "Maghrib Prayer",
      date: "Daily",
      time: "Sunset",
      description: "Daily congregational Maghrib prayer.",
      category: "Daily Prayer",
      icon: "moon-outline",
      status: "upcoming"
    },
    {
      title: "Isha Prayer",
      date: "Daily",
      time: "8:30 PM",
      description: "Daily congregational Isha prayer.",
      category: "Daily Prayer",
      icon: "moon-outline",
      status: "upcoming"
    },
    {
      title: "Friday Prayer",
      date: "Every Friday",
      time: "1:00 PM",
      description: "Weekly Jumu'ah prayer and khutbah. Please arrive 15 minutes early.",
      category: "Special Prayer",
      icon: "people-outline",
      status: "upcoming"
    },
    {
      title: "Quran Study Circle",
      date: "Every Sunday",
      time: "7:30 PM",
      description: "Weekly Quran study and discussion with our resident scholar.",
      category: "Education",
      icon: "book-outline",
      status: "upcoming"
    },
    {
      title: "Islamic Studies",
      date: "Every Saturday",
      time: "6:00 PM",
      description: "Weekly class covering various Islamic topics.",
      category: "Education",
      icon: "school-outline",
      status: "upcoming"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Events</ThemedText>
      <View style={styles.eventsContainer}>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  eventsContainer: {
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "500",
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusOngoing: {
    backgroundColor: "#4CAF50",
  },
  statusUpcoming: {
    backgroundColor: "#FF9800",
  },
  statusCompleted: {
    backgroundColor: "#9E9E9E",
  },
  statusText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  eventDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 8,
    color: "#666",
  },
  eventDescription: {
    color: "#666",
    lineHeight: 20,
  }
});