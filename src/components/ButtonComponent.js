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
    },
    center: {
        alignSelf: 'center'
    }
});

export default ({ testID, title, disabled = false, center = false, shadow = false, containerStyle, buttonStyle, onPress }) => {
    const shadowStyle = shadow ? styles.shadow : {};
    const centerStyle = center ? styles.center : {};

    return <Button 
        testID={testID}
        disabled={disabled}
        containerStyle={{ ...shadowStyle, ...containerStyle }} 
        buttonStyle={{ ...styles.button, ...buttonStyle, ...centerStyle }} 
        title={title}
        onPress={onPress} />
};
