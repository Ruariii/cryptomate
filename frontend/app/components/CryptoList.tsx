import { FlatList, View } from 'react-native';
import CryptoItem from './CryptoItem';

const dummyData = [
  { ticker: 'BTC', isRising: true, signal: 'BUY' },
  { ticker: 'ETH', isRising: false, signal: 'NO' },
  { ticker: 'ADA', isRising: true, signal: 'BUY' },
];

export default function CryptoList() {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <CryptoItem
            ticker={item.ticker}
            isRising={item.isRising}
            signal={item.signal as 'BUY' | 'NO'}
          />
        )}
      />
    </View>
  );
}
