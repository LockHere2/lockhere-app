import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import { Bottom } from '../components/PositionComponent';
import Button from '../components/ButtonComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    }
});

class OpenLockerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { action: props.route.params.action };
    }

    onRenderClose() {
        return (
            <>
                <Text h4>Parabéns, seu armário foi trancado</Text>
                <Text h4>A contagem do tempo irá começar após 5 minutos.</Text>
            </>
        )
    }

    onRenderOpen() {
        return (
            <>
                <Text>Aqui</Text>
                <Bottom>
                    <Button center title='Já coloquei' onPress={() => this.setState({ action: 'close' })} />
                </Bottom>
            </>
        );
    }

    render() {
        const { action } = this.state;
        return (
            <View style={styles.container}>
                { action === 'open' ? this.onRenderOpen() : this.onRenderClose() }
            </View>
        )
    }
}

const mapStateToProps = ({ locker }) => {
    return { locker };
}

export default connect(mapStateToProps, {})(OpenLockerScreen);