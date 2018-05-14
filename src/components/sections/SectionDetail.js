import React from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const SectionDetail = ({ section }) => {
  const { name, firstImage } = section;
  const { firstImageStyle, headerContentStyle, ImageContainerStyle, headerTextStyle } = styles;
  return (
    <Card>
      <CardSection>
        <View style={ImageContainerStyle}>
          <Image style={firstImageStyle} source={{ uri: firstImage }} />
        </View>
        {/* <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{name}</Text>
        </View> */}
      </CardSection>
    </Card>
  );
};

const styles = {
  firstImageStyle: {
    height: 300,
    width: '100%'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  ImageContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
export default SectionDetail;
