import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import SectionDetail from './SectionDetail';

class SectionList extends Component {
  state = { sections: [] };
  componentWillMount() {
    axios
      .get('https://shielded-sierra-53914.herokuapp.com/sections')
      .then(response => this.setState({ sections: response.data.sections }));
  }

  renderSections() {
    return this.state.sections.map(section => (
      <SectionDetail key={section.name} section={section} />
    ));
  }
  render() {
    console.log(this.state);
    return <ScrollView>{this.renderSections()}</ScrollView>;
  }
}
export default SectionList;
