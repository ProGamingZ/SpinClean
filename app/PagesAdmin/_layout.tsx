import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    // Stack navigator for screens within the (admin) group
    <Stack
       screenOptions={{
        headerShown: false, 
      }}
    >
      
      <Stack.Screen name="index" /> 
      <Stack.Screen name="history" />
      <Stack.Screen name="history1" />  
      <Stack.Screen name="notification"/> 
      

    </Stack>
  );
}