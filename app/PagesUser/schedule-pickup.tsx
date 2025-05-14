import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import moment from 'moment'; // Using moment for date handling (you might need to install: expo install moment)

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
  selectedButtonBackground: '#6B4EFF',
  selectedButtonText: '#fff',
  unselectedButtonBackground: '#fff',
  unselectedButtonText: '#333',
  buttonBorder: '#6B4EFF',
  activeProgressText: '#6B4EFF', // Color for active progress text
  calendarHeader: '#333', // Color for calendar month/year header
  calendarDayText: '#333', // Color for calendar day numbers
  selectedDayBackground: '#6B4EFF', // Background for selected day
  selectedDayText: '#fff', // Text color for selected day
  todayBorder: '#6B4EFF', // Border for today's date
  dayDot: '#6B4EFF', // Color for the dots under days (optional, matching design)
};

// Helper function to generate days for a given month
const generateDays = (year: number, month: number) => {
  const startOfMonth = moment({ year, month }).startOf('month');
  const endOfMonth = moment({ year, month }).endOf('month');
  const daysInMonth = endOfMonth.date();
  const startOfWeek = startOfMonth.day(); // 0 for Sunday, 1 for Monday, etc. (moment's day() is 0-6 for Sun-Sat)

  const days = [];
  // Add placeholder nulls for days before the start of the month
  for (let i = 0; i < startOfWeek; i++) {
    days.push(null);
  }

  // Add actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

// Define a type for a basket item (needed if passing basket items)
interface BasketItem {
    id: string;
    name: string;
    details: string;
    quantity: number;
}


export default function SchedulePickupScreen() {
  // useRouter hook for navigation
  const router = useRouter();
  // Use useLocalSearchParams hook to get data passed from the previous screen (select-service)
  const params = useLocalSearchParams();
  // Receive serviceType, detergent, and fabricSoftener from select-service.tsx
  const serviceType = params.serviceType as string | undefined;
  const detergent = params.detergent as string | undefined;
  const fabricSoftener = params.fabricSoftener as string | undefined; // 'true' or 'false' string
  // If you passed basket items from select-service.tsx (which received them from basket.tsx):
  // const basketItems = params.basketItems ? JSON.parse(params.basketItems as string) as BasketItem[] : [];


  // State for calendar: current month/year and selected date (moment object)
  const [currentMonth, setCurrentMonth] = useState(moment().month()); // 0 for January
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  // State for selected time slot (string)
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // State for location input (string)
  const [location, setLocation] = useState('');

  // Log received data from the previous screen on component mount or when params change
  useEffect(() => {
    console.log("Received in SchedulePickupScreen:");
    console.log("Service Type:", serviceType);
    console.log("Detergent:", detergent);
    console.log("Fabric Softener:", fabricSoftener);
    // If receiving basket items:
    // console.log("Basket Items:", basketItems);
  }, [serviceType, detergent, fabricSoftener]); // Add all received params to dependency array

  // Function to handle month navigation in the calendar
  const handleMonthChange = (direction: 'prev' | 'next') => {
    // Calculate the new month and year
    const newMonth = direction === 'next' ? currentMonth + 1 : currentMonth - 1;
    const newDate = moment({ year: currentYear, month: newMonth });

    // Update state with the new month and year
    setCurrentMonth(newDate.month());
    setCurrentYear(newDate.year());
    // Clear the selected date when changing the month to avoid selecting a date in the wrong month
    setSelectedDate(null);
  };

  // Function to handle day selection in the calendar
  const handleDayPress = (day: number | null) => {
    // Only proceed if a valid day number is clicked (not a placeholder null)
    if (day !== null) {
      // Create a moment object for the selected date
      const date = moment({ year: currentYear, month: currentMonth, day });
      // Optional validation: Prevent selecting past dates
      if (date.isSameOrAfter(moment(), 'day')) {
         // Set the selected date state
         setSelectedDate(date);
      } else {
         // Show an alert if a past date is selected
         Alert.alert("Invalid Date", "Please select a future date.");
      }
    }
  };

  // Function to handle time slot selection
  const handleTimePress = (time: string) => {
    // Set the selected time state
    setSelectedTime(time);
  };

  // Function to handle Back button press
  const handleBackPress = () => {
    console.log("Back button pressed on Schedule Pickup");
    // Navigate back to the previous screen (Select Service)
    router.back();
  };

  // Function to handle Next button press
  const handleNextPress = () => {
    console.log("Next button pressed on Schedule Pickup");

    // Validate that date, time, and location are selected/entered
    if (!selectedDate || !selectedTime || location.trim() === '') {
      // Show an alert if any required information is missing
      Alert.alert("Information Required", "Please select a date, time, and set your location.");
      return; // Stop the function if validation fails
    }

    // Data object containing all collected details for the pickup
    const pickupDetails = {
      serviceType: serviceType, // Include the received service type
      detergent: detergent, // Include the received detergent
      fabricSoftener: fabricSoftener, // Include the received fabric softener
      selectedDate: selectedDate.toISOString(), // Pass date as ISO string for easy storage/parsing
      selectedTime: selectedTime,
      location: location.trim(),
      // Include basket items if passed through:
      // basketItems: basketItems,
    };

    console.log("Pickup Details to pass to Order Summary:", pickupDetails);

    // --- Implement navigation to the next step (Order Summary) ---
    // Navigate to the '/PagesUser/order-summary' route
    // Pass the pickupDetails object as parameters to the next screen
    router.push({
        pathname: '/PagesUser/order-summary',
        params: pickupDetails, // Pass the entire object as params
    });

    // Removed the placeholder Alert as we are now navigating
    // Alert.alert("Success", "Pickup details collected! Ready to navigate to Order Summary.");
  };

  // Generate the days array for the current month
  const daysInCurrentMonth = generateDays(currentYear, currentMonth);
  // Labels for the days of the week
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Weekday labels

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkGrey} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Pickup</Text>
        {/* Empty view for spacing to center the title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressIndicator}>
        {/* Step 1: Add Details (Active) */}
        <View style={styles.progressStep}>
          {/* Apply active style to Step 1 circle */}
          <View style={[styles.progressCircle, styles.activeProgressCircle]}>
            <Text style={styles.progressNumber}>1</Text>
          </View>
          {/* Text for step 1 is active */}
          <Text style={[styles.progressText, styles.activeProgressText]}>Add Details</Text>
        </View>
        <View style={styles.progressLine} />
        {/* Step 2: Order Summary (Inactive) */}
        <View style={styles.progressStep}>
          {/* Step 2 circle is inactive */}
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>2</Text>
          </View>
          {/* Text for step 2 is inactive */}
          <Text style={styles.progressText}>Order Summary</Text>
        </View>
         <View style={styles.progressLine} />
        {/* Step 3: Payment (Inactive) */}
        <View style={styles.progressStep}>
          {/* Step 3 circle is inactive */}
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>3</Text>
          </View>
           {/* Text for step 3 is inactive */}
          <Text style={styles.progressText}>Payment</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.mainContent} contentContainerStyle={styles.mainContentPadding}>
        {/* Date Section */}
        <Text style={styles.sectionHeading}>Date:</Text>
        <View style={styles.calendarContainer}>
          {/* Calendar Header (Month and Year) */}
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => handleMonthChange('prev')}>
              <Ionicons name="chevron-back" size={24} color={colors.calendarHeader} />
            </TouchableOpacity>
            <Text style={styles.calendarHeaderTitle}>
              {moment({ year: currentYear, month: currentMonth }).format('MMMM YYYY')} {/* Format month and year */}
            </Text>
            <TouchableOpacity onPress={() => handleMonthChange('next')}>
              <Ionicons name="chevron-forward" size={24} color={colors.calendarHeader} />
            </TouchableOpacity>
          </View>

          {/* Weekday Labels */}
          <View style={styles.weekdaysContainer}>
            {weekDays.map(day => (
              <Text key={day} style={styles.weekdayLabel}>{day}</Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {daysInCurrentMonth.map((day, index) => {
              // Check if the current day in the loop is the selected date
              const isSelected = selectedDate && day !== null && moment({ year: currentYear, month: currentMonth, day }).isSame(selectedDate, 'day');
              // Check if the current day in the loop is today's date
              const isToday = day !== null && moment({ year: currentYear, month: currentMonth, day }).isSame(moment(), 'day');
              // Check if the day is in the past (to potentially disable)
              const isPast = day !== null && moment({ year: currentYear, month: currentMonth, day }).isBefore(moment(), 'day');


              return (
                <TouchableOpacity
                  key={index} // Using index as key when day can be null
                  style={[
                    styles.dayButton,
                    isSelected && styles.selectedDayButton, // Apply selected style
                    isToday && styles.todayButton, // Apply today's border
                    isPast && styles.disabledDayButton, // Optional: style past dates differently
                  ]}
                  onPress={() => handleDayPress(day)}
                  disabled={day === null || isPast} // Disable button if it's a placeholder or in the past
                >
                  {/* Render the day number only if it's not a placeholder */}
                  {day !== null && (
                    <Text style={[
                      styles.calendarDayText,
                      isSelected && styles.selectedDayText, // Apply selected text color
                      isPast && styles.disabledText, // Optional: style past date text
                    ]}>
                      {day}
                    </Text>
                  )}
                  {/* Optional: Add dots below days as seen in some designs */}
                   {/* You would add logic here to determine which days should have dots */}
                   {/* For example, if a day has an existing pickup scheduled */}
                   {/* {day !== null && (
                    <View style={styles.dayDotContainer}>
                        <View style={styles.dayDot} />
                    </View>
                   )} */}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>


        {/* Time Section */}
        <Text style={styles.sectionHeading}>Time:</Text>
        <View style={styles.buttonGroup}>
          {/* Placeholder Time Slots - Updated based on user request */}
          {['8 AM - 11 AM', '1 PM - 7 PM'].map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.optionButton, // Reusing optionButton style
                selectedTime === time && styles.selectedOptionButton, // Apply selected style
              ]}
              onPress={() => handleTimePress(time)}
            >
              <Text style={[
                styles.optionButtonText, // Reusing optionButtonText style
                selectedTime === time ? styles.selectedOptionButtonText : styles.unselectedOptionButtonText, // Apply selected/unselected text color
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location Section */}
        <Text style={styles.sectionHeading}>Location:</Text>
        <TextInput
          style={styles.locationInput}
          placeholder="Set Location"
          value={location}
          onChangeText={setLocation} // Update location state as text changes
        />

        {/* Add other sections like notes, etc. */}

      </ScrollView>

      {/* Bottom Section: NEXT Button */}
      <View style={styles.bottomSection}>
         {/* NEXT Button */}
         <TouchableOpacity
           style={styles.nextButton}
           onPress={handleNextPress} // Call the handleNextPress function on press
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
    backgroundColor: colors.white,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  backButton: {
    padding: 5,
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
  activeProgressText: { // Style for active text color
      color: colors.activeProgressText,
      fontWeight: 'bold', // Optional: make active text bold
  },
  progressLine: {
    flex: 1, // Take up available space
    height: 2,
    backgroundColor: colors.borderGrey, // Line color
    marginHorizontal: 5,
  },
  mainContent: {
    flex: 1, // Allow main content to take up available vertical space
    paddingHorizontal: 20,
    paddingTop: 10,
  },
   mainContentPadding: {
      paddingBottom: 20, // Add padding at the bottom of the scroll view
   },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginTop: 15,
    marginBottom: 10,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.calendarHeader,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  weekdayLabel: {
    fontSize: 12,
    color: colors.mediumGrey,
    fontWeight: 'bold',
    width: `${100 / 7}%`, // Distribute evenly
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow days to wrap to the next line
  },
  dayButton: {
    width: `${100 / 7}%`, // Each day button takes 1/7th of the width
    aspectRatio: 1, // Make buttons square
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
     borderWidth: 1, // Add border for visual separation
     borderColor: 'transparent', // Default transparent border
  },
  selectedDayButton: {
    backgroundColor: colors.selectedDayBackground,
    borderRadius: 8, // Rounded corners for selected day
     borderColor: colors.selectedDayBackground, // Border matches background when selected
  },
   todayButton: {
      borderColor: colors.todayBorder, // Border for today's date
      borderRadius: 8, // Apply rounded corners for today's border
   },
  calendarDayText: {
    fontSize: 14,
    color: colors.calendarDayText,
  },
  selectedDayText: {
    color: colors.selectedDayText, // White text for selected day
    fontWeight: 'bold',
  },
   disabledDayButton: { // Style for disabled (past) dates
      opacity: 0.5, // Make past dates look faded
   },
   disabledText: { // Style for disabled (past) date text
      color: colors.mediumGrey, // Use a muted color for text
   },
   dayDotContainer: {
      flexDirection: 'row',
      marginTop: 3, // Space between day number and dots
   },
   dayDot: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: colors.dayDot,
      marginHorizontal: 1, // Space between dots
   },
  buttonGroup: {
    flexDirection: 'column', // Stack buttons vertically
    marginBottom: 20,
  },
  optionButton: { // Reusing style for time slots
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: colors.unselectedButtonBackground,
  },
  selectedOptionButton: { // Reusing style for selected time slot
    backgroundColor: colors.selectedButtonBackground,
    borderColor: colors.selectedButtonBackground,
  },
   optionButtonText: { // Reusing style for time slot text
      fontSize: 16,
   },
   unselectedOptionButtonText: { // Reusing style for unselected time slot text
      color: "grey",
   },
   selectedOptionButtonText: { // Reusing style for selected time slot text
      color: colors.selectedButtonText,
   },
  locationInput: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.darkGrey,
    marginBottom: 20,
  },
  bottomSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.borderGrey,
    backgroundColor: colors.white,
  },
  nextButton: {
    backgroundColor: colors.primaryPurple,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
