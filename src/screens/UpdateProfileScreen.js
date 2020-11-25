import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import AccordionComponent from '../components/AccordionComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    }
});

class UpdateProfileScreen extends Component {

    state = {
        email: ''
    }

    sections = [
        {
            title: 'Senha',
            content: this.renderPasswordForm(),
        },
        {
            title: 'Email',
            content: this.renderEmailForm(),
        },
    ];

    renderPasswordForm() {
        return (
            <View>
                <Input
                    testID="profile_password_input"
                    secureTextEntry
                    errorProps={{ testID: 'profile_password_error' }}
                    //errorMessage={this.errorMessage('name')}
                    //errorStyle={styles.error}
                    placeholder='Insira sua senha'
                    label="Senha"
                    //labelStyle={styles.label}
                    onChangeText={(password) => this.setState({ password })} />
            </View>
        );
    }

    renderEmailForm() {
        return (
            <View>
                <Input
                    testID="profile_email_input"
                    errorProps={{ testID: 'profile_email_error' }}
                    //errorMessage={this.errorMessage('name')}
                    //errorStyle={styles.error}
                    placeholder='Insira seu email'
                    label="Email"
                    //labelStyle={styles.label}
                    onChangeText={(email) => this.setState({ email })} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <AccordionComponent 
                    sections={this.sections}
                />
            </View>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, {})(UpdateProfileScreen);
