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

class ResumeScheduleLockerScreen extends Component {

    componentDidMount() {
        const { reservation } = this.props.locker;
        this.props.updateReservationPrice(reservation);
    }

    renderList() {
        const { reservation } = this.props.locker;
        const { hour_price, price } = reservation;
        const data = [
            { text: 'Valor por hora', value: hour_price, valueType: 'currency' },
            { text: 'Total', value: price, valueType: 'currency' }
        ];

        return <SimpleListComponent data={data} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Resumo do agendamento</Text>
                <View style={styles.viewList}>
                    {this.renderList()}
                </View>
                <Bottom>
                    <Button center buttonStyle={{ width: 250 }} title='Pagar' />
                </Bottom>
            </View>
        );
    }
}

const mapStateToProps = ({ locker }) => {
    return { locker };
}

export default connect(mapStateToProps, { updateReservationPrice })(ResumeScheduleLockerScreen);