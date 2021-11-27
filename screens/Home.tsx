import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
