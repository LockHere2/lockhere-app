import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Accessory, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Yup from "yup";

import { updatePassword } from '../store/actions/user';
import AccordionComponent from '../components/AccordionComponent';
import Button from '../components/ButtonComponent';
import Input from '../components/InputComponent';
import Form from '../components/FormComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 40
    },
    center: {
        alignSelf: 'center'
    }
});

const passwordConstraint = Yup.string().min(6, 'Minimo 6 caracteres').required('Insira a senha');
const passwordSchema = Yup.object().shape({
    password: passwordConstraint,
    repassword: passwordConstraint
});

class UpdateProfileScreen extends Component {

    sections = [
        {
            title: 'Senha',
            content: <Form 
                initialValues={{ password: '', repassword: '' }} 
                validationSchema={passwordSchema}
                onSubmit={this.onUpdatePassword}
                validate={({ password, repassword }) => {
                    const errors = {};
                    if (password !== repassword) {
                        errors.message = 'Senhas não condizem';
                    }

                    return errors;
                }} 
                formComponent={this.renderPasswordForm} />,
        },
        {
            title: 'Email',
            content: this.renderEmailForm(),
        },
    ];

    onUpdatePassword(values) {
        console.log('no values', values)
    }

    renderPasswordForm(props) {
        const { handleSubmit, errors } = props;
        console.log(props)

        return (
            <View>
                <Input
                    testID="profile_password_input"
                    secureTextEntry
                    maxLength={10}
                    errorProps={{ testID: 'profile_password_error' }}
                    errorMessage={errors.password}
                    placeholder='Insira sua senha'
                    label="Senha"
                    onChangeText={text => props.setFieldValue('password', text)} />
                <Input
                    testID="profile_repassword_input"
                    secureTextEntry
                    maxLength={10}
                    errorProps={{ testID: 'profile_repassword_error' }}
                    errorMessage={errors.repassword}
                    placeholder='Repetir senha'
                    label="Repetir senha"
                    onChangeText={text => props.setFieldValue('repassword', text)} />
                <Button 
                    title='Salvar'
                    onPress={handleSubmit} />
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
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.center}
                    source={{ uri: 'https://i.pinimg.com/originals/b0/fe/79/b0fe7968d609e092852ab455c2e7f116.jpg' }}>
                    <Accessory size={25} name='camera-alt' />
                </Avatar>
                <Text h4 style={styles.center}>Atualizar</Text>
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

export default connect(mapStateToProps, { updatePassword })(UpdateProfileScreen);
