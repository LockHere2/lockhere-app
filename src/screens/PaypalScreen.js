import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

import { createPaymentPaypal } from '../store/actions/payment';
import Button from '../components/ButtonComponent';

class PaypalScreen extends Component {

    state = { uri: '' }

    async checkout() {
        const { transactions } = this.props.route.params;
        /*const transactions = [
            {
                "item_list": {
                    "items": [
                        {
                            "name": "Armário grande",
                            "sku": "item",
                            "price": "2.00",
                            "currency": "BRL",
                            "quantity": 1
                        }
                    ]
                },
                "amount": {
                    "currency": "BRL",
                    "total": "2.00"
                },
                "description": "This is the payment description."
            }
        ]*/


        await this.props.createPaymentPaypal(transactions);
        const { uri } = this.props.payment;
        console.log(uri)
        this.setState({ uri });
    }

    renderWebView() {
        const { uri } = this.state;

        if (!uri) return null;

        return <WebView
            source={{ uri }}
            //onNavigationStateChange={data =>
                // this.handleResponse(data)
            //}
        />
    }

    render() {
        return (
            <>
                <Button title='paypal' onPress={() => this.checkout()} />
                {this.renderWebView()}
            </>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, { createPaymentPaypal })(PaypalScreen);
