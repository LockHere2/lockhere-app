import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';

import { handleReservation } from '../store/actions/locker';

import { Bottom } from '../components/PositionComponent';
import DatePicker from '../components/DatePickerComponent';
import Button from '../components/ButtonComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    label: {
        color: 'black'
    },
    button: {
        width: 250,
        alignSelf: 'center'
    },
    text: {
        textAlign: 'center'
    },
    inputView: {
        marginTop: '40%'
    }
})

class ScheduleLockerScreen extends Component {
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
                    <Button title='Proximo' buttonStyle={styles.button} />
                </Bottom>
            </View>
        )
    }
}

const mapStateToProps = ({ locker, handleReservation }) => {
    return { locker, handleReservation };
}

export default connect(mapStateToProps, { handleReservation })(ScheduleLockerScreen);