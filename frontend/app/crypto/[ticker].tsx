import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colours';

export default function CryptoDetailed() {
  const { ticker } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{ticker} Details</Text>

      <Text style={styles.subText}>AI-generated report goes here...</Text>
      <Text style={styles.subText}>Buy Score: 87</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
  },
  title: {
    fontFamily: 'KronaOne',
    fontSize: 24,
    color: Colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    color: Colors.text,
    fontSize: 16,
    marginVertical: 4,
  },
});
