import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native with TypeScript!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default App;