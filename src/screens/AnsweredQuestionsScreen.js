import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import AccordionComponent from '../components/AccordionComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24
    },
    text: {
        textAlign: 'justify',
        fontSize: 16
    }
});

export default class AnsweredQuestionsScreen extends Component { 

    sections = [
        {
            title: 'O que é o LockHere?',
            content: <Text style={styles.text}>É um serviço para aluguel de armários.</Text>
        },
        {
            title: 'Como funciona o aluguel de um armário?',
            content: <Text style={styles.text}>Após colocar os items dentro do armário, 
                a contagem se inicia automaticamente apartir do fechamento do armário e você só sera cobrado pelo tempo que usar.</Text>
        },
        {
            title: 'Como funciona a reserva de um armário?',
            content: <Text style={styles.text}>É possível reservar um armário por um determinado periodo de tempo,
                o pagamento é realizado no momento da reserva e o calculo é feito em cima da quantidade de minutos alocados.</Text>
        },
        {
            title: 'Como funciona o cancelamento de uma reserva?',
            content: <Text style={styles.text}>Só é possível cancelar uma reservar antes de seu inicio, o valor da reserva é reembolsado integralmente</Text>
        },
        {
            title: 'Como é calculado o valor do tempo de uso?',
            content: <Text style={styles.text}>O valor do tempo de uso é calculado pela quantidade de minutos usados, por exemplo, 
                se o tempo de uso foi de 1 hora e 30 minutos (90 minutos), e o valor hora deste armário é de R$ 7,00, então a formula é
                (90 / 60) * 7 onde 90 minutos de uso, 60 minutos que é a quantidade de minutos hora e o valor hora do armário, então o valor 
                a ser pago é de R$ 10,50.
            </Text>
        }
    ];


    render() {
        return (
            <View style={styles.container}>
                <AccordionComponent
                    sections={this.sections}
                />
            </View>
        );
    }
}