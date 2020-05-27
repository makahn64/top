/*********************************

 File:       OKCancelModal.js
 Function:   What it says ^ :)
 Copyright:  Bertco LLC
 Date:       2020-05-26
 Author:     mkahn

 **********************************/

import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Images from '../../Themes/Images';
import {useStyles} from '../../Themes/ThemeManager';
import {Button} from 'react-native-elements';
import Metrics from '../../Themes/Metrics';

const OKCancelModal = props => {

    const {
        showModal, onOK, onCancel, message, okButtonText, cancelButtonText,
        okButtonColor, cancelButtonColor, hideCancel,
    } = props;
    const {appStyles: styles, theme} = useStyles();

    return (
        <Modal isVisible={showModal}>
            <View style={{flexBasis: '40%', backgroundColor: 'white', borderRadius: 10}}>
                <View style={{margin: 0, justifyContent: 'space-around', height: '90%'}}>
                    <View>
                        <Text style={styles.modalBodyText}>{message}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Button title={okButtonText} buttonStyle={{backgroundColor: okButtonColor}} onPress={onOK}
                                containerStyle={{flex: 1, margin: Metrics.marginHorizontal}}/>
                        {!hideCancel ?
                            <Button title={cancelButtonText} buttonStyle={{backgroundColor: cancelButtonColor}}
                                    onPress={onCancel}
                                    containerStyle={{flex: 1, margin: Metrics.marginHorizontal}}/> : null}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

OKCancelModal.propTypes = {
    showModal: PropTypes.bool,
    onCancel: PropTypes.func,
    onOK: PropTypes.func.isRequired,
    message: PropTypes.string,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    okButtonColor: PropTypes.string,
    cancelButtonColor: PropTypes.string,
    hideCancel: PropTypes.bool,
};

OKCancelModal.defaultProps = {
    okButtonText: 'DELETE',
    cancelButtonText: 'CANCEL',
    okButtonColor: 'green',
    cancelButtonColor: 'red',
    onCancel: () => {},
};

export default OKCancelModal;


