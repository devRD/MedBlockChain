//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Conventions from '../../constants/Conventions'
import Colors from '../../constants/Colors'

// create a component
class InfoRow extends PureComponent {
  dateChecker = value => {
    const dateformat = '^\\d{4}-\\d{2}-\\d{2}' // Match YYYY-MM-DD
    const matcher = new RegExp(dateformat)
    if (typeof value === 'string' && matcher.test(value)) {
      return Conventions.datetimeStr(value)
    }

    return value
  }

  render() {
    const { style, setting, value } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.leftText}>{setting}</Text>
        <Text style={styles.rightText}>{this.dateChecker(value)}</Text>
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftText: {
    flex: 1,
    fontFamily: 'Aldrich',
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  rightText: {
    flex: 1,
    fontFamily: 'Aldrich',
    textAlign: 'right',
    color: Colors.dark,
  },
})

//make this component available to the app
export default InfoRow
