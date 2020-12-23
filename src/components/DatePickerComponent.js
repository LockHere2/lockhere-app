import React from 'react';
import DatePicker from 'react-native-datepicker';

export default ({ date, mode='date', format = 'DD.MM.YYYY', onDateChange }) => {
    return <DatePicker
        style={{ flex: 1 }}
        date={date}
        mode={mode}
        placeholder="Selecione a data"
        format={format}
        confirmBtnText="Ok"
        cancelBtnText="Cancelar"
        showIcon={false}
        customStyles={{
            dateText: { textAlign: 'center' },
            datePicker: {
                alignItems: 'center',
                
            },
            dateInput: {
                borderWidth: 0
            }
        }}
        onDateChange={onDateChange}
    />
}