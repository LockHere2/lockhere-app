import Validator from './Validator';
import { diff } from '../utils/DateUtils';

export default class LockerValidator {

    static MIN_TIME_RESERVATION = 60;

    static isReservationDateValid(startDate, endDate) {
        if (!startDate) {
            return new Validator({ message: 'Favor selecionar a data de inicio' });
        }

        if (!endDate) {
            return new Validator({ message: 'Favor selecionar a data de termino' });
        }

        const minutes = diff(startDate, endDate, 'minutes');
        
        if (minutes <= 0) {
            return new Validator({ message: 'Data de inicio não pode ser maior ou igual a data de termino' }); 
        }

        if (minutes < this.MIN_TIME_RESERVATION) {
            return new Validator({ message: 'O tempo minimo de alocação deve ser de 1 hora' });
        }

        return new Validator({});
    }
}