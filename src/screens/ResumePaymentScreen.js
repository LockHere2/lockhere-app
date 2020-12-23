import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';

import { updateReservationPrice } from '../store/actions/locker';

import SimpleListComponent from '../components/SimpleListComponent';
import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    text: {
        textAlign: 'center'
    },
    viewList: {
        flex: 1,
        justifyContent: 'center'
    }
})

class ResumePaymentScreen extends Component {

    render() {
        const { title, data } = this.props.route.params;

        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>{title}</Text>
                <View style={styles.viewList}>
                    <SimpleListComponent data={data} />
                </View>
                <Bottom>
                    <Button 
                        center 
                        buttonStyle={{ width: 250 }} title='Pagar'
                        onPress={() => this.props.navigation.navigate('PaymentScreen')} />
                </Bottom>
            </View>
        );
    }
}

const mapStateToProps = ({ locker }) => {
    return { locker };
}

export default connect(mapStateToProps, { updateReservationPrice })(ResumePaymentScreen);