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

export default ({ testID, value, secureTextEntry, keyboardType, maxLength, errorProps, errorMessage, errorStyle, placeholder, label, labelStyle, onBlur, onChangeText }) => {
    return <Input
        testID={testID}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        errorProps={errorProps}
        errorMessage={errorMessage}
        errorStyle={{...styles.error, errorStyle}}
        placeholder={placeholder}
        label={label}
        labelStyle={{...styles.label, labelStyle}}
        onBlur={onBlur}
        onChangeText={onChangeText} />
}