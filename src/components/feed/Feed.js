import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { saveMessageAction, saveImageAction } from './ChatContainer';
import { Icon } from 'expo';
import { metrics, colors, fonts } from '../../theme/index.js';


class Feed extends Component {

  state = {
    text: ''
  }

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
      </View>
    );
  }
}

const stateToProps = state => ({

});

const dispatchToProps = dispatch => ({

});

export default Feed;

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
    paddingHorizontal: metrics.medium,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    shadowRadius: 6,
    backgroundColor : colors.white
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: fonts.size.medium,
    color: colors.textDark,
    fontFamily: 'avenir-roman',
  }
});
