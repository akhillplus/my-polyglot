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
import C from '../constants';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  default: InfoIcon
};

const styles1 = theme => ({
  default: {
    backgroundColor: 'black'
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 30,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const { MAX_DIC_FILE_SIZE } = C;
const STRONG_TAG = {0:<b />};
const PleaseTryAgainLater = t({id: 'pleaseTryAgainLater', message:'Please, try again later.'});
const PleaseCheckInternetConnection = t({id: 'pleaseCheckInternetConnection', message:'Please, check Internet connection.'});

function NSnackbarContent(props) {
  const { classes, className, messageId, messageParams, onClose, ...other } = props;
  const prefixes = ['success', 'error', 'warning', 'info', 'default'];
  let suffixIndex = messageId.indexOf('.');
  let variantId = prefixes.indexOf(messageId.substring(0, suffixIndex));
  // let suffix = prefixes.substring(suffixIndex + 1);

  let variant = variantId >= 0 ? prefixes[variantId] : 'default';
  const Icon = variantIcon[variant];
  const { fileName, errNumber, lineNumber, status } = messageParams;
    // console.log('MAX_DIC_FILE_SIZE', MAX_DIC_FILE_SIZE);

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <div id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <p>
          {
          variantId === -1 ? (<>{messageId}</>):
          // fileload
          messageId === 'success.fileload.successfull' ? 
          (t({id: 'success.fileload.successfull', message: 'File is loaded successfully!' })) :
          messageId === 'error.fileload.browserNotSupportingFileLoad' ?
          (t({id: 'error.fileload.browserNotSupportingFileLoad', 
            message: 'Unfortunately, your browser does not support file loading.' })) :
          messageId === 'error.fileload.invalidExtension' ?
          (<><TransComp //render='span' 
            id='error.fileload.invalidExtension'
            values={{fileName}}
            // value={fileName}
            components={STRONG_TAG}
            message="Invalid file selected <0>{fileName}</0>."
            />
            <br /><TransComp id='error.fileload.invalidExtension2'
            components={STRONG_TAG}
            message="Valid file extentions are <0>.csv</0>, <0>.tsv</0> and <0>.txt</0>"
            />
           </>) :
          messageId === 'error.fileload.notFound' ?
          (t({id: 'error.fileload.notFound', message: 'File not found'})) : 
          messageId === 'error.fileload.failed' ? 
          (t({id: 'error.fileload.failed', message: 'Failed to load file.'})) :
          messageId === 'error.fileload.whileReading' ?
          (t({id: 'error.fileload.whileReading', message: 'Error while reading file.'})) :
          messageId === 'error.fileload.notReadable' ?
          (t({id: 'error.fileload.notReadable', message: 'File is not readable.'})) :
          messageId === 'error.fileload.tooBigFileSize' ? 
          (<TransComp id='error.fileload.tooBigFileSize' components={STRONG_TAG} 
            values={{str: (MAX_DIC_FILE_SIZE/1000000).toFixed(2)}}  
            message="File is too big. Max. file size is <0>{str}</0> MB."/>):
          messageId === 'error.fileload.fileErrors' ? 
          (<>
            <TransComp
            id='error.fileload.fileErrors'
            components={STRONG_TAG}
            values={{lineNumber}}
            message="Error in line <0>{lineNumber}</0>." /><br />
            <TransComp
            components={STRONG_TAG}
            id='error.fileload.fileErrors2'
            message="{errNumber, plural, =1 {There is <0>#</0> erroneous line in the file} other {There are <0>#</0> erroneous lines in the file.}}"
            values={{ errNumber }} />
            </>) : 
          messageId === 'info.fileload.fileReadyForLoading' ?
          (t({id: 'info.fileload.fileReadyForLoading', message: 'File ready to be loaded.'})) :
          messageId === 'info.fileload.cancelled' ?
          (t({id: 'info.fileload.cancelled', message: 'File load is cancelled.'})) : 
          // file upload
          messageId === 'success.fileUpload.successfull' ? 
          (t({id: 'success.fileUpload.successfull', message: 'File is uploaded successfully!' })) :
          messageId === 'error.fileUpload.detectLanguage' ?
          (<>{t({id: 'error.fileUpload.detectLanguage', message: 'Error during language detection'})}
          <br />
          {PleaseCheckInternetConnection}</>) : 
          messageId === 'error.fileUpload.motherLanguageNeeded' ?
          (t({id: 'error.fileUpload.motherLanguageNeeded', message: 'Please, fill in the fields using mother language.'})) : 
          messageId === 'error.fileUpload.badUrl' ?
          (t({id: 'error.fileUpload.badUrl', message: 'Error of signed URL.'})) : 
          messageId === 'error.fileUpload.uploadFailure' ?
          (t({id: 'error.fileUpload.uploadFailure', message: 'Failure of uploading file.'})) : 
          messageId === 'error.fileUpload.notUniqueWl'?
          (t({id: 'error.fileUpload.notUniqueWl', message: 'Not unique name of wordlist.'})) : 
          // register
          messageId === 'success.register.success' ?
          (t({id: 'success.register.success', message: 'You have been registered and logged in successfully.'})) :
          messageId === 'error.register.validationError' ?
          (t({id: 'error.register.validationError', message: 'Wrong credentials.'})) :
          // messageId === 'error.register.failure' ?
          // (<>{t({id: 'error.register.failure', message: 'Oops! Server connection error.'})}
          // <br />{PleaseTryAgainLater}</>) :

          // login
          messageId === 'success.login.success' ?
          (t({id: 'success.login.success', message: 'You have been logged in successfully'})) :
          messageId === 'error.login.failure' ?
          (<>{t({id: 'error.login.failure', message: 'Oops! Login is failed.'})}
          <br />{PleaseTryAgainLater}</>) :
          messageId === 'error.auth.failed' ?
          (t({id: 'error.auth.failed', message: 'These credentials do not match our records.'})) :

          // // logout
          // messageId === 'success.logout.success' ? 
          // (t({id: 'success.logout.success', message: 'You have been logged out successfully'})) :
          // messageId === 'error.logout.failure' ?
          // (<>{t({id: 'error.logout.failure', message: 'Oops! Logout is failed.'})}
          // <br />{PleaseTryAgainLater}</>) :

          // // login with provider
          // messageId === 'success.logout.success' ? 
          // (t({id: 'success.logout.success', message: 'You have been logged out successfully'})) :
          // messageId === 'error.logout.failure' ?
          // (<>{t({id: 'error.logout.failure', message: 'Oops! Logout is failed.'})}
          // <br />{PleaseTryAgainLater}</>) :

          // subspecs
          messageId === 'info.subspecs.noItemsAvailable' ?
          (t({id: 'info.subspecs.noItemsAvailable', message: 'No options available. Start typing new one.'})) :

          // default errors
          messageId === 'error.tooManyRequests' ?
          (<>{t({id: 'error.tooManyRequests', message: 'Too many requests.'})}
          <br />{PleaseTryAgainLater}</>) :
          messageId === 'error.validationError' ?
          (t({id: 'error.validationError', message: 'Data validation error.'})) :
          messageId === 'error.request.failure' ?
          (<>{t({id: 'error.request.failure', message: 'Unforseen server error.'})}
          <br />{PleaseTryAgainLater}</>) :
          messageId === 'error.response.status' ?
          (<><TransComp
            id='error.response.status' values={{status}} components={STRONG_TAG}
            message="Wrong status: <0>{status}</0>."
            />
          <br />{PleaseTryAgainLater}</>) :
          //// password reset
          // messageId === 'success.passwordRequest.emailSent' ?
          // (<Trans id='success.passwordRequest.emailSent'>
          //   A password reset email has been sent successfully.</Trans>) :
          // messageId === 'error.passwordRequest.emailNotSent' ?
          // (<Trans id='error.passwordRequest.emailNotSent'>
          //   A password reset email has not been sent.<br />Please, try again later.</Trans>) :
          
          // logout
          messageId === 'success.logout.success' ?
          (t({id: 'success.logout.success', message: 'You have been logged out successfully.'})) :
          messageId === 'error.logout.failure' ?
          (<>{t({id: 'error.logout.failure', message: 'Unforseen server error.'})}
          <br />{PleaseTryAgainLater}</>) :

          // forgot password
          messageId === 'success.passwordRequest.emailSent' ?
          (t({id: 'success.passwordRequest.emailSent', message: 'The email with the reset link has been sent successfully!'})) :
          messageId === 'error.passwordRequest.validationError' ?
          (t({id: 'error.passwordRequest.validationError', message: 'Wrong credentials'})) :
          messageId === 'error.passwordRequest.emailNotSent' ?
          (<>{t({id: 'error.passwordRequest.emailNotSent', message: 'Failed to send the reset link.'})}
          <br />{PleaseTryAgainLater}</>) :

          // reset password
          messageId === 'success.passwordReset.success' ?
          (t({id: 'success.passwordReset.success', message: 'You have reset password successfully.'})) :
          messageId === 'error.passwordReset.validationError' ?
          (t({id: 'error.passwordReset.validationError', message: 'Wrong credentials.'})) :
          messageId === 'error.passwordReset.failure' ?
          (<>{t({id: 'error.passwordReset.failure', message: 'Failed to reset password.'})}
          <br />{PleaseTryAgainLater}</>) :

          // verification
          messageId === 'success.verificationEmailResent' ?
          (t({id: 'success.verificationEmailResent', message: 'Verification email has been resent successfully.'})) :
          // login/register with provider
          messageId === 'success.providerLogin.success' ?
          (t({id: 'success.providerLogin.success', message: 'You have been logged in successfully.'})) :
          messageId === 'error.providerLogin.failure' ?
          (<>{t({id: 'error.providerLogin.failure', message: 'Oops! Login is failed.'})}
          <br />{PleaseTryAgainLater})</>) :

          // upload/download state/stuff
          messageId === 'success.uploadState.success' ?
          (t({id: 'success.uploadState.success', message: 'Your changes have been saved successfully.'})) :
          messageId === 'error.uploadState.invalid' ?
          (t({id: 'error.uploadState.invalid', message: 'Your changes are invalid.'})) :
          messageId === 'success.downloadState.success' ?
          (t({id: 'success.downloadState.success', message: 'Data have been downloaded successfully.'})) :
          messageId === 'error.downloadState.invalid' ?
          (t({id: 'error.downloadState.invalid', message: 'Invalid request.'})) :
          messageId === 'success.downloadStuff.success' ?
          (t({id: 'success.downloadStuff.success', message: 'Data have been downloaded successfully.'})) :
          messageId === 'error.downloadStuff.invalid' ?
          (t({id: 'error.downloadStuff.invalid', message: 'Invalid request.'})) :
          (<>{messageId}</>)
          }
          </p>
        </div>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

NSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  messageId: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export const SnackbarContentWrapper = withStyles(styles1)(NSnackbarContent);