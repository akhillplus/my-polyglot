import React, {Component} from 'react';
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
// import LoginRegister from './LoginRegister';
// import axios from 'axios';
import axios from '../lib/asyncRouts';

// import curlirize from 'axios-curlirize';
import VerificationNotice from './VerificationNotice';
import { Trans } from '@lingui/macro';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSnackbar from './withSnackbar';
// import SnackbarProvider from './SnackbarProvider';

import { makeOptions } from '../lib/async';
import { changeInterfaceLang, changeUser } from '../actions';
import { withStyles } from '@material-ui/core/styles';

import FormHeader from './FormHeader';
import {defaultRejecter, defaultFinally} from '../lib/async';
import {modalLoading} from './ModalLoading';

// import { Trans } from '@lingui/macro';

import { getApiKey } from '../lib/stringLib';
import C from '../constants';

const { RETCODE_OK, RETCODE_ERROR } = C; 

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    // color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

class Form extends Component {

    constructor(props){
      super(props);
      this.state = this.initialState;
    }
  
    get initialState() {
      return {
        // isLoading: false
      };
    }

    resolver = (res) => {
      const {code, message} = res.data;

        if (code === RETCODE_OK) {
          return {message:'success.verificationEmailResent'};
        } 
        else if (code === RETCODE_ERROR){
          return {message};
        }
        else 
          return {message:'error.response.status', status: res.status};          
    }

    handleSend = content => {
      // content.apiKey = getApiKey(content);
      return axios(makeOptions('/email/resend', content))
      .then(this.resolver)
      .catch(defaultRejecter)
      .then(defaultFinally.bind(this));
    };

    render() {
    const { classes, resent } = this.props;
          return (
            <> 
                <FormHeader />
                <VerificationNotice onSend={modalLoading(this.handleSend, this)} resent={resent === true}/>
            </>
          );
      }
}

export default withStyles(styles)(withSnackbar(Form));