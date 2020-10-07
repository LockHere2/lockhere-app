import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import CurrencyNumberFormat from './CurrencyNumberFormatComponent';

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 16
    }
});

const formatValue = (value, valueType = 'text') => {
    return {
        text: <Text style={styles.text}>{value}</Text>,
        currency: <CurrencyNumberFormat textStyle={styles.text} value={value} />
    }[valueType];
}

export default ({ data }) => {
    if (!Array.isArray(data)) return null;

    return data.map(({ text, value, valueType }, i) => (
        <View key={i} style={styles.view}>
            <Text style={styles.text}>{text}</Text>
            {formatValue(value, valueType)}
        </View>
    ));
}
