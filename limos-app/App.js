import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from './src/screens/MainScreen';
import AboutScreen from './src/screens/AboutScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainScreen">
        <Drawer.Screen name="Horus" component={MainScreen} />
        <Drawer.Screen name="Sobre" component={AboutScreen} />
      </Drawer.Navigator>
      {/* <Stack.Navigator
        initialRouteName="RegisterScreen"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}