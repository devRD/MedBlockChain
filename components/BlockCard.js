import invert from 'invert-color'
import React, { PureComponent } from 'react'
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Colors from '../constants/Colors'
import Card from './basic/Card'
import FontIcon from './basic/FontIcon'
import HashBlock from './basic/HashBlock'
import ChainingInfo from './BlockCardFractions/ChainingInfo'
import CheckINInfo from './BlockCardFractions/CheckINInfo'
import TimestampInfo from './BlockCardFractions/TimestampInfo'
import ListData from './ListData'
import CheckOUTInfo from './BlockCardFractions/CheckOUTInfo'

export default class BlockCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBlockInfo: null,
    }
  }

  render() {
    const {
      blockHash,
      timestamp,
      drugDataHash,
      previousBlockHash,
      drugData,
      drugMetaData,
      hashAlgorithmName,
    } = this.props

    BlockButton = ({ style, title, value, valueIsHash = true }) => (
      <TouchableOpacity
        style={[
          valueIsHash && hashBlockContainer(value),
          !valueIsHash && blockStyle.drugData,
          {
            borderColor: Colors.headerLine,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 7,
          },
          blockStyle.shadow,
          style,
        ]}
        onPress={() => {
          this.setState({
            showBlockInfo: this.state.showBlockInfo == title ? null : title,
          })
        }}
      >
        <Text
          style={[
            textStyle.subheader,
            {
              color: valueIsHash
                ? invert(`#${value.slice(0, 6)}`, true)
                : '#000000',
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={valueIsHash ? hashBlockText(value) : textStyle.hash}
        >{`${value.slice(0, 10)}...`}</Text>
      </TouchableOpacity>
    )

    BlockInfo = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

      const { showBlockInfo } = this.state
      switch (showBlockInfo) {
        case 'PREVIOUS HASH':
          return (
            <ChainingInfo
              timestamp={this.props.previousBlockInfo.timestamp}
              previousBlockHash={this.props.previousBlockInfo.previousBlockHash}
              drugDataHash={this.props.previousBlockInfo.drugDataHash}
              hash={this.props.previousBlockHash}
              hashAlgorithmName={this.props.hashAlgorithmName}
            />
          )

        case 'DRUG DATA':
          if (drugData) {
            return (
              <CheckOUTInfo
                drugData={drugData}
                drugDataHash={drugDataHash}
                hashAlgorithmName={hashAlgorithmName}
              />
            )
          } else {
            return (
              <CheckINInfo
                drugMetaData={drugMetaData}
                drugDataHash={drugDataHash}
              />
            )
          }

        case 'BLOCK HASH':
          return (
            <ChainingInfo
              timestamp={this.props.timestamp}
              previousBlockHash={this.props.previousBlockHash}
              drugDataHash={this.props.drugDataHash}
              hash={this.props.blockHash}
              hashAlgorithmName={this.props.hashAlgorithmName}
            />
          )

        case 'TIMESTAMP':
          return <TimestampInfo timestamp={timestamp} />

        default:
          return null
      }
    }

    return (
      <Card>
        <View style={blockStyle.column}>
          <View
            style={{ flex: 4, justifyContent: 'space-between', padding: 5 }}
          >
            <BlockButton
              style={{ marginBottom: 5 }}
              title="TIMESTAMP"
              value={timestamp}
              valueIsHash={false}
            />

            <BlockButton
              style={{ marginBottom: 5 }}
              title="DRUG DATA"
              value={drugDataHash}
            />

            <BlockButton title="PREVIOUS HASH" value={previousBlockHash} />
          </View>

          <View
            style={{
              flex: 1,
              borderLeftColor: Colors.headerLine,
              borderLeftWidth: 1,
              marginVertical: 5,
              marginHorizontal: 5,
            }}
          >
            <View style={{ flex: 3 }} />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={textStyle.nano}>{hashAlgorithmName}</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderTopColor: Colors.headerLine,
                borderTopWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: 'space-between',
              padding: 3,
            }}
          >
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <FontIcon
                name={drugData ? 'check_out' : 'check_in'}
                size={70}
                color={`#${this.props.drugDataHash.slice(0, 6)}`}
                style={[{ textAlign: 'center' }, blockStyle.shadow]}
              />
            </View>
            <BlockButton title="BLOCK HASH" value={blockHash} />
          </View>
        </View>

        <BlockInfo />
      </Card>
    )
  }
}

hashBlockContainer = hash => ({
  backgroundColor: `#${hash.slice(0, 6)}`,
  borderColor: Colors.headerLine,
  borderRadius: 7,
  padding: 5,
})

hashBlockText = hash => [
  textStyle.hash,
  {
    color: invert(`#${hash.slice(0, 6)}`, true),
    backgroundColor: `#${hash.slice(0, 6)}`,
  },
]

const blockStyle = StyleSheet.create({
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  drugData: {
    backgroundColor: Colors.timestampBG,
    borderColor: Colors.tintColor,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    padding: 5,
  },
  blockInfo: {
    paddingVertical: 5,
    borderTopColor: Colors.headerLine,
    borderTopWidth: 1,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
})

const defaultText = {
  fontFamily: 'Aldrich',
  fontSize: 12,
  textAlign: 'center',
}

const textStyle = StyleSheet.create({
  defaultText,
  header: {
    ...defaultText,
    fontSize: 18,
    marginVertical: 10,
  },
  subheader: {
    ...defaultText,
    paddingTop: 5,
    paddingBottom: 2,
    fontSize: 14,
  },
  right: {
    ...defaultText,
    textAlign: 'right',
  },
  nano: {
    ...defaultText,
    color: Colors.headerLine,
    fontSize: 7,
    textAlign: 'center',
  },
  hash: {
    fontFamily: 'NovaMono',
    fontSize: 14,
    textAlign: 'center',
  },
})
