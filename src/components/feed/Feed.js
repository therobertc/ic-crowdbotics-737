import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveFeedAction } from './FeedContainer';
import { Icon } from 'expo';
import { metrics, colors, fonts } from '../../theme/index.js';
import Card from './Card.js';


class Feed extends Component {

  state = {
    text: ''
  }

  _renderFeed = (item, index) => <Card navigation={this.props.navigation} key={item.id} item={item} />

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Icon.Ionicons name="md-search" color={colors.primary} size={26} />
        </View>
        <ScrollView style={{ flex: 1, marginTop: 15 }} showsVerticalScrollIndicator={false}>
          {
            this.props.feedMessages.map(this._renderFeed)
          }
        </ScrollView>
      </View>
    );
  }
}

const stateToProps = state => ({
  feedMessages: state.feedReducer.feedMessages,
});

const dispatchToProps = dispatch => ({
  saveFeedAction: bindActionCreators(saveFeedAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: metrics.large,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    paddingHorizontal: metrics.medium,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    backgroundColor : colors.white,
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: fonts.size.medium,
    color: colors.textDark,
    fontFamily: 'avenir-roman',
  }
});
