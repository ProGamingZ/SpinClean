import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native'; // Import Alert
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter and useLocalSearchParams

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from the palette)
const colors = {
  primaryPurple: '#6B4EFF',
  lightGrey: '#f0f0f0',
  darkGrey: '#333',
  mediumGrey: '#888',
  white: '#fff',
  borderGrey: '#ccc',
  quantityButtonGrey: '#eee',
  // Add colors for selected/unselected buttons if needed
  selectedButtonBackground: '#6B4EFF',
  selectedButtonText: '#fff',
  unselectedButtonBackground: '#fff',
  unselectedButtonText: '#333',
  buttonBorder: '#6B4EFF', // Border color for unselected buttons
  // Added color for active progress text
  activeProgressText: '#6B4EFF',
};

// Define a type for a basket item (needed if passing basket items)
interface BasketItem {
    id: string;
    name: string;
    details: string;
    quantity: number;
}


export default function SelectServiceScreen() {
  const router = useRouter();
  // Use useLocalSearchParams to get data passed from the previous screen (basket.tsx)
  const params = useLocalSearchParams();
  const serviceType = params.serviceType as string | undefined; // Receive serviceType from basket.tsx
  // If you passed basket items as a stringified JSON from basket.tsx:
  // const basketItems = params.selectedItems ? JSON.parse(params.selectedItems as string) as BasketItem[] : [];


  // State to manage selected detergent and fabric softener (These are selected on THIS page)
  const [selectedDetergent, setSelectedDetergent] = useState<string | null>(null);
  const [selectedFabricSoftener, setSelectedFabricSoftener] = useState<boolean | null>(null);

  // Placeholder function for back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Select Service");
    router.back(); // Navigate back to the Basket screen
  };

  // Function to handle Next button press
  const handleNextPress = () => {
    console.log("Next button pressed on Select Service");
    // Validate selections before navigating
    // Check if a detergent is selected AND fabric softener choice (true or false) is made
    if (selectedDetergent !== null && selectedFabricSoftener !== null) {
        console.log("Detergent:", selectedDetergent);
        console.log("Fabric Softener:", selectedFabricSoftener ? 'Yes' : 'No');

        // --- Carry Data and Navigate to Schedule Pickup ---
        // Data object containing all collected details so far to pass to the next screen
        const serviceDetails = {
            serviceType: serviceType, // Pass the service type received from basket.tsx
            detergent: selectedDetergent, // Pass the selected detergent from this page
            fabricSoftener: selectedFabricSoftener, // Pass the selected fabric softener from this page
            // Pass basket items if you received them and are not using global state:
            // basketItems: basketItems,
        };

        console.log("Navigating to Schedule Pickup with:", serviceDetails);
        router.push({
            pathname: '/PagesUser/schedule-pickup',
            params: serviceDetails, // Pass the service details object
        });

    } else {
        // Show a message to the user if selections are not complete
        console.log("Please make your selections before proceeding.");
        Alert.alert("Selections Required", "Please select a detergent and choose whether to use fabric softener.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Service</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        {/* Step 1: Add Details (Active - includes basket and select-service) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 1 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>1</Text>
          </View>
          {/* Apply active style to Step 1 text */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Add Details</Text>
        </View>
        <View style={styles.progressLine} />
        {/* Step 2: Order Summary (Inactive - as per your requirement) */}
        <View style={styles.progressStep}>
          {/* Step 2 circle is inactive */}
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>2</Text>
          </View>
          {/* Step 2 text is inactive */}
          <Text style={styles.progressText}>Order Summary</Text> {/* Text is "Order Summary" */}
        </View>
          {/* Keep the line active or inactive based on design preference, keeping it active for progression visual */}
         <View style={styles.progressLine} />
        {/* Step 3: Payment (Inactive) */}
        <View style={styles.progressStep}>
          {/* Step 3 circle is inactive */}
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>3</Text>
          </View>
           {/* Step 3 text is inactive */}
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      {/* Service Options */}
      <ScrollView style={styles.optionsContainer} contentContainerStyle={styles.optionsContent}>
        {/* Display the service type here for confirmation if needed */}
        {/* <Text style={styles.sectionHeading}>Service Type: {serviceType}</Text> */}

        {/* Select Detergent Section */}
        <Text style={styles.sectionHeading}>Select Detergent:</Text>
        <View style={styles.buttonGroup}>
          {['Regular', 'Perfume free', 'Eco-friendly'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedDetergent === option && styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedDetergent(option)}
            >
              <Text style={[
                styles.optionButtonText,
                selectedDetergent === option ? styles.selectedOptionButtonText : styles.unselectedOptionButtonText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fabric Softener Section */}
        <Text style={styles.sectionHeading}>Fabric Softener:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedFabricSoftener === true && styles.selectedOptionButton,
            ]}
            onPress={() => setSelectedFabricSoftener(true)}
          >
             <Text style={[
                styles.optionButtonText,
                selectedFabricSoftener === true ? styles.selectedOptionButtonText : styles.unselectedOptionButtonText,
              ]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedFabricSoftener === false && styles.selectedOptionButton,
            ]}
            onPress={() => setSelectedFabricSoftener(false)}
          >
             <Text style={[
                styles.optionButtonText,
                selectedFabricSoftener === false ? styles.selectedOptionButtonText : styles.unselectedOptionButtonText,
              ]}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Add other service options here if needed */}

      </ScrollView>


      {/* Bottom Section: NEXT Button */}
      <View style={styles.bottomSection}>
         {/* NEXT Button */}
         <TouchableOpacity
           style={styles.nextButton}
           onPress={handleNextPress}
         >
           <Text style={styles.nextButtonText}>NEXT</Text>
         </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.borderGrey, // Inactive circle color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeProgressCircle: {
    backgroundColor: colors.primaryPurple, // Active circle color
  },
  progressNumber: {
    fontSize: 14,
    color: colors.white, // White number color
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    color: colors.mediumGrey, // Text color
  },
  activeProgressText: { // Style for active text color
      color: colors.activeProgressText,
      fontWeight: 'bold', // Optional: make active text bold
  },
  progressLine: {
    flex: 1, // Take up available space
    height: 2,
    backgroundColor: colors.borderGrey, // Line color
    marginHorizontal: 5,
  },
  optionsContainer: {
    flex: 1, // Allow options to take up available vertical space
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  optionsContent: {
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'column', // Stack buttons vertically
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.buttonBorder, // Border color for unselected
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10, // Space between buttons
    alignItems: 'center',
    backgroundColor: colors.unselectedButtonBackground, // Default background
  },
  selectedOptionButton: {
    backgroundColor: colors.selectedButtonBackground, // Purple background when selected
    borderColor: colors.selectedButtonBackground, // Purple border when selected
  },
  optionButtonText: {
    fontSize: 16,
    // Default text color is set below
  },
  unselectedOptionButtonText: {
    color: "grey", // Dark grey text when unselected
  },
  selectedOptionButtonText: {
    color: colors.selectedButtonText, // White text when selected
  },
  bottomSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    backgroundColor: colors.white,
  },
  nextButton: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make the button stretch horizontally
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
