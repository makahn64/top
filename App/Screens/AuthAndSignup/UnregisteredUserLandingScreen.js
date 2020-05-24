/*********************************

 File:       UnregisteredUserLandingScreen.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2020-03-08
 Author:     mkahn

 **********************************/

import React from 'react';
import {connect} from 'react-redux';
import OnboardLandingScreen from '../Questionnaire/OnboardLandingScreen';

const UnregisteredUserLandingScreen = props => {
    const nextScreen = 'NoAccountScreen';
    const titleText = `Personalize Your Workout In Just 5 Minutes`;
    const sectionText = `Thousands of pre and postnatal women have experienced their perfect workout without ever stepping into a gym.`;
    const footerText = `Give your best answers! You can always update later as we know how you feel constantly changes.`;
    const buttonText = `Let's get started`;

    return (
        <OnboardLandingScreen
            buttonText={buttonText}
            footerText={footerText}
            onNavigation={() => props.navigation.navigate(nextScreen)}
            sectionText={sectionText}
            titleText={titleText}/>
    );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(UnregisteredUserLandingScreen);
