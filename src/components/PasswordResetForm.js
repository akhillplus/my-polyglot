import React, {Component} from 'react';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';

// import LoginRegister from './LoginRegister';
// import axios from 'axios';
import axios from '../lib/asyncRouts';
// import curlirize from 'axios-curlirize';
import PasswordReset from './PasswordReset';
import { t } from '@lingui/macro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSnackbar from './withSnackbar';
// import SnackbarProvider from './SnackbarProvider';

import { makeOptions } from '../lib/async';
import { changeInterfaceLang, changeUser } from '../actions';
// import { withStyles } from '@material-ui/core/styles';

import FormHeader from './FormHeader';
import { getCookie, getURIParam } from '../lib/stringLib';
import { handleOn, defaultRejecter, defaultFinally} from '../lib/async';
import {modalLoading} from './ModalLoading';
import C from '../constants';

const { RETCODE_OK, RETCODE_ERROR } = C; 

// import { Trans } from '@lingui/macro';


class PasswordResetForm extends Component {

    constructor(props){
      super(props);
      this.state = this.initialState;
    }
  
    get initialState() {
      return {
        // isLoginRegisterTime: false,
        // isLogoutTime: false,
        // langMenuAnchorEl: null,
        // tab: this.props.tab,
        isSubmitted: false,
        key: 0
      };
    }

    remount = () => {
      let key = this.state.key;
      this.setState({key: ++key});
    }

    setLoadingStatus = flag => { 
      if (flag) this.props.openModalMode({id:'circularIndeterminate'});
      else if (this.state.isSubmitted) return;
      else this.props.closeModalMode();
    }

    handleSubmitted = state => {
      let message = t({id: 'success.passwordReset.made', 
                message: 'The password reset has been made successfully!'});
      this.setState({ isSubmitted: state});
      if (state === true) this.props.openModalMode({id:'alertMessage', message});
      // return RETCODE_OK;
    }

    resolver = (res) => {
      let {code, message} = res.data;
      if (code === RETCODE_OK) {
        return this.handleSubmitted(true);
      } 
      else if (code === RETCODE_ERROR){
        if (message === 'error.passwordReset.validationError') this.remount();
        return {message};
      }
      else 
        return {message:'error.response.status', status: res.status};
  }

    handleSubmit = content => {
      content.token = getCookie('stoken');
      // content.apiKey = getApiKey(content);
      return axios(makeOptions('/password/reset', content))
      .then(this.resolver)
      .catch(defaultRejecter)
      .then(defaultFinally.bind(this));
    };

    render() {
    const {isSubmitted, key} = this.state;
    // if (isSubmitted === true) this.props.openModalMode({id:'alertMessage', 
    //   message:<Trans>The password reset has been made successfully!</Trans>});

          return (
            <> 
            <FormHeader />
            { 
              isSubmitted === false && 
                <PasswordReset key={key}
                  // onReset={modalLoading(this.handleSubmit, this)} 
                  onReset={(model) => {/*this.remount();*/ return handleOn(this.handleSubmit, this.setLoadingStatus, 1200, model)}}
                  email={getURIParam('email')}/>
            }
            </>
          );
      }
}

export default withSnackbar(PasswordResetForm);