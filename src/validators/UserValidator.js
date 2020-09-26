import Validator from './Validator';
import moment from 'moment';

export default class UserValidator {
    static EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static CPF_REGEXP = /^\d{11}$/;
    static PASSWORD_MIN_LENGTH = 6;
    static PASSWORD_MAX_LENGTH = 15;

    static isValidEmail(email) {
        return this.EMAIL_REGEXP.test(email);
    }

    static isValidPassword(password) {
        if (!password) return false;
        password = password.trim();

        return password 
        && password.length >= this.PASSWORD_MIN_LENGTH 
        && password.length <= this.PASSWORD_MAX_LENGTH;
    }

    static login(user = { email, password, repassword }) {
        const errors = {};

        if (!this.isValidEmail(user.email)) {
            errors.email = 'Email inválido';
        }

        if (!this.isValidPassword(user.password)) {
            errors.password = 'A senha deve ter entre 6 a 15 caracteres';
        }

        return new Validator(errors);
    }

    static signup(user = { name, email, password, repassword, cpf, born }) {
        const errors = this.login(user).errors;

        if (user.password !== user.repassword) {
            errors.repassword = 'As senhas não condizem';
        }

        if (!user.name || !user.name.length) {
            errors.name = 'Nome inválido';
        }

        if (!this.CPF_REGEXP.test(user.cpf)) {
            errors.cpf = 'Cpf inválido';
        }

        if (!moment(user.born, 'DD.MM.YYYY').isValid()) {
            errors.born = 'Data de nascimento inválida';
        }

        return new Validator(errors);
    }
}

