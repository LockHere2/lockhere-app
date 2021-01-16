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
        height: 30,
        width: 100
    }
});

export default ({ isVisible = false, message, 
    okButton = { title: '', onPress: () => {}, style: {} }, 
    cancelButton = { title: '', onPress: () => {}, style: {} } }) => {
    return (
        <Overlay isVisible={isVisible} >
            <View style={styles.view}>
                <Text style={styles.text} >{message}</Text>
                <Divider style={styles.divider} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button buttonStyle={{ ...styles.button, ...okButton.style }} title={okButton.title} onPress={okButton.onPress} />
                    <Button buttonStyle={{ ...styles.button, ...cancelButton.style }} title={cancelButton.title} onPress={cancelButton.onPress} />
                </View>
            </View>
        </Overlay>
    )
}