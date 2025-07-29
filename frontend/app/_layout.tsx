import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import Colors from '../constants/colours';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'KronaOne': require('../assets/fonts/KronaOne-Regular.ttf'),
  });

  // Keep splash screen visible until fonts are loaded
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;


  return (
    <Stack
      screenOptions={{
        headerTitle: 'CryptoMate',
        headerTitleStyle: {
          fontFamily: 'KronaOne',
          fontSize: 38, // Increase font size
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: Colors.secondary,
          height: 100, // Make header larger
        },
        headerTintColor: Colors.text,
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: Colors.primary,
          padding: 10,
        },
      }}
    />
  );
}
