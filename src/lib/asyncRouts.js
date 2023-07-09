import {default as axios} from 'axios';
import { devMode } from './stringLib';
import C from '../constants';
import {storage, getRecordKeysForName } from '../store/index';

const { RETCODE_OK, RETCODE_ERROR } = C; 

export default devMode() ? (config) => {
  let content = config.data;
  let status = 200, retCode = RETCODE_OK;
  // let status = 200, retCode = RETCODE_ERROR;
  // let status = 400, retCode = RETCODE_ERROR;
  let retObject = {status, config: { url: config.url},};

  if (status < 300) {
    retObject = 
    config.url === '/register' ?
    { ...retObject,
    data: retCode === RETCODE_OK ? {
      message: 'success.register.success', 
      code: RETCODE_OK, 
      intended: 'http://localhost:3000', 
      id: content.id, email: content.email, name: content.name, avatar: content.avatar
    } : { // data object on error code
      message: 'error.register.validationError',
      code: RETCODE_ERROR,
    }} : 
    config.url === '/login' ?
    { ...retObject,
      data: retCode === RETCODE_OK ? {
        message: 'success.login.success', 
        intended: 'http://localhost:3000', 
        id: content.id, email: content.email, name: content.name, avatar: content.avatar,
        code: RETCODE_OK, 
      } : {
        message: 'error.login.failure',
        code: RETCODE_ERROR,
      }} :
      config.url === '/logout' ?
      { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.logout.success', 
          intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, 
          code: RETCODE_OK, 
        } : {
          message: 'error.logout.failure',
          code: RETCODE_ERROR,
        }} :
      config.url === '/subspecs' ?
      { ...retObject,
        data: retCode === RETCODE_OK ? {
          // message: 'success.logout.success', 
          data: 'name' in content ? [{value:99999, label: content.name}]:[],
          subspec: 'name' in content ? 99999 : undefined,
          code: RETCODE_OK, 
        } : {
          message: 'error.logout.failure',
          code: RETCODE_ERROR,
        }} :
        config.url === '/password/email' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.passwordRequest.emailSent', 
          code: RETCODE_OK, 
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.passwordRequest.emailNotSent',
          code: RETCODE_ERROR,
        }} : 
        config.url === '/password/reset' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.passwordReset.success', 
          code: RETCODE_OK, 
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.passwordReset.failure', 
          // message: 'error.passwordReset.validationError',
          code: RETCODE_ERROR,
        }} : 
        config.url === '/email/resend' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.verificationEmailResent', 
          code: RETCODE_OK, 
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.register.validationError',
          code: RETCODE_ERROR,
        }} : 
        config.url === '/email/verify' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          // message: 'success.passwordResetLink.sent', 
          code: RETCODE_OK, 
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.register.validationError',
          code: RETCODE_ERROR,
        }} : 

        config.url === '/download/state' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.downloadState.success', 
          code: RETCODE_OK, 
          data: storage[getRecordKeysForName(C.DEMO_GAME_STATE_NAME)(null).arrActual[0]],
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.downloadState.invalid',
          code: RETCODE_ERROR,
        }} : 

        config.url === '/download/stuff' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          message: 'success.downloadStuff.success', 
          code: RETCODE_OK,
          data: /*content.path + */storage[getRecordKeysForName(C.DEMO_STUFF_NAME)(null).arrActual[0]],
          // intended: 'http://localhost:3000', 
          // email: content.email, name: content.name, avatar: content.avatar
        } : { // data object on error code
          message: 'error.downloadStuff.invalid',
          code: RETCODE_ERROR,
        }} : 
        config.url === '/names' ?
        { ...retObject,
        data: retCode === RETCODE_OK ? {
          // message: 'success.downloadStuff.success', 
          code: RETCODE_OK,
          data: content.subspecs.reduce((result, ss) => {
          const decSs = 10*ss, ssLabel = 'Wordlist name ' + decSs.toString();
          return result.concat([
          { id: 1 + decSs, name: ssLabel + '1', items: 250, subscrs: ss*51, size: ss*205, owner_id: 'Owner1', path: `100--en--ru--1--0--${1 + decSs}-060b3a8d915b3d.txt`, subspec_id: ss}, 
          { id: 2 + decSs, name: ssLabel + '2', items: 130, subscrs: ss*52, size: ss*105, owner_id: 'Owner2', path: `100--en--ru--1--0--${2 + decSs}-060b3a8d915b3d.tsv`, subspec_id: ss}, 
          { id: 3 + decSs, name: ssLabel + '3', items: 150, subscrs: ss*49, size: ss*305, owner_id: 'Owner3', path: `100--en--ru--1--0--${3 + decSs}-060b3a8d915b3d.csv`, subspec_id: ss}
          ])}, [])
        } : { // data object on error code
          message: 'error.downloadStuff.invalid',
          code: RETCODE_ERROR,
        }} : 

        undefined;
      }
      else {
        return Promise.reject({ ...retObject, data: {message:'Error with status grater than 299.'}});
      }; // error status
    return Promise.resolve(retObject);
  } : axios.request;
  