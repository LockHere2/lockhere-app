import * as Yup from "yup";
import moment from 'moment';

export const name =  Yup.string().required('Insira o nome').min(3, 'Minimo 3 caracteres');
export const email = Yup.string().required('Insira o email').email('Email inválido');
export const cpf = Yup.string().required('Insira o cpf').matches(/^\d{11}$/, 'cpf inváldo');
export const born = Yup.string().required('Insira a data').test('is-date-valid', 'Data invalida', (value) => moment(value, 'DD/MM/YYYY').isValid());
export const password = Yup.string().required('Insira a senha').min(6, 'Minimo 6 caracteres');
export const code = Yup.string().min(6, 'Minimo 6 numeros');
