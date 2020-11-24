import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import { updateUserReservationStatus } from '../store/actions/locker';

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

class OpenScheduledLockerScreen extends Component {

    constructor(props) {
        super(props);
        const { action, id } = props.route.params;
        this.state = { action, id };
    }

    async onClick() {
        const { id } = this.state;
        await this.props.updateUserReservationStatus(id, ReserveStatusEnum.INUSE);
        this.setState({ action: 'close' });
    }

    onRenderClose() {
        return (
            <>
                <Text h4 style={styles.textCenter}>Parabéns, seu armário foi trancado!</Text>
                <Text h4 style={styles.textCenter}>Obrigado por usar nossos serviços.</Text>
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
        return (
            <>
                <Text
                    h4
                    style={{ ...styles.addressTitle, textAlign: 'center', marginTop: 50 }}>
                    Coloque seus objetos no armário e depois feche-o!
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

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, { updateUserReservationStatus })(OpenScheduledLockerScreen);