import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'; // Import Modal and Pressable
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from the palette in index.tsx and history.tsx)
const colors = {
  primaryPurple: '#6B4EFF', // Active icon color, badge border, active progress circle/text
  lightGrey: '#f0f0f0', // Backgrounds
  darkGrey: '#333', // Main text, header title, section headings
  mediumGrey: '#888', // Sub-details text, inactive icon color, inactive progress circle/text
  white: '#fff', // White elements, text on purple background
  borderGrey: '#ccc', // Borders, progress line
  cardBackground: '#F8F9FA', // Card background (similar to history.tsx)
  iconBackground: '#E8EAF6', // Light purple/blue for icon circles (similar to notification.tsx/history.tsx)
  statusPending: '#FFF3CD', // Lighter yellow background for 'Pending' status badge (adjusting based on screenshot)
  statusPendingText: '#856404', // Darker yellow text for 'Pending' status badge
  pickupStatusText: '#888', // Color for 'Picked UP' text
  overlayBackground: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for overlay background
  overlayCardBackground: '#fff', // White background for the overlay card
  progressLineActive: '#6B4EFF', // Color for active progress line
  progressLineInactive: '#ccc', // Color for inactive progress line
};

// Define a type for a laundry item based on the screenshot
interface LaundryItem {
    id: string;
    title: string; // e.g., 'LAUNDRY 1'
    status: 'Pending' | 'Processing' | 'Ready' | 'Delivered'; // Status like 'Pending'
    price: string; // e.g., 'P 60'
    pickupStatus: 'Picked UP' | 'Pending Pickup'; // Pickup status
    // Add more details needed for the overlay
    serviceType?: string; // e.g., 'Wash & Iron'
    items?: { name: string; quantity: number; }[]; // Example structure for items
    paymentMethod?: string; // e.g., 'Cash on Delivery'
    itemTotal?: string; // e.g., 'P 50'
    deliveryFee?: string; // e.g., 'P 10'
    totalBill?: string; // e.g., 'P 60'
    // Add status tracking details
    washingStatus: 'done' | 'pending';
    dryingStatus: 'done' | 'pending';
    foldingStatus: 'done' | 'pending';
    deliveredStatus: 'done' | 'pending';
}


export default function MyLaundryScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // State to control the visibility of the overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  // State to store the data of the laundry item currently selected for the overlay
  const [selectedLaundryItem, setSelectedLaundryItem] = useState<LaundryItem | null>(null);


  // Placeholder data for laundry items based on the screenshot
  // Added extra details needed for the overlay
  const laundryItems: LaundryItem[] = [
    {
      id: '1',
      title: 'LAUNDRY 1',
      status: 'Pending',
      price: 'P 60',
      pickupStatus: 'Picked UP',
      serviceType: 'Wash & Iron',
      items: [{ name: 'T-shirt', quantity: 2 }, { name: 'Pants', quantity: 1 }],
      paymentMethod: 'Cash on Delivery',
      itemTotal: 'P 50',
      deliveryFee: 'P 10',
      totalBill: 'P 60',
      washingStatus: 'done', // Example status
      dryingStatus: 'done',
      foldingStatus: 'pending',
      deliveredStatus: 'pending',
    },
    {
      id: '2',
      title: 'LAUNDRY 2',
      status: 'Pending',
      price: 'P 160',
      pickupStatus: 'Picked UP',
      serviceType: 'Dry Wash',
      items: [{ name: 'Jacket', quantity: 1 }, { name: 'Dress', quantity: 1 }],
      paymentMethod: 'Credit Card',
      itemTotal: 'P 150',
      deliveryFee: 'P 10',
      totalBill: 'P 160',
      washingStatus: 'done',
      dryingStatus: 'done',
      foldingStatus: 'done',
      deliveredStatus: 'pending',
    },
    {
      id: '3',
      title: 'LAUNDRY 3',
      status: 'Pending',
      price: 'P 100',
      pickupStatus: 'Picked UP',
      serviceType: 'Wash & Iron',
      items: [{ name: 'Shorts', quantity: 3 }, { name: 'Socks', quantity: 5 }],
      paymentMethod: 'Cash on Delivery',
      itemTotal: 'P 90',
      deliveryFee: 'P 10',
      totalBill: 'P 100',
      washingStatus: 'done',
      dryingStatus: 'pending',
      foldingStatus: 'pending',
      deliveredStatus: 'pending',
    },
    {
      id: '4',
      title: 'LAUNDRY 4',
      status: 'Pending',
      price: 'P 760',
      pickupStatus: 'Picked UP',
      serviceType: 'Dry Wash',
      items: [{ name: 'Coat', quantity: 1 }],
      paymentMethod: 'Credit Card',
      itemTotal: 'P 750',
      deliveryFee: 'P 10',
      totalBill: 'P 760',
      washingStatus: 'pending',
      dryingStatus: 'pending',
      foldingStatus: 'pending',
      deliveredStatus: 'pending',
    },
    // Add more placeholder laundry items as needed
  ];

  // Function to handle back button press (if you add one, though not in design)
  // const handleBackPress = () => {
  //   console.log("Back button pressed on My Laundry");
  //   router.back();
  // };

  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed, navigating to Home");
    // Use replace to go back to the root of the user stack (Home)
    router.replace('/PagesUser');
  };

  const handleMyLaundryPress = () => {
    console.log("My Laundry icon pressed");
    // Already on the My Laundry screen, no navigation needed
  };

  const handleHistoryPress = () => {
    console.log("History icon pressed, navigating to History");
    // Use replace to navigate to the History screen and clear history
    router.replace('/PagesUser/history');
  };

  // Function to handle the triple dots press and show the overlay
  const handleOptionsPress = (item: LaundryItem) => {
    console.log(`Options pressed for ${item.title}`);
    setSelectedLaundryItem(item); // Set the selected item data
    setIsOverlayVisible(true); // Show the overlay
  };

  // Function to close the overlay
  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setSelectedLaundryItem(null); // Clear selected item data
  };

  // Function to render a single laundry item card
  const renderLaundryItem = (item: LaundryItem) => {
    // Determine status badge style based on status
    const statusBadgeStyle = item.status === 'Pending' ? styles.statusPendingBadge : {};
    // const statusBadgeTextStyle = item.status === 'Pending' ? styles.statusPendingText : {};
    // You would add more conditions for other statuses (Processing, Ready, Delivered)

    return (
      <View key={item.id} style={styles.laundryCard}>
        {/* Image Placeholder */}
        <View style={styles.imagePlaceholder}>
          {/* You would add an Image component here */}
           <Ionicons name="shirt-outline" size={40} color={colors.mediumGrey} /> {/* Example icon */}
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {/* Triple dots icon to open the overlay */}
            <TouchableOpacity onPress={() => handleOptionsPress(item)}> {/* Call handleOptionsPress */}
                 <Ionicons name="ellipsis-horizontal" size={24} color={colors.mediumGrey} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardDetailsRow}>
             {/* Status badge */}
             <Text style={[styles.cardStatus, statusBadgeStyle]}>{item.status}</Text>
             {/* Price */}
             <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
          {/* Pickup Status */}
          <Text style={styles.pickupStatusText}>{item.pickupStatus}</Text>
        </View>
      </View>
    );
  };

  // Function to render a single progress step in the overlay
  const renderProgressStep = (label: string, status: 'done' | 'pending', iconName: string) => {
    const isDone = status === 'done';
    const circleStyle = isDone ? styles.progressCircleDone : styles.progressCirclePending;
    const textStyle = isDone ? styles.progressTextDone : styles.progressTextPending;
    const iconColor = isDone ? colors.primaryPurple : colors.mediumGrey;

    return (
      <View style={styles.progressStep}>
        <View style={styles.progressStepLeft}>
          {/* Circle icon */}
          <View style={[styles.progressCircle, circleStyle]}>
             <Ionicons name={isDone ? "checkmark-circle" : "radio-button-off"} size={20} color={iconColor} />
          </View>
          {/* Vertical line (hide for the last step) */}
          {label !== 'Delivered' && <View style={[styles.progressVerticalLine, isDone ? styles.progressLineActive : styles.progressLineInactive]} />}
        </View>
        <View style={styles.progressStepRight}>
           {/* Step Label */}
           <Text style={[styles.progressStepLabel, textStyle]}>{label}</Text>
           {/* Icon */}
           <Ionicons name={iconName as any} size={24} color={iconColor} />
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>My Laundry</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Laundry List */}
      <ScrollView style={styles.laundryListContainer} contentContainerStyle={styles.laundryListContent}>
        {laundryItems.map(renderLaundryItem)}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            <Ionicons name="home-outline" size={24} color={colors.mediumGrey} />
         </TouchableOpacity>
         {/* Middle Icon (My Laundry) - Active */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleMyLaundryPress}>
            <MaterialCommunityIcons name="map" size={24} color={colors.primaryPurple} />
             <View style={styles.activeNavDot} />
         </TouchableOpacity>
         {/* Right Icon (History) - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHistoryPress}>
            <Ionicons name="calendar-outline" size={24} color={colors.mediumGrey} />
         </TouchableOpacity>
      </View>

      {/* Overlay Modal */}
      <Modal
        animationType="slide" // or "fade" or "none"
        transparent={true}
        visible={isOverlayVisible}
        onRequestClose={closeOverlay} // Handle Android back button
      >
        {/* Semi-transparent background */}
        <Pressable style={styles.overlayBackground} onPress={closeOverlay}>
          {/* Overlay Content Card */}
          {/* Stop propagation of press event on the content card */}
          <Pressable style={styles.overlayCard} onPress={(e) => e.stopPropagation()}>
            {/* Overlay Header */}
            <View style={styles.overlayHeader}>
              <TouchableOpacity onPress={closeOverlay} style={styles.overlayBackButton}>
                <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
              </TouchableOpacity>
              <Text style={styles.overlayTitle}>Track <Text style={{ color: colors.primaryPurple }}>Laundry</Text></Text>
            </View>

            {/* Scrollable Content Area for Overlay */}
            <ScrollView style={styles.overlayContent}>
              {/* Progress Tracker Section */}
              <View style={styles.progressTracker}>
                 {/* Render progress steps based on selected item data */}
                 {selectedLaundryItem && renderProgressStep('Washing', selectedLaundryItem.washingStatus, 'water-outline')}
                 {selectedLaundryItem && renderProgressStep('Drying', selectedLaundryItem.dryingStatus, 'snow-outline')}
                 {selectedLaundryItem && renderProgressStep('Folding', selectedLaundryItem.foldingStatus, 'file-tray-stacked-outline')}
                 {selectedLaundryItem && renderProgressStep('Delivered', selectedLaundryItem.deliveredStatus, 'car-outline')} {/* Using car-outline for delivery */}
              </View>

              {/* Services Section */}
              <Text style={styles.overlaySectionHeading}>Services:</Text>
              <View style={styles.overlaySectionContent}>
                 {/* Display service type from selected item */}
                 <Text style={styles.overlayText}>{selectedLaundryItem?.serviceType || 'N/A'}</Text>
              </View>
               <View style={styles.overlayDivider} /> {/* Divider */}

              {/* Items Section */}
              <Text style={styles.overlaySectionHeading}>Items:</Text>
              <View style={styles.overlaySectionContent}>
                 {/* Display items from selected item */}
                 {selectedLaundryItem?.items?.map((item, index) => (
                    <Text key={index} style={styles.overlayText}>{item.name} - {item.quantity}</Text>
                 )) || <Text style={styles.overlayText}>No items listed</Text>}
              </View>
               <View style={styles.overlayDivider} /> {/* Divider */}

              {/* Payment Detail Section */}
              <Text style={styles.overlaySectionHeading}>Payment Detail:</Text>
              <View style={styles.overlaySectionContent}>
                 <Text style={styles.overlayText}>Payment Method: {selectedLaundryItem?.paymentMethod || 'N/A'}</Text>
                 <Text style={styles.overlayText}>Item Total: {selectedLaundryItem?.itemTotal || 'N/A'}</Text>
                 <Text style={styles.overlayText}>Delivery Fee: {selectedLaundryItem?.deliveryFee || 'N/A'}</Text>
              </View>
               <View style={styles.overlayDivider} /> {/* Divider */}

              {/* Total Bill */}
              <Text style={styles.overlayTotalBillHeading}>Total Bill:</Text>
              <Text style={styles.overlayTotalBillValue}>{selectedLaundryItem?.totalBill || 'N/A'}</Text>


            </ScrollView>

          </Pressable>
        </Pressable>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { // Style for SafeAreaView
    flex: 1,
    backgroundColor: colors.white, // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the title
    paddingHorizontal: 15,
    paddingTop: 20, // Adjust padding from top
    paddingBottom: 15,
    backgroundColor: colors.white, // White header background
    borderBottomWidth: 1, // Optional: Add a subtle border
    borderColor: colors.borderGrey, // Optional: Border color
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  laundryListContainer: {
    flex: 1, // Allow list to take up available vertical space
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  laundryListContent: {
    paddingBottom: 80, // Add padding at the bottom to prevent content being hidden by nav bar
  },
  laundryCard: {
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
  imagePlaceholder: {
      width: 60, // Fixed width for image area
      height: 60, // Fixed height for image area
      borderRadius: 8, // Rounded corners for placeholder
      backgroundColor: colors.lightGrey, // Placeholder background color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      flexShrink: 0, // Prevent image container from shrinking
  },
  cardContent: {
    flex: 1, // Allow content to take up remaining space
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // Space below title row
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    flexShrink: 1, // Allow title to wrap
    marginRight: 10, // Space between title and dots
  },
  cardDetailsRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 5, // Space below details row
  },
  cardStatus: {
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10, // Rounded badge corners
      overflow: 'hidden', // Ensure text is clipped if it overflows
  },
   statusPendingBadge: { // Style for 'Pending' badge (using yellow based on screenshot)
       backgroundColor: colors.statusPending, // Lighter yellow background
       color: colors.statusPendingText, // Darker yellow text
   },
  cardPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.darkGrey,
  },
  pickupStatusText: {
      fontSize: 12,
      color: colors.pickupStatusText, // Muted color for pickup status
      marginTop: 5, // Space above pickup status
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

  // --- Overlay Styles ---
  overlayBackground: {
    flex: 1,
    backgroundColor: colors.overlayBackground, // Semi-transparent background
    justifyContent: 'center', // Center the overlay card vertically
    alignItems: 'center', // Center the overlay card horizontally
  },
  overlayCard: {
    backgroundColor: colors.overlayCardBackground, // White background for the card
    borderRadius: 10,
    width: '90%', // Card takes 90% of screen width
    maxHeight: '80%', // Limit card height to 80% of screen height
    overflow: 'hidden', // Ensure content stays within rounded corners
  },
  overlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  overlayBackButton: {
    paddingRight: 10, // Space between back button and title
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  overlayContent: {
    padding: 15,
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
     marginRight: 10, // Space between left side (circle/line) and right side (label/icon)
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

  overlaySectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginTop: 10, // Space above section heading
    marginBottom: 5, // Space below section heading
  },
  overlaySectionContent: {
    paddingLeft: 10, // Indent content slightly
  },
  overlayText: {
    fontSize: 14,
    color: colors.darkGrey,
    marginBottom: 3, // Space between lines
  },
   overlayDivider: {
       height: 1,
       backgroundColor: colors.borderGrey,
       marginVertical: 10, // Space above and below divider
   },
   overlayTotalBillHeading: {
       fontSize: 16,
       fontWeight: 'bold',
       color: colors.darkGrey,
       marginTop: 10,
   },
   overlayTotalBillValue: {
       fontSize: 18,
       fontWeight: 'bold',
       color: colors.primaryPurple, // Purple color for total bill
       marginTop: 5,
   },
});
