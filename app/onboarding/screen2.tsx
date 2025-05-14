import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen dimensions for responsive layout
const { width, height } = Dimensions.get('window');

// Define the key for AsyncStorage to store onboarding status
const ONBOARDING_COMPLETE_KEY = 'hasOnboarded';

export default function Screen2() {
  const router = useRouter();

  // Define the paths to your images for Screen 2
  // Assuming the images are named 'Scooter.png', 'ScooterBlur.png', and 'Vector2.png'
  // in assets/images/Onboarding. Adjust paths and filenames as needed.
  const foregroundImage = require('../../assets/images/Onboarding/Electric Scooter.png'); // Path to the clear image for screen 2
  const backgroundImageBlurred = require('../../assets/images/Onboarding/Electric ScooterBlur.png'); // Path to the blurred image for screen 2
  const vectorLineImage = require('../../assets/images/Onboarding/Vector2.png'); // Path to the vector line image for screen 2


  // State to store the layout information of the foreground image
  const [foregroundImageLayout, setForegroundImageLayout] = useState<LayoutRectangle | null>(null);

  // Function to handle skipping onboarding (same as screen 1)
    // Function to handle skipping onboarding
  const handleSkip = async () => {
    try {
      // Set the flag in AsyncStorage to indicate onboarding is complete
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      console.log('Onboarding status saved via Skip from Screen 1. Navigating to login.');
      // Redirect to the login screen in the auth group
      // Use replace so they can't go back to onboarding
      router.replace('../createAccount/login');
    } catch (error) {
      console.error('Error saving onboarding status on Skip from Screen 1:', error);
      // Handle error, maybe still navigate but log the issue
      router.replace('../createAccount/login'); // Still navigate even if saving failed
    }
  };


  // Function to handle the layout event of the foreground image
  const onForegroundImageLayout = (event: LayoutChangeEvent) => {
    // Capture the layout details (x, y, width, height)
    setForegroundImageLayout(event.nativeEvent.layout);
  };

  // Calculate the position for the blurred background image (adjust offsets if needed for this image)
  const blurredImageStyle = foregroundImageLayout ? {
    position: 'absolute' as 'absolute',
    width: foregroundImageLayout.width,
    height: foregroundImageLayout.height,
    top: foregroundImageLayout.y + -26, // Adjust vertical offset as needed for the scooter image
    left: foregroundImageLayout.x + -3, // Adjust horizontal offset as needed for the scooter image
    zIndex: 0, // Ensure blurred image is behind foreground
    opacity: 0.8, // Adjust opacity if needed
  } : {};


  return (
    <View style={styles.container}>

      {/* Vector Line Background Image */}
      <Image
        source={vectorLineImage}
        style={styles.vectorLineBackground}
        resizeMode="cover" // Use cover or stretch
      />

      {/* SpinClean Title with different colors */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleSpin]}>Spin</Text>
        <Text style={[styles.title, styles.titleClean]}>Clean</Text>
      </View>

      {/* Image Container to hold both foreground and background images */}
      <View style={styles.imageLayerContainer}>
         {/* Blurred Background Image - positioned absolutely */}
        {foregroundImageLayout && (
          <Image
            source={backgroundImageBlurred}
            style={[styles.imageBase, blurredImageStyle]}
            resizeMode="contain"
          />
        )}
        {/* Main Foreground Image */}
        <Image
          source={foregroundImage}
          style={styles.foregroundImage}
          resizeMode="contain"
          onLayout={onForegroundImageLayout} // Attach the onLayout handler
        />
      </View>

      {/* Headline Text for Screen 2 */}
      <Text style={styles.headline}>Schedule pickups and deliveries at your convenience.</Text>

      {/* Pagination Dots - Indicate Screen 2 is active */}
      <View style={styles.paginationDots}>
          <View style={styles.dot} /> {/* Screen 1 dot */}
          <View style={[styles.dot, styles.activeDot]} /> {/* Screen 2 dot (active) */}
          <View style={styles.dot} /> {/* Screen 3 dot */}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/onboarding/screen3')} // Navigate to the next screen (screen 3)
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Skip Button */}
       <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip} // Use the handleSkip function
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.05,
    width: '100%',
    position: 'relative',
  },
   vectorLineBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.7, // Adjust height for the vector line image for screen 2
    zIndex: -1,
    // Adjust 'top' if needed for the vector line for screen 2
   },
   titleContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.05,
    zIndex: 1,
   },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleSpin: {
    color: '#000',
  },
  titleClean: {
    color: '#6B4EFF', // Match your design color
  },
  imageLayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  imageBase: {
     // Base style for images
  },
  foregroundImage: {
    width: '130%', // Adjust size as needed for the scooter image
    height: '130%', // Adjust size as needed for the scooter image
    maxWidth: 500,
    maxHeight: 500,
    resizeMode: 'contain',
    zIndex: 1,
  },
   blurredImageStyle: {
     // Styles calculated dynamically
   },

  headline: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
    color: 'black',
    zIndex: 1,
  },
   paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6B4EFF', // Match your active dot color
  },
  nextButton: {
    backgroundColor: '#6B4EFF', // Match your button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   skipButton: {
    marginTop: 15,
    zIndex: 1,
  },
  skipButtonText: {
    color: '#6A5ACD', // Match your Skip text color
    fontSize: 16,
  },
});
