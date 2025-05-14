import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for icon background circles
  lightGrey: '#f0f0f0', // Used for screen background
  darkGrey: '#333', // Used for main text (titles, values)
  mediumGrey: '#888', // Used for sub-details text
  white: '#fff', // Used for text on purple background, icon circles
  borderGrey: '#ccc', // Used for header border
  statusDelivered: '#D4EDDA', // Lighter green background for 'delivered' status badge
  statusDeliveredText: '#155724', // Darker green text for 'delivered' status badge
  statusConfirmed: '#FFF3CD', // Lighter yellow background for 'confirmed' status badge (adjusting based on screenshot)
  statusConfirmedText: '#856404', // Darker yellow text for 'confirmed' status badge
  cardBackground: '#F8F9FA', // Very light grey/white for card background based on image
  iconBackground: '#E8EAF6', // Light purple/blue background for icon circles
};

// Define types for different notification item data structures based on the screenshot
interface LaundryNotification {
    id: string;
    type: 'laundry';
    laundryNumber: string; // e.g., 'LAUNDRY 1'
    customerName: string; // e.g., 'Matobato'
    serviceType: string; // e.g., 'Dry Wash'
    price: string; // e.g., 'P 175'
    status: 'delivered'; // Status badge text
}

interface TransactionNotification {
    id: string;
    type: 'transaction';
    title: string; // e.g., 'Transfer to card', 'Cashback from purchase'
    details: string; // e.g., 'Transaction ID 698094554317', 'Purchase from Books.com'
    transactionId?: string; // Optional transaction ID if different from details
    amount: string; // e.g., '$ 9000.00', '$ 3.21'
    status: 'confirmed'; // Status badge text
    date: string; // e.g., '16 Sep 2023'
    time: string; // e.g., '11:21 AM'
}

// Union type for all possible notification item types
type NotificationItem = LaundryNotification | TransactionNotification;


export default function AdminNotificationScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // Placeholder data for notification items based on the screenshot
  const notificationItems: NotificationItem[] = [
    {
      id: '1',
      type: 'laundry',
      laundryNumber: 'LAUNDRY 1',
      customerName: 'Matobato',
      serviceType: 'Dry Wash',
      price: 'P 175',
      status: 'delivered',
    },
    {
      id: '2',
      type: 'transaction',
      title: 'Transfer to card',
      details: 'Transaction ID',
      transactionId: '698094554317',
      amount: '$ 9000.00',
      status: 'confirmed',
      date: '16 Sep 2023',
      time: '11:21 AM',
    },
    {
      id: '3',
      type: 'transaction',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230078421', // Corrected ID based on image
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023', // Corrected date based on image
      time: '18:59 PM', // Corrected time based on image
    },
     {
      id: '4',
      type: 'transaction',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230978421', // Corrected ID based on image
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023', // Corrected date based on image
      time: '18:59 PM', // Corrected time based on image
    },
      {
      id: '5',
      type: 'transaction',
      title: 'Cashback from purchase',
      details: 'Purchase from Books.com',
      transactionId: '765230976421', // Corrected ID based on image
      amount: '$ 3.21',
      status: 'confirmed',
      date: '14 Sep 2023', // Corrected date based on image
      time: '18:59 PM', // Corrected time based on image
    },
    // Add more placeholder notification items as needed
  ];

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Admin Notification");
    router.back(); // Go back to the previous screen (Admin Home)
  };

  // Function to handle tapping on a notification item (placeholder)
  const handleNotificationItemPress = (item: NotificationItem) => {
      console.log(`Notification item ${item.id} pressed`);
      // Implement navigation to a detailed view for this notification if needed
      // router.push(`/PagesAdmin/notificationDetails/${item.id}`); // Example
  };


  // Function to render a single notification item card
  const renderNotificationItem = (item: NotificationItem) => {
    // Determine icon and content based on notification type
    let IconComponent; // Use capitalized variable for the component
    let iconName;
    let content;
    let statusBadgeStyle;
    let statusBadgeTextStyle;
    let dateTime;

    if (item.type === 'laundry') {
        IconComponent = Ionicons; // Assign the component to the capitalized variable
        iconName = 'shirt-outline'; // Using shirt icon for laundry
        statusBadgeStyle = item.status === 'delivered' ? styles.statusDeliveredBadge : {};
        statusBadgeTextStyle = item.status === 'delivered' ? styles.statusDeliveredText : {};
        // You would add logic for other laundry statuses if needed
        content = (
            <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{item.laundryNumber}</Text>
                    <Text style={styles.cardValue}>{item.price}</Text>
                </View>
                <Text style={styles.cardSubDetails}>{item.customerName}</Text>
                <Text style={styles.cardSubDetails}>{item.serviceType}</Text>
                 <View style={styles.cardBottomRow}>
                     {/* Status badge */}
                     <Text style={[styles.cardStatus, statusBadgeStyle, statusBadgeTextStyle]}>{item.status}</Text>
                     {/* No date/time shown for laundry notifications in this design */}
                 </View>
            </View>
        );
    } else if (item.type === 'transaction') {
        IconComponent = Ionicons; // Assign the component to the capitalized variable
        iconName = item.title.includes('purchase') ? 'cart-outline' : 'card-outline'; // Cart for purchase, Card for transfer
        statusBadgeStyle = item.status === 'confirmed' ? styles.statusConfirmedBadge : {};
        statusBadgeTextStyle = item.status === 'confirmed' ? styles.statusConfirmedText : {};
         // You would add logic for other transaction statuses if needed
        dateTime = `${item.date} ${item.time}`;
        content = (
             <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardValue}>{item.amount}</Text>
                </View>
                <Text style={styles.cardSubDetails}>{item.details}</Text>
                 {item.transactionId && item.transactionId !== item.details && (
                     <Text style={styles.cardSubDetails}>Transaction ID: {item.transactionId}</Text>
                 )}
                <View style={styles.cardBottomRow}>
                     {/* Status badge */}
                     <Text style={[styles.cardStatus, statusBadgeStyle, statusBadgeTextStyle]}>{item.status}</Text>
                     {/* Date and Time */}
                     <Text style={styles.cardDate}>{dateTime}</Text>
                 </View>
            </View>
        );
    } else {
        // Handle other notification types or a default
        return null; // Don't render if type is unknown
    }


    return (
      <TouchableOpacity key={item.id} style={styles.notificationCard} onPress={() => handleNotificationItemPress(item)}>
        {/* Icon Circle */}
        <View style={styles.iconCircle}>
           {IconComponent && iconName && ( // Use the capitalized variable here
               <IconComponent name={iconName as any} size={24} color={colors.primaryPurple} /> // Purple icon
           )}
        </View>
        {content}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Notification List */}
      <ScrollView style={styles.notificationListContainer} contentContainerStyle={styles.notificationListContent}>
        {notificationItems.map(renderNotificationItem)}
      </ScrollView>

      {/* Bottom navigation is not included based on the provided design */}

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
  notificationListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 20, // Align with other content
    paddingTop: 20, // Space below header
  },
  notificationListContent: {
    paddingBottom: 20, // Add padding at the bottom
  },
  notificationCard: {
    flexDirection: 'row', // Align icon and content horizontally
    backgroundColor: colors.cardBackground, // Very light grey/white background for cards
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
  },
   statusDeliveredText: { // Style for 'delivered' text color
       color: colors.statusDeliveredText, // Darker green text
   },
   statusConfirmedBadge: { // Style for 'confirmed' badge
       backgroundColor: colors.statusConfirmed, // Lighter yellow background
   },
   statusConfirmedText: { // Style for 'confirmed' text color
       color: colors.statusConfirmedText, // Darker yellow text
   },
});
