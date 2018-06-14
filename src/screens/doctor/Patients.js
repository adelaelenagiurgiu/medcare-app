import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { Constants } from 'expo';
import { connect } from 'react-redux';

import Error from '../../components/Error';
import { TextLine, Input } from '../../components/common';
import { TURQUOISE, GREY, WHITE } from '../../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Patients extends Component {
  state = {
    patients: [],
    search: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (props.patients.length !== state.patients.length) {
      return {
        patients: props.patients
      };
    }

    return null;
  }

  search(name) {
    const { patients } = this.props;
    const copy = patients.slice();
    const newPatients = copy.filter(patient => patient.patientName.toLowerCase().includes(name));
    this.setState({ search: name, patients: newPatients });
  }

  renderItem(item) {
    return (
      <TextLine key={item._id} type="PTregular" color={TURQUOISE} size={20}>
        {item.patientName}
      </TextLine>
    );
  }

  render() {
    const { patients, search } = this.state;
    return (
      <View style={styles.container}>
        <Error />
        <Header
          backgroundColor={TURQUOISE}
          centerComponent={{ text: 'Pacienti', style: { color: WHITE } }}
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ height: 50 }}
        />
        <View style={styles.searchContainer}>
          <Input
            value={search}
            onChangeText={name => this.search(name)}
            underlineColorAndroid="transparent"
            placeholder="Nume"
            width={SCREEN_WIDTH - 20}
            mainColor={TURQUOISE}
            textColor={TURQUOISE}
            icon="search"
            iconType="octicon"
          />
        </View>
        {patients.length > 0 ? (
          <FlatList
            data={patients}
            keyExtractor={item => item._id}
            renderItem={({ item }) => this.renderItem(item)}
            contentContainerStyle={{ paddingBottom: 15 }}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY,
    paddingTop: Constants.statusBarHeight
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    patients: state.doctor.patients
  };
};

export default connect(mapStateToProps)(Patients);
