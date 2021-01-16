import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Accessory, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import * as Yup from "yup";

import { updatePassword, updateBaseInfo, sendConfirmCode, profile } from '../store/actions/user';
import AccordionComponent from '../components/AccordionComponent';
import Button from '../components/ButtonComponent';
import Input from '../components/InputComponent';
import Form from '../components/FormComponent';
import PopupComponent from '../components/PopupComponent';
import LoadingComponent from '../components/LoadingComponent';
import { name, cpf, born, password, email } from '../validators/UserConstraints';
import { formatUsToBr } from '../utils/DateUtils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    center: {
        alignSelf: 'center'
    },
    errorMessage: {
        color: 'red',
        fontSize: 16
    },
    accordion: {
        marginTop: 20
    }
});

const baseInfoSchema = Yup.object().shape({ name, cpf, born });
const passwordSchema = Yup.object().shape({ password, repassword: password });
const emailSchema = Yup.object().shape({ email, remail: email });

class UpdateProfileScreen extends Component {

    state = {
        isLoading: false,
        success: false
    }

    sections = [];

    componentDidMount() {
        this.props.profile();
    }

    onLoadForms() {
        this.sections = [
            {
                title: 'Informações basicas',
                content: this.baseInfoForm()
            },
            {
                title: 'Senha',
                content: this.passwordForm()
            },
            {
                title: 'Email',
                content: this.emailForm()
            }
        ];
    }

    onProfileImage() {
        const { profile } = this.props.user;
        return profile.image ? { uri: profile.image } : require('../../assets/no-image.jpg')
    }

    async onProcess(cb) {
        this.setState({ isLoading: true });
        await cb();
        const { success } = this.props.user;
        this.setState({ isLoading: false, success });
    }

    onUpdateBaseInfo(values) {
        this.onProcess(() => this.props.updateBaseInfo(values));
    }

    async onUpdateEmail(values) {
        const { sendConfirmCode } = this.props;

        await sendConfirmCode('change_email');

        const { success } = this.props.user;

        if (success) this.props.navigation.navigate('ConfirmCodeScreen', { value: values.email, mode: 'email' });
    }

    onUpdatePassword(values) {
        const { password, repassword } = values;
        this.onProcess(() => this.props.updatePassword(password, repassword));
    }

    renderPopup() {
        return <PopupComponent
            message="Sucesso"
            isVisible={this.state.success}
            onBackdropPress={() => this.setState({ success: false })}
            onPress={() => this.setState({ success: false })}
        />
    }

    baseInfoForm() {
        const { profile } = this.props.user;
        if (!profile) return null;

        const initialValues = { name: profile.name || '', cpf: profile.cpf || '', born: formatUsToBr(profile.born) || '' };

        return <Form 
            initialValues={initialValues} 
            validationSchema={baseInfoSchema}
            onSubmit={this.onUpdateBaseInfo.bind(this)}
            formComponent={this.renderBaseInfoForm.bind(this)} />
    }

    passwordForm() {
        return <Form 
            initialValues={{ password: '', repassword: '' }} 
            validationSchema={passwordSchema}
            onSubmit={this.onUpdatePassword.bind(this)}
            validate={({ password, repassword }) => {
                const errors = {};
                if (password !== repassword) {
                    errors.message = 'Senhas não condizem';
                }

                return errors;
            }} 
            formComponent={this.renderPasswordForm.bind(this)} />
    }

    emailForm() {
        return <Form 
            initialValues={{ email: '', remail: '' }} 
            validationSchema={emailSchema}
            onSubmit={this.onUpdateEmail.bind(this)}
            validate={({ email, remail }) => {
                const errors = {};
                if (email !== remail) {
                    errors.message = 'Emails não condizem';
                }

                return errors;
            }} 
            formComponent={this.renderEmailForm.bind(this)} />
    }

    renderBaseInfoForm(props) {
        const { isLoading } = this.state;
        const { handleSubmit, values, errors } = props;

        return (
            <View>
                <Input
                    testID="profile_name_input"
                    errorProps={{ testID: 'profile_name_error' }}
                    errorMessage={errors.name}
                    placeholder='Insira seu nome'
                    label="Nome"
                    value={values.name}
                    onChangeText={text => props.setFieldValue('name', text)} />
                <Input
                    testID="profile_cpf_input"
                    keyboardType='numeric'
                    maxLength={11}
                    errorProps={{ testID: 'profile_cpf_error' }}
                    errorMessage={errors.cpf}
                    placeholder='Insira seu cpf'
                    label="Cpf"
                    value={values.cpf}
                    onChangeText={text => props.setFieldValue('cpf', text)} />
                <TextInputMask
                    testID="profile_date_input"
                    type={'datetime'}
                    customTextInput={Input}
                    customTextInputProps={{
                        testID: "profile_date_input",
                        placeholder: 'Insira sua data de nascimento',
                        errorProps: { testID: 'profile_date_error' },
                        errorMessage: errors.born,
                        label: 'Data de nascimento'
                    }}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    value={values.born}
                    onChangeText={text => props.setFieldValue('born', text)} />
                <Button 
                    title='Salvar'
                    loading={isLoading}
                    onPress={handleSubmit} />
            </View>
        );
    }

    renderPasswordForm(props) {
        const { isLoading } = this.state;
        const { handleSubmit, errors } = props;

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
                <Text style={styles.errorMessage}>{errors.message}</Text>
                <Button 
                    title='Salvar'
                    loading={isLoading}
                    onPress={handleSubmit} />
            </View>
        );
    }

    renderEmailForm(props) {
        const { isLoading } = this.state;
        const { handleSubmit, errors } = props;

        return (
            <View>
                <Input
                    testID="profile_email_input"
                    errorProps={{ testID: 'profile_email_error' }}
                    errorMessage={errors.email}
                    placeholder='Insira seu novo email'
                    label="Novo email"
                    onChangeText={text => props.setFieldValue('email', text)} />
                <Input
                    testID="profile_remail_input"
                    errorProps={{ testID: 'profile_remail_error' }}
                    errorMessage={errors.remail}
                    placeholder='Repita o novo email'
                    label="Repetir novo email"
                    onChangeText={text => props.setFieldValue('remail', text)} />
                <Text style={styles.errorMessage}>{errors.message}</Text>
                <Button 
                    title='Salvar'
                    loading={isLoading}
                    onPress={handleSubmit} />
            </View>
        );
    }

    render() {
        const { loading } = this.props.user;

        if (loading) {
            return <LoadingComponent />
        }
        
        this.onLoadForms();

        return (
            <View style={styles.container}>
                {this.renderPopup()}
                <Avatar
                    size="large"
                    rounded
                    imageProps={{ transition: false }}
                    containerStyle={styles.center}
                    source={this.onProfileImage()}>
                    <Accessory size={25} name='camera-alt' />
                </Avatar>
                <AccordionComponent
                    containerStyle={styles.accordion}
                    sections={this.sections}
                />
            </View>
        )
    }
}

const mapStateToProps = (props) => {
    return props;
}

export default connect(mapStateToProps, { updatePassword, updateBaseInfo, sendConfirmCode, profile })(UpdateProfileScreen);
