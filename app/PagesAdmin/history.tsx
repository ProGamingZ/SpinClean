import React, { useState } from 'react'; // Import useState for status filter
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for active elements, icons, active filter text, active nav icon
  lightGrey: '#f0f0f0', // Backgrounds, card background
  darkGrey: '#333', // Main text, header title
  mediumGrey: '#888', // Sub-details text, inactive icon color, placeholder text, inactive filter text
  white: '#fff', // White elements, text on purple background
  borderGrey: '#ccc', // Borders, dividers
  profileIconBackground: '#E1F5FE', // Lighter blue background for the large profile icon circle
  cardBackground: '#EDE7F6', // Lightest purple for card background (matching design)
};

// Define a type for a history item (Admin view)
interface AdminHistoryItem {
    id: string;
    laundryNumber: string; // e.g., 'LAUNDRY 1'
    status: 'Completed' | 'Pending'; // Status for filtering and display
    customerName: string; // e.g., 'David'
    price: string; // e.g., '200.00'
    // Add other details if needed for display
    serviceType?: string; // e.g., 'Dry Cleaning'
}

export default function AdminHistoryScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // State for the active status filter
  const [activeStatus, setActiveStatus] = useState<'Completed' | 'Pending'>('Completed'); // Default to Completed based on design

  // Placeholder data for history items (Admin view)
  const historyItems: AdminHistoryItem[] = [
    {
      id: '1',
      laundryNumber: 'LAUNDRY 1',
      status: 'Completed', // Example status
      customerName: 'David',
      price: '200.00',
      serviceType: 'Dry Cleaning', // Example
    },
    {
      id: '2',
      laundryNumber: 'LAUNDRY 2',
      status: 'Pending', // Example status
      customerName: 'Sarah',
      price: '150.00',
      serviceType: 'Wash & Iron', // Example
    },
    {
      id: '3',
      laundryNumber: 'LAUNDRY 3',
      status: 'Completed', // Example status
      customerName: 'John',
      price: '250.00',
      serviceType: 'Dry Cleaning', // Example
    },
     {
      id: '4',
      laundryNumber: 'LAUNDRY 4',
      status: 'Pending', // Example status
      customerName: 'Emily',
      price: '180.00',
      serviceType: 'Wash & Iron', // Example
    },
    // Add more placeholder history items as needed
  ];

  // Filter history items based on the active status
  const filteredHistoryItems = historyItems.filter(item => item.status === activeStatus);

  // Function to handle profile icon press (placeholder - assuming admin profile)
   const handleProfilePress = () => {
     console.log("Admin Profile icon pressed on History, navigating to Admin Profile");
     router.push('/PagesAdmin/profile'); // Navigate to Admin Profile page
   };

  // Function to handle calendar icon press (placeholder - assuming this is the history page itself)
   const handleCalendarPress = () => {
       console.log("Calendar icon pressed on Admin History, navigating to history1.tsx");
       router.push('/PagesAdmin/history1'); // Navigate to Admin History page (history1.tsx)
   };

  // Function to handle tapping on a history item card (placeholder)
  const handleHistoryItemPress = (item: AdminHistoryItem) => {
      console.log(`History item ${item.laundryNumber} pressed`);
      // Implement navigation to a detailed view for this item if needed
      // router.push(`/PagesAdmin/historyDetails/${item.id}`); // Example
  };


  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed on Admin History, navigating to Admin Home");
    // Use replace to go back to the root of the admin stack (Home)
    router.replace('/PagesAdmin'); // Navigate to Admin Home page (index.tsx)
  };

  // Function to handle bottom right history icon press
  const handleBottomRightHistoryPress = () => {
    console.log("History icon pressed on Admin History");
    // Already on the history screen, no navigation needed
  };


  // Function to render a single history item card
  const renderHistoryItem = (item: AdminHistoryItem) => {
    return (
      <TouchableOpacity key={item.id} style={styles.historyCard} onPress={() => handleHistoryItemPress(item)}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.laundryNumber}>{item.laundryNumber}</Text>
            {/* Status text */}
            <Text style={styles.itemStatus}>{item.status.toUpperCase()}</Text> {/* Display status in uppercase */}
          </View>
           {/* Service Type (optional, based on admin view) */}
           {item.serviceType && <Text style={styles.serviceType}>{item.serviceType}</Text>}
          <View style={styles.cardDetailsRow}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.price}>P {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Profile Icon Placeholder - Clickable */}
        <TouchableOpacity style={styles.profileIconPlaceholder} onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={60} color={colors.profileIconBackground} /> {/* Using a light blue icon */}
        </TouchableOpacity>

        {/* Greeting and Welcome Text */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi, Admin 👋</Text> {/* Added hand wave emoji */}
          <Text style={styles.welcomeText}>Let's get ready!</Text>
        </View>

        {/* Calendar Icon (Top Right) - Clickable */}
        <TouchableOpacity style={styles.calendarIcon} onPress={handleCalendarPress}> {/* Added onPress */}
             <Ionicons name="calendar-outline" size={24} color={colors.mediumGrey} /> {/* Using calendar icon */}
        </TouchableOpacity>
      </View>

      {/* Status Filter Tabs */}
      <View style={styles.statusFilterContainer}>
        {['Completed', 'Pending'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusButton,
              activeStatus === status && styles.activeStatusButton,
            ]}
            onPress={() => setActiveStatus(status as 'Completed' | 'Pending')}
          >
            <Text
              style={[
                styles.statusButtonText,
                activeStatus === status && styles.activeStatusButtonText,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* History List */}
      <ScrollView style={styles.historyListContainer} contentContainerStyle={styles.historyListContent}>
        {filteredHistoryItems.map(renderHistoryItem)}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon - Inactive (Left) */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            <Ionicons name="home-outline" size={24} color={colors.mediumGrey} /> {/* Outline home icon */}
             {/* No active indicator dot */}
         </TouchableOpacity>
         {/* Placeholder for middle icon (if needed for spacing) */}
          
         {/* History Icon - Active (Right) */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleBottomRightHistoryPress}>
            <Ionicons name="calendar" size={24} color={colors.primaryPurple} /> {/* Filled calendar icon */}
             {/* Small active indicator dot */}
             <View style={styles.activeNavDot} />
         </TouchableOpacity>
      </View>

    </SafeAreaView> // Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { // Style for SafeAreaView
    flex: 1,
    backgroundColor: colors.lightGrey, // Light grey background for the screen
  },
   headerContainer: { // Reused style from Admin Index
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, // Space from the top of the safe area
    paddingBottom: 10,
    backgroundColor: colors.white, // White background for the header area
    borderBottomLeftRadius: 20, // Rounded bottom corners
    borderBottomRightRadius: 20,
     shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  profileIconPlaceholder: { // Reused style from Admin Index
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white, // White background for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  greetingContainer: { // Reused style from Admin Index
    flex: 1, // Allow greeting container to take up space
  },
  greetingText: { // Reused style from Admin Index
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 2,
  },
  welcomeText: { // Reused style from Admin Index
    fontSize: 14,
    color: colors.mediumGrey,
  },
   calendarIcon: { // Reused style from Admin Index
       // Position relative to the headerContainer
   },
  statusFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out buttons evenly
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20, // Space below header
    marginBottom: 15, // Space above history list
    backgroundColor: colors.white, // White background for the filter bar
    borderRadius: 10,
    paddingVertical: 5, // Padding inside the filter bar
     shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  statusButton: {
    flex: 1, // Distribute space evenly
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8, // Rounded corners for buttons
    marginHorizontal: 3, // Space between buttons
  },
  activeStatusButton: {
    backgroundColor: colors.white, // White background for active button
    borderBottomWidth: 2, // Underline for active tab
    borderColor: colors.primaryPurple, // Purple underline
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.mediumGrey, // Default text color
  },
  activeStatusButtonText: {
    color: colors.primaryPurple, // Purple text color for active button
  },
  historyListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 20, // Align with other content
  },
  historyListContent: {
    paddingBottom: 80, // Add padding at the bottom to prevent content being hidden by nav bar
  },
  historyCard: {
    backgroundColor: colors.cardBackground, // Light purple background for cards
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
     shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  cardContent: {
      // No specific styles needed here unless you add more complex layout inside
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // Space below header
  },
  laundryNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  itemStatus: { // Style for the status text on the card
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.mediumGrey, // Muted color for status
  },
  serviceType: { // Optional style for service type if displayed
    fontSize: 14,
    color: colors.mediumGrey,
    marginBottom: 10, // Space below service type
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
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
