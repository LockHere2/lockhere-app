import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';

import Button from '../components/ButtonComponent';
import { Bottom } from '../components/PositionComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    button: {
        width: 250
    },
    text: {
        marginTop: 50
    }
});

class PaymentScreen extends Component {

    state = {
        payment: 'paypal'
    }

    render() {
        const { payment } = this.state;
        // clicar direto no botão de pagamento
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Escolha sua forma de pagamento</Text>
                <CheckBox
                    center
                    title='Paypal'
                    checkedIcon={<Image source={{ uri: '../../assets/paypal.jpg' }} />}
                    //checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={payment === 'paypal'}
                    onPress={() => this.setState({ payment: 'paypal' })}
                />
                <Bottom>
                    <Button
                        center
                        title='Realizar pagamento'
                        buttonStyle={styles.button}
                        onPress={() => this.props.navigation.navigate('Home')} />
                </Bottom>
            </View>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}
  
export default connect(mapStateToProps, { })(PaymentScreen);
