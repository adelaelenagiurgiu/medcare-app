import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import SectionDetail from './SectionDetail';

class SectionList extends Component {
  renderSections() {
    const { navigation } = this.props;
    return this.props.sections.map(section => (
      <SectionDetail key={section.name} section={section} navigation={navigation} />
    ));
  }
  render() {
    return <View style={styles.container}>{this.renderSections()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  }
});
// state= the state of the app( in the redux store), map that and provide to the SectionList
// give me state ( from provider )
const mapStateToProps = state => {
  return {
    sections: state.sectionsArray.sections
  };
};
// connecting  my SectionList with the app state
export default connect(mapStateToProps)(SectionList);
