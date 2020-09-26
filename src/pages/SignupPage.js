import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { signup } from '../store/actions/user';
import PopupComponent from '../components/PopupComponent';
import OAuth from '../model/OAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  },
  label: {
    color: 'black'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 50
  },
  error: {
    fontSize: 15,
    marginBottom: 10
  }
});

class SignupPage extends Component {

  state = {
    isVisible: false
  };

  async onSubmit() {
    const { signup } = this.props;
    const { name, email, password, repassword, cpf, born } = this.state;

    await signup({  name, email, password, repassword, cpf, born  });

    const { user } = this.props;

    if (user && !user.errors) {
      OAuth.token = user.token; 
      this.props.navigation.navigate('Home'); 
      return; 
    }

    const { errors } = user;
    if (errors && errors.signup && errors.signup.message) {
      this.setState({ isVisible: true });
    }
  }

  errorMessage(field) {
    const { errors } = this.props.user;
    if (!errors) return null;
    if (!errors.signup) return null;

    return errors.signup[field];
  }

  popupErroMessage() {
    return (<PopupComponent
      message={this.errorMessage('message')}
      isVisible={this.state.isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
      onPress={() => this.setState({ isVisible: false })}
    />);
  }

  datePicker() {
    if (!this.state.born) {
      this.setState({ born: moment().format('DD.MM.YYYY') });
    }

    return <DatePicker
      style={{ flex: 1 }}
      date={this.state.born}
      mode="date"
      placeholder="select date"
      format="DD.MM.YYYY"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      showIcon={false}
      customStyles={{
        dateInput: {
          borderWidth: 0
        }
      }}
      onDateChange={(born) => { this.setState({ born }) }}
  />
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Input
          testID="nome_input"
          errorMessage={this.errorMessage('name')}
          errorStyle={styles.error}
          placeholder='Insira seu nome'
          label="Nome"
          labelStyle={styles.label}
          onChangeText={(name) => this.setState({ name })} />
        <Input
          testID="email_input"
          errorMessage={this.errorMessage('email')}
          errorStyle={styles.error}
          placeholder='email@exemplo.com'
          label="Email"
          labelStyle={styles.label}
          onChangeText={(email) => this.setState({ email })} />
        <Input
          testID="cpf_input"
          errorMessage={this.errorMessage('cpf')}
          errorStyle={styles.error}
          placeholder='Insira seu cpf'
          label="Cpf"
          maxLength={11}
          keyboardType='numeric'
          labelStyle={styles.label}
          onChangeText={(cpf) => this.setState({ cpf })} />
        <Input
          testID="data_input"
          errorMessage={this.errorMessage('born')}
          errorStyle={styles.error}
          label="Data de nascimento"
          labelStyle={styles.label}
          InputComponent={this.datePicker.bind(this)} />
        <Input
          testID="senha_input"
          secureTextEntry
          errorMessage={this.errorMessage('password')}
          errorStyle={styles.error}
          placeholder='Insira a senha'
          label="Senha"
          labelStyle={styles.label}
          maxLength={15}
          onChangeText={(password) => this.setState({ password })} />
        <Input
          testID="confirma_senha_input"
          secureTextEntry
          errorMessage={this.errorMessage('repassword')}
          errorStyle={styles.error}
          placeholder='Confirme sua senha'
          label="Confirmar senha"
          labelStyle={styles.label}
          maxLength={15}
          onChangeText={(repassword) => this.setState({ repassword })} />
        <Button buttonStyle={styles.button} title="Cadastrar" onPress={() => { this.onSubmit() }} />
        {this.popupErroMessage()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { signup })(SignupPage);