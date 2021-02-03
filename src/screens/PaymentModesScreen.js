import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 24,
        paddingRight: 24
    },
    button: {
        width: 250
    },
    text: {
        marginTop: 10,
        marginBottom: 50
    }
});

export default class PaymentModesScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Formas de pagamento disponíveis</Text>
                <ListItem bottomDivider>
                    <Avatar source={require('../../assets/paypal.jpg')} />
                    <ListItem.Content>
                        <ListItem.Title>Paypal</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }
}