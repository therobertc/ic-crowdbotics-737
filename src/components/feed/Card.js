import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { saveFeedAction } from './FeedContainer';
import { Icon } from 'expo';
import { metrics, colors, fonts } from '../../theme/index.js';


class Card extends Component {

  state = {
    text: '',
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.image}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Icon.Ionicons name="md-heart-empty" size={15} color={colors.primary} />
              <Text style={styles.number}>{item.likes}</Text>
            </View>
            <View style={styles.button}>
              <Icon.Ionicons name="md-share" size={15} color={colors.primary} />
              <Text style={styles.number}>{item.shares}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const stateToProps = state => ({
  // feed: state.feedReducer.feed,
});

const dispatchToProps = dispatch => ({
  // saveFeedAction: bindActionCreators(saveFeedAction, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Card);

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
    margin: metrics.small,
    borderColor: 'rgba(217, 226, 233, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#E5E5E5',
    shadowOpacity: 1,
    backgroundColor : colors.white,
  },
  image: {
    width: '40%',
    height: '100%'
  },
  rightContainer: {
    flex: 2.8,
    paddingTop: metrics.medium,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: fonts.size.small,
    fontFamily: 'avenir-black',
    textAlign: 'center'
  },
  description: {
    fontSize: fonts.size.small,
    fontFamily: 'avenir-roman',
    textAlign: 'center',
    color: colors.textMedium
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.greyMedium,
  },
  number: {
    fontSize: fonts.size.small,
    fontFamily: 'avenir-roman',
    color: colors.textMedium,
    margin: metrics.small,
    marginTop: 8
  }
});
