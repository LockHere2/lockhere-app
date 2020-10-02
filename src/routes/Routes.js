import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomePage';
import LoginScreen from '../screens/LoginPage';
import SignupScreen from '../screens/SignupPage';
import LockersScreen from '../screens/LockersPage';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Lockers"
                    component={LockersScreen}
                    options={{ title: 'Seleção de armário' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;