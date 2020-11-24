import moment from 'moment';

const DATE_PATTERN = 'DD.MM.YYYY HH:mm';

export const diff = (startDate, endDate, unitOfTime) => {
    const startDateAux = moment(startDate, DATE_PATTERN);
    const endDateAux = moment(endDate, DATE_PATTERN);
    console.log(startDate, endDate)
    return endDateAux.diff(startDateAux, unitOfTime);
}

export const formatBrDateWithTime = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
}
