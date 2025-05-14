import { Stack, useRouter } from 'expo-router'; // Import useRouter for navigation
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Define the key used to store onboarding status (should match your onboarding screens)
const ONBOARDING_COMPLETE_KEY = 'hasOnboarded';

export default function RootLayout() {
  const router = useRouter();
  // State to track if the initial check is complete and navigation can happen
  // This state isn't strictly necessary for rendering but helps manage the flow logic
  const [isInitialCheckComplete, setInitialCheckComplete] = useState(false);

  useEffect(() => {
    const performInitialCheck = async () => {
      try {
        // --- Step 1: Simulate Loading Screen Animation ---d
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

        // --- Step 2: Check Onboarding Status ---
        const hasOnboarded = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
        console.log('AsyncStorage - hasOnboarded:', hasOnboarded); // Log the status for debugging

        // --- Step 3: Navigate Based on Status ---
        if (hasOnboarded === 'true') {
          // If onboarding is complete, navigate directly to the login page.
          // Use router.replace to prevent going back to the loading/onboarding screens.
          console.log('Onboarding complete. Navigating to login.');
          router.replace('/createAccount/login');
        } else {
          // If onboarding is not complete, navigate to the first onboarding screen.
          console.log('Onboarding not complete. Navigating to onboarding flow.');
          router.replace('/onboarding/screen1');
        }

      } catch (error) {
        console.error('Error during initial check:', error);
        // --- Fallback Navigation on Error ---
        // In case of any error (e.g., AsyncStorage issue), navigate to a safe screen,
        // like the login page, to prevent the app from getting stuck.
        console.log('Error occurred. Navigating to login as a fallback.');
        router.replace('/createAccount/login');
      } finally {
        // Mark the initial check as complete
        setInitialCheckComplete(true);
      }
    };

    // Run the initial check when the component mounts
    performInitialCheck();

  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Define the onboarding route group */}
      {/* This screen definition allows navigation *to* the onboarding flow */}
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />

      {/* Define the createAccount route group (which contains login/signup) */}
      {/* This screen definition allows navigation *to* the createAccount flow */}
      <Stack.Screen name="createAccount" options={{ headerShown: false }} />

      <Stack.Screen name="PagesUser" options={{ headerShown: false }} />
      <Stack.Screen name="PagesAdmin" options={{ headerShown: false }} />

    </Stack>
  );
}
