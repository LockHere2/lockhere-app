import React from 'react';
import { Text } from 'react-native-elements';
import NumberFormat from 'react-number-format';

export default ({ value, textStyle }) => {
    return <NumberFormat 
                decimalScale={2} 
                fixedDecimalScale 
                value={value} 
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'R$ '} 
                renderText={value => <Text style={textStyle}>{value}</Text>} />
}