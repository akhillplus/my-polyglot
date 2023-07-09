import React, {Component} from 'react';
// import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
// import LoginRegister from './LoginRegister';
// import axios from 'axios';
import axios from '../lib/asyncRouts';
// import curlirize from 'axios-curlirize';
import PasswordRequest from './PasswordReqest';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSnackbar from './withSnackbar';
// import SnackbarProvider from './SnackbarProvider';

import { makeOptions } from '../lib/async';
import { changeInterfaceLang, changeUser } from '../actions';
import { withStyles } from '@material-ui/core/styles';

import FormHeader from './FormHeader';
import {handleOn, defaultRejecter, defaultFinally} from '../lib/async';
import {modalLoading} from './ModalLoading';
import C from '../constants';

// import { Loading } from './CustomElements';
import {/*CircularIndeterminate, CircularProgressWithLabel, */AlertEmailResetSentSuccessful} from './CustomElements';


import { t } from '@lingui/macro';

import { getApiKey } from '../lib/stringLib';
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
        isSubmitted: false,
        key: 0
      };
    }

    remount = () => {
      let key = this.state.key;
      this.setState({key: ++key});
    }


    handleSubmitted = state => {
      let message = t({id: 'success.passwordResetLink.sent', 
                message: 'The email with the reset link has been sent successfully!'});
      this.setState({ isSubmitted: state});
      if (state === true) this.props.openModalMode({id:'alertMessage', message});
        return RETCODE_OK;
      }

    // startLoading = () => {this.props.openModalMode({id:'circularIndeterminate'});}
    // endLoading = () => {this.props.closeModalMode(); this.setState({key: ++this.state.key});}

    // handleOns = (funcOn, model, ms = 1200) => {
    //   this.startLoading();
    //   setTimeout(funcOn.bind(this, model), ms);
    // }
    setLoadingStatus = flag => { 
      if (flag) this.props.openModalMode({id:'circularIndeterminate'});
      else if (this.state.isSubmitted) return;
      else this.props.closeModalMode();
    }

    resolver = (res) => {
      let {code, message} = res.data;
      if (code === RETCODE_OK) {
        // this.endLoading();
        return this.handleSubmitted(true);
      }
      else if (code === RETCODE_ERROR) {
        // this.remount();
        return {message};
      }
      else 
      return {message:'error.response.status', status: res.status};
    }

    // rejecter = (err) => {
    // }

    handleSend = content => {
      // content.apiKey = getApiKey(content);
      return axios(makeOptions('/password/email', content))
      .then(this.resolver.bind(this))
      .catch(defaultRejecter.bind(this))
      .then(defaultFinally.bind(this));
    };

    render() {
    const {isSubmitted, key } = this.state;
          return (
            <> 
            <FormHeader />
            { 
              isSubmitted === false && 
                <PasswordRequest key={key} 
                  // onSend={modalLoading(this.handleSend, this)}
                  onSend={(model) => {this.remount(); return handleOn(this.handleSend, this.setLoadingStatus, 1200, model)}}
                />
            }
            </>
          );
      }
}

// const PasswordRequestForm = connect(
//   (state) =>
//   ({
//     // drawerOpen: state.drawerOpen,
//     // selectedTabIndex: state.tab,
//     // interfaceLang: state.interfaceLang,
//     user: state.user
//   }),
//   (dispatch) =>
//   (
//     {
//     // handleChangeInterfaceLang(value) {
//     //   dispatch(changeInterfaceLang(value));
//     // },
//     handleChangeUser(user) {
//       dispatch(changeUser(user));
//     }
//   })
//   )(Form);


export default withStyles(styles)(withSnackbar(Form));