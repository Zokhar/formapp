import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from "./src/navigation/Navigation";
import { FormProvider } from './src/context/FormContext';

const App: React.FC = () => {
  return (
    <FormProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </FormProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});