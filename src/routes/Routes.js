import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import LockersScreen from '../screens/LockersScreen';
import ScheduleLockerScreen from '../screens/ScheduleLockerScreen';
import ResumeScheduleLockerScreen from '../screens/ResumeScheduleLockerScreen';
import OpenLockerScreen from '../screens/OpenLockerScreen';
import OpenScheduledLocker from '../screens/OpenScheduledLocker';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';

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
                <Stack.Screen
                    name="ScheduleLocker"
                    component={ScheduleLockerScreen}
                    options={{ title: 'Reservar um armário' }}
                />
                <Stack.Screen
                    name="ResumeScheduleLockerScreen"
                    component={ResumeScheduleLockerScreen}
                    options={{ title: 'Reservar um armário' }}
                />
                <Stack.Screen
                    name="OpenLockerScreen"
                    component={OpenLockerScreen}
                    options={{ title: 'Armário aberto' }}
                />
                <Stack.Screen
                    name="OpenScheduledLocker"
                    component={OpenScheduledLocker}
                    options={{ title: 'Armário aberto' }}
                />
                <Stack.Screen
                    name="UpdateProfileScreen"
                    component={UpdateProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConfirmCodeScreen"
                    component={ConfirmCodeScreen}
                    options={{ title: 'Confirmar código' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;