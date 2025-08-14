import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../constants/colours';
import CryptoReport from './components/CryptoReport';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CryptoReport />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
