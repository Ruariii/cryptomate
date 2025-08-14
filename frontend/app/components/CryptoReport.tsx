// app/components/CryptoReport.tsx
import React, { useState, useRef, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Animated, Easing, Platform } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import Colors from '../../constants/colours';
import ModernDropdown from "./ModernDropdown"; // <-- your new dropdown

interface Decision {
  signal: string;
  score: number;
}

interface CryptoReport {
  symbol: string;
  decision: Decision;
  report: string;
}

const screenWidth = Dimensions.get("window").width;

const CryptoReportScreen: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [data, setData] = useState<CryptoReport | null>(null);
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  const [fontsLoaded] = useFonts({
    KronaOne_400Regular: require('../../assets/fonts/KronaOne-Regular.ttf'),
  });

  const getReport = async () => {
    setLoading(true);
    setData(null);

    // Set base URL depending on platform
    const baseUrl =
      Platform.OS === "web"
        ? "http://127.0.0.1:8000"
        : "http://192.168.1.1:8000";

    try {
      const res = await fetch(`${baseUrl}/crypto/${selectedSymbol}/report`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching report:", error);
    }

    setLoading(false);
  };

  // Animate when data changes
  useEffect(() => {
    if (data) {
      fadeAnim.setValue(0);
      translateYAnim.setValue(20);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [data]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Report</Text>

      {/* Modern Dropdown */}
      <ModernDropdown
        options={[
          'BTC',
          'ETH',
          'XRP',
          'DOGE',
          'LTC',
          'SOL',
        ]}
        selected={selectedSymbol}
        onSelect={(option) => setSelectedSymbol(option)}
      />

      {/* Get Report Button */}
      <Text style={styles.button} onPress={getReport}>
        Get Report
      </Text>

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

      {data && (
        <Animated.View
          style={[
            styles.reportContainer,
            { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          <Text style={styles.decision}>Decision: {data.decision.signal}</Text>
          <Text style={styles.decision}>Score: {data.decision.score}</Text>
          <Text style={styles.report}>{data.report}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primary,
    alignItems: "center"
  },
  title: {
    fontSize: screenWidth * 0.06,
    color: Colors.text,
    fontFamily: "KronaOne_400Regular",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#1f6feb",
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    fontSize: screenWidth * 0.03,
    fontFamily: "KronaOne_400Regular",
    overflow: "hidden",
    marginTop: 15
  },
  decision: {
    fontSize: screenWidth * 0.06,
    color: "#58a6ff",
    fontFamily: "KronaOne_400Regular",
    marginTop: 15
  },
  reportContainer: {
    marginTop: 30,
    padding: 50,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: "100%"
  },
  report: {
    marginTop: 16,
    fontSize: screenWidth * 0.035,
    color: Colors.text,
    fontFamily: "KronaOne_400Regular",
  }
});

export default CryptoReportScreen;
