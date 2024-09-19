import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Feed from './components/Feed';

export default function App() {
  return (
    <View>
      <Text>Welcome to my social app</Text>
      <StatusBar style="auto" />

      <Feed />
    </View>
  );
}
