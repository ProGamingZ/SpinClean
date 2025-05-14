import React, { useState } from 'react'; // Import useState for modal visibility and selected item
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'; // Import Modal and Pressable
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your user palette for consistency)
const colors = {
  primaryPurple: '#6B4EFF', // Used for active elements, icons, notification count background, active progress
  lightGrey: '#f0f0f0', // Backgrounds, card background
  darkGrey: '#333', // Main text, header title
  mediumGrey: '#888', // Sub-details text, inactive icon color, placeholder text, inactive progress
  white: '#fff', // White elements, text on purple background
  borderGrey: '#ccc', // Borders, dividers, inactive progress line
  profileIconBackground: '#E1F5FE', // Lighter blue background for the large profile icon circle
  cardBackground: '#F8F9FA', // Card background
  cardPurpleBackground: '#EDE7F6', // Lightest purple for card background
  overlayBackground: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for overlay background
  overlayCardBackground: '#fff', // White background for the overlay card
  updateButtonBackground: '#6B4EFF', // Purple background for update button
  updateButtonText: '#fff', // White text for update button
  progressLineActive: '#6B4EFF', // Color for active progress line
  progressLineInactive: '#ccc', // Color for inactive progress line
};

// Define a type for a laundry item in the admin view
interface AdminLaundryItem {
    id: string;
    laundryNumber: string; // e.g., 'LAUNDRY 1'
    serviceType: string; // e.g., 'Dry Cleaning'
    customerName: string; // e.g., 'David'
    price: string; // e.g., '200.00'
    status: 'Picked up' | 'Pending' | 'Delivered'; // Status for filtering and progress tracking
}

export default function AdminHomeScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // State for the active status filter
  const [activeStatus, setActiveStatus] = useState<'Picked up' | 'Pending' | 'Delivered'>('Picked up');

  // State to control the visibility of the status update modal
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  // State to store the data of the laundry item currently selected for the modal
  const [selectedLaundryItem, setSelectedLaundryItem] = useState<AdminLaundryItem | null>(null);


  // Placeholder data for laundry items (Admin view)
  const laundryItems: AdminLaundryItem[] = [
    {
      id: '1',
      laundryNumber: 'LAUNDRY 1',
      serviceType: 'Dry Cleaning',
      customerName: 'David',
      price: '200.00',
      status: 'Picked up', // Example status
    },
    {
      id: '2',
      laundryNumber: 'LAUNDRY 2',
      serviceType: 'Wash & Iron',
      customerName: 'Sarah',
      price: '150.00',
      status: 'Pending', // Example status
    },
    {
      id: '3',
      laundryNumber: 'LAUNDRY 3',
      serviceType: 'Dry Cleaning',
      customerName: 'John',
      price: '250.00',
      status: 'Delivered', // Example status
    },
     {
      id: '4',
      laundryNumber: 'LAUNDRY 4',
      serviceType: 'Wash & Iron',
      customerName: 'Emily',
      price: '180.00',
      status: 'Picked up', // Example status
    },
    // Add more placeholder admin laundry items as needed
  ];

  // Filter laundry items based on the active status
  const filteredLaundryItems = laundryItems.filter(item => item.status === activeStatus);

  // Function to handle profile icon press
  const handleProfilePress = () => {
    console.log("Admin Profile icon pressed, navigating to Admin Profile");
    router.push('/PagesAdmin/profile'); // Navigate to Admin Profile page
  };

  // Function to handle notification link press
  const handleNotificationPress = () => {
    console.log("Notification link pressed on Admin Home, navigating to Admin Notification");
    router.push('/PagesAdmin/notification'); // Navigate to Admin Notification page
  };

  // Function to handle top right calendar icon press
  const handleTopRightCalendarPress = () => {
      console.log("Top right calendar icon pressed on Admin Home, navigating to history1.tsx");
      router.push('/PagesAdmin/history1'); // Navigate to Admin History page (history1.tsx)
  };

  // Function to handle tapping on a laundry item card (placeholder for potential future detail view)
  const handleLaundryItemPress = (item: AdminLaundryItem) => {
      console.log(`Laundry item ${item.laundryNumber} card pressed`);
      // Implement navigation to a detailed view for this item if needed
      // router.push(`/PagesAdmin/laundryDetails/${item.id}`); // Example
  };

  // Function to handle the chevron-up press and show the status modal
  const handleChevronPress = (item: AdminLaundryItem) => {
      console.log(`Chevron pressed for ${item.laundryNumber}, showing status modal`);
      setSelectedLaundryItem(item); // Set the selected item data
      setStatusModalVisible(true); // Show the modal
  };

  // Function to close the status modal
  const closeStatusModal = () => {
    setStatusModalVisible(false);
    setSelectedLaundryItem(null); // Clear selected item data
  };

  // Function to handle the UPDATE button press in the modal (placeholder)
  const handleUpdateStatus = () => {
      console.log(`Update status pressed for ${selectedLaundryItem?.laundryNumber}`);
      // Implement your logic to update the laundry item status here
      // You would typically send this update to a backend or update your local state.

      // After updating, you might want to refresh the list or navigate.
      // For this example, we'll just close the modal.
      closeStatusModal();
      // Optionally refresh the data: fetchLaundryItems();
  };

  // Function to determine the status of each progress step based on the item's main status
  const getProgressStatus = (itemStatus: 'Picked up' | 'Pending' | 'Delivered', step: 'Washing' | 'Cleaning' | 'Folding' | 'Delivered') => {
      if (itemStatus === 'Delivered') {
          return 'done';
      }
      if (itemStatus === 'Pending') {
          if (step === 'Washing' || step === 'Cleaning') {
              return 'done';
          }
          return 'pending';
      }
      if (itemStatus === 'Picked up') {
          return 'pending'; // All steps pending initially after pickup
      }
      return 'pending'; // Default to pending
  };

  // Function to render a single progress step in the modal
  const renderProgressStep = (label: string, itemStatus: 'Picked up' | 'Pending' | 'Delivered', iconName: string) => {
    const stepStatus = getProgressStatus(itemStatus, label as any); // Cast label to step type
    const isDone = stepStatus === 'done';
    const circleStyle = isDone ? styles.progressCircleDone : styles.progressCirclePending;
    const textStyle = isDone ? styles.progressTextDone : styles.progressTextPending;
    const iconColor = isDone ? colors.primaryPurple : colors.mediumGrey;
     // Determine line color based on the status of the *current* step
     const lineStyle = isDone ? styles.progressLineActive : styles.progressLineInactive;


    return (
      <View style={styles.progressStep}>
        <View style={styles.progressStepLeft}>
          {/* Circle icon */}
          <View style={[styles.progressCircle, circleStyle]}>
             <Ionicons name={isDone ? "checkmark-circle" : "radio-button-off"} size={20} color={iconColor} />
          </View>
          {/* Vertical line (hide for the last step) */}
          {label !== 'Delivered' && <View style={[styles.progressVerticalLine, lineStyle]} />}
        </View>
        <View style={styles.progressStepRight}>
           {/* Step Label */}
           <Text style={[styles.progressStepLabel, textStyle]}>{label}</Text>
           {/* Icon */}
           {/* Using placeholder icons based on common laundry steps */}
           {label === 'Washing' && <Ionicons name="water-outline" size={24} color={iconColor} />}
           {label === 'Cleaning' && <MaterialCommunityIcons name="broom" size={24} color={iconColor} />} {/* Using broom for cleaning */}
           {label === 'Folding' && <Ionicons name="file-tray-stacked-outline" size={24} color={iconColor} />} {/* Using file-tray for folding */}
           {label === 'Delivered' && <Ionicons name="car-outline" size={24} color={iconColor} />} {/* Using car for delivered */}
        </View>
      </View>
    );
  };


  // Function to render a single laundry item card
  const renderLaundryItem = (item: AdminLaundryItem) => {
    return (
      <TouchableOpacity key={item.id} style={styles.laundryCard} onPress={() => handleLaundryItemPress(item)}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.laundryNumber}>{item.laundryNumber}</Text>
            {/* Upward arrow icon - Now clickable */}
            <TouchableOpacity onPress={() => handleChevronPress(item)}> {/* Added onPress */}
                 <Ionicons name="chevron-up" size={24} color={colors.mediumGrey} />
            </TouchableOpacity>
          </View>
          <Text style={styles.serviceType}>{item.serviceType}</Text>
          <View style={styles.cardDetailsRow}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.price}>P {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed on Admin Home");
    // Already on the home screen, no navigation needed
  };

  // Function to handle bottom right history icon press
  const handleBottomRightHistoryPress = () => {
    console.log("Bottom right history icon pressed on Admin Home, navigating to history.tsx");
    router.replace('/PagesAdmin/history'); // Navigate to Admin History page (history.tsx)
  };


  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Profile Icon Placeholder - Now clickable */}
        <TouchableOpacity style={styles.profileIconPlaceholder} onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={60} color={colors.profileIconBackground} /> {/* Using a light blue icon */}
        </TouchableOpacity>

        {/* Greeting and Welcome Text */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi, Admin 👋</Text> {/* Added hand wave emoji */}
          <Text style={styles.welcomeText}>Let's get ready!</Text>
        </View>

        {/* Calendar Icon (Top Right) - Now clickable */}
        <TouchableOpacity style={styles.calendarIcon} onPress={handleTopRightCalendarPress}> {/* Updated onPress */}
             <Ionicons name="calendar-outline" size={24} color={colors.mediumGrey} /> {/* Using calendar icon */}
        </TouchableOpacity>
      </View>

      {/* Notification Link */}
      <TouchableOpacity style={styles.notificationLink} onPress={handleNotificationPress}>
        <Text style={styles.notificationText}>2 Notification</Text> {/* Placeholder count */}
        <Ionicons name="chevron-forward" size={20} color={colors.mediumGrey} />
      </TouchableOpacity>

      {/* Status Filter Tabs */}
      <View style={styles.statusFilterContainer}>
        {['Picked up', 'Pending', 'Delivered'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusButton,
              activeStatus === status && styles.activeStatusButton,
            ]}
            onPress={() => setActiveStatus(status as 'Picked up' | 'Pending' | 'Delivered')}
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

      {/* Laundry List */}
      <ScrollView style={styles.laundryListContainer} contentContainerStyle={styles.laundryListContent}>
        {filteredLaundryItems.map(renderLaundryItem)}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon - Active */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            <Ionicons name="home" size={24} color={colors.primaryPurple} /> {/* Filled home icon */}
             {/* Small active indicator dot */}
             <View style={styles.activeNavDot} />
         </TouchableOpacity>
         {/* History Icon - Inactive (Bottom Right) */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleBottomRightHistoryPress}> {/* Updated onPress */}
            <Ionicons name="calendar-outline" size={24} color={colors.mediumGrey} /> {/* Calendar icon */}
             {/* No active indicator dot */}
         </TouchableOpacity>
          {/* Removed the third placeholder View */}
      </View>

      {/* Status Update Modal */}
      <Modal
        animationType="fade" // or "slide"
        transparent={true}
        visible={isStatusModalVisible}
        onRequestClose={closeStatusModal} // Handle Android back button
      >
        {/* Semi-transparent background */}
        <Pressable style={styles.overlayBackground} onPress={closeStatusModal}>
          {/* Modal Content Card */}
          {/* Stop propagation of press event on the content card */}
          <Pressable style={styles.statusModalCard} onPress={(e) => e.stopPropagation()}>
            {/* Header with Customer Name and Laundry Number */}
            <View style={styles.statusModalHeader}>
                <View>
                    <Text style={styles.statusModalCustomerName}>{selectedLaundryItem?.customerName}</Text>
                    <Text style={styles.statusModalLaundryNumber}>{selectedLaundryItem?.laundryNumber}</Text>
                </View>
                 {/* Chevron Up Icon (can be used to close or just for design) */}
                 <TouchableOpacity onPress={closeStatusModal}>
                    <Ionicons name="chevron-up" size={24} color={colors.mediumGrey} />
                 </TouchableOpacity>
            </View>

            {/* Progress Tracker Section */}
            <View style={styles.progressTracker}>
               {/* Render progress steps based on selected item status */}
               {selectedLaundryItem && renderProgressStep('Washing', selectedLaundryItem.status, 'water-outline')}
               {selectedLaundryItem && renderProgressStep('Cleaning', selectedLaundryItem.status, 'broom')}
               {selectedLaundryItem && renderProgressStep('Folding', selectedLaundryItem.status, 'file-tray-stacked-outline')}
               {selectedLaundryItem && renderProgressStep('Delivered', selectedLaundryItem.status, 'car-outline')}
            </View>

            {/* UPDATE Button */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStatus}>
              <Text style={styles.updateButtonText}>UPDATE</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>

    </SafeAreaView> // Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { // Style for SafeAreaView
    flex: 1,
    backgroundColor: colors.lightGrey, // Light grey background for the screen
  },
  headerContainer: {
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
  profileIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white, // White background for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  greetingContainer: {
    flex: 1, // Allow greeting container to take up space
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.mediumGrey,
  },
   calendarIcon: {
       // Position relative to the headerContainer
   },
  notificationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white, // White background for the notification link
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20, // Align with header padding
    marginTop: 15, // Space below header
     shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  notificationText: {
    fontSize: 16,
    color: colors.darkGrey,
  },
  statusFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20, // Space below notification link
    marginBottom: 15, // Space above laundry list
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
    backgroundColor: colors.primaryPurple, // Purple background for active button
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.mediumGrey, // Default text color
  },
  activeStatusButtonText: {
    color: colors.white, // White text color for active button
  },
  laundryListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 20, // Align with other content
  },
  laundryListContent: {
    paddingBottom: 80, // Add padding at the bottom to prevent content being hidden by nav bar
  },
  laundryCard: {
    flexDirection: 'row', // Added flexDirection row to align image and content
    backgroundColor: colors.cardPurpleBackground, // Light purple background for cards
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
      flex: 1, // Allow content to take up remaining space
      marginLeft: 10, // Space between image placeholder and content
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
  serviceType: {
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
  },

  // --- Status Update Modal Styles ---
  overlayBackground: {
    flex: 1,
    backgroundColor: colors.overlayBackground, // Semi-transparent background
    justifyContent: 'center', // Center the modal card vertically
    alignItems: 'center', // Center the modal card horizontally
  },
  statusModalCard: {
    backgroundColor: colors.overlayCardBackground, // White background for the card
    borderRadius: 10,
    padding: 20,
    width: '80%', // Modal card takes 80% of screen width
    // alignItems: 'center', // Align items to the start for text alignment
  },
  statusModalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20, // Space below header
  },
  statusModalCustomerName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.darkGrey,
  },
  statusModalLaundryNumber: {
      fontSize: 14,
      color: colors.mediumGrey,
  },
  progressTracker: {
    marginBottom: 20,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    marginBottom: 10, // Space between steps
  },
  progressStepLeft: {
     alignItems: 'center',
     marginRight: 15, // Space between left side (circle/line) and right side (label/icon)
  },
  progressCircle: {
    width: 24, // Size of the circle container
    height: 24, // Size of the circle container
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleDone: {
    // No specific background color needed, icon handles color
  },
  progressCirclePending: {
     // No specific background color needed, icon handles color
  },
  progressVerticalLine: {
    width: 2, // Thickness of the line
    flex: 1, // Make line fill available vertical space
    // Background color set dynamically based on status
  },
  progressLineActive: {
     backgroundColor: colors.primaryPurple, // Purple line for active/done steps
  },
   progressLineInactive: {
       backgroundColor: colors.borderGrey, // Grey line for pending steps
   },
  progressStepRight: {
     flex: 1, // Allow right side to take up remaining space
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingBottom: 10, // Add padding to align the line correctly
  },
  progressStepLabel: {
    fontSize: 16,
    // Color set dynamically based on status
  },
  progressTextDone: {
     color: colors.primaryPurple, // Purple text for done steps
     fontWeight: 'bold',
  },
   progressTextPending: {
       color: colors.mediumGrey, // Grey text for pending steps
   },
   updateButton: {
       backgroundColor: colors.updateButtonBackground,
       paddingVertical: 15,
       borderRadius: 8,
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%', // Button takes full width
       marginTop: 10, // Space above the button
   },
   updateButtonText: {
       color: colors.updateButtonText,
       fontSize: 18,
       fontWeight: 'bold',
   },
});
