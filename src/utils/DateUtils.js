import moment from 'moment';

const DATE_PATTERN = 'YYYY-MM-DD HH:mm';

export const diff = (startDate, endDate, unitOfTime) => {
    const startDateAux = moment(startDate, DATE_PATTERN);
    const endDateAux = moment(endDate, DATE_PATTERN);
    console.log(startDate, endDate)
    return endDateAux.diff(startDateAux, unitOfTime);
}

export const formatBrDateWithTime = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
}

export const formatBrToUsWithTime = (date) => {
    return moment(date, 'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm');
}

export const formatBrToUs = (date) => {
    return moment(date, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
}

export const formatUsToBr = (date) => {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
}
