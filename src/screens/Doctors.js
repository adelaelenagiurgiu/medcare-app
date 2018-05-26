import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { ArrowBack } from '../components/common';
import { GREY, TURQUOISE, WHITE } from '../../assets/colors';
import DoctorList from '../components/doctors/DoctorList';

class Doctors extends Component {
  constructor(props) {
    super(props);

    this.sectionName = this.props.navigation.getParam('name');
    this.doctors = [];
    for (const section of this.props.sections) {
      if (section.name === this.sectionName) {
        this.doctors = section.doctors;
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={TURQUOISE}
          leftComponent={<ArrowBack onPress={() => this.props.navigation.goBack()} />}
          centerComponent={{ text: this.sectionName, style: { color: WHITE } }}
        />
        <DoctorList doctors={this.doctors} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY
  }
});

const mapStateToProps = state => {
  return {
    sections: state.sectionsArray.sections
  };
};

export default connect(mapStateToProps)(Doctors);
