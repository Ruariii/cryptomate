import { View, Text, StyleSheet } from 'react-native';
import CryptoList from './components/CryptoList';
import Colors from '../constants/colours';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CryptoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
