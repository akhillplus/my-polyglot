import axios from 'axios';
// import curlirize from 'axios-curlirize';
// import { getCookie } from './stringLib';
import C from '../constants';

const { RETCODE_OK, RETCODE_ERROR } = C; 

export function makeOptions(url, content = {}, method = 'post', eventToHandle = undefined, handler = undefined)
{
    // let token = document.querySelector('meta[name="csrf-token"]');
    // let token = getCookie('XSRF-TOKEN') || '';
    // let method = 'post';

    return {
        method,
        url,
        // xsrfCookieName: 'XSRF-TOKEN', // default
        // xsrfHeaderName: 'X-XSRF-TOKEN', // default
        // headers: {
        //     // 'X-CSRF-TOKEN': token !== null ? token.getAttribute('content') : ''
        //     'X-XSRF-TOKEN': token
        // },
        data: content,
        [eventToHandle]: handler,
      };
}

export function makePutOptions(path, content = {}, method = 'put', eventToHandle = undefined, handler = undefined)
{
  return makeOptions(path, content, method, eventToHandle, handler);
}

export function makeGetOptions(path, content = {}, method = 'get', eventToHandle = undefined, handler = undefined)
{
  return makeOptions(path, content, method, eventToHandle, handler);
}

// ajax common server error responses handling
export function defaultRejecter(err){
    // let messageObject;
      if (typeof err === 'object' && err !== null){
       if (err.hasOwnProperty('message')) 
        return err; // returns error object with message and parameters
       else if (err.hasOwnProperty('data') && err.data && err.data.hasOwnProperty('message'))
        return { message: err.data.message };
      }
      return err;
    }

export function defaultFinally(o) {
  if (typeof o === 'object' && o && o.hasOwnProperty('message'))
  {
      let {message, messageParams} = o, messenger = this.props.enqueueSnackbar;
      if (messenger) messenger(message, messageParams);
      else return RETCODE_ERROR;
      // else throw message;
  }
  return RETCODE_OK;
}

export const downloadResolver = (res) => {
  if (!res) return null;
  const {code, message, status} = res.data;
  const fileContent = res.data.data;

  if (code === C.RETCODE_OK) {
    return fileContent;
  } 
  else if (code === C.RETCODE_ERROR){
    return fileContent; // data: null;
  }
    throw new Error ({message:'error.response.status', status});
}


export function delay(ms=1200) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
    // if (err) return reject(err);
  });
}

export function rejectAfterDelay(ms=5000, message='timeout') { 
  return new Promise((_, reject) => {
    setTimeout(reject, ms, new Error(message));
  });
}

export function handleOn(funcOn, triggerFunc=undefined, ms = 1200, param1, param2) {
      if (triggerFunc) triggerFunc(true);
      // setTimeout(funcOn(params), ms);
      return delay(ms)
            .then(() => funcOn(param1, param2))
            .then((res) => { 
              if (triggerFunc) triggerFunc(false); return res;}
              );
}

const config = {
  timeout: 1000
}

export const axiosCancellable = (options = {}) => {
  const abort = axios.CancelToken.source();
  const id = setTimeout(
    () => abort.cancel(`Timeout of ${config.timeout}ms.`),
    config.timeout
  );
  // return axios
  //   .get(url, { cancelToken: abort.token, ...options })
    return axios({ cancelToken: abort.token, ...options })
    .then(response => {
      clearTimeout(id);
      return response;
    })
}

// example usage
// axiosGet(`${url}/status.json`)

export const requestWlDownload = (context) => {
  // return axios({ cancelToken: abort.token, ...options })
}

// var config = {
//     onUploadProgress: function(progressEvent) {
//       var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
//     }
//   };

// export function register(content)
// {
//     let options = makeOptions('/register', content);
    // initializing axios-curlirize with your axios instance
    // curlirize(axios);
    
//     axios(options)
//     .then((res) => {
//         // console.log('success: ', res);
//         return res;
//     })
//     .catch((err) => {
//         // console.log('error: ', err);
//         return null;
//     });
// }