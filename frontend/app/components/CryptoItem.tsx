import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colours';

interface CryptoItemProps {
  ticker: string;
  isRising: boolean;
  signal: 'BUY' | 'NO';
}

export default function CryptoItem({ ticker, isRising, signal }: CryptoItemProps) {
  
    const router = useRouter();

    const handlePress = () => {
        router.push(`./crypto/${ticker}`);
    };
  
    return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.ticker}>{ticker}</Text>

        <Feather
          name={isRising ? 'arrow-up-right' : 'arrow-down-right'}
          size={20}
          color={isRising ? 'limegreen' : 'red'}
        />

        <Text style={[styles.signal, signal === 'BUY' ? styles.buy : styles.no]}>
          {signal}
        </Text>

        <Feather name="chevron-right" size={24} color={Colors.text} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4a4a4a',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticker: {
    fontFamily: 'KronaOne',
    fontSize: 20,
    color: Colors.text,
  },
  signal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buy: {
    color: 'limegreen',
  },
  no: {
    color: 'gray',
  },
});
