import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    button: {
        width: 250
    },
    text: {
        marginTop: 50
    }
});

export default class FinishReserveScreen extends Component {

    async onPress() {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Por favor, retire seus itens do armário e feche o mesmo em seguida.</Text>
                <Bottom>
                    <Button
                        center
                        title='Feito!'
                        buttonStyle={styles.button}
                        onPress={() => this.onPress()} />
                </Bottom>
            </View>
        )
    }
}
