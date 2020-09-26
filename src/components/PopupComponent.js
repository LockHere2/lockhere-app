import React from 'react';
import { View } from 'react-native';
import { Button, Text, Overlay, Divider } from 'react-native-elements';

export default ({ isVisible = false, message, onBackdropPress = () => { }, onPress = () => { } }) => {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <View style={{ padding: 5 }}>
                <Text style={{ fontSize: 18 }} >{message}</Text>
                <Divider style={{ margin: 10 }} />
                <Button buttonStyle={{ backgroundColor: 'black', height: 30 }} title="OK" onPress={onPress} />
            </View>
        </Overlay>
    )
}