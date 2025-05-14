import { View, Text, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  // State for input fields (placeholders, no functional logic needed for demo)
  const [number, setNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Define the paths to your images for the Signup page
  // Assuming the files are named 'signup.png' and 'miniLogo.png'
  // in the assets/images/AccountCreate directory. Adjust filenames as needed.
  const signupIllustration = require('../../assets/images/AccountCreate/signup.png'); // Path to the large illustration for signup
  const miniLogo = require('../../assets/images/AccountCreate/miniLogo.png'); // Path to the mini logo (same as login)


  // Function for the Signup button (placeholder, no actual signup logic)
  const handleSignup = () => {
    console.log('Signup button pressed (no functional logic)');
    // In a real app, you would handle user creation here.
    // For this demo, we'll just log the input values.
    console.log('Input values:', { number, username, password });

    // Since there's no actual signup, you might navigate to Login
    // or just stay on the page for the demo.
    // Example to navigate back to Login after "signup":
    // router.replace('/(auth)/login');
  };


  return (
    <View style={styles.container}>

      {/* Mini Logo at Top Right */}
      <Image
        source={miniLogo}
        style={styles.miniLogo}
        resizeMode="contain"
      />

      {/* Signup Title */}
      <Text style={styles.title}>Sign<Text style={styles.titleUp}>Up.</Text></Text>

      {/* Large Illustration */}
      <Image
        source={signupIllustration}
        style={styles.illustration}
        resizeMode="contain" // Or 'cover' depending on how you want it to scale
      />

       {/* Input Fields */}
       <TextInput
        style={styles.input}
        placeholder="Number"
        placeholderTextColor="#888"
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric" // Suggest numeric keyboard for number input
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
       <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* SIGN UP Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup} // Placeholder function
      >
        <Text style={styles.signupButtonText}>SIGN UP</Text>
      </TouchableOpacity>


      {/* Link back to Login */}
      <Link href="/createAccount/login" style={styles.loginLink}>
        Have an account? <Text style={styles.loginLinkText}>Log in</Text>
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
    width: '170%', // Adjusted width
    height: screenHeight * 0.4, // Adjusted height
    maxWidth: 570, // Adjusted max width
    maxHeight: 400, // Adjusted max height
    marginBottom: 20, // Space below illustration
    marginTop: 0, // Space from top
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30, // Space below title
    alignSelf: 'flex-start', // Align title to the left
    marginLeft: '5%', // Adjusted left margin
    color: '#000', // Set "Sign" to black
  },
   titleUp: {
    color: '#6B4EFF', // Set "Up." to purple
   },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#6B4EFF', // Purple border color
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#6B4EFF', // Purple color from design
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    fontSize: 16,
    // color is set within the nested Text components
  },
   loginLinkText: {
    color: '#6B4EFF', // Purple color for "Log in"
    fontWeight: 'bold', // Make "Log in" bold
   },
});
