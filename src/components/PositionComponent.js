import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 36
    }
})

export const Bottom = ({ children, style }) => (
    <View style={{ ...styles.bottom, ...style }}>
        {children}
    </View>
)

