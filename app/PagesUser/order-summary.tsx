import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import moment from 'moment'; // Using moment for date formatting

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
  sectionBackground: '#E8EAF6', // Light purple/blue for section backgrounds
  activeProgressText: '#6B4EFF', // Color for active progress text
  inactiveProgressText: '#888', // Color for inactive progress text
};

export default function OrderSummaryScreen() {
  const router = useRouter();
  // Use useLocalSearchParams to get the data passed from schedule-pickup
  const params = useLocalSearchParams();

  // Access the individual pieces of data from params
  // We now expect 'serviceType' as well, passed from previous screens
  const serviceType = params.serviceType as string | undefined; // Added serviceType
  const detergent = params.detergent as string | undefined;
  const fabricSoftener = params.fabricSoftener as string | undefined; // 'true' or 'false' string
  const selectedDate = params.selectedDate as string | undefined; // ISO date string
  const selectedTime = params.selectedTime as string | undefined;
  const location = params.location as string | undefined;
  // If you passed basket items as a stringified JSON from schedule-pickup.tsx:
  // const basketItems = params.basketItems ? JSON.parse(params.basketItems as string) : [];


  // Parse the date string back into a moment object for formatting
  const pickupDate = selectedDate ? moment(selectedDate) : null;

  // Function to handle Back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Order Summary");
    router.back(); // Navigate back to the previous screen (Schedule Pickup)
  };

  // Function to handle "Edit" button press (placeholder)
  const handleEditPress = (section: string) => {
    console.log(`Edit button pressed for ${section}`);
    // Implement navigation back to the relevant screen for editing
    // e.g., if section is 'Laundry Preferences', navigate back to select-service
    // if (section === 'Laundry Preferences') {
    //   router.push('/PagesUser/select-service'); // Or router.back() if it's the direct previous screen
    // } else if (section === 'Schedule') {
    //   router.push('/PagesUser/schedule-pickup'); // Or router.back()
    // }
    Alert.alert("Edit", `Navigate back to edit ${section}`);
  };

  // Function to handle "PROCEED PAYMENT METHOD" button press
  const handleProceedPayment = () => {
    console.log("PROCEED PAYMENT METHOD button pressed");
    // Collect all details to pass to the payment screen
    const orderDetails = {
        serviceType: serviceType, // Include serviceType
        detergent: detergent,
        fabricSoftener: fabricSoftener,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        location: location,
        // Add basket items data here if you passed it through the flow
        // basketItems: basketItems, // Example if basket items were passed
        // Add bill details here once calculated
        // billDetails: { ... }
    };

    console.log("Order Details to pass to Payment:", orderDetails);

    // --- Implement navigation to the Payment Method screen ---
    // Navigate to the '/PagesUser/payment-method' route
    // Pass the orderDetails object as parameters to the next screen
    router.push({
        pathname: '/PagesUser/payment-method', // Navigate to the payment-method page
        params: orderDetails, // Pass the order details object
    });

    // Removed the placeholder Alert as we are now navigating
    // Alert.alert("Proceed to Payment", "Ready to integrate with a payment method!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        {/* Step 1: Add Details (Done) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 1 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>1</Text>
          </View>
          {/* Text for step 1 is active */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Add Details</Text>
        </View>
        <View style={styles.progressLine} />
        {/* Step 2: Order Summary (Active) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 2 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>2</Text>
          </View>
          {/* Text for step 2 is active */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Order Summary</Text>
        </View>
         <View style={styles.progressLine} />
        {/* Step 3: Payment (Inactive) */}
        <View style={styles.progressStep}>
          {/* Step 3 circle is inactive */}
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>3</Text>
          </View>
           {/* Text for step 3 is inactive */}
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>

        {/* Pick up Section */}
        <Text style={styles.sectionHeading}>Pick up:</Text>
        <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>LOCATION</Text>
            <Text style={styles.infoCardValue}>{location || 'Location not set'}</Text> {/* Display location */}
        </View>

        {/* Laundry Preferences Section */}
        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Laundry Preferences:</Text>
            <TouchableOpacity onPress={() => handleEditPress('Laundry Preferences')}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Service</Text>
            {/* Display the service type received from params */}
            <Text style={styles.infoCardValue}>{serviceType || 'Not specified'}</Text>

            <View style={styles.divider} />

            <Text style={styles.infoCardLabel}>Detergent</Text>
            <Text style={styles.infoCardValue}>{detergent || 'Not selected'}</Text> {/* Display detergent */}

            <View style={styles.divider} />

            <Text style={styles.infoCardLabel}>Fabric Softener</Text>
            <Text style={styles.infoCardValue}>{fabricSoftener === 'true' ? 'Yes' : (fabricSoftener === 'false' ? 'No' : 'Not selected')}</Text> {/* Display fabric softener */}
        </View>

        {/* Schedule Section */}
        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Schedule:</Text>
            <TouchableOpacity onPress={() => handleEditPress('Schedule')}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
             <View style={styles.scheduleRow}>
                <View style={styles.scheduleColumn}>
                    <Text style={styles.infoCardLabel}>Pickup Date</Text>
                    <Text style={styles.infoCardValue}>{pickupDate ? pickupDate.format('MMM DD,YYYY') : 'Not set'}</Text> {/* Display formatted date */}
                </View>
                 <View style={styles.verticalDivider} />
                 <View style={styles.scheduleColumn}>
                    <Text style={styles.infoCardLabel}>Time</Text>
                     <Text style={styles.infoCardValue}>{selectedTime || 'Not set'}</Text> {/* Display time */}
                 </View>
             </View>
        </View>

        {/* Bill Details Section */}
         <Text style={styles.sectionHeading}>Bill Details:</Text>
         <View style={styles.infoCard}>
             {/* Placeholder Bill Items - Replace with actual calculated bill */}
             <Text style={styles.billItem}>1 kg - $X.XX</Text> {/* Example bill item */}
             <Text style={styles.billItem}>2 kg - $X.XX</Text> {/* Example bill item */}
             {/* Add more bill items based on basket items and service costs */}
             <View style={styles.divider} />
             <Text style={styles.billTotal}>Total: $Y.YY</Text> {/* Example total */}
         </View>


        {/* Add other sections if needed */}

      </ScrollView>

      {/* Bottom Section: PROCEED PAYMENT METHOD Button */}
      <View style={styles.bottomSection}>
         {/* PROCEED PAYMENT METHOD Button */}
         <TouchableOpacity
           style={styles.proceedButton}
           onPress={handleProceedPayment} // Call the handleProceedPayment function
         >
           <Text style={styles.proceedButtonText}>PROCEED PAYMENT METHOD</Text>
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
   inactiveProgressText: { // Style for inactive text color
       color: colors.inactiveProgressText,
   },
  progressLine: {
    flex: 1, // Take up available space
    height: 2,
    backgroundColor: colors.borderGrey, // Line color
    marginHorizontal: 5,
  },
  mainContent: {
    flex: 1, // Allow main content to take up available vertical space
    paddingHorizontal: 20,
    paddingTop: 10,
  },
   mainContentPadding: {
      paddingBottom: 20, // Add padding at the bottom of the scroll view
   },
  sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  editButtonText: {
      fontSize: 14,
      color: colors.primaryPurple, // Purple color for Edit button
      fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: colors.sectionBackground, // Light background color
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoCardLabel: {
      fontSize: 14,
      color: colors.mediumGrey, // Muted color for labels
      marginBottom: 5,
  },
  infoCardValue: {
      fontSize: 16,
      color: colors.darkGrey, // Darker color for values
      marginBottom: 10, // Space after value before next label/divider
  },
  divider: {
      height: 1,
      backgroundColor: colors.borderGrey,
      marginVertical: 10, // Space above and below divider
  },
   scheduleRow: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
   },
   scheduleColumn: {
       flex: 1, // Each column takes equal space
       // Removed alignItems: 'center' to align text left
   },
    verticalDivider: {
        width: 1,
        backgroundColor: colors.borderGrey,
        marginHorizontal: 10, // Space on either side of the divider
        height: '100%', // Make the divider fill the height of the row
    },
    billItem: {
        fontSize: 16,
        color: colors.darkGrey,
        marginBottom: 5,
    },
    billTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkGrey,
        marginTop: 10, // Space above total
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
  proceedButton: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
