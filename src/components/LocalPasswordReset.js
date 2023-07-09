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


class LocalPasswordReset extends Component {
  static propTypes = {
    onReset: PropTypes.func,
    // registerFailed: PropTypes.string,
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
      email
    } = this.props;
    const {canSubmit} = this.state;
    const emailValidations = {isEmail: true, maxLength: 100 }, 
          passwordValidations = {minLength:8, maxLength:50 };
    // this.props.enqueueSnackbar('Please register');
    return (
      
        <div className={classes.root}>
          <Formsy className={classes.form}
                  onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}>

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
                value={email}
            />

            <ValidatedTextField
                type="password"
                name="password"
                autoComplete="new-password"
                validations={passwordValidations}
                validationErrors={{
                  minLength: t`Must have at least ${passwordValidations.minLength} characters`,
                  maxLength: t`You can not type in more than ${passwordValidations.maxLength} characters`
                }}
                required
                className={classes.field}
                label={t`Password`}
            />

            <ValidatedTextField
                type="password"
                name="password_confirmation" // repeatedPwd
                autoComplete="new-password"
                validations="equalsField:password"
                validationErrors={{
                  equalsField: t`Needs to be the same password as above`
                }}
                required
                className={classes.field}
                label={t`Confirm password`}
            />

            <div className={classes.actions}>
              <Button type="submit"
                      fullWidth
                      variant="outlined" //color="primary"
                      disabled={!canSubmit}>
                      <Trans 
                      id='PasswordReset.SubmitButton.ResetPassword'
                      >Reset Password</Trans>
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
    if (this.props.onReset) {
      // this.enableSubmitted();
      this.props.onReset(model);
    }
  }

}

export default withStyles(styles)(withSnackbar(LocalPasswordReset));
