import React, { useState } from 'react'; // Import useState to manage item quantities
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'; // Import Image, TextInput
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useRouter and useLocalSearchParams

// Get screen dimensions for responsive layout
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Define colors (using similar shades from the palette)
const colors = {
  primaryPurple: '#6B4EFF',
  lightGrey: '#f0f0f0',
  darkGrey: '#333',
  mediumGrey: '#888',
  white: '#fff',
  borderGrey: '#ccc',
  quantityButtonGrey: '#eee',
};

// Define a type for a basket item
interface BasketItem {
    id: string;
    name: string;
    details: string;
    quantity: number;
}

export default function BasketScreen() {
  const router = useRouter(); // Initialize useRouter hook
  // Use useLocalSearchParams to get the data passed from the previous screen (index.tsx)
  const { category } = useLocalSearchParams();
  const serviceType = category as string | undefined; // Assign the received category to serviceType

  // Placeholder state for basket items
  // In a real app, this would likely come from a global state or context
  const [basketItems, setBasketItems] = useState<BasketItem[]>([
    { id: '1', name: 'T-shirt', details: 'Colored / White', quantity: 1 },
    { id: '2', name: 'Pants', details: 'Colored / White', quantity: 1 },
    { id: '3', name: 'Shorts', details: 'Colored / White', quantity: 1 },
    { id: '4', name: 'Dress', details: 'Colored / White', quantity: 0 },
    { id: '5', name: 'Jacket', details: 'Colored / White', quantity: 1 },
    { id: '6', name: 'Underwear', details: 'Colored / White', quantity: 1 },
    { id: '7', name: 'Socks', details: 'Colored / White', quantity: 1 },
  ]);

  // Function to handle quantity change
  const handleQuantityChange = (itemId: string, delta: number) => {
    setBasketItems(currentItems =>
      currentItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta); // Prevent quantity from going below 0
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Function to handle back button press
  const handleBackPress = () => {
    console.log("Back button pressed from Basket");
    // Navigate back to the previous screen (User Home)
    router.back();
  };

  // Function to handle Next button press
  const handleNextPress = () => {
    console.log("Next button pressed from Basket");

    // Filter items with quantity > 0 to pass only selected items
    const selectedBasketItems = basketItems.filter(item => item.quantity > 0);

    // Validate if there are any items in the basket before proceeding
    if (selectedBasketItems.length === 0) {
        Alert.alert("Basket Empty", "Please add items to your basket before proceeding.");
        return; // Stop the function if basket is empty
    }

    // --- Carry Data and Navigate to Select Service ---
    // Navigate to the '/PagesUser/select-service' route
    // Pass the received serviceType and the selectedBasketItems as parameters
    router.push({
        pathname: '/PagesUser/select-service',
        params: {
            serviceType: serviceType, // Pass the service type received from index.tsx
            // Pass basket items. For complex objects like arrays,
            // passing via URL params can be tricky. A global state manager (Context, Zustand)
            // is highly recommended for managing basket state across screens.
            // If you must use params for now, you might need to stringify:
            // selectedItems: JSON.stringify(selectedBasketItems),
            // But be aware of URL length limits.
            // For this example, we'll pass them as a simple object structure if possible,
            // or you'll need to integrate state management.
            // Let's assume for now you'll handle basket items with state management
            // or adjust parameter passing based on your needs.
            // We will focus on passing serviceType correctly via params.
        },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basket</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        {/* Step 1: Add Details (Active) */}
        <View style={styles.progressStep}>
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>1</Text>
          </View>
          <Text style={styles.progressText}>Add Details</Text>
        </View>
        <View style={styles.progressLine} />
        {/* Step 2: Order Summary (Inactive) */}
        <View style={styles.progressStep}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>2</Text>
          </View>
          <Text style={styles.progressText}>Order Summary</Text>
        </View>
         <View style={styles.progressLine} />
        {/* Step 3: Payment (Inactive) */}
        <View style={styles.progressStep}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>3</Text>
          </View>
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      {/* Item List */}
      <ScrollView style={styles.itemListContainer} contentContainerStyle={styles.itemListContent}>
        {basketItems.map(item => (
          <View key={item.id} style={styles.itemCard}>
            {/* Image Placeholder */}
            <View style={styles.imagePlaceholder}>
              {/* You would add an Image component here */}
               <Ionicons name="image-outline" size={40} color={colors.mediumGrey} />
            </View>
            {/* Item Details */}
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubDetails}>{item.details}</Text>
              {/* Quantity Selector */}
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, -1)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityAmountContainer}>
                   <Text style={styles.quantityAmount}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section: Item Label and Next Button */}
      <View style={styles.bottomSection}>
           {/* Display the service type here for confirmation if needed */}
           {/* <Text style={styles.itemLabel}>Service Type: {serviceType}</Text> */}
           <Text style={styles.itemLabel}>Item:</Text> {/* Keeping the original label */}
           {/* NEXT Button */}
           <TouchableOpacity
             style={styles.nextButton}
             onPress={handleNextPress}
           >
             <Text style={styles.nextButtonText}>NEXT</Text>
           </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // White background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40, // Adjust padding from top
    paddingBottom: 15,
    backgroundColor: colors.white, // White header background
    borderBottomWidth: 1, // Optional: Add a subtle border
    borderColor: colors.borderGrey, // Optional: Border color
  },
  backButton: {
    padding: 5, // Add padding for easier tapping
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.borderGrey, // Inactive circle color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeProgressCircle: {
    backgroundColor: colors.primaryPurple, // Active circle color
  },
  progressNumber: {
    fontSize: 14,
    color: colors.white, // White number color
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    color: colors.mediumGrey, // Text color
  },
  progressLine: {
    flex: 1, // Take up available space
    height: 2,
    backgroundColor: colors.borderGrey, // Line color
    marginHorizontal: 5,
  },
  itemListContainer: {
    flex: 1, // Allow item list to take up available vertical space
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  itemListContent: {
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000', // Optional shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.lightGrey, // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1, // Allow details to take up remaining space
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 5,
  },
  itemSubDetails: {
    fontSize: 14,
    color: colors.mediumGrey,
    marginBottom: 10, // Space above quantity selector
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.quantityButtonGrey, // Light grey button background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  quantityButtonText: {
    fontSize: 18,
    color: colors.darkGrey,
  },
   quantityAmountContainer: {
     minWidth: 30, // Ensure enough space for the number
     alignItems: 'center',
     marginHorizontal: 10, // Space between buttons and number
   },
  quantityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  bottomSection: {
    flexDirection: 'column', // Change to column to stack items vertically
    alignItems: 'flex-start', // Align items to the start (left)
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    backgroundColor: colors.white,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 10, // Add space below the label
  },
  nextButton: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Make the button stretch horizontally
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
