// In app/PagesUser/_layout.tsx
import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack
       screenOptions={{
        headerShown: false, // Hide header for these screens by default
      }}
    >
      {/*
        Explicitly hide the header for the index screen.
        This ensures the default header provided by expo-router is not shown,
        even if the screen name might otherwise cause a title to appear.
      */}
      <Stack.Screen name="index" options={{ headerShown: false }} /> // User Home Screen

      {/* Other screens in the user stack */}
      <Stack.Screen name="basket" options={{ headerShown: false }} /> // Basket Screen
      <Stack.Screen name="select-service" options={{ headerShown: false }} /> // Select Service
      <Stack.Screen name="schedule-pickup" options={{ headerShown: false }} /> // Schedule Pickup
      <Stack.Screen name="order-summary" options={{ headerShown: false }} /> // Order Summary
      <Stack.Screen name="payment-method" options={{ headerShown: false }} /> // Payment Method
      <Stack.Screen name="done-payment" options={{ headerShown: false }} /> // Payment Done
      <Stack.Screen name="myLaundry" options={{ headerShown: false }} /> // My Laundry
      <Stack.Screen name="history" options={{ headerShown: false }} /> // History
    </Stack>
  );
}
