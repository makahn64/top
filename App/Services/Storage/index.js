/*********************************

 File:       index.js
 Function:   Light wrapper on AsyncStorage
 Copyright:  Bertco LLC
 Date:       2020-04-24
 Author:     mkahn

 I was not a fan of those I found, so I wrote my own.

 **********************************/

import AsyncStorage from '@react-native-community/async-storage';

const getString = async (key, defaultValue) => {
    const fs = await AsyncStorage.getItem(key);
    return fs || defaultValue;
};

const setString = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const getNumber = async (key, defaultValue) => {
    const fs = await AsyncStorage.getItem(key);
    return Number(fs) || defaultValue;
};

const setNumber = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const getInt = async (key, defaultValue) => {
    const fs = await AsyncStorage.getItem(key);
    return parseInt(fs) || defaultValue;
};

const setInt = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const getObject = async (key, defaultValue) => {
    const fs = await AsyncStorage.getItem(key);
    return JSON.parse(fs) || defaultValue;
};

const setObject = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const getBool = async (key, defaultValue) => {
    const fs = await AsyncStorage.getItem(key);
    return !!fs || !!defaultValue;
};

const setBool = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value ? 1 : 0));

const getAllKeys = async () => AsyncStorage.getAllKeys();

export default {
    getString, setString, getNumber, setNumber,
    getInt, setInt, getObject, setObject, getBool, setBool, getAllKeys,
};
