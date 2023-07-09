import React from 'react';
import PropTypes from 'prop-types';
import { Trans, Plural } from '@lingui/macro';
import { Trans as TransComp } from '@lingui/react';
// import { I18n } from "@lingui/react";
import { t } from "@lingui/macro";
import classNames from 'classnames';
// import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
// import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

export const getCookieValue = (name) => {
    let cookieValue = Cookies.get(name);
  
    // if the cookieValue is undefined check for the legacy cookie
    if (cookieValue === undefined) {
      cookieValue = Cookies.get(getLegacyCookieName(name));
    }
    return cookieValue;
  };
  
export const resetCookieValue = (name) => {
    Cookies.remove(name);
  };
  
const getLegacyCookieName = (name) => {
    return `${name}-legacy`;
  };
  

export function NotificationCookieWindow(props){
return (
<Snackbar
    anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right'
    }}
    classes={{anchorOriginBottomLeft: classes.anchorOriginBottomLeft}}
    open={this.state.open}
    autoHideDuration={6000}
    onClose={this.handleClose}
    onExited={this.handleExited}

  open={open}
  onClose={handleClose}
  TransitionComponent={transition}
  message="I love snacks"
  key={transition ? transition.name : ''}
  >
      <SnackbarContent 
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
            <div id="client-consentCookie" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            <p>
            {}
            </p></div>}
      
      />


</Snackbar>
);
}


// Create cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Set cookie consent
function acceptCookieConsent(){
    deleteCookie('user_cookie_consent');
    setCookie('user_cookie_consent', 1, 30);
    document.getElementById("cookieNotice").style.display = "none";
}