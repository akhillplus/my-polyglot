import React, {Component} from 'react';
import { i18n } from "@lingui/core";
import withSnackbar from './withSnackbar';

import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Trans, t } from '@lingui/macro';

import ValidatedTextField from './ValidatedTextField';
// import LoginRegisterError from "./LoginRegisterError";

const styles = theme => ({
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginTop: theme.spacing(1) 
  },
  actions: {
    marginTop: theme.spacing(2)
  }
});

class LocalLinkRequest extends Component {
  static propTypes = {
    onSend: PropTypes.func,
    // sendingFailed: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    }
  }

  render() {
    const {
      classes,
    //   sendingFailed
    } = this.props;
    const {canSubmit} = this.state;
    const emailValidations = { isEmail: true, maxLength: 100 };
    // this.props.enqueueSnackbar('Please register');
    return (
      
        <div className={classes.root}>
          <Formsy className={classes.form}
                  onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}>
            <br />
             <ValidatedTextField
                name="email"
                autoComplete="email"
                validations={emailValidations}
                validationErrors={{
                  isEmail: t`Incorrect email address`,
                  maxLength: t`You can not type in more than ${emailValidations.maxLength} characters`
                }}
                required
                className={classes.field}
                label={t`Email address`}
            />
            <br />
            <div className={classes.actions}>
              <Button type="submit"
                      fullWidth
                      variant="outlined" 
                    //   color="primary"
                      disabled={!canSubmit}>
                      <Trans 
                      id='LinkRequest.SubmitButton.SendPasswordResetLink'
                      >Send Password Reset Link</Trans>
                      </Button>
            </div>

          </Formsy>
        </div>
    );
  }

  disableSubmit = () => {
    this.setState({canSubmit: false})
  };

  enableSubmit = () => {
    this.setState({canSubmit: true})
  };

  // disableSubmitted = () => {
  //   this.setState({isSubmitted: false})
  // }

  // enableSubmitted = () => {
  //   this.setState({isSubmitted: true})
  // }

  submit = model => {
    if (this.props.onSend) {
      // this.enableSubmitted();
      this.props.onSend(model);
    }
  }
}

export default withStyles(styles)(withSnackbar(LocalLinkRequest));
