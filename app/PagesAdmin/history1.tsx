import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons (MaterialCommunityIcons for card icon)
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for active elements, icons
  lightGrey: '#f0f0f0', // Backgrounds, card background
  darkGrey: '#333', // Main text, header title
  mediumGrey: '#888', // Sub-details text, placeholder text
  white: '#fff', // White elements
  borderGrey: '#ccc', // Borders, dividers
  cardBackground: '#F8F9FA', // Card background (light grey/white)
  iconBackground: '#E8EAF6', // Light purple/blue for icon circles
  statusConfirmed: '#D4EDDA', // Lighter green background for 'confirmed' status badge
  statusConfirmedText: '#155724', // Darker green text for 'confirmed' status badge
};

// Define a type for a transaction history item based on the screenshot
interface TransactionHistoryItem {
    id: string;
    type: 'purchase' | 'transfer'; // Based on titles in screenshot
    title: string; // e.g., 'Cashback from purchase', 'Transfer to card'
    details: string; // e.g., 'Purchase from Amazon.com', 'Transaction ID 698094554317'
    transactionId?: string; // Optional transaction ID if different from details
    amount: string; // e.g., '$ 1.75', '$ 9000.00'
    status: 'confirm' | 'confirmed'; // Status badge text
    date: string; // e.g., '16 Sep 2023'
    time: string; // e.g., '16:08 PM'
}

export default function AdminHistory1Screen() {
  const router = useRouter(); // Initialize useRouter hook

  // Placeholder data for transaction history items based on the screenshot
  const transactionHistoryItems: TransactionHistoryItem[] = [
    {
      id: '1',
      type: 'purchase',
      title: 'Cashback from purchase',
      details: 'Purchase from Amazon.com',
      transactionId: '685746354219',
      amount: '$ 1.75',
      status: 'confirm', // Using 'confirm' as seen in the first item
      date: '16 Sep 2023',
      time: '16:08 PM',
    },
    {
      id: '2',
      type: 'transfer',
      title: 'Transfer to card',
      details: 'Transaction ID 698094554317',
      amount: '$ 9000.00',
      status: 'confirmed', // Using 'confirmed' as seen in other items
      date: '16 Sep 2023',
      time: '11:21 AM',
    },
    {
      id: '3',
      type: 'purchase',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421',
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023',
      time: '18:59 PM',
    },
     {
      id: '4',
      type: 'purchase',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230078421', // Corrected transaction ID based on image
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023', // Corrected date based on image
      time: '14:30 PM', // Corrected time based on image (approximate)
    },
     {
      id: '5',
      type: 'purchase',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230078421', // Same ID as above in image
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023', // Same date as above in image
      time: '14:30 PM', // Same time as above in image (approximate)
    },
    // Add more placeholder history items as needed
  ];

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Admin History 1");
    router.back(); // Go back to the previous screen (likely Admin Home or main History)
  };

  // Function to render a single transaction history item card
  const renderHistoryItem = (item: TransactionHistoryItem) => {
    // Determine icon based on type
    const iconName = item.type === 'purchase' ? 'cart-outline' : 'card-outline'; // Using cart for purchase, card for transfer
    const iconComponent = item.type === 'purchase' ? Ionicons : Ionicons; // Both from Ionicons for simplicity

    // Determine status badge style based on status
    const statusBadgeStyle = item.status === 'confirmed' ? styles.statusConfirmedBadge : {};
    // Use the style object directly for text color
    const statusBadgeTextStyle = item.status === 'confirmed' ? styles.statusConfirmedText : {};
     // Add styles for 'confirm' if it has a different appearance

    return (
      <View key={item.id} style={styles.historyCard}>
        {/* Icon Circle */}
        <View style={styles.iconCircle}>
           <Ionicons name={iconName as any} size={24} color={colors.primaryPurple} /> {/* Purple icon */}
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardAmount}>{item.amount}</Text>
          </View>
          <Text style={styles.cardDetails}>{item.details}</Text>
          {/* Display transaction ID if available and different from details */}
          {item.transactionId && item.transactionId !== item.details && (
              <Text style={styles.cardDetails}>Transaction ID: {item.transactionId}</Text>
          )}
          <View style={styles.cardBottomRow}>
             {/* Status badge */}
             <Text style={[styles.cardStatus, statusBadgeStyle, statusBadgeTextStyle]}>{item.status}</Text> {/* Applied statusBadgeTextStyle */}
             {/* Date and Time */}
             <Text style={styles.cardDateTime}>{`${item.date} ${item.time}`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* History List */}
      <ScrollView style={styles.historyListContainer} contentContainerStyle={styles.historyListContent}>
        {transactionHistoryItems.map(renderHistoryItem)}
      </ScrollView>

      {/* Bottom navigation is not included based on the provided design for this specific history view */}

    </SafeAreaView> // Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { // Style for SafeAreaView
    flex: 1,
    backgroundColor: colors.lightGrey, // Light grey background for the screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between back button, title, and placeholder
    paddingHorizontal: 15,
    paddingTop: 20, // Adjust padding from top
    paddingBottom: 15,
    backgroundColor: colors.white, // White header background
    borderBottomWidth: 1, // Optional: Add a subtle border
    borderColor: colors.borderGrey, // Optional: Border color
  },
  backButton: {
      paddingRight: 10, // Space between back button and title
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flex: 1, // Allow title to take up space
    textAlign: 'center', // Center the title
    marginLeft: -24, // Offset to truly center if back button is present
  },
  historyListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 20, // Align with other content
    paddingTop: 20, // Space below header
  },
  historyListContent: {
    paddingBottom: 20, // Add padding at the bottom
  },
  historyCard: {
    flexDirection: 'row', // Align icon and content horizontally
    backgroundColor: colors.cardBackground, // Light grey/white background for cards
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'flex-start', // Align items to the top
     shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  iconCircle: {
      width: 40, // Size of the circle
      height: 40, // Size of the circle
      borderRadius: 20, // Make it a circle
      backgroundColor: colors.iconBackground, // Light purple/blue background
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15, // Space between icon and content
      flexShrink: 0, // Prevent icon circle from shrinking
  },
  cardContent: {
      flex: 1, // Allow content to take up remaining space
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2, // Space below title row
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flexShrink: 1, // Allow title to wrap
    marginRight: 10, // Space between title and amount
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flexShrink: 0, // Prevent amount from shrinking
  },
  cardDetails: {
      fontSize: 14,
      color: colors.mediumGrey, // Muted color for details
      marginBottom: 5, // Space below details
  },
  cardBottomRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginTop: 5, // Space above status/date row
  },
  cardStatus: {
      fontSize: 11,
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10, // Rounded badge corners
      overflow: 'hidden', // Ensure text is clipped if it overflows
  },
   statusConfirmedBadge: { // Style for 'confirmed' badge (using green based on screenshot)
       backgroundColor: colors.statusConfirmed, // Lighter green background
   },
   statusConfirmedText: { // Added missing style for 'confirmed' text color
       color: colors.statusConfirmedText, // Darker green text
   },
  cardDateTime: {
      fontSize: 11,
      color: colors.mediumGrey, // Muted color for date and time
  },
});
