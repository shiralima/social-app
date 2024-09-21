import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import PostsFeed from './components/PostsFeed';
export default function App() {
  return (
    <View style={styles.container}>
      <PostsFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 15 : 0,
  },
});