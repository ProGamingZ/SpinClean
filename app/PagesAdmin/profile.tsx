import React, { useState } from 'react'; // Import useState for modal visibility
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Modal, Pressable, Alert } from 'react-native'; // Import Modal, Pressable, Alert
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for active elements, icons, logout button background
  lightGrey: '#f0f0f0', // Backgrounds
  darkGrey: '#333', // Main text, header title
  mediumGrey: '#888', // Sub-details text, inactive icon color, confirmation text
  white: '#fff', // White elements, text on purple background
  borderGrey: '#ccc', // Borders, dividers
  cardBackground: '#F8F9FA', // Card background
  iconBackground: '#E8EAF6', // Light purple/blue for icon circles
  profileIconBackground: '#E1F5FE', // Lighter blue background for the large profile icon circle
  overlayBackground: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for overlay background
  overlayCardBackground: '#fff', // White background for the overlay card
  cancelButtonBorder: '#6B4EFF', // Purple border for cancel button
  cancelButtonText: '#6B4EFF', // Purple text for cancel button
  logoutButtonText: '#fff', // White text for logout button
};

// Define the key used to store user role (should match your login.tsx)
const USER_ROLE_KEY = 'userRole';

export default function ProfileScreen() {
  const router = useRouter(); // Initialize useRouter hook

  // State to control the visibility of the logout modal
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // Placeholder user data
  const userName = "Admin"; // Example user name
  const userNumber = "Number"; // Example user number (replace with actual data)

  // Function to handle "Change Password & Username" press
  const handleChangePasswordPress = () => {
    console.log("Change Password & Username pressed");
    // Navigate to the user edit profile page using the 'edit-profile' route name
    router.push('/PagesAdmin/edit-profile'); // Updated navigation target
  };

  // Function to handle "Logout" press (shows the confirmation modal)
  const handleLogoutPress = () => {
    console.log("Logout pressed, showing confirmation modal");
    setLogoutModalVisible(true); // Show the modal
  };

  // Function to cancel logout (hides the modal)
  const cancelLogout = () => {
    console.log("Logout cancelled");
    setLogoutModalVisible(false); // Hide the modal
  };

  // Function to confirm logout (clears storage and navigates)
  const confirmLogout = async () => {
    console.log("Logout confirmed, logging out...");
    try {
      // Clear the user role from AsyncStorage
      await AsyncStorage.removeItem(USER_ROLE_KEY);
      console.log("User role removed from AsyncStorage");

      // Navigate back to the login page
      // Use router.replace to prevent going back to user pages
      router.replace('/createAccount/login');

    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally show an error message to the user
      Alert.alert("Logout Error", "Could not log out successfully.");
      // Still attempt to navigate to login as a fallback
      router.replace('/createAccount/login');
    } finally {
      setLogoutModalVisible(false); // Hide the modal regardless of success/failure
    }
  };


  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed, navigating to Home");
    // Use replace to go back to the root of the user stack (Home)
    router.replace('/PagesAdmin');
  };

  const handleHistoryPress = () => {
    console.log("History icon pressed, navigating to History");
    // Use replace to navigate to the History screen and clear history
    router.replace('/PagesAdmin/history');
  };


  return (
    <SafeAreaView style={styles.safeAreaContainer}> {/* Wrap in SafeAreaView */}
      {/* Header */}
      <View style={styles.header}>
        {/* No back button in this design */}
        {/* Empty view for spacing */}
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Settings</Text>
        {/* Empty view for spacing */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>

        {/* Profile Info Section */}
        <View style={styles.profileInfoContainer}>
          {/* Large Profile Icon */}
          <View style={styles.largeProfileIconCircle}>
             <Ionicons name="person" size={60} color={colors.white} /> {/* White person icon */}
          </View>
          {/* User Name and Number */}
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userNumber}>{userNumber}</Text>
        </View>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          {/* Change Password & Username Option */}
          <TouchableOpacity style={styles.optionRow} onPress={handleChangePasswordPress}> {/* Calls handleChangePasswordPress */}
            <Text style={styles.optionText}>Change Password & Username</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.mediumGrey} />
          </TouchableOpacity>
          <View style={styles.divider} /> {/* Divider */}

          {/* Logout Option */}
          <TouchableOpacity style={styles.optionRow} onPress={handleLogoutPress}> {/* Call handleLogoutPress */}
            <Text style={styles.optionText}>Logout</Text>
            <Ionicons name="chevron-forward" size={24} color={colors.mediumGrey} />
          </TouchableOpacity>
          {/* No divider after the last option */}
        </View>


      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* This should ideally be part of a Tab Navigator layout in a real app */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            <Ionicons name="home-outline" size={24} color={colors.mediumGrey} />
             {/* No active indicator dot */}
         </TouchableOpacity>
         
         {/* Right Icon (History) - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHistoryPress}>
            <Ionicons name="calendar-outline" size={24} color={colors.mediumGrey} />
             {/* No active indicator dot */}
         </TouchableOpacity>
          {/* Add more nav bar items */}
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade" // Fade animation looks good for overlays
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={cancelLogout} // Handle Android back button press
      >
        {/* Semi-transparent background */}
        <Pressable style={styles.overlayBackground} onPress={cancelLogout}>
          {/* Modal Content Card */}
          {/* Stop propagation of press event on the content card */}
          <Pressable style={styles.logoutModalCard} onPress={(e) => e.stopPropagation()}>
            {/* Modal Title */}
            <Text style={styles.logoutModalTitle}>Log out</Text>
            {/* Confirmation Text */}
            <Text style={styles.logoutModalText}>
              Are you sure you want to log out? You'll need to login again to use the app.
            </Text>
            {/* Buttons */}
            <View style={styles.logoutModalButtons}>
              {/* Cancel Button */}
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelLogout}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              {/* Log out Button */}
              <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={confirmLogout}>
                <Text style={[styles.modalButtonText, styles.logoutButtonText]}>Log out</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

    </SafeAreaView> // Close SafeAreaView
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
  mainContent: {
    flex: 1, // Allow main content to take up available vertical space
    paddingHorizontal: 20,
    paddingTop: 20, // Space from header
  },
   mainContentPadding: {
      paddingBottom: 20, // Add padding at the bottom of the scroll view
      alignItems: 'center', // Center content horizontally
   },
  profileInfoContainer: {
      alignItems: 'center', // Center items horizontally
      marginBottom: 30, // Space below profile info
  },
  largeProfileIconCircle: {
      width: 100, // Size of the circle
      height: 100, // Size of the circle
      borderRadius: 50, // Make it a circle
      backgroundColor: colors.profileIconBackground, // Light blue background
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10, // Space below the circle
  },
  userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.darkGrey,
      marginBottom: 5, // Space below name
  },
  userNumber: {
      fontSize: 14,
      color: colors.mediumGrey, // Muted color for number
  },
  optionsContainer: {
      width: '100%', // Options take full width
      backgroundColor: colors.cardBackground, // Light background for the options block
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      shadowColor: '#000', // Optional shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
  },
  optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15, // Vertical padding for each option row
  },
  optionText: {
      fontSize: 16,
      color: colors.darkGrey,
  },
  divider: {
      height: 1,
      backgroundColor: colors.borderGrey,
      marginVertical: 0, // No extra vertical margin for the divider
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

  // --- Logout Modal Styles ---
  overlayBackground: {
    flex: 1,
    backgroundColor: colors.overlayBackground, // Semi-transparent background
    justifyContent: 'center', // Center the modal card vertically
    alignItems: 'center', // Center the modal card horizontally
  },
  logoutModalCard: {
    backgroundColor: colors.overlayCardBackground, // White background for the card
    borderRadius: 10,
    padding: 20,
    width: '80%', // Modal card takes 80% of screen width
    alignItems: 'center', // Center content inside the card
  },
  logoutModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 10, // Space below title
  },
  logoutModalText: {
    fontSize: 14,
    color: colors.mediumGrey, // Muted color for confirmation text
    textAlign: 'center',
    marginBottom: 20, // Space below text
  },
  logoutModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out buttons
    width: '100%', // Buttons take full width of the modal card
  },
  modalButton: {
    flex: 1, // Each button takes equal space
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5, // Space between buttons
  },
  cancelButton: {
    backgroundColor: colors.white, // White background
    borderWidth: 1,
    borderColor: colors.cancelButtonBorder, // Purple border
  },
  logoutButton: {
    backgroundColor: colors.primaryPurple, // Purple background
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: colors.cancelButtonText, // Purple text
  },
  logoutButtonText: {
    color: colors.logoutButtonText, // White text
  },
});
