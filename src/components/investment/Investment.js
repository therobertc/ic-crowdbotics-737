import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { metrics, colors, fonts, layouts } from '../../theme/index.js';
import { Icon } from 'expo';
import * as Progress from 'react-native-progress';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import investmentData from '../../../config/data.json';


class Investment extends Component {

    static navigationOptions = ({ navigation }) => ({
        // Nav options can be defined as a function of the navigation prop:
        headerTitle: 'Investment Profile',
        headerTitleStyle: {color: colors.white, fontSize: 20},
        headerStyle:{ zIndex: 100, height: 100, borderBottomWidth: 0 },
        headerBackTitle: null,
        headerTransparent: false,
        headerLeft: <Icon.Ionicons name="ios-arrow-round-back" size={36} color={colors.white} style={{ marginLeft: 15}} onPress={() => navigation.navigate("Profile")} />,
        headerRight: null,
        headerBackground: <Image
                            source={require("../../../assets/images/header.png")}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
    });

    state = {
        step: 1
    }

    _nextStep = () => {
        if (this.state.step == 5)
            return;

        this.setState({
            step: this.state.step + 1
        })
    }

    _chooseValue = (value) => {
        console.log(value)
    }

    render() {
        const { step } = this.state;
        const data = investmentData[step - 1];
        console.log(data.values)
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 12, color: '#3E4A59', alignSelf: 'flex-end', marginBottom: 5, opacity: 0.45}}>{step} on 5</Text>
                <Progress.Bar 
                    progress={step/5} 
                    width={layouts.window.width - 40} 
                    height={7}
                    color={'#52CBC2'}
                    unfilledColor={'#EBEDF2'}
                    borderWidth={0}
                />
                <Text style={{fontSize: 23, color: '#52CBC2', marginTop: 25}}>{data.label}</Text>
                <View style={{flex: 1}}>
                    <RadioForm
                        radio_props={data.values}
                        initial={-1}
                        formHorizontal={false}
                        labelHorizontal={true}
                        labelColor={'#AEB4C0'}
                        selectedLabelColor={'#52CBC2'}
                        buttonColor={'#AEB4C0'}
                        selectedButtonColor={'#52CBC2'}
                        radioStyle={styles.radioButtonContainer}
                        borderWidth={1}
                        animation={true}
                        onPress={(value) => this._chooseValue(value)}
                    />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={this._nextStep}>
                    <Text style={{color: 'white', fontSize: 14}}>NEXT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const stateToProps = state => ({
});

const dispatchToProps = dispatch => ({
});

export default connect(stateToProps, dispatchToProps)(Investment);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 20
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: layouts.window.width - 40,
        backgroundColor: '#52CBC2',
        borderRadius: 6
    },
    radioButtonContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'rgba(217, 226, 233, 0.5)',
        // marginTop: 2
    }
});
