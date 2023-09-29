import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login';
import RegisterScreen from './src/register';
import HomeScreen from './src/home';
import AddIncomeScreen from './src/income';
import AddExpenditureScreen from './src/expenditure';
import CashFlowScreen from "./src/cashflow";
import SettingScreen from './src/setting';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />

        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CashFlow" component={CashFlowScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddIncome" component={AddIncomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddExpenditure" component={AddExpenditureScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
