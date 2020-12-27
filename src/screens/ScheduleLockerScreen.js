import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';

import { updateReservationPrice } from '../store/actions/locker';
import { formatBrToUsWithTime } from '../utils/DateUtils';
import ReservationValidator from '../validators/ReservationValidator';
import ReserveStatusEnum from '../enum/ReserveStatusEnum';

import { Bottom } from '../components/PositionComponent';
import DatePicker from '../components/DatePickerComponent';
import Button from '../components/ButtonComponent';
import PopupComponent from '../components/PopupComponent';
import Form from '../components/FormComponent';

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

    onPress(values) {
        const { reservation } = this.props.locker;
        const { startDate, endDate } = values;

        const { isValid, errors } = ReservationValidator.isReservationDateValid(startDate, endDate);

        if (isValid) {
            reservation.start_date = formatBrToUsWithTime(startDate);
            reservation.end_date = formatBrToUsWithTime(endDate);
            reservation.status = ReserveStatusEnum.SCHEDULED;
            this.props.updateReservationPrice(reservation);
            const data = [
                { text: 'Valor por hora', value: reservation.hour_price, valueType: 'currency' },
                { text: 'Total', value: reservation.price, valueType: 'currency' }
            ];
            this.props.navigation.navigate('ResumePaymentScreen', { title: 'Resumo do agendamento', data });
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

    datePicker(props, field) {
        const { values } = props;
        return <DatePicker
                date={values[field]}
                mode='datetime'
                format='DD/MM/YYYY HH:mm'
                onDateChange={(date) => props.setFieldValue(field, date)} 
            />;
    }

    renderForm(props) {
        const { handleSubmit, touched, errors } = props;

        return (
            <View style={styles.container}>
                {this.popupErroMessage()}
                <Text h4 style={styles.text}>Agende seu horario!</Text>
                <View style={styles.inputView}>
                    <Input
                        label='Inicio'
                        labelStyle={styles.label}
                        testID='data_input_start'
                        errorMessage={touched.startDate && errors.startDate}
                        onBlur={() => props.setFieldTouched('startDate', true)}
                        InputComponent={() => this.datePicker(props, 'startDate')} />

                    <Input
                        label='Termino'
                        labelStyle={styles.label}
                        testID='data_input_end'
                        errorMessage={touched.endDate && errors.endDate}
                        onBlur={() => props.setFieldTouched('endDate', true)}
                        InputComponent={() => this.datePicker(props, 'endDate')} />
                </View>
                <Bottom>
                    <Button center title='Proximo' buttonStyle={styles.button} onPress={handleSubmit} />
                </Bottom>
            </View>
        );
    }

    render() {
        return (
            <Form
                initialValues={{ startDate: '', endDate: '' }}
                onSubmit={this.onPress.bind(this)}
                formComponent={this.renderForm.bind(this)}
            />
        )
    }
}

const mapStateToProps = ({ locker, handleReservation }) => {
    return { locker, handleReservation };
}

export default connect(mapStateToProps, { updateReservationPrice })(ScheduleLockerScreen);