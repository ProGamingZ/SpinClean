import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for auth screens
      }}
    >
      {/* Define screens within the (auth) group */}
      <Stack.Screen name="login" />  // Corresponds to app/(auth)/login.tsx
      <Stack.Screen name="signup" /> // Corresponds to app/(auth)/signup.tsx
    </Stack>
  );
}