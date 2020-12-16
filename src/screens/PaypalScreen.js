import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

import { createPaymentPaypal } from '../store/actions/payment';
import LoadingComponent from '../components/LoadingComponent';

class PaypalScreen extends Component {

    state = { uri: '' }

    async componentDidMount() {
        const { reservation } = this.props.locker;
        const { price, size } = reservation;
        const transactions = [
            {
                item_list: {
                    items: [
                        {
                            name: "Armário " + size,
                            sku: "item",
                            price,
                            currency: "BRL",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "BRL",
                    total: price
                },
                description: "Alocação de armário"
            }
        ];

        await this.props.createPaymentPaypal(transactions);
        const { uri } = this.props.payment;
        this.setState({ uri });
    }

    handleResponse() {
        // direcionar ele para a tela de abrir o armário
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
        const { loading } = this.props.payment;

        if (loading) {
            return <LoadingComponent />;
        }

        return (
            <>
                {this.renderWebView()}
            </>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, { createPaymentPaypal })(PaypalScreen);
