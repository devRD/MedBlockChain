import React, { PureComponent } from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'

import map from 'lodash/map'

import { ContextConsumer } from '../Context'
import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

import Colors from '../constants/Colors'

export default class BlockchainScreen extends PureComponent {
  static navigationOptions = {
    header: <Header title="Blockchain" />,
  }

  render() {
    return (
      <ContextConsumer>
        {context => {
          return (
            <ScrollView style={blockStyle.scrollView}>
              {map(context.blockchain.chain, block => (
                <View style={blockStyle.scrollItem} key={block.blockHash}>
                  <BlockCard
                    blockHash={block.blockHash}
                    timestamp={block.timestamp}
                    drugDataHash={block.drugDataHash}
                    previousBlockHash={block.previousBlockHash}
                    drugData={block.drugData}
                    drugMetaData={block.drugMetaData}
                    previousBlockInfo={block.previousBlockInfo}
                    hashAlgorithmName={block.hashAlgorithmName}
                  />
                </View>
              ))}
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
  }
}

const blockStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.scrollBG,
  },
  scrollItem: { flexDirection: 'row', justifyContent: 'center' },
})
