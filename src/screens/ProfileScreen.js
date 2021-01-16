import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import Button from '../components/ButtonComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        flexDirection: 'column'
    },
    buttonStyle: {
        width: 150,
        height: 150,
        flexDirection: 'column'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    avatarView: {
        marginBottom: 50, 
        marginTop: 20, 
        flexDirection: 'column', 
        alignSelf: 'center', 
        alignItems: 'center'
    },
    avatarName: {
        marginLeft: 10, 
        marginTop: 20
    }
});

class ProfileScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.avatarView}>
                    <Avatar 
                        size="large" 
                        rounded
                        source={{ uri: 'https://i.pinimg.com/originals/b0/fe/79/b0fe7968d609e092852ab455c2e7f116.jpg' }} />
                    <Text h4 style={styles.avatarName}>Mateus Renato</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title='Meios de pagamento'
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: "credit-card",
                            size: 30,
                            color: "white"
                        }}
                        onPress={() => this.props.navigation.navigate('PaypalScreen')}
                    />
                    <Button
                        title='Dúvidas frequentes'
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: "question",
                            size: 30,
                            color: "white"
                        }}
                        onPress={() => this.props.navigation.navigate('AnsweredQuestionsScreen')}
                    />
                </View>
                <View style={{ ...styles.buttonView, marginTop: 20 }}>
                    <Button
                        title='Editar perfil'
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: "edit",
                            size: 30,
                            color: "white"
                        }}
                        onPress={() => this.props.navigation.navigate('UpdateProfileScreen')}
                    />
                    <Button
                        title='Sair'
                        buttonStyle={styles.buttonStyle}
                        icon={{
                            name: "arrow-forward",
                            size: 30,
                            color: "white"
                        }}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, {})(ProfileScreen);
