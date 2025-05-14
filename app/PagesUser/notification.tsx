import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from the palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for icon background circles
  lightGrey: '#f0f0f0', // Used for card background (adjusting slightly based on image)
  darkGrey: '#333', // Used for main text (titles, values)
  mediumGrey: '#888', // Used for sub-details text
  white: '#fff', // Used for text on purple background, icon circles
  borderGrey: '#ccc', // Used for header border
  statusDelivered: '#D4EDDA', // Lighter green background for 'delivered' status badge
  statusDeliveredText: '#155724', // Darker green text for 'delivered' status badge
  statusConfirmed: '#FFF3CD', // Lighter yellow background for 'confirmed' status badge
  statusConfirmedText: '#856404', // Darker yellow text for 'confirmed' status badge
  cardBackground: '#F8F9FA', // Very light grey/white for card background based on image
  iconBackground: '#E8EAF6', // Light purple/blue background for icon circles
};

// Define types for different notification data structures
interface LaundryNotification {
    id: string;
    type: 'laundry';
    title: string; // e.g., 'LAUNDRY 1'
    customerName: string; // e.g., 'Matobato'
    price: string; // e.g., 'P175'
    serviceType: string; // e.g., 'Dry Wash'
    status: 'delivered' | 'pending' | 'processing'; // Status like 'delivered'
}

interface TransactionNotification {
    id: string;
    type: 'transaction';
    title: string; // e.g., 'Transfer to card', 'Cashback from purchase'
    details: string; // e.g., 'Transaction ID', 'Purchase from Books.com'
    transactionId?: string; // Optional transaction ID
    value: string; // e.g., '$ 9000.00', '$ 3.21'
    date: string; // e.g., '16 Sep 2023'
    time: string; // e.g., '11:20 AM'
    status: 'confirmed' | 'pending' | 'failed'; // Status like 'confirmed'
}

// Union type for all possible notification types
type NotificationItem = LaundryNotification | TransactionNotification;


export default function NotificationScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // Placeholder data for notifications
  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'laundry',
      title: 'LAUNDRY 1',
      customerName: 'Matobato',
      price: 'P175',
      serviceType: 'Dry Wash',
      status: 'delivered',
    },
    {
      id: '2',
      type: 'transaction',
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
      type: 'transaction',
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
      type: 'transaction',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421',
      value: '$ 3.21',
      date: '14 Sep 2023',
      time: '18:59 PM',
      status: 'confirmed',
    },
     {
      id: '5',
      type: 'transaction',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421',
      value: '$ 3.21',
      date: '14 Sep 2023',
      time: '18:59 PM',
      status: 'confirmed',
    },
    // Add more placeholder notifications as needed
  ];

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Notification");
    // Navigate back to the previous screen (User Home)
    router.back(); // This will navigate back to index.tsx if accessed from there
  };

  // Function to render a single notification item based on its type
  const renderNotificationItem = (item: NotificationItem) => {
    switch (item.type) {
      case 'laundry':
        return (
          <View key={item.id} style={styles.notificationCard}>
            <View style={styles.cardIconContainer}>
               {/* Placeholder Laundry Icon (Shopping bag/cart icon) */}
               <MaterialCommunityIcons name="shopping-outline" size={24} color={colors.primaryPurple} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardValue}>{item.price}</Text>
              </View>
              <Text style={styles.cardSubDetails}>{item.customerName}</Text>
              <View style={styles.cardBottomRow}>
                 <Text style={styles.cardSubDetails}>{item.serviceType}</Text> {/* Service Type in bottom row */}
                 <Text style={[styles.cardStatus, styles.statusDeliveredBadge]}>{item.status}</Text> {/* Status badge */}
              </View>
            </View>
          </View>
        );
      case 'transaction':
        return (
          <View key={item.id} style={styles.notificationCard}>
             <View style={styles.cardIconContainer}>
               {/* Placeholder Transaction Icon (e.g., card or money) */}
                <Ionicons name="card-outline" size={24} color={colors.primaryPurple} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
              <Text style={styles.cardSubDetails}>{item.details}</Text>
              {item.transactionId && <Text style={styles.cardSubDetails}>Transaction ID {item.transactionId}</Text>}
              <View style={styles.cardBottomRow}>
                 <Text style={styles.cardDate}>{`${item.date} ${item.time}`}</Text>
                 <Text style={[styles.cardStatus, styles.statusConfirmedBadge]}>{item.status}</Text> {/* Status badge */}
              </View>
            </View>
          </View>
        );
      default:
        return null; // Handle unknown notification types
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Notification List */}
      <ScrollView style={styles.notificationListContainer} contentContainerStyle={styles.notificationListContent}>
        {notifications.map(renderNotificationItem)}
      </ScrollView>

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
  notificationListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  notificationListContent: {
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  notificationCard: {
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
  statusDeliveredBadge: { // Style for 'delivered' badge
      backgroundColor: colors.statusDelivered, // Lighter green background
      color: colors.statusDeliveredText, // Darker green text
  },
   statusConfirmedBadge: { // Style for 'confirmed' badge
       backgroundColor: colors.statusConfirmed, // Lighter yellow background
       color: colors.statusConfirmedText, // Darker yellow text
   },
});
