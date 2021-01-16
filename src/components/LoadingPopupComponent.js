import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Text, Overlay } from 'react-native-elements';

const styles = StyleSheet.create({
    view: {
        padding: 5
    },
    text: {
        fontSize: 18, 
        textAlign: 'center'
    }
});

export default ({ isVisible = false, message }) => {
    return (
        <Overlay isVisible={isVisible} >
            <View style={styles.view}>
                <Text style={styles.text} >{message}</Text>
                <ActivityIndicator size='large' />
            </View>
        </Overlay>
    )
}