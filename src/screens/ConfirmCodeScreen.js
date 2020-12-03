import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Yup from "yup";

import Button from '../components/ButtonComponent';
import Form from '../components/FormComponent';
import Input from '../components/InputComponent';
import { code } from '../validators/UserConstraints';
import { updateEmail } from '../store/actions/user';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text: {
        alignSelf: 'center',
        fontSize: 24
    },
    input: {
        textAlign: 'center'
    },
    inputContainer: {
        width: 200, 
        alignSelf: 'center'
    }
});

const codeSchema = Yup.object().shape({ code });

class ConfirmCodeScreen extends Component {
  
  async onSubmit(values) {
    const { value, mode } = this.props.route.params;
    const { code } = values;

    if (mode === 'email') await this.props.updateEmail(value, code);

    this.props.navigation.navigate('Home');
  }

  renderCodeForm(props) {
    const { handleSubmit, errors } = props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Insira o código enviado no email</Text>
        <Input
            placeholder='Insira o código'
            keyboardType='numeric'
            errorMessage={errors.code}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            maxLength={6}
            onChangeText={text => props.setFieldValue('code', text)}
        />
        <Button 
            title='Confirmar'
            onPress={handleSubmit}
        />
      </View>
    )
  }

  render() {
    return (
      <Form
        initialValues={{ code: '' }}
        validationSchema={codeSchema}
        onSubmit={this.onSubmit.bind(this)}
        formComponent={this.renderCodeForm.bind(this)} />
    );
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { updateEmail })(ConfirmCodeScreen);