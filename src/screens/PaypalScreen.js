import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

import { createPaymentPaypal, updatePaymentTransactionReservationId } from '../store/actions/payment';
import { finishReservation, createReservation } from '../store/actions/reserve';
import LoadingComponent from '../components/LoadingComponent';
import ReserveStatusEnum from '../enum/ReserveStatusEnum';

import 'url-search-params-polyfill';

class PaypalScreen extends Component {

    state = { uri: '' }

    async componentDidMount() {
        const { reservation } = this.props.reserve;
        const { price, size } = reservation;

        const transactions = {
            transactions: [
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
            ]
        };

        await this.props.createPaymentPaypal(transactions);
        const { uri } = this.props.payment;
        this.setState({ uri });
    }

    async handleResponse(data) {
        const urlParams = new URLSearchParams(data.url);
        const success = urlParams.get('success');
        const paymentTransactionId = urlParams.get('paymentTransactionId');

        if (!success) return;
        console.log('reserva ', this.props.reserve.reservation)
        if (this.props.reserve.reservation.status === ReserveStatusEnum.SCHEDULED) {
            await this.props.createReservation(this.props.reserve.reservation);
            await this.props.updatePaymentTransactionReservationId(paymentTransactionId, this.props.reserve.reservation._id);
            this.props.navigation.navigate('SuccessScreen', { title: 'Obrigado por utilizar nossos serviços' });
        } else {
            const { reservation } = this.props.reserve;
            await this.props.finishReservation(reservation._id, reservation.price);
            this.props.navigation.navigate('FinishReserveScreen');
        }
    }

    renderWebView() {
        const { uri } = this.state;

        if (!uri) return null;

        return <WebView
            source={{ uri }}
            onNavigationStateChange={data => this.handleResponse(data)}
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

export default connect(mapStateToProps, { createPaymentPaypal, finishReservation, createReservation, updatePaymentTransactionReservationId })(PaypalScreen);
