import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from '../screens/MapScreen';
import ReserveScreen from '../screens/ReserveScreen';
import ProfileScreen from '../screens/ProfileScreen';

const styles = StyleSheet.create({
    navigator: { 
        backgroundColor: 'black', 
        paddingTop: 5 
    },
    label: {
        fontSize: 15, 
        fontWeight: '200'
    }
  });

const Tab = createBottomTabNavigator();

export default class MenuComponent extends Component {

    icon({ focused, name }) {
        const color = focused ? 'orange' : 'white';
        return <Icon size={30} name={name} color={color}/>;
    }

    render() {
        return (
            <Tab.Navigator tabBarOptions={{ style: styles.navigator, labelStyle: styles.label, activeTintColor: 'orange' }}>
                <Tab.Screen options={{ unmountOnBlur: true, tabBarIcon: ({ focused }) => this.icon({ focused, name: 'home' }) }} name="Home" component={MapScreen} />
                <Tab.Screen options={{ unmountOnBlur: true, tabBarIcon: ({ focused }) => this.icon({ focused, name: 'book' }) }} name="Reservas" component={ReserveScreen} />
                <Tab.Screen options={{ unmountOnBlur: true, tabBarIcon: ({ focused }) => this.icon({ focused, name: 'person' }) }}  name="Perfil" component={ProfileScreen} />
            </Tab.Navigator>
        )
    }
}

