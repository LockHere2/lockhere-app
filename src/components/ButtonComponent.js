import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: 'black'
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
    }
});

export default ({ title, disabled = false, containerStyle, buttonStyle, shadow = false, onPress }) => {
    const shadowStyle = shadow ? styles.shadow : {};

    return <Button 
        disabled={disabled}
        containerStyle={{ ...shadowStyle, ...containerStyle }} 
        buttonStyle={{ ...styles.button, ...buttonStyle }} 
        title={title}
        onPress={onPress} />
};
