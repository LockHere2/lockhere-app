import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';

import { handleReservation } from '../store/actions/locker';
import LockerValidator from '../validators/LockerValidator';

import { Bottom } from '../components/PositionComponent';
import DatePicker from '../components/DatePickerComponent';
import Button from '../components/ButtonComponent';
import PopupComponent from '../components/PopupComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    label: {
        color: 'black'
    },
    button: {
        width: 250
    },
    text: {
        textAlign: 'center'
    },
    inputView: {
        marginTop: '40%'
    }
})

class ScheduleLockerScreen extends Component {

    state = {
        errorMessage: '',
        isVisible: false
    }

    onPress() {
        const { reservation } = this.props.locker;
        const { startDate, endDate } = reservation;

        const { isValid, errors } = LockerValidator.isReservationDateValid(startDate, endDate);

        if (isValid) {
            this.props.navigation.navigate('ResumeScheduleLockerScreen');
        } else {
            this.setState({ errorMessage: errors.message, isVisible: true });
        }
    }

    popupErroMessage() {
        const { errorMessage, isVisible } = this.state;

        return (<PopupComponent
            message={errorMessage}
            isVisible={isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            onPress={() => this.setState({ isVisible: false })}
        />);
    }

    datePicker({ field }) {
        const { reservation } = this.props.locker;

        return <DatePicker
            date={reservation[field]}
            mode='datetime'
            format='DD.MM.YYYY HH:mm'
            onDateChange={(date) => {
                reservation[field] = date;
                this.props.handleReservation(reservation);
            }} />;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.popupErroMessage()}
                <Text h4 style={styles.text}>Agende seu horario!</Text>
                <View style={styles.inputView}>
                    <Input
                        label='Inicio'
                        labelStyle={styles.label}
                        testID="data_input_start"
                        field='startDate'
                        InputComponent={this.datePicker.bind(this)} />

                    <Input
                        label='Termino'
                        labelStyle={styles.label}
                        testID="data_input_end"
                        field='endDate'
                        InputComponent={this.datePicker.bind(this)} />
                </View>
                <Bottom>
                    <Button center title='Proximo' buttonStyle={styles.button} onPress={() => this.onPress()} />
                </Bottom>
            </View>
        )
    }
}

const mapStateToProps = ({ locker, handleReservation }) => {
    return { locker, handleReservation };
}

export default connect(mapStateToProps, { handleReservation })(ScheduleLockerScreen);