import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { WHITE } from '../../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SectionDetail = ({ section, navigation }) => {
  const { name, firstImage } = section;
  const { container, firstImageStyle, headerTextStyle, overlay } = styles;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Doctors', { name })}>
      <View style={container}>
        <Image style={firstImageStyle} source={{ uri: firstImage }} />
        <View style={overlay}>
          <Text style={headerTextStyle}>{name.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  container: {
    width: SCREEN_WIDTH / 2 - 10,
    height: '31%',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  firstImageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden'
  },
  headerContentStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextStyle: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'semi-bold'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default SectionDetail;
