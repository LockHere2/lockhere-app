import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    error: {
        fontSize: 15,
        marginBottom: 10
    },
    label: {
        color: 'black'
    }
});

export default ({ testID, secureTextEntry, maxLength, errorProps, errorMessage, errorStyle, placeholder, label, labelStyle, onChangeText }) => {
    return <Input
        testID={testID}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        errorProps={errorProps}
        errorMessage={errorMessage}
        errorStyle={{...styles.error, errorStyle}}
        placeholder={placeholder}
        label={label}
        labelStyle={{...styles.label, labelStyle}}
        onChangeText={onChangeText} />
}