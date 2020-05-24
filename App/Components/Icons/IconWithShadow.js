/*********************************

 File:       IconWithShadow.js
 Function:   Extends RNE Icon to have a hard shadow
 Copyright:  Bertco LLC
 Date:       2020-05-15
 Author:     mkahn

 **********************************/

import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';

const IconWithShadow = props => {

    const {type, name, color, shadowColor, shadowOffset, size, style} = props;

    return (
        <View style={[style, {flex: 1, width: size, height: size,}]}>
            <View style={{ position: 'absolute', top: shadowOffset, left: shadowOffset}}>
                <Icon type={type}
                      name={name}
                      color={shadowColor}
                      size={size}
                    containerStyle={{opacity: 0.5}}/>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0}}>
                <Icon type={type}
                      name={name}
                      color={color}
                      size={size}/>
            </View>
        </View>
    );
};

IconWithShadow.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    shadowOffset: PropTypes.number,
    size: PropTypes.number,
    containerStyle: PropTypes.object,
};

IconWithShadow.defaultProps = {
    type: 'material-community',
    name: 'cloud-question',
    color: '#ff0000',
    shadowColor: '#444444',
    shadowOffset: 1,
    size: 30,
};

export default IconWithShadow;
