import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen dimensions for responsive layout
const { width, height } = Dimensions.get('window');

// Define the key for AsyncStorage to store onboarding status
const ONBOARDING_COMPLETE_KEY = 'hasOnboarded';

export default function Screen1() {
  const router = useRouter();

  // Define the paths to your images
  const foregroundImage = require('../../assets/images/Onboarding/Smartphone.png');
  const backgroundImageBlurred = require('../../assets/images/Onboarding/SmartphoneBlur.png'); // Renamed for clarity
  // Assuming the vector line image for screen 1 is named 'vector1.png'
  const vectorLineImage = require('../../assets/images/Onboarding/Vector1.png'); // Adjust path and filename as needed


  // State to store the layout information of the foreground image
  const [foregroundImageLayout, setForegroundImageLayout] = useState<LayoutRectangle | null>(null);

  // Function to handle skipping onboarding
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

  // Calculate the position for the blurred background image
  const blurredImageStyle = foregroundImageLayout ? {
    position: 'absolute' as 'absolute',
    width: foregroundImageLayout.width,
    height: foregroundImageLayout.height,
    top: foregroundImageLayout.y + 10, // Adjust vertical offset
    left: foregroundImageLayout.x + 5, // Adjust horizontal offset
    zIndex: 0, // Ensure blurred image is behind foreground
    opacity: 0.8, // Adjust opacity if needed
  } : {};


  return (
    <View style={styles.container}>

      {/* Vector Line Background Image */}
      {/* Position this absolutely to stay in the background */}
      <Image
        source={vectorLineImage}
        style={styles.vectorLineBackground}
        resizeMode="cover" // Use cover or stretch depending on how you want it to fill
      />

      {/* SpinClean Title with different colors */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleSpin]}>Spin</Text>
        <Text style={[styles.title, styles.titleClean]}>Clean</Text>
      </View>

      {/* Image Container to hold both foreground and background images */}
      <View style={styles.imageLayerContainer}>
         {/* Blurred Background Image - positioned absolutely based on foreground layout */}
        {foregroundImageLayout && (
          <Image
            source={backgroundImageBlurred} // Use the renamed variable
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

      {/* Headline Text */}
      <Text style={styles.headline}>Fresh clothes, just a tap away.</Text>

      {/* Pagination Dots - Placeholder for now */}
      <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/onboarding/screen2')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Skip Button */}
       <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
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
    position: 'relative', // Needed for absolute positioning of the vector line
  },
   vectorLineBackground: {
    position: 'absolute',
    top: 0, // Position from the top of the container
    left: 0, // Position from the left of the container
    width: '100%', // Make it fill the width of the container
    height: height * 0.7, // Adjust height as needed to match your design's curve extent
    zIndex: -1, // Ensure it's behind all other content
    // You might need to adjust 'top' and 'height' to position the curve correctly
   },
   titleContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.05,
    zIndex: 1, // Ensure title is above the vector line
   },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleSpin: {
    color: '#000',
  },
  titleClean: {
    color: '#6B4EFF',
  },
  imageLayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1, // Ensure images are above the vector line
  },
  imageBase: {
     // Base style for images
  },
  foregroundImage: {
    width: '170%',
    height: '170%',
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
    zIndex: 1, // Ensure headline is above the vector line
  },
   paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    zIndex: 1, // Ensure dots are above the vector line
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6B4EFF',
  },
  nextButton: {
    backgroundColor: '#6B4EFF',
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
    zIndex: 1, // Ensure buttons are above the vector line
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   skipButton: {
    marginTop: 15,
    zIndex: 1, // Ensure buttons are above the vector line
  },
  skipButtonText: {
    color: '#6A5ACD',
    fontSize: 16,
  },
});
