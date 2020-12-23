import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import { handleReservation, createReservation } from '../store/actions/locker';

import { Bottom } from '../components/PositionComponent';
import Button from '../components/ButtonComponent';
import ReserveStatusEnum from '../enum/ReserveStatusEnum';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    addressTitle: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '700'
    },
    lockerButtonStyle: {
        width: 80,
        marginTop: 30,
        backgroundColor: 'black'
    },
    textCenter: {
        textAlign: 'center'
    },
    buttonStyle: {
        width: 250
    }
});

class OpenLockerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { action: props.route.params.action };
    }

    componentDidMount() {
        const { reservation } = this.props.locker;
        reservation.price = 0;
        delete reservation.endDate;
        this.props.handleReservation(reservation);
    }

    async onClick() {
        const { reservation } = this.props.locker;
        reservation.startDate = new Date();
        reservation.status = ReserveStatusEnum.INUSE;
        await this.props.createReservation(reservation);
        this.setState({ action: 'close' });
    }

    onRenderClose() {
        return (
            <>
                <Text h4 style={styles.textCenter}>Parabéns, seu armário foi trancado</Text>
                <Text h4 style={{ ...styles.textCenter, marginTop: 200 }}>A contagem do tempo irá começar após 5 minutos.</Text>
                <Bottom>
                    <Button
                        center
                        title='Ok'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate('Home')} />
                </Bottom>
            </>
        )
    }

    onRenderOpen() {
        const { lockerGroup, reservation } = this.props.locker;
        const { address } = lockerGroup;
        return (
            <>
                <Text h4 style={styles.addressTitle}>{`${address.street}, ${address.number}`}</Text>
                <Text h4 style={styles.textCenter}>Armário selecionado</Text>
                <Button
                    center
                    title={reservation.number.toString()}
                    titleStyle={{ color: 'white' }}
                    buttonStyle={styles.lockerButtonStyle}
                />
                <Text
                    h4
                    style={{ ...styles.addressTitle, textAlign: 'center', marginTop: 50 }}>
                    Coloque seus objetos no armário número {reservation.number} e depois feche-o!
                </Text>
                <Bottom>
                    <Button
                        center
                        title='Já coloquei'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => this.onClick()} />
                </Bottom>
            </>
        );
    }

    render() {
        const { action } = this.state;
        return (
            <View style={styles.container}>
                { action === 'open' ? this.onRenderOpen() : this.onRenderClose()}
            </View>
        )
    }
}

const mapStateToProps = ({ locker }) => {
    return { locker };
}

export default connect(mapStateToProps, { handleReservation, createReservation })(OpenLockerScreen);