import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';

import { updateReservationPrice, fetchReservationById, fetchLockerById } from '../store/actions/locker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    button: {
        width: 250
    },
    text: {
        marginTop: 50
    }
});

class FinishReserveScreen extends Component {

    async onPress() {
      
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Por favor, retire seus itens do armário e feche o mesmo em seguida.</Text>
                <Bottom>
                    <Button
                        center
                        title='Feito!'
                        buttonStyle={styles.button}
                        onPress={() => this.onPress()} />
                </Bottom>
            </View>
        )
    }
}


const mapStateToProps = (props) => {
    return props;
}
  
export default connect(mapStateToProps, { updateReservationPrice, fetchReservationById, fetchLockerById })(FinishReserveScreen);
