import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';

class LockersPage extends Component {

  render() {
    
    return (
    <Text>funciono {this.props.route.params.id}</Text>
    );
  }

}

const mapStateToProps = (props) => {
    return props;
  }
  
export default connect(mapStateToProps, {  })(LockersPage);
