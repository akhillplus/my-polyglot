import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { t } from "@lingui/macro";

//import { withStyles } from '@material-ui/core/styles';

//import classNames from 'classnames';
// import Settings from './Stages/Settings';
import DictionaryControl from './DictionaryControl';
import Stage1 from './Stages/Stage1';
import Stage2 from './Stages/Stage2';
import Stage3 from './Stages/Stage3';
// import Stage4 from './Stages/Stage4';

import withSnackbar from './withSnackbar';

import { changeUserDicSelected, changeEntireState } from '../actions';
import { filterState } from '../store/index';

// https://developers.google.com/web/updates/2018/07/page-lifecycle-api

const beforeUnloadListener = (event) => {
  event.preventDefault();
  return event.returnValue = `Are you sure you want to exit?`;
};

// A function that invokes a callback when the page has unsaved changes.
const onPageHasUnsavedChanges = () => {
  window.addEventListener('beforeunload', beforeUnloadListener, {capture: true});
};

// A function that invokes a callback when the page's unsaved changes are resolved.
const onAllChangesSaved = () => {
  window.removeEventListener('beforeunload', beforeUnloadListener, {capture: true});
};

const MainArea = (props) => {

  // const saveChangeMessage = t`There are unsaved changes. Save changes?`;

  // const [tab, setTab] = useState(undefined);

  // useEffect(() => {
  //   // Anything in here is fired on component mount.
  //   // With this method we dynamically load the catalogs
  //   // return () => window.onbeforeunload = exitConfirmation;
  // });

  // function saveChanges () {
  // // if (window.confirm(saveChangeMessage)){
  // // let item = JSON.stringify(Date.now());
  // // localStorage.setItem("TS", item);
  // // }
  //   window.onbeforeunload = null;
  // }

  // function exitConfirmation () {
  //   setTimeout( saveChanges, 0 );
  //   return "There are unsaved changes, all your changes will be lost if you exit !";
  // }
  
  // if (tab !== selectedTabIndex){
  //   setTab(selectedTabIndex);
  let pas = window.saveStateBeforeRerender ? props.stateCache.playAreaState : undefined;
  const isChanged = pas ? pas.isChanged : undefined;

    const tab = props.tab;
    let Play =  tab === 1 ?  DictionaryControl :
                tab === 2 ? Stage1 : tab === 3 ? Stage2 : tab === 4 ? Stage3 : 
                // tab === 5 ? Stage4 : 
                DictionaryControl;

    onAllChangesSaved();
    if (isChanged) {
      onPageHasUnsavedChanges();
    }

    return <Play {...props} playAreaState={pas} /*handleSaveChanges={props.handleSaveChanges} *//>;
}

// MainArea.propTypes = {
//     //classes: PropTypes.object.isRequired,
//     selectedTabIndex: PropTypes.number.isRequired,
//   };
const PlayArea = connect(
  (state) =>
({
  ...state
}),   
(dispatch) =>
(
  {
  // handleChangeUserDicSelected(value) {
  //   dispatch(changeUserDicSelected(value));
  // },
  handleSaveChanges(state) {
    dispatch(changeEntireState(filterState(state)));
  }
})
)(MainArea);
  
export default withSnackbar(PlayArea);