import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter and useLocalSearchParams

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from the palette in index.tsx and notification.tsx)
const colors = {
  primaryPurple: '#6B4EFF', // Active icon color, badge border
  lightGrey: '#f0f0f0', // Backgrounds
  darkGrey: '#333', // Main text
  mediumGrey: '#888', // Sub-details text, inactive icon color
  white: '#fff', // White elements
  borderGrey: '#ccc', // Borders
  cardBackground: '#F8F9FA', // Card background
  iconBackground: '#E8EAF6', // Light purple/blue for icon circles
  statusConfirmed: '#D4EDDA', // Lighter green background for 'confirmed' status badge (adjusting based on screenshot)
  statusConfirmedText: '#155724', // Darker green text for 'confirmed' status badge
};

// Define types for different history item data structures based on the screenshot
interface TransactionHistoryItem {
    id: string;
    type: 'cashback' | 'transfer'; // Based on titles in screenshot
    title: string; // e.g., 'Cashback from purchase', 'Transfer to card'
    details?: string; // e.g., 'Purchase from Amazon.com', 'Transaction ID'
    transactionId?: string; // Optional transaction ID
    value: string; // e.g., '$ 1.75', '$ 9000.00'
    date: string; // e.g., '16 Sep 2023'
    time: string; // e.g., '16:08 PM'
    status: 'confirmed' | 'pending' | 'failed'; // Status like 'confirmed'
}

// Union type for all possible history item types (currently just transaction)
type HistoryItem = TransactionHistoryItem;


export default function HistoryScreen() {
  const router = useRouter(); // Initialize useRouter hook
  // useLocalSearchParams is not strictly needed for this page based on the request,
  // but keeping it imported as it's common in Expo Router screens.
  const params = useLocalSearchParams();

  // Placeholder data for history items based on the screenshot
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'cashback',
      title: 'Cashback from purchase',
      details: 'Purchase from Amazon.com',
      transactionId: '685746354218',
      value: '$ 1.75',
      date: '16 Sep 2023',
      time: '16:08 PM',
      status: 'confirmed',
    },
    {
      id: '2',
      type: 'transfer',
      title: 'Transfer to card',
      details: 'Transaction ID',
      transactionId: '690094554317',
      value: '$ 9000.00',
      date: '16 Sep 2023',
      time: '11:21 AM',
      status: 'confirmed',
    },
    {
      id: '3',
      type: 'cashback',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421',
      value: '$ 3.21',
      date: '14 Sep 2023',
      time: '18:59 PM',
      status: 'confirmed',
    },
    {
      id: '4',
      type: 'cashback',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421',
      value: '$ 3.21',
      date: '14 Sep 2023',
      time: '18:59 PM',
      status: 'confirmed',
    },
    // Add more placeholder history items as needed
  ];

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed on History");
    // Navigate back to the previous screen
    router.back();
  };

  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed, navigating to Home");
    router.replace('/PagesUser/'); // Use replace to go back to the root of the user stack
  };

  const handleMyLaundryPress = () => {
    console.log("My Laundry icon pressed, navigating to My Laundry");
    router.replace('/PagesUser/myLaundry'); // Use replace to go to My Laundry and clear history
  };

  const handleHistoryPress = () => {
    console.log("History icon pressed");
    // Already on the History screen, no navigation needed
  };


  // Function to render a single history item
  const renderHistoryItem = (item: HistoryItem) => {
    // Determine icon based on type (using icons similar to those in notification.tsx)
    const iconName = item.type === 'cashback' ? 'shopping-outline' : 'card-outline'; // shopping-outline for cashback, card-outline for transfer
    const IconComponent = item.type === 'cashback' ? MaterialCommunityIcons : Ionicons;

    return (
      <View key={item.id} style={styles.historyCard}>
        <View style={styles.cardIconContainer}>
           <IconComponent name={iconName as any} size={24} color={colors.primaryPurple} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
          {item.details && <Text style={styles.cardSubDetails}>{item.details}</Text>}
          {item.transactionId && <Text style={styles.cardSubDetails}>Transaction ID {item.transactionId}</Text>}
          <View style={styles.cardBottomRow}>
             <Text style={styles.cardDate}>{`${item.date} ${item.time}`}</Text>
             {/* Status badge - using confirmed style as seen in screenshot */}
             <Text style={[styles.cardStatus, styles.statusConfirmedBadge]}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* History List */}
      <ScrollView style={styles.historyListContainer} contentContainerStyle={styles.historyListContent}>
        {historyItems.map(renderHistoryItem)}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* This should ideally be part of a Tab Navigator layout in a real app */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            {/* Outline home icon for inactive state, grey color */}
            <Ionicons name="home-outline" size={24} color={colors.mediumGrey} />
             {/* No active indicator dot */}
         </TouchableOpacity>
         {/* Middle Icon (My Laundry) */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleMyLaundryPress}>
            {/* Keeping the original icon and inactive style */}
            <MaterialCommunityIcons name="map-outline" size={24} color={colors.mediumGrey} />
         </TouchableOpacity>
         {/* Right Icon (History) - Active */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHistoryPress}>
            {/* Filled calendar icon for active state, purple color */}
            <Ionicons name="calendar" size={24} color={colors.primaryPurple} /> {/* Changed to filled calendar */}
             {/* Small active indicator dot */}
             <View style={styles.activeNavDot} />
         </TouchableOpacity>
          {/* Add more nav bar items */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40, // Adjust padding from top
    paddingBottom: 15,
    backgroundColor: colors.white, // White header background
    borderBottomWidth: 1, // Optional: Add a subtle border
    borderColor: colors.borderGrey, // Optional: Border color
  },
  backButton: {
    padding: 5, // Add padding for easier tapping
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  historyListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  historyListContent: {
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground, // Light background for cards
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'flex-start', // Align items to the top
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // Reduced shadow opacity
    shadowRadius: 1, // Reduced shadow radius
    elevation: 1, // Reduced elevation for Android shadow
  },
  cardIconContainer: {
      width: 40, // Fixed width for icon area
      height: 40, // Fixed height for icon area
      borderRadius: 20, // Make it circular
      backgroundColor: colors.iconBackground, // Light purple/blue background for the icon circle
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      flexShrink: 0, // Prevent icon container from shrinking
  },
  cardContent: {
    flex: 1, // Allow content to take up remaining space
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2, // Reduced space
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flexShrink: 1, // Allow title to wrap
    marginRight: 10, // Space between title and value
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flexShrink: 0, // Prevent value from shrinking
  },
  cardSubDetails: {
    fontSize: 12,
    color: colors.mediumGrey, // Muted color for sub-details
    marginBottom: 2, // Reduced space between sub-detail lines
  },
  cardBottomRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginTop: 5, // Space above date/status row
  },
  cardDate: {
      fontSize: 11,
      color: colors.mediumGrey,
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
       color: colors.statusConfirmedText, // Darker green text
   },
  bottomNavBar: {
    position: 'absolute', // Position absolutely at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Height of the nav bar
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out items evenly
    alignItems: 'center',
    backgroundColor: colors.white, // White background for nav bar
    borderTopWidth: 1,
    borderColor: colors.borderGrey, // Light border at the top
    paddingBottom: 5, // Add some padding at the very bottom
     shadowColor: '#000', // Optional shadow for nav bar
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navBarItem: {
    flex: 1, // Each item takes equal space
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // Add vertical padding for touch area
  },
  activeNavDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryPurple, // Purple dot color
    marginTop: 4, // Space between icon and dot
  }
});
