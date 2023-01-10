import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, AScreen} from './src/screens';

export type RootStackParamList = {HomeScreen: undefined; AScreen: undefined};
const RootStack = createNativeStackNavigator<RootStackParamList>();
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
const App = () => {
  useEffect(() => {
    AsyncStorage.setItem('key1', 'value1');
    AsyncStorage.setItem('key2', 'value2');
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="AScreen" component={AScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
