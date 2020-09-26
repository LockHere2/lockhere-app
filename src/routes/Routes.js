import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import LockersPage from '../pages/LockersPage';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Lockers"
                    component={LockersPage}
                    options={{ title: 'Seleção de armário' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;