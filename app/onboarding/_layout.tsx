import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    // Set up a Stack navigator for screens within the (onboarding) group
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header by default for a cleaner look
      }}
    >
      {/* Define screens available within this layout */}
      <Stack.Screen name="screen1" options={{headerShown: false,}}/> // Refers to app/onboarding/screen1.tsx
      <Stack.Screen name="screen2" options={{headerShown: false,}}/> // Refers to app/onboarding/screen2.tsx
      <Stack.Screen name="screen3" options={{headerShown: false,}}/> // Refers to app/onboarding/screen3.tsx
      {/* Add more screens here if needed in the future */}
    </Stack>
  );
}