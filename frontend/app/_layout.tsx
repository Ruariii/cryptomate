import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";
import Colors from "../constants/colours";

export default function Layout() {
  const { width } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    KronaOne: require("../assets/fonts/KronaOne-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // Responsive sizes
  const fontSize = Math.max(12, width * 0.06); // min 18px, scales up
  const logoSize = Math.max(2, width * 0.08); // min 30px, scales up
  const headerHeight = Math.max(70, width * 0.18); // min 70px, scales up

  const HeaderTitle = () => (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/images/logo.png")}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
      <Text style={[styles.headerText, { fontSize }]} numberOfLines={1}>
        CryptoMate
      </Text>
    </View>
  );

  return (
    <Stack
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerStyle: {
          backgroundColor: Colors.secondary,
          height: headerHeight,
        },
        headerTintColor: Colors.text,
        headerTitleAlign: "left",
        contentStyle: {
          backgroundColor: Colors.primary,
          padding: 10,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  logo: {
    marginRight: 10,
  },
  headerText: {
    fontFamily: "KronaOne",
    fontWeight: "bold",
    color: Colors.text,
    flexShrink: 1,
  },
});
