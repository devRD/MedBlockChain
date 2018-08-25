import React, { PureComponent } from 'react'
import { LayoutAnimation, View } from 'react-native'
import Card from './basic/Card'
import BlockButton from './BlockCardFractions/BlockButton'
import BlockConnector from './BlockCardFractions/BlockConnector'
import ChainingInfo from './BlockCardFractions/ChainingInfo'
import CheckINInfo from './BlockCardFractions/CheckINInfo'
import CheckOUTInfo from './BlockCardFractions/CheckOUTInfo'
import CheckStatus from './BlockCardFractions/CheckStatus'
import MiddlePart from './BlockCardFractions/MiddlePart'
import TimestampInfo from './BlockCardFractions/TimestampInfo'

export default class BlockCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBlockInfo: null,
    }
  }

  onButtonPress = buttonTitle => {
    this.setState({
      showBlockInfo:
        this.state.showBlockInfo == buttonTitle ? null : buttonTitle,
    })
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
      <View>
        <Card style={{ padding: 5, marginBottom: 0 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 4, justifyContent: 'space-between' }}>
              <BlockButton
                onPress={this.onButtonPress}
                style={{ marginBottom: 5 }}
                title="TIMESTAMP"
                value={timestamp}
                valueIsHash={false}
              />

              <BlockButton
                onPress={this.onButtonPress}
                title="DRUG DATA"
                value={drugDataHash}
              />

              <BlockButton
                style={{ marginTop: 5 }}
                onPress={this.onButtonPress}
                title="PREVIOUS HASH"
                value={previousBlockHash}
              />
            </View>

            <MiddlePart hashAlgorithmName={hashAlgorithmName} />

            <View
              style={{
                flex: 4,
                justifyContent: 'space-between',
              }}
            >
              <BlockButton
                onPress={this.onButtonPress}
                title="BLOCK HASH"
                value={blockHash}
              />

              <CheckStatus drugData={drugData} drugDataHash={drugDataHash} />
            </View>
          </View>

          <BlockInfo />
        </Card>

        <BlockConnector />
      </View>
    )
  }
}
