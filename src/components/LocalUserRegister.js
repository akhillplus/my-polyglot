import React, {Component} from 'react';
import { i18n } from "@lingui/core";
import withSnackbar from './withSnackbar';

import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Trans, t } from '@lingui/macro';

import ValidatedTextField from './ValidatedTextField';
import LoginRegisterError from "./LoginRegisterError";

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


class LocalUserRegister extends Component {
  static propTypes = {
    onRegister: PropTypes.func,
    registerFailed: PropTypes.string,
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
      registerFailed
    } = this.props;
    const {canSubmit} = this.state;
    const usernameValidations = {minLength:3, maxLength:255 },
          emailValidations = {isEmail: true,maxLength: 255},
          passwordValidations = {minLength:8, maxLength:50 };
    // this.props.enqueueSnackbar('Please register');
    return (
      
        <div className={classes.root}>
          <Formsy className={classes.form}
                  onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}>

            <ValidatedTextField
                name="username"
                autoComplete="name"
                validations={usernameValidations}
                // validations="minLength:3"
                validationErrors={{
                  minLength: t`Too short`,
                  maxLength: t`You can not type in more than ${usernameValidations.maxLength} characters`
                }}
                required
                className={classes.field}
                label={t`Desired username`}
            />

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
                label={t`Create a password`}
            />

            <ValidatedTextField
                type="password"
                name="repeatedPwd"
                autoComplete="new-password"
                validations="equalsField:password"
                validationErrors={{
                  equalsField: t`Needs to be the same password as above`
                }}
                required
                className={classes.field}
                label={t`Enter password again`}
            />

            {
              registerFailed && <LoginRegisterError message={registerFailed}/>
            }

            <div className={classes.actions}>
              <Button type="submit"
                      fullWidth
                      variant="outlined" //color="primary"
                      disabled={!canSubmit}>
                      <Trans 
                      id='RegisterForm.SubmitButton.Register'
                      >Register</Trans>
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

  submit = model => {
    if (this.props.onRegister) {
      // this.disableSubmit();
      this.props.onRegister(model);
      // setTimeout(() => this.enableSubmit(), 5000);
    }
  }

}

export default withStyles(styles)(withSnackbar(LocalUserRegister));
