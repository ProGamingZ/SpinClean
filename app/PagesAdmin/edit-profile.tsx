import React, { useState } from 'react'; // Import useState for input fields
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'; // Import TextInput and Alert
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back arrow
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from your palette)
const colors = {
  primaryPurple: '#6B4EFF', // Used for active elements, icons, SAVE button background
  lightGrey: '#f0f0f0', // Backgrounds
  darkGrey: '#333', // Main text, header title, input text
  mediumGrey: '#888', // Sub-details text, placeholder text
  white: '#fff', // White elements, text on purple background
  borderGrey: '#ccc', // Borders, dividers, input border
  cardBackground: '#F8F9FA', // Card background
  profileIconBackground: '#E1F5FE', // Lighter blue background for the large profile icon circle
};

export default function EditProfileScreen() {
  const router = useRouter();

  // State for input fields (placeholder values)
  const [number, setNumber] = useState('Number'); // Example placeholder
  const [username, setUsername] = useState('Admin'); // Example placeholder
  const [password, setPassword] = useState('********'); // Example placeholder

  // Placeholder user data for display (can be fetched or passed)
  const userNameDisplay = "Admin"; // Example user name for display
  const userNumberDisplay = "Number"; // Example user number for display

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Edit Profile");
    // router.back() navigates to the previous screen in the stack,
    // which is the Profile page when navigated from there.
    router.back();
  };

  // Function to handle SAVE button press
  const handleSavePress = () => {
    console.log("SAVE button pressed");
    // Implement your logic to save the updated profile information here
    // You would typically send this data to a backend or update local storage.
    console.log("Updated Data:", { number, username, password });

        router.replace('/PagesAdmin'); // Navigate to the index file (Home)
        
  };

  // Removed bottom navigation handler functions as the bottom nav is removed


  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>

         {/* Profile Info Section (similar to Profile page) */}
        <View style={styles.profileInfoContainer}>
          {/* Large Profile Icon */}
          <View style={styles.largeProfileIconCircle}>
             <Ionicons name="person" size={60} color={colors.white} /> {/* White person icon */}
          </View>
          {/* User Name and Number */}
          <Text style={styles.userNameDisplay}>{userNameDisplay}</Text>
          <Text style={styles.userNumberDisplay}>{userNumberDisplay}</Text>
        </View>


        {/* Input Fields Section */}
        <View style={styles.inputsContainer}>
            {/* Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Number"
                placeholderTextColor={colors.mediumGrey}
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric" // Suggest numeric keyboard
            />
            {/* Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={colors.mediumGrey}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.mediumGrey}
                value={password}
                onChangeText={setPassword}
                secureTextEntry // Hide password
            />
        </View>

        {/* SAVE Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
            <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>


      </ScrollView>

      {/*
        Removed the Bottom Navigation Bar View component
      */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between back button, title, and placeholder
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainContentPadding: {
      paddingBottom: 20,
      alignItems: 'center', // Center content horizontally
  },
   profileInfoContainer: { // Reused style from Profile page
      alignItems: 'center', // Center items horizontally
      marginBottom: 30, // Space below profile info
  },
  largeProfileIconCircle: { // Reused style from Profile page
      width: 100, // Size of the circle
      height: 100, // Size of the circle
      borderRadius: 50, // Make it a circle
      backgroundColor: colors.profileIconBackground, // Light blue background
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10, // Space below the circle
  },
  userNameDisplay: { // Reused style from Profile page (renamed for clarity)
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.darkGrey,
      marginBottom: 5, // Space below name
  },
  userNumberDisplay: { // Reused style from Profile page (renamed for clarity)
      fontSize: 14,
      color: colors.mediumGrey, // Muted color for number
  },
  inputsContainer: {
      width: '100%', // Inputs take full width
      marginBottom: 30, // Space below inputs
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderGrey, // Border color for inputs
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.darkGrey,
    marginBottom: 15, // Space between inputs
    backgroundColor: colors.white, // White background for inputs
  },
  saveButton: {
    backgroundColor: colors.primaryPurple, // Purple background for SAVE button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Button takes full width
  },
  saveButtonText: {
    color: colors.white, // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Removed bottomNavBar styles
  // Removed navBarItem styles
  // Removed activeNavDot styles
});
