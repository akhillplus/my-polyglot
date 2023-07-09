import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store, { toSessionStorage } from './store/index';
import { setLocaleCookie, getCookie, devMode } from './lib/stringLib';

ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

    // function saveChanges () {
    // // if (window.confirm(saveChangeMessage)){
    // // let item = JSON.stringify(Date.now());
    // // localStorage.setItem("TS", item);
    // // alert(`changes saved successfully! ${item}`);
    // // }
    //   toSessionStorage('changes has been saved at:', Date().toString())
    //   window.onbeforeunload = null;
    // }
    // function saveChanges () {
    //     let sc = window.saveChanges;
    //     sc();
    //     // let item = JSON.stringify(Date.now());
    //     // localStorage.setItem("lsTS", item);
    //     // sessionStorage.setItem("ssTS", item);
    //   };

  
    // function exitConfirmation () {
    //     let saveChangesFunc = window.saveChanges;
    //     console.log('saveChangesFunc:', saveChangesFunc);
    //   setTimeout( saveChangesFunc, 0 );
    //   return "There are unsaved changes, all your changes will be lost if you exit !";
    // }

    // window.onbeforeunload = exitConfirmation;