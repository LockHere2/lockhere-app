import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Overlay, Divider } from 'react-native-elements';

const styles = StyleSheet.create({
    view: {
        padding: 5
    },
    text: {
        fontSize: 18, 
        textAlign: 'center'
    },
    divider: {
        margin: 10
    },
    button: {
        backgroundColor: 'black', 
        height: 30
    }
});

export default ({ isVisible = false, message, onBackdropPress = () => { }, onPress = () => { } }) => {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <View style={styles.view}>
                <Text style={styles.text} >{message}</Text>
                <Divider style={styles.divider} />
                <Button buttonStyle={styles.button} title="OK" onPress={onPress} />
            </View>
        </Overlay>
    )
}