/*********************************

 File:       UIRedux.js
 Function:   UI State and Actions
 Copyright:  Bertco LLC
 Date:       2019-08-30
 Author:     mkahn

 **********************************/

import {createReducer, createActions} from 'reduxsauce';
import {useDispatch, useSelector} from 'react-redux';
import XLogger from '../../Services/XLogger';
import {PERSISTED_SETTINGS} from '../../Services/Storage/persisted';
import Storage from '../../Services/Storage';
import {setThemeMode} from '../../Services/Storage/persisted';

export const rootKey = 'ui';

const {Types, Creators} = createActions({
    showLoader: ['message'],
    hideLoader: null,
    setAppState: ['appState'],
    // rpo = reward pop up
    showInfoModal: ['infoModal'],
    hideInfoModal: null,
}, {
    prefix: 'UI/',
});

export const UIActionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    isLoaderVisible: false,
    loaderMessage: null,
    isInfoModalVisible: false,
    infoModal: null,
};

/* ------------- Reducers ------------- */

export const _showLoader = (state, {message}) => ({...state, isLoaderVisible: true, loaderMessage: message});

export const _hideLoader = state => ({...state, isLoaderVisible: false, loaderMessage: null});

export const _showInfoModal = (state, {infoModal}) => ({...state, infoModal, isInfoModalVisible: true});

export const _hideInfoModal = state => ({...state, isInfoModalVisible: false, infoModal: null});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_LOADER]: _showLoader,
    [Types.HIDE_LOADER]: _hideLoader,
    [Types.SHOW_INFO_MODAL]: _showInfoModal,
    [Types.HIDE_INFO_MODAL]: _hideInfoModal,
});

/* -------------- HOOKS ----------------------*/

export const useUI = () => {
    const uiState = useSelector(state => state[rootKey]);
    return {...uiState};
};

export const useLoaderControls = () => {
    const dispatch = useDispatch();
    const showLoader = message => dispatch(Creators.showLoader(message));
    const hideLoader = () => dispatch(Creators.hideLoader());
    return {showLoader, hideLoader};
};

export const useInfoModal = () => {
    const dispatch = useDispatch();
    const showInfoModal = infoModal => dispatch(Creators.showInfoModal(infoModal));
    const hideInfoModal = () => dispatch(Creators.hideInfoModal());
    const isInfoModalVisible = useSelector(state => state[rootKey].isInfoModalVisible);
    const infoModal = useSelector(state => state[rootKey].infoModal);
    return {showInfoModal, hideInfoModal, isInfoModalVisible, infoModal};
};
