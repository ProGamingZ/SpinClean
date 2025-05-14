import { View, Text, StyleSheet, Button, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const USER_ROLE_KEY = 'userRole'; // Use the same key across relevant files

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Define the paths to your images
  // Assuming the files are named 'login.png' and 'miniLogo.png'
  // in the assets/images/AccountCreate directory. Adjust filenames as needed.
  const loginIllustration = require('../../assets/images/AccountCreate/login.png'); // Path to the large illustration
  const miniLogo = require('../../assets/images/AccountCreate/miniLogo.png'); // Path to the mini logo


  // Function to handle the login process with hardcoded credentials and role-based navigation
  const handleLogin = async () => {
    // Clear any previous errors
    setError('');

    // --- Hardcoded Authentication Logic ---
    let role: 'user' | 'admin' | null = null;

    if (username === 'User' && password === '123') {
      role = 'user';
    } else if (username === 'Admin' && password === '123') {
      role = 'admin';
    } else {
      // If credentials don't match the hardcoded ones
      setError('Invalid username or password');
      return; // Stop the login process
    }

    // If we reached here, the login was successful with one of the hardcoded accounts
    console.log('Login successful with role:', role);

    try {
      // Save the user's role to AsyncStorage
      if (role) {
         await AsyncStorage.setItem(USER_ROLE_KEY, role);
         console.log('User role saved:', role);

         // --- Navigate directly to the role-specific group ---
         if (role === 'admin') {
             router.replace('../PagesAdmin/'); // Navigate to the Admin group's index
         } else { // role === 'user'
             router.replace('../PagesUser/'); // Navigate to the User group's index
         }

      } else {
          // This case should ideally not happen with the hardcoded logic,
          // but as a fallback, navigate back to login or show an error.
          console.error('Login successful but role not determined?');
          setError('An unexpected error occurred.');
          // Optionally navigate back to login: router.replace('/(auth)/login');
      }


    } catch (storageError) {
        console.error('Error saving user role to storage:', storageError);
        // Decide how to handle storage errors - maybe navigate to a fallback screen
        // or back to login. For this demo, let's navigate to user home as a fallback.
         router.replace('../PagesUser/index'); // Fallback navigation
    }
  };


  return (
    <View style={styles.container}>

      {/* Mini Logo at Top Right */}
      <Image
        source={miniLogo}
        style={styles.miniLogo}
        resizeMode="contain"
      />
      {/* Login Title */}
      <Text style={styles.title}>Log<Text style={styles.titleIn}>In.</Text></Text>
      {/* Large Illustration */}
      <Image
        source={loginIllustration}
        style={styles.illustration}
        resizeMode="contain" // Or 'cover' depending on how you want it to scale
      />

      {/* Basic Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888" // Adjust placeholder color if needed
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888" // Adjust placeholder color if needed
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Display Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Login Button */}
      {/* Using TouchableOpacity for custom styling */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>


      {/* Link to Signup */}
      {/* Using the correct path with the group name */}
      <Link href="/createAccount/signup" style={styles.signupLink}>
        Don't have an Account yet? <Text style={styles.signupLinkText}>Signup</Text>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    paddingHorizontal: 20, // Add horizontal padding
    paddingTop: 40, // Add padding from the top
    alignItems: 'center', // Center content horizontally
    // Removed justifyContent: 'center' to allow elements to position from the top
  },
   miniLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    zIndex: 1,
   },
  illustration: {
    width: '170%', // Increased width
    height: screenHeight * 0.4, // Adjusted height slightly
    maxWidth: 570, // Adjusted max width
    maxHeight: 400, // Adjusted max height
    marginBottom: 30, // Increased space below the illustration
    marginTop: 0, // Adjusted space from the top"
  },
  title: {
    fontSize: 36, // Increased font size
    fontWeight: 'bold',
    marginTop: 20, // Increased space below title
    alignSelf: 'flex-start', // Align title to the left
    marginLeft: '5%', // Adjusted left margin to align with inputs
    color: '#000', // Set "Log" to black
  },
   titleIn: {
    color: '#6B4EFF', // Set "In." to purple
   },
  input: {
    width: '90%', // Adjusted width to match design
    padding: 15,
    borderWidth: 1,
    borderColor: '#6B4EFF', // Changed border color to purple
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%', // Adjusted left margin
  },
  loginButton: {
    backgroundColor: '#6B4EFF', // Purple color from design
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%', // Match input width
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 20,
    fontSize: 16,
    // color is set within the nested Text components
  },
   signupLinkText: {
    color: '#6B4EFF', // Purple color for "Signup"
    fontWeight: 'bold', // Make "Signup" bold
   },
});
