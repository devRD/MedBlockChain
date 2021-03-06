import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

export default class SectionTitle extends PureComponent {
  render() {
    Line = () => (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View
          style={{
            flex: 1,
            borderColor: Colors.themeColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flex: 1, paddingBottom: 2 }} />
      </View>
    )
    return (
      <View style={[blockStyle.section, this.props.style]}>
        <Line />
        <Text style={textStyle.sectionTitle}>{this.props.name}</Text>
        <Line />
      </View>
    )
  }
}

const blockStyle = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
})

const textStyle = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Aldrich',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.themeColor,
  },
})
