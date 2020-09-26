import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapPage from '../pages/MapPage';
import ReservePage from '../pages/ReservePage';
import ProfilePage from '../pages/ProfilePage';

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
                <Tab.Screen options={{ tabBarIcon: ({ focused }) => this.icon({ focused, name: 'home' }) }} name="Home" component={MapPage} />
                <Tab.Screen options={{ tabBarIcon: ({ focused }) => this.icon({ focused, name: 'book' }) }}  name="Reservas" component={ReservePage} />
                <Tab.Screen options={{ tabBarIcon: ({ focused }) => this.icon({ focused, name: 'person' }) }}  name="Perfil" component={ProfilePage} />
            </Tab.Navigator>
        )
    }
}

