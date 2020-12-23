import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import paymentEnum from '../enum/PaymentEnum';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    button: {
        width: 250
    },
    text: {
        marginTop: 50,
        marginBottom: 50
    }
});

class PaymentScreen extends Component {

    onPayment(payment) {
        if (payment === paymentEnum.PAYPAL) this.props.navigation.navigate('PaypalScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h4 style={styles.text}>Escolha sua forma de pagamento</Text>
                <ListItem 
                    bottomDivider
                    onPress={() => this.onPayment(paymentEnum.PAYPAL)}
                >
                    <Avatar source={require('../../assets/paypal.jpg')} />
                    <ListItem.Content>
                    <ListItem.Title>Paypal</ListItem.Title>
                    {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}
  
export default connect(mapStateToProps, { })(PaymentScreen);
