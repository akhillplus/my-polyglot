import React, {Component } from 'react';
import { connect } from "react-redux";
import LoginRegister from './LoginRegister';

// import curlirize from 'axios-curlirize';
import { Trans } from '@lingui/macro';

// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withSnackbar from './withSnackbar';
// import SnackbarProvider from './SnackbarProvider';

import { makeOptions } from '../lib/async';
import axios from '../lib/asyncRouts';
import { changeUser } from '../actions';
// import { devMode } from '../lib/stringLib';

import { withStyles } from '@material-ui/core/styles';

import FormHeader from './FormHeader';
import { defaultRejecter, defaultFinally} from '../lib/async';
import { modalLoading} from './ModalLoading';
import { devMode } from '../lib/stringLib';
import C from '../constants';

const { RETCODE_OK, RETCODE_ERROR } = C; 

// import { Trans } from '@lingui/macro';

// import { getApiKey, sleep } from '../lib/stringLib';

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
    button: { color: 'green' // fill: 'white' 
  },
});

// const Favicon = (props) => ( <img src={FaviconSvg} alt='' {...props}/> );

class LoginRegisterForm extends Component {

    constructor(props){
      super(props);
      this.state = this.initialState;
    }
  
    get initialState() {
      return {
        // isLoginRegisterTime: false,
        // isLogoutTime: false,
        langMenuAnchorEl: null,
        tab: this.props.tab,
        key: 0,
        isLogoutTime: false,
      };
    }
  
    remountLoginRegister = () => {
        let key = this.state.key;
        this.setState({key: ++key});
    }

    resolver = (res) => {
      const {code, message, id, email, name, avatar, intended} = res.data;
      if (code === RETCODE_OK) {
        let op = res.config.url; // '/login/id', '/register/id' or without /id
        let ind1 = op.indexOf('/') + 1, ind2 = op.lastIndexOf('/') + 1;
        if (ind1 === ind2) ind2 = undefined;
        op = op.substring(ind1, ind2); // to skip slash for 'login' or 'register'
        this.props.handleChangeUser({id, email, name, avatar});
        if(intended) setTimeout(() => window.location.replace(intended), 3000);
        return {message:`success.${op}.success`};
      } 
      else if (code === RETCODE_ERROR) {
        this.remountLoginRegister();
        return {message}; // 'error.register.validationError'
      }
      else 
        return {message:'error.response.status', status: res.status};
    }

    finally = defaultFinally.bind(this);
  
    handleLogin = content => {
      // content.apiKey = getApiKey(content);
      return axios(makeOptions('/login', content))
      .then(this.resolver/*.bind(this)*/)
      .catch(defaultRejecter/*.bind(this)*/)
      .then(this.finally);
    };
  
    // invokeLogout() {
    //   this.setState({ isLogoutTime: true });
    //   this.handleLogout(null); 
    // }
  
    // handleLogout = content => {
    //   console.log('cookie: ', document.cookie);
    //   // content.locale = this.props.interfaceLang;
    //   // content.apiKey = getApiKey(content);
    //   axios(makeOptions('/logout', content))
    //   .then((res) => {
    //     console.log('success cookie: ', document.cookie);
    //     this.handleRequestCloseLoginLogoutRegister();
  
    //       if (res.data.code === RETCODE_OK) {
    //         this.props.enqueueSnackbar('success.logout.success');
    //         this.props.handleChangeUser(null);
    //       } 
    //       else 
    //         this.props.enqueueSnackbar('status: ' + res.status.toString());
    //   })
    //   .catch((err) => {
    //     console.log('err cookie: ', document.cookie);
    //     this.handleRequestCloseLoginLogoutRegister();
  
    //       // if (err.data.message === 'VE') {
    //         if (err.status === 429) // Too Many Requests
    //           this.props.enqueueSnackbar('error.tooManyRequests');
    //         else if (err.status === 422) 
    //           this.props.enqueueSnackbar('error.validationError');
    //         else 
    //           this.props.enqueueSnackbar('error.logout.failure');
    //   });
    //   // console.log(JSON.stringify(content));
    //   // this.props.enqueueSnackbar(`Logging in with content '${JSON.stringify(content)}'`);
    // };
  
    handleLoginWithProvider = providerId => {
      // const proxyurl = /*devMode() ? */process.env.REACT_APP_CORSPROXY || '';
      // const proxyurl = window.location.origin +'/proxy.php';
      // const url = window.location.origin + '/login/' + providerId;
      const url = '/login/' + providerId;
      // const proxyurl = '';//window.location.origin +'/proxy.php';
      // curlirize(axios);
      const instance = axios.create({
        // baseURL: proxyurl + window.location.origin,
        // timeout: 1000,
      });
      instance.defaults.headers.common = {};
      return instance.get(url, { headers: {
        // 'Accept': 'application/json',
        // 'Content-Type':  'application/x-www-form-urlencoded',//'text/plain',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        'X-Requested-With': 'XMLHttpRequest',
        // 'X-Proxy-URL': url
      },})
      .then(this.resolver)
      .catch(defaultRejecter)
      .then(this.finally);
      // .then((res) => {
      //   console.log('res :', res);
      //   // console.log('status: ', res.status);
      //     if (res.data.code === RETCODE_OK) {
      //       this.props.handleChangeUser({email: res.data.email, name: res.data.name, avatar: res.data.avatar});
      //       if( res.data.intended) window.location.replace(res.data.intended);
      //     }
      //     // this.endLoading();
      //     if (res.data.code === RETCODE_ERROR) {
      //       // this.remountLoginRegister();
      //       if (res.data.message === 'VE')
      //         this.props.enqueueSnackbar('error.validationError');
      //     }
      //     else 
      //     this.props.enqueueSnackbar('error.response.status', {status: res.status});
      //   })
      //   .catch((err) => {
      //     // this.endLoading();
      //     console.log('err :', err);
      //     // console.log('err status: ', err.status);
      //   });
      // this.props.enqueueSnackbar(`Logging in with provider '${providerId}'`);
    };
  
    handleRegister = content => {
      // content.locale = this.props.interfaceLang;
      // content.apiKey = getApiKey(content);
      // console.log(content);

      return axios(makeOptions('/register', content))
      .then(this.resolver)
      .catch(defaultRejecter)
      .then(this.finally);
    };
  
    handleRegisterWithProvider = providerId => {
      return this.handleLoginWithProvider(providerId);
    };

    render() {
        const { tab, key/*, isLoading*/ } = this.state,
        { classes } = this.props;
          return (
            <div> 
                <FormHeader>
                  <Button className={classes.button} /*variant="contained" size="small"*/
                  /* onClick={this.invokeLogin.bind(this)}*/
                    href={window.location.origin + '/demo'}>
                    <Trans>Demo</Trans>
                  </Button> 
                </FormHeader> 
                <LoginRegister
                  key={key}
                  onLogin={modalLoading(this.handleLogin, this)}
                  onLoginWithProvider={modalLoading(this.handleLoginWithProvider, this)}
                  onRegister={modalLoading(this.handleRegister, this)}
                  onRegisterWithProvider={modalLoading(this.handleLoginWithProvider, this)}
                  // forgotPasswordLink={this.forgotPasswordLink}
                  tab={tab}
                  // loginFailed={'Login failed!!!'}
                  />
            </div>
          );
      }
}

const Form = connect(
  (state) =>
  ({
    // drawerOpen: state.drawerOpen,
    // selectedTabIndex: state.tab,
    // interfaceLang: state.interfaceLang,
    user: state.user
  }),
  (dispatch) =>
  ({
    // handleChangeInterfaceLang(value) {
    //   dispatch(changeInterfaceLang(value));
    // },
    handleChangeUser(user) {
      dispatch(changeUser(user));
    }
  })
  )(LoginRegisterForm);

export default withStyles(styles)(withSnackbar(Form));