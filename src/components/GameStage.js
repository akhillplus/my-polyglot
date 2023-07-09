import React, { Component } from 'react'
import { connect } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
// import ReactDOM from 'react-dom';
// import { connect } from "react-redux";
// import { i18n } from "@lingui/react";
// import { t } from "@lingui/macro";
import C from '../constants';
import PropTypes from 'prop-types';
// import { useSnackbar } from './useSnackbar';
import withSnackbar from './withSnackbar';
import { Trans, t } from '@lingui/macro';
// import { t } from "@lingui/macro";

import { withStyles/*, MuiThemeProvider, createMuiTheme */} from '@material-ui/core/styles';
import { filterState } from '../store/index';

export class GameStage extends Component {

  constructor(props) {
    super(props);
    if(props.playAreaState){
      this.state = props.playAreaState;
    } else {
      this.state = this.initState;
    }
  }

  get initState() {
    return filterState(this.props);
  }

  handleAcceptOptionChanges(changedProperies){
    this.setState(changedProperies);
  }

  shootPlayAreaState(){
    this.props.stateCache.playAreaState = this.state; // saves state of the tab
    if (window.saveStateBeforeRerender) window.saveStateBeforeRerender = false;
  }

  saveChanges(){
    const {isChanged, uDicIsSelected, uItems, sItems} = this.state;
    if(isChanged) {
      const items = uDicIsSelected === true ? uItems: sItems;
      const altItems = uDicIsSelected === true ? sItems: uItems;
      this.props.handleSaveChanges({...this.state, items, altItems});
      this.setState({isChanged: false});
  }}

  componentDidUpdate(){
      this.shootPlayAreaState();
  }

  componentWillUnmount() {
      // window.removeEventListener("resize", this.updateDimensions.bind(this));
      if(this.state.isChanged && window.confirm(t`Save changes?`)) this.saveChanges();
  }

}