import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";

interface Decision {
  signal: string;
  score: number;
}

interface CryptoReport {
  symbol: string;
  decision: Decision;
  report: string;
}

const CryptoReportScreen: React.FC = () => {
  const [data, setData] = useState<CryptoReport | null>(null);
  const [loading, setLoading] = useState(false);

  const symbol = "BTC"; // You can make this dynamic later

  const getReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://192.168.1.100:8000/crypto/${symbol}/report`); 
      // ^ replace with your machine's local IP, not localhost
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Report for {symbol}</Text>
      <Button title="Get Report" onPress={getReport} />
      
      {loading && <ActivityIndicator size="large" />}

      {data && (
        <View style={styles.reportContainer}>
          <Text style={styles.decision}>Decision: {data.decision.signal}</Text>
          <Text>Score: {data.decision.score}</Text>
          <Text style={styles.report}>{data.report}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  decision: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  reportContainer: { marginTop: 20 },
  report: { marginTop: 10, fontSize: 14, color: "#555" },
});

export default CryptoReportScreen;
