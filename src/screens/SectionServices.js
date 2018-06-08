import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Header, Card, List, ListItem } from 'react-native-elements';
import { WHITE, GREY, TURQUOISE } from '../../assets/colors';
import { Button, ArrowBack } from '../components/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SectionServices extends Component {
  constructor(props) {
    super(props);

    this.sectionDescription = '';
    this.sectionName = this.props.navigation.getParam('name');
    this.services = [];
    for (const section of this.props.sections) {
      if (section.name === this.sectionName) {
        this.services = section.MedicalServicesOffered;
        this.sectionDescription = section.sectionDescription;
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
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.textDescription}>
              {'   '} {this.sectionDescription}
            </Text>
          </Card>
          <Text style={styles.textService}>SERVICIILE NOASTRE</Text>
          <List containerStyle={styles.listStyle}>
            <FlatList
              data={this.services}
              keyExtractor={item => item._id}
              initialNumToRender={1}
              renderItem={({ item }) => (
                <ListItem title={item.ServiceType} subtitle={`${item.price} RON`} hideChevron />
              )}
            />
          </List>

          <Button
            title="Vezi doctorii nostri!"
            textColor={WHITE}
            buttonStyle={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Doctors', { name: this.sectionName })}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREY
  },
  textDescription: {
    fontFamily: 'PTregular',
    fontSize: 14
  },
  cardStyle: {
    marginBottom: 10,
    borderColor: '#898b9b',
    borderRadius: 3,
    width: SCREEN_WIDTH - 20,
    borderWidth: 1
  },
  textService: {
    fontFamily: 'PTbold',
    fontSize: 16,
    color: TURQUOISE,
    marginTop: 5
  },
  listStyle: {
    borderColor: '#898b9b',
    borderRadius: 3,
    width: SCREEN_WIDTH - 20,
    borderWidth: 1
  },
  buttonStyle: {
    height: 50,
    width: SCREEN_WIDTH - 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    sections: state.sectionsArray.sections
  };
};

export default connect(mapStateToProps)(SectionServices);
