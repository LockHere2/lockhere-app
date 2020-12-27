import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';
import { TabActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    text: {
        textAlign: 'center'
    }
})

export default class SuccessScreen extends Component {

    onPress() {
        this.props.navigation.navigate('Home');
        const jumpToAction = TabActions.jumpTo('Home');
        this.props.navigation.dispatch(jumpToAction);
    }

    render() {
        const { title } = this.props.route.params;

        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>{title}</Text>
                <Bottom>
                    <Button 
                        center 
                        title='Ok'
                        buttonStyle={{ width: 250 }} 
                        onPress={() => this.onPress()} />
                </Bottom>
            </View>
        );
    }
}