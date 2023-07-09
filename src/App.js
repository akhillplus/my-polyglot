import React, { useEffect, useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, green } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { enUS, ruRU, ukUA } from '@material-ui/core/locale';
// import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";

import { connect } from "react-redux";
import AppDashboard from './components/Dashboard';
import MUICookieConsent from './components/MUICookieConsent';
import { I18nProvider/*, useLingui*/ } from '@lingui/react';
import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
// import { en } from 'make-plural/plurals';
// import { messages } from './locale/en/messages.js'
import { dynamicActivate } from './i18n.ts';

import './App.css';
import SnackbarProvider from './components/SnackbarProvider';
import LoginRegisterForm from './components/LoginRegisterForm';
import PasswordRequestForm from './components/PasswordRequestForm';
import PasswordResetForm from './components/PasswordResetForm';
import VerificationNoticeForm from './components/VerificationNoticeForm';
import UpdatingScreen from './components/UpdatingScreen';

import { setLocaleCookie, getCookie, devMode, getFileExt, isDemoMode, mixState} from './lib/stringLib';
import { changeUpdatingState, changeItems, changeAltItems } from './actions';
import { makeGetOptions, defaultRejecter, downloadResolver} from './lib/async';
// import axios from './lib/asyncRouts';
import axios from 'axios';
// import { CSVtoArray, isCSVvalid, TabTextToArray, isTabTextValid } from './lib/FileToArray';
import C from './constants';

import {readActualStateValue} from './store/index';
import {StateBits} from './lib/bits';

// import store, { saveStateToLocalStorage, fromLocalStorage } from './store/index';

// const catalogs = { en: catalogEn, ru: catalogRu, uk: catalogUk };
// i18n.loadLocaleData('en', { plurals: en });
// i18n.load('en', messages);
// i18n.activate('en');

// class App extends Component {

//   render() {
const App = (props) =>  {

  const isUpdating = () => {
    const pathname = window.location.pathname
    return pathname === '/' || pathname === '/demo'
  }

  const getFileExtention = () => {
    return getFileExt(props.uDicIsSelected ? props.uDicPath : props.dicHalfPath);
  }
  const getAltFileExtention = () => {
    return getFileExt(!props.uDicIsSelected ? props.uDicPath : props.dicHalfPath);
  }

  const [updating, setUpdating] = useState(isUpdating());
  const [message, setMessage] = useState(null);
  const interfaceLang = getCookie('interfaceLang') || 'en';

  i18n.activate(interfaceLang);

  const getState = () => {
    const stateName = isDemoMode() ? C.DEMO_GAME_STATE_NAME : 
        props.uDicIsSelected ? C.UDIC_GAME_STATE_NAME : C.GAME_STATE_NAME;
    let state = readActualStateValue(stateName, props.user);
    return state ? Promise.resolve(JSON.parse(state)) : isDemoMode() || !props.user.fe_state ? Promise.resolve({}) :
            axios(makeGetOptions('/download/state', {id: props.user.id}))
            .then(downloadResolver);
  }

  const getAltState = () => {
    const stateName = !props.uDicIsSelected ? C.UDIC_GAME_STATE_NAME : C.GAME_STATE_NAME;
    return readActualStateValue(stateName, props.user);
  }

  const getStuff = () => {
    const stuffName = isDemoMode() ? C.DEMO_STUFF_NAME : 
        props.uDicIsSelected ? C.UDIC_STUFF_NAME : C.STUFF_NAME;
    const {dicSpecialty:spec, motherLang:ml, learnedLang:ll/*, dicSubspecialty:subspec*/} = props;
    const path = props.dicHalfPath;
    // const content = props.uDicIsSelected ? 
    let stuff = readActualStateValue(stuffName, props.user);
    return stuff ? Promise.resolve((stuffName === C.STUFF_NAME && !path) ?
              null: stuff) :
              isDemoMode() ? Promise.resolve(null) :
              props.uDicIsSelected ? Promise.resolve(null) : 
              props.dicHalfPath ? axios(makeGetOptions('/download/stuff', {spec, ml, ll, path})) :
              Promise.resolve(null)
              .then(downloadResolver);
  }

  const getAltStuff = () => {
    const stuffName = !props.uDicIsSelected ? C.UDIC_STUFF_NAME : C.STUFF_NAME;
    // const {dicSpecialty:spec, motherLang:ml, learnedLang:ll/*, dicSubspecialty:subspec*/} = props;
    // const path = props.dicHalfPath;
    // const content = props.uDicIsSelected ? 
    return readActualStateValue(stuffName, props.user);
  }

  const downloadRejecter = (err) => {
    const msg = defaultRejecter(err); 
    setMessage(msg.message);
    return undefined;
  }
    const alertMessage = {message: t`Something went wrong. Please, try again later.`, 
    button: t`Reload`, onClick: () => {window.location.replace(window.location.origin)}};
    useEffect(() => {
      // Anything in here is fired on component mount.
      // With this method we dynamically load the catalogs
      dynamicActivate(interfaceLang);
      if (updating) {
        Promise.allSettled([
            getState().catch(downloadRejecter), 
            getStuff().catch(downloadRejecter)
          ])
        .then(values => {
          const state = values[0].value, stuff = values[1].value;
          if (stuff === undefined || state === undefined) {
            setTimeout(() => setMessage(alertMessage), 6000);
          return;
          }
          props.handleSetItems(mixState(state, stuff, getFileExtention()));
          if (!isDemoMode()) 
            props.handleSetAltItems(mixState(getAltState(), getAltStuff(), getAltFileExtention()));
          setUpdating(false)
        })
      }
    }, []);

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: green,
        secondary: indigo
      },
      zIndex: {
        snackbar: 99999
      },
      spacing: 3,
    }, interfaceLang === 'ru' ? ruRU : interfaceLang === 'uk' ? ukUA : enUS );
    
    window.saction = window.location.pathname;// getCookie('saction');
    window.stoken = getCookie('stoken');
    window.resent = getCookie('resent');
    // if ( !getCookie('user')) window.saction = 404;
    // setLocaleCookie(interfaceLang);
    
    if (devMode()) {
    // window.saction = '/password/reset';
    // window.saction = '/password/request';
    // window.saction = '/demo';
    // window.saction = '/';
    // window.saction = '/login';
    // window.saction = '/email/verify';
    // window.resent = true;
    }

    // if (isUpdating()) setTimeout(actualizeState, 1200);
    
    return (<>
      { 
      <I18nProvider i18n={i18n} /*forceRenderOnLocaleChange={false}*/ >
        <MuiThemeProvider theme={theme}>
        <SnackbarProvider>
        <CssBaseline />
        {
          window.saction === '/register' ? <LoginRegisterForm tab={0}/> :
          window.saction === '/login' ? <LoginRegisterForm tab={1} />  :
          window.saction === '/password/request' ? <PasswordRequestForm /> :
          window.saction === '/password/reset/' + window.stoken ? <PasswordResetForm /> :
          window.saction === '/email/verify' ? <VerificationNoticeForm resent={window.resent} /> :
          // window.saction === '/profile' ? <Profile />:
          updating ? <UpdatingScreen message={message}/> :
          window.saction === '/demo' ? <AppDashboard /> :
          window.saction === '/' ? <AppDashboard /> : 
          <h1>404 | Not Found</h1>
        }
        </SnackbarProvider>
        <MUICookieConsent
          cookieName='CookieConsent'
          cookieValue={"Ok"}
          message={<><h4><Trans>This site uses cookies. See our <a href='/privacy' target="_blank">Privacy policy</a>.</Trans></h4></>}
          // debug
        />
        </MuiThemeProvider>
      </I18nProvider>
      }
    </>);
  // }
}

const ConnectedApp = connect(
  (state) =>
  ({
    // updating: state.updating,
    // interfaceLang: state.interfaceLang,
    // user: state.user,
    ...state
  }),   
  (dispatch) =>
  ({
    // handleChangeUpdatingState() {
    //   dispatch(changeUpdatingState(false));
    // },
    handleSetItems(items) {
      dispatch(changeItems(items));
    },
    handleSetAltItems(items) {
      dispatch(changeAltItems(items));
    }
  })
)(App);

export default ConnectedApp;
// export default App;