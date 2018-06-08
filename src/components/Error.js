import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import { TextLine } from './common';
import { WHITE } from '../../assets/colors';
import { clearError } from '../actions';

class Error extends Component {
  componentDidUpdate() {
    if (this.props.error !== '') {
      setTimeout(() => this.props.clearError(), 3000);
    }
  }

  render() {
    if (this.props.error) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.props.clearError()}>
            <View style={styles.errorContainer}>
              <TextLine type="PTregular" color={WHITE} size={18} style={{ textAlign: 'center' }}>
                {this.props.error}
              </TextLine>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#d00',
    borderTopWidth: 2,
    borderColor: '#b00'
  }
});

const mapStateToProps = state => {
  return {
    error: state.errors.error
  };
};

export default connect(
  mapStateToProps,
  { clearError }
)(Error);
