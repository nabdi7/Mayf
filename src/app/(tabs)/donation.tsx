import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

const DonationOption = ({ title, icon, onPress, isSelected }) => (
  <TouchableOpacity 
    style={[styles.optionCard, isSelected && styles.optionCardSelected]} 
    onPress={onPress}
  >
    <Ionicons name={icon} size={24} color={isSelected ? "#fff" : "#4CAF50"} />
    <ThemedText style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
      {title}
    </ThemedText>
  </TouchableOpacity>
);

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = ['10', '50', '100', '500'];

  const donationOptions = [
    { title: 'General Donation', icon: 'heart-outline' },
    { title: 'Zakat', icon: 'gift-outline' },
    { title: 'Sadaqah', icon: 'hand-right-outline' },
    { title: 'Building Fund', icon: 'home-outline' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Donation</ThemedText>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Select Amount</ThemedText>
        <View style={styles.amountGrid}>
          {predefinedAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.amountButton,
                selectedAmount === amount && styles.amountButtonSelected
              ]}
              onPress={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
            >
              <ThemedText 
                style={[
                  styles.amountText,
                  selectedAmount === amount && styles.amountTextSelected
                ]}
              >
                ${amount}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customAmountContainer}>
          <TextInput
            style={styles.customAmountInput}
            placeholder="Enter custom amount"
            value={customAmount}
            onChangeText={(text) => {
              setCustomAmount(text);
              setSelectedAmount('');
            }}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Purpose</ThemedText>
        <View style={styles.optionsGrid}>
          {donationOptions.map((option) => (
            <DonationOption
              key={option.title}
              {...option}
              isSelected={selectedOption === option.title}
              onPress={() => setSelectedOption(option.title)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.donateButton,
          (!selectedAmount && !customAmount) && styles.donateButtonDisabled
        ]}
        disabled={!selectedAmount && !customAmount}
      >
        <ThemedText style={styles.donateButtonText}>
          Donate ${selectedAmount || customAmount || '0'}
        </ThemedText>
      </TouchableOpacity>
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
    fontWeight: "600",
    marginBottom: 30,
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    // color: '#666',
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  amountButton: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  amountButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  amountText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  amountTextSelected: {
    color: '#fff',
  },
  customAmountContainer: {
    marginTop: 10,
  },
  customAmountInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  optionCardSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionTitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  optionTitleSelected: {
    color: '#fff',
  },
  donateButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  donateButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});