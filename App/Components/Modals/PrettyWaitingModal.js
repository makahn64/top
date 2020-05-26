/*********************************

 File:       AuthFlowModal.js
 Function:   Modal Shared by Login and Account Create
 Copyright:  AppDelegates LLC
 Date:       2020-03-09
 Author:     mkahn

 **********************************/

import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import Images from '../../Themes/Images';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {useStyles} from '../../Themes/ThemeManager';


const PrettyWaitingModal = props => {

    const {showModal, message, showActivityIndicator, onPress} = props;
    const {appStyles: styles, theme} = useStyles();

    return (
        <Modal isVisible={showModal}>
            <View style={{flexBasis: '40%', backgroundColor: 'white', borderRadius: 10}}>
                <View style={{margin: 20, justifyContent: 'space-around', height: '90%'}}>
                    <View>
                        <Image source={Images.logoblue} style={{alignSelf: 'center', width: '75%', height: '50%'}}
                               resizeMode="contain"/>
                    </View>
                    <View style={{marginBottom: 40}}>
                        {showActivityIndicator ? <ActivityIndicator size="large" color={theme.primary}/> : null}
                        <Text style={styles.modalBodyText}>{message}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

PrettyWaitingModal.propTypes = {
    showModal: PropTypes.bool,
    message: PropTypes.string,
    showActivityIndicator: PropTypes.bool,
};

export default PrettyWaitingModal;

