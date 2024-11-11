import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, Platform, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

const ServiceCard = ({ title, description, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedView style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
      </View>
      <View style={styles.cardContent}>
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#757575" />
    </ThemedView>
  </TouchableOpacity>
);

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Dugsi Classes",
      description: "Islamic education for children and adults",
      icon: "school",
      onPress: () => {/* Navigate to Dugsi details */}
    },
    {
      id: 2,
      title: "Funeral Services",
      description: "Janazah prayer and burial assistance",
      icon: "heart",
      onPress: () => {/* Navigate to Funeral services */}
    },
    {
      id: 3,
      title: "Marriage Services",
      description: "Nikkah ceremonies and marriage counseling",
      icon: "people",
      onPress: () => {/* Navigate to Marriage services */}
    },
    {
      id: 4,
      title: "Prayer Times",
      description: "Daily prayer schedule and Jumu'ah timing",
      icon: "time",
      onPress: () => {/* Navigate to Prayer times */}
    },
    {
      id: 5,
      title: "Counseling",
      description: "Islamic counseling and guidance",
      icon: "chatbubbles",
      onPress: () => {/* Navigate to Counseling */}
    },
    {
      id: 6,
      title: "Zakat & Donations",
      description: "Calculate and pay Zakat, make donations",
      icon: "cash",
      onPress: () => {/* Navigate to Zakat */}
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Services</ThemedText>
      <ThemedText style={styles.subtitle}>
        Explore our mosque's services and programs
      </ThemedText>
      
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          icon={service.icon}
          onPress={service.onPress}
        />
      ))}
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
    marginBottom: 8,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});