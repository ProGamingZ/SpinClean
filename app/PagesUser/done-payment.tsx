import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'; // Import Alert for placeholder
import { Ionicons } from '@expo/vector-icons'; // Keep Ionicons import if using other icons, otherwise can remove
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter and useLocalSearchParams
import moment from 'moment'; // Using moment if needed for date formatting (though likely done on summary page)

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
  successGreen: '#4CAF50', // Example success color
};

// Define a type for the order details received from the previous screen
interface OrderDetails {
    serviceType?: string;
    detergent?: string;
    fabricSoftener?: string;
    selectedDate?: string; // ISO date string
    selectedTime?: string;
    location?: string;
    paymentMethod?: string;
    isBillingSameAsShipping?: boolean;
    // Add basket items and bill details if passed
    // basketItems?: any[]; // Adjust type as needed
    // billDetails?: any; // Adjust type as needed
}


export default function DonePaymentScreen() {
  const router = useRouter();
  // Use useLocalSearchParams to get the final order details passed from payment-method
  const params = useLocalSearchParams();
  // Cast params to the OrderDetails type for easier access
  const finalOrderDetails = params as OrderDetails;

  // You can log the received details to verify they were passed correctly
  console.log("Received in DonePaymentScreen:", finalOrderDetails);


  // Function to handle the "SEE DETAILS" button press (placeholder)
  const handleSeeDetailsPress = () => {
      console.log("SEE DETAILS button pressed");
      // --- Implement navigation to Order Details/Tracking ---
      // You would typically navigate to a screen that shows the full details
      // of the placed order, possibly in a 'Track Order' section.
      // You would pass the order ID or the order details to that screen.
      // Example: router.push({ pathname: '/PagesUser/order-details', params: { orderId: '...' } });
      Alert.alert("See Details", "Implement navigation to Order Details screen.");
  };

  // Function to handle the "HOME" button press
  const handleHomePress = () => {
    console.log("HOME button pressed");
    // --- Implement navigation back to the Home screen ---
    // Use router.replace to clear the navigation stack and go directly to Home
    router.replace('/PagesUser/'); // Navigate back to the user index page (home)
  };

  return (
    <View style={styles.container}>
      {/* Header - Keeping the header as it's standard practice, though not in the provided image */}
      <View style={styles.header}>
        <View style={{ width: 24 }} /> {/* Placeholder for spacing */}
        <Text style={styles.headerTitle}>Order Confirmed!</Text> {/* Header title */}
        <View style={{ width: 24 }} /> {/* Placeholder for spacing */}
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>

        <View style={styles.confirmationContainer}>
            {/* Image */}
            {/* You will replace the source with your image path */}
            <Image
                source={require('../../assets/images/User/donepayment.png')} // <<-- Your image path
                style={styles.confirmationImage}
                resizeMode="contain" // Adjust resizeMode as needed
            />
            {/* Confirmation Text */}
            <Text style={styles.confirmationText}>Congratulations!</Text> {/* Matches image text */}
            <Text style={styles.subConfirmationText}>You successfully made a payment,</Text> {/* Matches image text line 1 */}
            <Text style={styles.subConfirmationText}>enjoy our service!</Text> {/* Matches image text line 2 */}

            {/* Optional: Display some key details from finalOrderDetails */}
            {/*
            <View style={styles.orderDetailsSummary}>
                <Text style={styles.orderDetailsHeading}>Order Summary:</Text>
                <Text>Service Type: {finalOrderDetails.serviceType}</Text>
                <Text>Pickup Date: {finalOrderDetails.selectedDate ? moment(finalOrderDetails.selectedDate).format('MMM DD,YYYY') : 'N/A'}</Text>
                <Text>Payment Method: {finalOrderDetails.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : finalOrderDetails.paymentMethod}</Text>
                // Add more details as needed
            </View>
            */}
        </View>


      </ScrollView>

      {/* Bottom Section: Buttons */}
      <View style={styles.bottomSection}>
         {/* SEE DETAILS Button */}
         <TouchableOpacity
           style={styles.seeDetailsButton}
           onPress={handleSeeDetailsPress} // Call the see details function
         >
           <Text style={styles.seeDetailsButtonText}>SEE DETAILS</Text> {/* Text from design */}
         </TouchableOpacity>

         {/* HOME Button */}
         <TouchableOpacity
           style={styles.homeButton}
           onPress={handleHomePress} // Call the home function
         >
           <Text style={styles.homeButtonText}>HOME</Text> {/* Text from design */}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  mainContent: {
    flex: 1, // Allow main content to take up available vertical space
    paddingHorizontal: 20,
    paddingTop: 20, // Adjusted padding
  },
   mainContentPadding: {
      paddingBottom: 20, // Add padding at the bottom of the scroll view
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
      flexGrow: 1, // Allow content to grow and fill space
   },
   confirmationContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1, // Take up available space
   },
    confirmationImage: { // Style for the Image component
        width: 250, // Adjust size as needed
        height: 250, // Adjust size as needed
        // You might want to add borderRadius if your image is circular
        // borderRadius: 75,
    },
   confirmationText: {
       fontSize: 20,
       fontWeight: 'bold',
       color: colors.darkGrey,
       marginTop: 20, // Space below the image
       textAlign: 'center',
   },
   subConfirmationText: { // Style for the smaller confirmation text lines
       fontSize: 16, // Adjusted size to match image
       color: colors.mediumGrey, // Adjusted color to match image
       marginTop: 5, // Reduced space between lines
       textAlign: 'center',
   },
   orderDetailsSummary: {
       marginTop: 30,
       padding: 15,
       backgroundColor: colors.lightGrey,
       borderRadius: 8,
       width: '100%', // Take full width
   },
   orderDetailsHeading: {
       fontSize: 16,
       fontWeight: 'bold',
       color: colors.darkGrey,
       marginBottom: 10,
   },
  bottomSection: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center buttons horizontally
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    backgroundColor: colors.white,
  },
  seeDetailsButton: { // Style for the SEE DETAILS button
    backgroundColor: colors.white, // White background
    borderColor: colors.primaryPurple, // Purple border
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10, // Space between buttons
  },
   seeDetailsButtonText: {
       color: colors.primaryPurple, // Purple text color
       fontSize: 18,
       fontWeight: 'bold',
   },
  homeButton: { // Style for the HOME button
    backgroundColor: colors.primaryPurple, // Purple background
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  homeButtonText: {
    color: colors.white, // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
