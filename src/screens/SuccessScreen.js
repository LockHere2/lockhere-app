import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Image } from 'react-native-elements';

import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';
import { TabActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        flexDirection: 'column',
        
    },
    text: {
        textAlign: 'center',
        marginTop: 50
    },
    image: {
        width: 220, 
        height: 220, 
        marginTop: 60
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
                <Image
                    transition={false}
                    source={require('../../assets/green_check.png')}
                    style={styles.image}
                />
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