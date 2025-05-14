import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, Easing, Text } from 'react-native'; // Import Text

interface LoadingScreenProps {}

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const [isVisible, setIsVisible] = useState(true);
  // Import all wave images
  const waveImageSource1 = require('../assets/images/water1.png'); // Wave 1 (Lighter, in front, partially visible)
  const waveImageSource2 = require('../assets/images/water2.png'); // Wave 2 (Darker, middle-front, fully visible)
  const waveImageSource3 = require('../assets/images/water3.png'); // Wave 3 (Middle-back, fully visible)
  const waveImageSource4 = require('../assets/images/water4.png'); // Wave 4 (Behind, fully visible)
  const logoImageSource = require('../assets/images/LogoSpinClean.png'); // Logo image

  // Animated value for the horizontal position of wave 1
  const wave1HorizontalPosition = useRef(new Animated.Value(0)).current; // Start at 0 (no horizontal offset)

  // Animated value for the horizontal position of wave 2
  const wave2HorizontalPosition = useRef(new Animated.Value(0)).current; // Start at 0 (no horizontal offset)

  // Animated value for the horizontal position of wave 3
  const wave3HorizontalPosition = useRef(new Animated.Value(0)).current; // Start at 0 (no horizontal offset)

   // Animated value for the horizontal position of wave 4
  const wave4HorizontalPosition = useRef(new Animated.Value(0)).current; // Start at 0 (no horizontal offset)

  // Animated value for the overall vertical translation of all waves
  const wavesVerticalTranslate = useRef(new Animated.Value(0)).current; // Start at 0 (no vertical offset)


  useEffect(() => {
    // Animation duration for horizontal movement set to 1 second (1000 milliseconds)
    const horizontalAnimationDuration = 1000;
    // Animation duration for vertical movement (set to 5 seconds)
    const verticalAnimationDuration = 5000; // Increased to 5 seconds

    // Animation for horizontal movement of wave 1 (moves right then left then center)
    const wave1HorizontalAnimation = Animated.loop(
      Animated.sequence([
        // Move right from the center (0) to the right endpoint (screenWidth * 0.05)
        Animated.timing(wave1HorizontalPosition, {
          toValue: screenWidth * 0.05, // Move 5% of screen width to the right
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing for smooth constant speed
          useNativeDriver: true,
        }),
        // Move left from the right endpoint to the left endpoint (-screenWidth * 0.05)
        Animated.timing(wave1HorizontalPosition, {
          toValue: -screenWidth * 0.05, // Move 5% of screen width to the left
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
         // Move back to the center (0) from the left endpoint (-screenWidth * 0.05)
         Animated.timing(wave1HorizontalPosition, {
          toValue: 0, // Move back to the center
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
      ])
    );

    // Animation for horizontal movement of wave 2 (moves left then right then center - opposite of wave 1)
    const wave2HorizontalAnimation = Animated.loop(
      Animated.sequence([
        // Move left from the center (0) to the left endpoint (-screenWidth * 0.05)
        Animated.timing(wave2HorizontalPosition, {
          toValue: -screenWidth * 0.05, // Move 5% of screen width to the left
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing for smooth constant speed
          useNativeDriver: true,
        }),
        // Move right from the left endpoint to the right endpoint (screenWidth * 0.05)
        Animated.timing(wave2HorizontalPosition, {
          toValue: screenWidth * 0.05, // Move 5% of screen width to the right
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
         // Move back to the center (0) from the right endpoint (screenWidth * 0.05)
         Animated.timing(wave2HorizontalPosition, {
          toValue: 0, // Move back to the center
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
      ])
    );

    // Animation for horizontal movement of wave 3 (same direction as wave 1)
     const wave3HorizontalAnimation = Animated.loop(
      Animated.sequence([
        // Move right from the center (0) to the right endpoint (screenWidth * 0.05)
        Animated.timing(wave3HorizontalPosition, {
          toValue: screenWidth * 0.05, // Move 5% of screen width to the right
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing for smooth constant speed
          useNativeDriver: true,
        }),
        // Move left from the right endpoint to the left endpoint (-screenWidth * 0.05)
        Animated.timing(wave3HorizontalPosition, {
          toValue: -screenWidth * 0.05, // Move 5% of screen width to the left
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
         // Move back to the center (0) from the left endpoint (-screenWidth * 0.05)
         Animated.timing(wave3HorizontalPosition, {
          toValue: 0, // Move back to the center
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
      ])
    );

    // Animation for horizontal movement of wave 4 (opposite direction of wave 3 and wave 1)
     const wave4HorizontalAnimation = Animated.loop(
      Animated.sequence([
        // Move left from the center (0) to the left endpoint (-screenWidth * 0.05)
        Animated.timing(wave4HorizontalPosition, {
          toValue: -screenWidth * 0.05, // Move 5% of screen width to the left
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing for smooth constant speed
          useNativeDriver: true,
        }),
        // Move right from the left endpoint to the right endpoint (screenWidth * 0.05)
        Animated.timing(wave4HorizontalPosition, {
          toValue: screenWidth * 0.05, // Move 5% of screen width to the right
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
         // Move back to the center (0) from the right endpoint (screenWidth * 0.05)
         Animated.timing(wave4HorizontalPosition, {
          toValue: 0, // Move back to the center
          duration: horizontalAnimationDuration, // Set duration to 1 second
          easing: Easing.linear, // Linear easing
          useNativeDriver: true,
        }),
      ])
    );

    // Animation for vertical movement of all waves
    // Calculate the target translateY value to move wave 1's top 30px off-screen upwards.
    // The initial top edge of wave 1 is at `wave1FullHeight * 0.3` pixels above the bottom of the screen.
    // We want the final top edge of wave 1 to be at `screenHeight + 30` pixels above the bottom of the screen.
    // The required upward translation is the difference in these positions, applied as a negative translateY.
    const wave1InitialTopRelativeToBottom = screenHeight * 1.1 * 0.3; // Using the defined wave1FullHeight calculation
    const targetTranslateY = -( (screenHeight + 30) - wave1InitialTopRelativeToBottom );

    const verticalAnimation = Animated.timing(wavesVerticalTranslate, {
      toValue: targetTranslateY, // Move upwards to the calculated target
      duration: verticalAnimationDuration, // Set duration for vertical animation
      easing: Easing.linear, // Linear easing for smooth constant speed
      useNativeDriver: true,
    });


    // Start all horizontal animations
    wave1HorizontalAnimation.start();
    wave2HorizontalAnimation.start();
    wave3HorizontalAnimation.start();
    wave4HorizontalAnimation.start();

    // Start the vertical animation
    verticalAnimation.start(() => {
        // Optional: Hide the loading screen after the vertical animation finishes
        // setIsVisible(false);
    });


    // Cleanup function to stop the animations when the component unmounts
    return () => {
      wave1HorizontalAnimation.stop();
      wave2HorizontalAnimation.stop();
      wave3HorizontalAnimation.stop();
      wave4HorizontalAnimation.stop();
      verticalAnimation.stop(); // Stop vertical animation on unmount
    };
  }, [wave1HorizontalPosition, wave2HorizontalPosition, wave3HorizontalPosition, wave4HorizontalPosition, wavesVerticalTranslate, screenHeight, screenWidth]); // Dependencies for the effect

  // If isVisible is false, render nothing (currently always true unless setIsVisible(false) is uncommented)
  if (!isVisible) {
    return null;
  }

  // Define the full height for wave 1 (to allow partial visibility) and the full height of wave 2, 3, and 4
  // Increased wave1FullHeight to prevent bottom edge from showing
  const wave1FullHeight = screenHeight * 1.1; // Increased to 110% of screen height
  const wave2FullHeight = screenHeight * 0.33; // Wave 2 is 33% of screen height
  const wave3FullHeight = screenHeight * 0.35; // Wave 3 is 35% of screen height
  const wave4FullHeight = screenHeight * 0.38; // Wave 4 height (example)

  const wave2BottomOffset = 20; // Pixels above the very bottom for wave 2
  const wave3BottomPosition = wave2BottomOffset + 20; // Position 20 pixels higher than wave 2's bottom

  // Calculate the bottom position for wave 4
  // Position wave 4 slightly higher than wave 3's bottom, and behind it.
  const wave4BottomPosition = wave3BottomPosition + 3; // Position 3 pixels higher than wave 3's bottom


  // Render the loading screen container and the animated images
  return (
    <View style={styles.container}>
       {/* Display wave 4 (Behind all others, fully visible, highest) */}
      <Animated.Image
        source={waveImageSource4}
        style={[
          styles.waveImage, // Keep common styles like width, left, etc.
          {
            // Apply initial bottom position and the overall vertical translation
            bottom: wave4BottomPosition, // Calculated initial bottom position
            height: wave4FullHeight, // Set height to be fully visible
            transform: [{ translateX: wave4HorizontalPosition }, { translateY: wavesVerticalTranslate }], // Apply horizontal and vertical translation
            zIndex: 0, // Ensure wave 4 is behind all other waves
          },
        ]}
        resizeMode="cover" // Cover the specified height, maintaining aspect ratio
      />

       {/* Display wave 3 (Middle-back, fully visible) */}
      <Animated.Image
        source={waveImageSource3}
        style={[
          styles.waveImage, // Keep common styles like width, left, etc.
          {
            // Apply initial bottom position and the overall vertical translation
            bottom: wave3BottomPosition, // Calculated initial bottom position
            height: wave3FullHeight, // Set height to be fully visible
            transform: [{ translateX: wave3HorizontalPosition }, { translateY: wavesVerticalTranslate }], // Apply horizontal and vertical translation
            zIndex: 1, // Ensure wave 3 is behind wave 2 and wave 1
          },
        ]}
        resizeMode="cover" // Cover the specified height, maintaining aspect ratio
      />

      {/* Display wave 2 (Darker, middle-front, fully visible) */}
      <Animated.Image
        source={waveImageSource2}
        style={[
          styles.waveImage, // Keep common styles like width, left, etc.
          {
            // Apply initial bottom position and the overall vertical translation
            bottom: wave2BottomOffset, // Calculated initial bottom position
            height: wave2FullHeight, // Set height to be fully visible
            transform: [{ translateX: wave2HorizontalPosition }, { translateY: wavesVerticalTranslate }], // Apply horizontal and vertical translation
            zIndex: 2, // Ensure wave 2 is behind wave 1 and in front of wave 3 and 4
          },
        ]}
        resizeMode="cover" // Cover the specified height, maintaining aspect ratio
      />

      {/* Display wave 1 (Lighter, in front, partially visible) */}
      <Animated.Image
        source={waveImageSource1}
        style={[
          styles.waveImage, // Keep common styles like width, left, etc.
          {
            // Apply initial bottom position and the overall vertical translation
            bottom: -wave1FullHeight * 0.7, // Initial bottom position to show top 30%
            height: wave1FullHeight, // Use full height for positioning
            transform: [{ translateX: wave1HorizontalPosition }, { translateY: wavesVerticalTranslate }], // Apply horizontal and vertical translation
            zIndex: 3, // Ensure wave 1 is in front of all other waves
          },
        ]}
        resizeMode="cover" // Cover the specified height, maintaining aspect ratio
      />

      {/* Container to hold the logo, circle, and text and center them */}
      <View style={styles.centerContentContainer}>
        {/* Container for logo and circle to position them relative to each other */}
        <View style={styles.logoAndCircleContainer}>
          {/* White circle behind the logo */}
          <View style={styles.whiteCircle} />

          {/* Logo */}
          <Image
            source={logoImageSource}
            style={styles.logo}
            resizeMode="contain" // Maintain aspect ratio
          />
        </View>

        {/* Text below the logo and circle */}
        <Text style={styles.logoText}>SpinClean</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    // Position absolute to cover the entire screen if used as an overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    overflow: 'hidden', // Hide the parts of the image that are outside the container
  },
  waveImage: {
    position: 'absolute', // Position the image absolutely within the container
    // Adjust the left position to center the wider image initially
    left: -screenWidth * 0.05, // Shift left by half of the extra width
    // Make the image wider than the screen to cover the movement range
    width: screenWidth * 1.1, // Increase width by 10% (0.05 left + 0.05 right)
    // Height and bottom are now set individually for each image
  },
  centerContentContainer: {
    position: 'absolute', // Position absolutely to center on screen
    alignItems: 'center', // Center content horizontally within this container
    zIndex: 4, // Ensure this container is in front of the waves
    // Center the container using absolute positioning
    top: '50%',
    left: '50%',
    // Use transform to perfectly center the container based on its own size
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }], // Corrected transform for centering
    flexDirection: 'column',
    // Removed justifyContent: 'center' as transform handles vertical centering of the container
  },
  logoAndCircleContainer: {
    width: 110, // Adjusted width to be closer to logo size
    height: 110, // Adjusted height to be closer to logo size
    justifyContent: 'center', // Center logo and circle vertically within this container
    alignItems: 'center', // Center logo and circle horizontally within this container
    marginBottom: 5, // Adjusted space between the logo/circle group and the text below
  },
  whiteCircle: {
    width: 110, // Adjusted size to be closer to logo size
    height: 110, // Adjusted size to be closer to logo size
    borderRadius: 55, // Half of width/height to make it a circle
    backgroundColor: 'white',
    position: 'absolute', // Position absolutely within logoAndCircleContainer
    // Center the circle behind the logo
    top: '50%',
    left: '50%',
    marginTop: -55, // Half of height (negative)
    marginLeft: -55, // Half of width (negative)
    zIndex: 0, // Ensure it's behind the logo within the container
    // Add shadow for better visibility against waves
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    zIndex: 1, // Ensure logo is in front of the circle within the container
  },
  logoText: {
    fontSize: 24, // Adjust size as needed
    fontWeight: 'bold',
    color: 'white', // Set text color to white
    // Position relative to the centerContentContainer
    // No absolute positioning needed here, it will stack below the logoAndCircleContainer
    zIndex: 5, // Ensure text is in front of everything else
  },
});

export default LoadingScreen;
