import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons for checkbox
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
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
  sectionBackground: '#E8EAF6', // Light purple/blue for section backgrounds
  activeProgressText: '#6B4EFF', // Color for active progress text
  inactiveProgressText: '#888', // Color for inactive progress text
  radioSelected: '#6B4EFF', // Color for selected radio button
  radioUnselected: '#ccc', // Color for unselected radio button
  checkboxChecked: '#6B4EFF', // Color for checked checkbox
  checkboxUnchecked: '#ccc', // Color for unchecked checkbox
};

// Define a type for the order details received from the previous screen
interface OrderDetails {
    serviceType?: string;
    detergent?: string;
    fabricSoftener?: string;
    selectedDate?: string; // ISO date string
    selectedTime?: string;
    location?: string;
    // Add basket items and bill details if passed
    // basketItems?: any[]; // Adjust type as needed
    // billDetails?: any; // Adjust type as needed
}


export default function PaymentMethodScreen() {
  const router = useRouter();
  // Use useLocalSearchParams to get the final order details passed from order-summary
  const params = useLocalSearchParams();
  // Cast params to the OrderDetails type for easier access
  const orderDetails = params as OrderDetails;

  // State for selected payment method (e.g., 'cash_on_delivery')
  // Keep state but the UI won't change it based on user request
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('cash_on_delivery'); // Default to Cash on Delivery

  // State for billing address checkbox
  // Keep state but the UI won't change it based on user request
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true); // Default to checked


  // Function to handle Back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Payment Method");
    router.back(); // Navigate back to the previous screen (Order Summary)
  };

  // Function to handle payment method selection (placeholder for other methods)
  // Modified to do nothing as per user request
  const handlePaymentMethodSelect = (method: string) => {
      console.log(`Attempted to select payment method: ${method}. Functionality disabled.`);
      // setSelectedPaymentMethod(method); // Commented out to prevent state change
  };

  // Function to handle the "NEXT" or "PROCEED" button press
  const handleNextPress = () => {
    console.log("NEXT button pressed on Payment Method");

    // Validate that a payment method is selected (still valid check even if only one option)
    if (!selectedPaymentMethod) {
        Alert.alert("Payment Method Required", "Please select a payment method.");
        return;
    }

    // Collect all final order details including payment method and billing preference
    const finalOrderDetails = {
        ...orderDetails, // Include all details from previous screens
        paymentMethod: selectedPaymentMethod, // This will always be 'cash_on_delivery' with current logic
        isBillingSameAsShipping: isBillingSameAsShipping, // This will always be true with current logic
        // Add any other payment-related details here
    };

    console.log("Final Order Details:", finalOrderDetails);

    // --- Implement order submission or payment processing ---
    // This is where you would typically send the final order details to your backend
    // for processing (e.g., creating an order record, initiating a payment gateway).

    // After successful processing, navigate to a confirmation or tracking screen.
    // Navigate to the new 'done-payment' page
    router.push({
        pathname: '/PagesUser/done-payment', // Navigate to the done-payment page
        params: finalOrderDetails, // Pass final details if needed
    });

    // Removed the placeholder Alert as we are now navigating
    // Alert.alert("Order Finalized", "Order details collected and ready for processing!");
  };

  // Function to handle billing address checkbox press
  // Modified to do nothing as per user request
  const handleBillingCheckboxPress = () => {
      console.log("Attempted to toggle billing address checkbox. Functionality disabled.");
      // setIsBillingSameAsShipping(!isBillingSameAsShipping); // Commented out to prevent state change
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Payment Method</Text>
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
        {/* Step 2: Order Summary (Done) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 2 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>2</Text>
          </View>
          {/* Text for step 2 is active */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Order Summary</Text>
        </View>
         <View style={styles.progressLine} />
        {/* Step 3: Payment (Active) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 3 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>3</Text>
          </View>
           {/* Text for step 3 is active */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Payment</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>

        <Text style={styles.chooseMethodHeading}>Choose a payment method</Text>
        <Text style={styles.chargeNote}>You won't be charged until you review the order on the next page</Text> {/* Text from design */}

        {/* Payment Method Option: Cash on Delivery */}
        <TouchableOpacity
            style={[
                styles.paymentMethodCard,
                // Style as selected since it's the default and only option
                styles.selectedPaymentMethodCard
            ]}
            onPress={() => handlePaymentMethodSelect('cash_on_delivery')} // Clickable but does nothing
        >
            <View style={styles.paymentMethodRow}>
                 {/* Radio Button - Always marked as selected */}
                 <MaterialCommunityIcons
                     name={'radiobox-marked'} // Always show marked
                     size={24}
                     color={colors.radioSelected} // Always show selected color
                 />
                 <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
            </View>

            {/* Billing Address Checkbox (only for Cash on Delivery in this design) */}
            {/* Always render as checked */}
             <TouchableOpacity
                 style={styles.billingCheckboxRow}
                 onPress={handleBillingCheckboxPress} // Clickable but does nothing
             >
                 <MaterialCommunityIcons
                     name={'checkbox-marked'} // Always show marked
                     size={20}
                     color={colors.checkboxChecked} // Always show checked color
                 />
                 <Text style={styles.billingCheckboxText}>My billing address is the same as my shipping address</Text>
             </TouchableOpacity>
        </TouchableOpacity>

        {/* Add other payment methods here (e.g., Credit Card, Wallet) */}
        {/* Example structure for another method: */}
        {/*
        <TouchableOpacity
            style={[
                styles.paymentMethodCard,
                selectedPaymentMethod === 'credit_card' && styles.selectedPaymentMethodCard
            ]}
            onPress={() => handlePaymentMethodSelect('credit_card')}
        >
            <View style={styles.paymentMethodRow}>
                 <MaterialCommunityIcons
                     name={selectedPaymentMethod === 'credit_card' ? 'radiobox-marked' : 'radiobox-blank'}
                     size={24}
                     color={selectedPaymentMethod === 'credit_card' ? colors.radioSelected : colors.radioUnselected}
                 />
                 <Text style={styles.paymentMethodText}>Credit Card</Text>
            </View>
             // Add input fields for card details here if this method is selected
             {selectedPaymentMethod === 'credit_card' && (
                 <View style={styles.creditCardInputs}>
                     // ... input fields for card number, expiry, CVV ...
                 </View>
             )}
        </TouchableOpacity>
        */}


        {/* Note about bill update */}
        <Text style={styles.billUpdateNote}>The Bill will be updated in the TrackOrder Tab.</Text>


      </ScrollView>

      {/* Bottom Section: NEXT Button */}
      <View style={styles.bottomSection}>
         {/* NEXT Button */}
         <TouchableOpacity
           style={styles.nextButton} // Using nextButton style, you might rename it to proceedButton
           onPress={handleNextPress} // Call the handleNextPress function
         >
           <Text style={styles.nextButtonText}>NEXT</Text> {/* Text from design */}
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
  chooseMethodHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.darkGrey,
      marginBottom: 5,
  },
  chargeNote: {
      fontSize: 12,
      color: colors.mediumGrey,
      marginBottom: 20,
  },
  paymentMethodCard: {
    backgroundColor: colors.sectionBackground, // Light background color
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1, // Add border
    borderColor: 'transparent', // Default transparent border
  },
   selectedPaymentMethodCard: {
       borderColor: colors.primaryPurple, // Highlight border when selected
   },
   paymentMethodRow: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10, // Space between radio button row and checkbox/inputs
   },
   paymentMethodText: {
       fontSize: 16,
       color: colors.darkGrey,
       marginLeft: 10, // Space between radio button and text
       fontWeight: 'bold', // Payment method text is bold in design
   },
   billingCheckboxRow: {
       flexDirection: 'row',
       alignItems: 'center',
       marginLeft: 34, // Align checkbox with the text above
   },
   billingCheckboxText: {
       fontSize: 14,
       color: colors.darkGrey,
       marginLeft: 5, // Space between checkbox and text
       flexShrink: 1, // Allow text to wrap
   },
   creditCardInputs: {
       marginTop: 10, // Space above input fields
       paddingLeft: 34, // Indent input fields
       // Add styles for your input fields here
   },
  billUpdateNote: {
      fontSize: 12,
      color: colors.mediumGrey,
      marginTop: 10, // Space above the note
      textAlign: 'center', // Center the note text
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
  nextButton: { // Reusing nextButton style, consider renaming to proceedButton
    backgroundColor: colors.primaryPurple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
