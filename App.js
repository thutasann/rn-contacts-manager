import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavContainer from './src/navigation';
import GlobalProvider from './src/context/Provider';

export default function App() {
  return (
    <>
      <GlobalProvider>
        <AppNavContainer/>
      </GlobalProvider>
      <StatusBar style="auto" />
    </>

  );
}

