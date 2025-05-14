import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'; // Import SafeAreaView
import { LinearGradient } from 'expo-linear-gradient'; // For the gradient background
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; // Example icons
import { useRouter } from 'expo-router'; // Import useRouter

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors based on the provided palette and design images (approximate hex codes)
const paletteColors = {
  primaryPurple: '#6B4EFF', // Used for top background start and active nav icon
  purpleLight: '#A78BFA', // Used for top background end
  washIronGradientStart: '#A78BFA', // Lighter purple/blue for Wash & Iron card start
  washIronGradientEnd: '#C4B5FD',   // Slightly darker purple/blue for Wash & Iron card end
  dryWashGradientStart: '#FBCFE8', // Lighter purple/pink for Dry Wash card start
  dryWashGradientEnd: '#F0ABFC',   // Darker purple/pink for Dry Wash card end
  orangeShape: '#FFCC80',         // Orange/yellow color for the shape in Dry Wash card
  inactiveIconGrey: '#888', // Grey color for inactive icons
};


export default function UserHomeScreen() {
  const router = useRouter(); // Get the router instance

  // Placeholder for user name - you would fetch this from your authentication state
  const userName = "David"; // Example user name

   // Function to handle profile icon press and navigate to the Profile screen
  const handleProfilePress = () => {
    console.log("Profile icon pressed, navigating to Profile");
    // Navigate to the Profile screen within the PagesUser group
    router.push('/PagesUser/profile'); // Navigate to the new profile.tsx
  };

  // Function to handle notification bell press and navigate to the Notification screen
  const handleNotificationPress = () => {
    console.log("Notification bell pressed, navigating to Notification");
    // Navigate to the Notification screen within the PagesUser group
    router.push('/PagesUser/notification');
  };

  // Function to handle category card press and navigate with data using query params
  const handleCategoryPress = (category: string) => {
    console.log(`Category "${category}" pressed, navigating to Basket`);
    // Construct the URL with the category as a query parameter
    const pathWithParams = `/PagesUser/basket?category=${encodeURIComponent(category)}`;
    router.push(pathWithParams as any); // Use 'as any' to bypass strict TypeScript check if needed, but it should work
  };

  // Function to handle bottom nav item presses
  const handleHomePress = () => {
    console.log("Home icon pressed");
    // Already on the home screen, no navigation needed or could reset stack
    // router.replace('/PagesUser/'); // Example to reset the stack to home
  };

  // Function to handle the middle bottom nav icon press (My Laundry)
  const handleMyLaundryPress = () => {
    console.log("Middle bottom nav icon pressed, navigating to My Laundry");
    // Navigate to the My Laundry screen within the PagesUser group
    router.push('/PagesUser/myLaundry');
  };

  // Function to handle the right bottom nav icon press (History)
  const handleHistoryPress = () => {
    console.log("Right bottom nav icon pressed, navigating to History");
    // Navigate to the History screen within the PagesUser group
    router.push('/PagesUser/history');
  };


  return (
    // Use SafeAreaView to avoid content overlapping with status bar/notches
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* ScrollView allows content to be scrollable if it exceeds screen height */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Top Section with Gradient Background (Re-added for the profile icon/greeting) */}
        <LinearGradient
          colors={[paletteColors.primaryPurple, paletteColors.purpleLight]} // Purple gradient colors from design/palette
          style={styles.topBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Content within the gradient area */}
          <View style={styles.headerContent}>
            {/* Profile Icon Placeholder - Now clickable */}
            <TouchableOpacity style={styles.profileIconPlaceholder} onPress={handleProfilePress}> {/* Added TouchableOpacity and onPress */}
              {/* Using Ionicons as per design */}
              <Ionicons name="person-circle-outline" size={60} color="#fff" />
            </TouchableOpacity>

            {/* Greeting and Welcome Text */}
            {/* Adjusted alignment and spacing for text */}
            <View style={styles.greetingContainer}>
              {/* Added hand emojis */}
              <Text style={styles.greetingText}>Hi, {userName} 👋👋👋</Text>
              <Text style={styles.welcomeText}>Welcome to SpinClean</Text>
            </View>

            {/* Notification Bell Icon */}
            <TouchableOpacity style={styles.notificationIcon} onPress={handleNotificationPress}>
               <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Main Content Area (below the gradient) */}
        <View style={styles.mainContent}>
          {/* Category Heading */}
          <Text style={styles.categoryHeading}>Category</Text>

          {/* Category Cards Container */}
          <View style={styles.categoryCardsContainer}>
            {/* Wash & Iron Card */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('Wash & Iron')} // Pass the category name
            >
               {/* Card Background Gradient - Using specific colors from design */}
               <LinearGradient
                  colors={[paletteColors.washIronGradientStart, paletteColors.washIronGradientEnd]} // Specific gradient colors for Wash & Iron
                  style={StyleSheet.absoluteFillObject} // Make gradient fill the card
                  start={{ x: 0, y: 0 }} // Diagonal gradient direction
                  end={{ x: 1, y: 1 }}
               />
               {/* Subtle shape/illustration inside the card - using a View with rounded corner */}
               <View style={[styles.cardShape, styles.cardShapeTopRight, { backgroundColor: 'rgba(255,255,255,0.3)' }]} /> {/* White shape */}

              <Text style={styles.categoryCardText}>Wash & Iron</Text>
              {/* Add any icons or illustrations for the card here */}
            </TouchableOpacity>

            {/* Dry Wash Card */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategoryPress('Dry Wash')} // Pass the category name
            >
              {/* Card Background Gradient - Using specific colors from design */}
               <LinearGradient
                  colors={[paletteColors.dryWashGradientStart, paletteColors.dryWashGradientEnd]} // Specific gradient colors for Dry Wash
                  style={StyleSheet.absoluteFillObject} // Make gradient fill the card
                  start={{ x: 0, y: 0 }} // Vertical gradient direction
                  end={{ x: 0, y: 1 }}
               />
                {/* Subtle shape/illustration inside the card - using a View with rounded corner */}
               <View style={[styles.cardShape, styles.cardShapeBottomRight, { backgroundColor: paletteColors.orangeShape }]} /> {/* Orange shape */}


              <Text style={styles.categoryCardText}>Dry Wash</Text>
              {/* Add any icons or illustrations for the card here */}
            </TouchableOpacity>

            {/* Add more category cards as needed */}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* This should ideally be part of a Tab Navigator layout in a real app */}
      <View style={styles.bottomNavBar}>
         {/* Home Icon - Active */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHomePress}>
            {/* Filled home icon for active state, purple color */}
            <Ionicons name="home" size={24} color={paletteColors.primaryPurple} />
             {/* Small active indicator dot */}
             <View style={styles.activeNavDot} />
         </TouchableOpacity>
         {/* Middle Icon (Bookings/My Laundry) - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleMyLaundryPress}>
            {/* Keeping the original icon */}
            <MaterialCommunityIcons name="map-outline" size={24} color={paletteColors.inactiveIconGrey} />
         </TouchableOpacity>
         {/* Right Icon (Schedule/History) - Inactive */}
         <TouchableOpacity style={styles.navBarItem} onPress={handleHistoryPress}>
            {/* Keeping the original icon */}
            <Ionicons name="calendar-outline" size={24} color={paletteColors.inactiveIconGrey} />
         </TouchableOpacity>
          {/* Add more nav bar items */}
      </View>

    </SafeAreaView> // Close SafeAreaView
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { // New style for SafeAreaView
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background for the area below cards
  },
  scrollViewContent: {
    flexGrow: 1, // Allows content to grow and enable scrolling
    paddingBottom: 80, // Add padding at the bottom to prevent content being hidden by nav bar
  },
  topBackground: { // Re-added style for the gradient header
    width: '100%',
    height: screenHeight * 0.25, // Adjusted height of the gradient section to match design
    borderBottomLeftRadius: 30, // Rounded bottom-left corner
    borderBottomRightRadius: 30, // Rounded bottom-right corner
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Horizontally center content
    paddingTop: 40, // Adjust padding from the top
  },
  headerContent: { // Re-added style for the content within the gradient
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    width: '90%', // Content takes 90% width
    justifyContent: 'flex-start', // Align items to the start
    paddingHorizontal: 10, // Add some horizontal padding within the header
  },
  profileIconPlaceholder: { // Re-added style for the profile icon container
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingContainer: { // Re-added style for the greeting text container
    flex: 1, // Allow greeting container to take up space
    marginLeft: 15, // Space between profile icon and text
    // Removed alignItems: 'center' here to allow text to align left
  },
  greetingText: { // Re-added style for the greeting text
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeText: { // Re-added style for the welcome text
    fontSize: 16,
    color: '#eee', // Lighter color for welcome text
  },
  notificationIcon: { // Re-added style for the notification icon
    // Position the notification icon absolutely within the topBackground
    position: 'absolute',
    top: 20, // Adjust from top
    right: 20, // Adjust from right
    zIndex: 1, // Ensure it's above other header content
    backgroundColor: 'rgba(255,255,255,0.3)', // Semi-transparent white background for the bell icon container
    borderRadius: 15, // Rounded corners for the bell icon container
    padding: 5, // Padding around the bell icon
  },
  mainContent: {
    padding: 20,
    marginTop: -30, // Pull the main content up to overlap with the gradient - adjusted overlap
    backgroundColor: '#fff', // White background for the main content area
    borderTopLeftRadius: 30, // Rounded top-left corner for the main content area
    borderTopRightRadius: 30, // Rounded top-right corner
    flex: 1, // Allow main content to take up remaining space
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryCardsContainer: {
    // Cards are stacked vertically by default
  },
  categoryCard: {
    width: '100%', // Cards take full width
    height: 150, // Fixed height for the cards
    borderRadius: 15, // Rounded corners for cards
    marginBottom: 15, // Space between cards
    justifyContent: 'center', // Center content vertically
    padding: 20, // Padding inside the card
    overflow: 'hidden', // Hide content outside rounded corners
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   categoryCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text color on cards
    zIndex: 1, // Ensure text is above the gradient and shapes
    // Text positioning is controlled by justifyContent/alignItems on the parent View (categoryCard)
  },
  cardShape: {
    position: 'absolute',
    // Background color is set dynamically in the component
    zIndex: 0, // Ensure shapes are behind text
  },
  cardShapeTopRight: {
    width: 100, // Adjust size of the shape
    height: 100, // Adjust size
    borderRadius: 50, // Make it a circle (or adjust for curved shape)
    top: -30, // Position from top
    right: -30, // Position from right
  },
   cardShapeBottomRight: {
    width: 120, // Adjust size of the shape
    height: 120, // Adjust size
    borderRadius: 60, // Make it a circle (or adjust for curved shape)
    bottom: -40, // Position from bottom
    right: -40, // Position from right
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
    backgroundColor: '#fff', // White background for nav bar
    borderTopWidth: 1,
    borderColor: '#eee', // Light border at the top
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
    backgroundColor: paletteColors.primaryPurple, // Purple dot color
    marginTop: 4, // Space between icon and dot
  }
});
