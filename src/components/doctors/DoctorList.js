import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DoctorDetail from './DoctorDetail';

export default class DoctorList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.doctors}
        keyExtractor={item => item._id}
        initialNumToRender={1}
        renderItem={({ item }) => <DoctorDetail navigation={this.props.navigation} doctor={item} />}
      />
    );
  }
}

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired
};
