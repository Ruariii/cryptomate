import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colours';
import CryptoReportScreen from './components/CryptoReport';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CryptoReportScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
