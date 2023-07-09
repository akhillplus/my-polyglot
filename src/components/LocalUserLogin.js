import React, {Component} from 'react';
import { i18n } from "@lingui/core";
// import { t } from "@lingui/macro";
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { Trans, t } from '@lingui/macro';

import ValidatedTextField from './ValidatedTextField';
import LoginRegisterError from "./LoginRegisterError";
import Checkbox from './CheckBoxField';

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
  },
  alignRight: {
    textAlign: 'right'
  }
});

class LocalUserLogin extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
    loginFailed: PropTypes.string,
    rememberMe: PropTypes.bool,
    forgotPasswordLink: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      rememberMe: props.rememberMe
      // isSubmitted: props.isSubmitted
    }
  }

  // handleChange(event) {
  //   this.setState({ rememberMe: event.target.checked });
  //   // this.setState({ [event.target.name]: event.target.value });
  // };


  render() {
    const {
      classes,
      loginFailed,
      forgotPasswordLink
    } = this.props;
    const {canSubmit, rememberMe} = this.state;
    const emailValidations = {isEmail: true,maxLength: 255}, 
          passwordValidations = {minLength:8, maxLength:50 };

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
            />

            <ValidatedTextField
                type="password"
                name="password"
                autoComplete="current-password"
                validations={passwordValidations}
                validationErrors={{
                  minLength: t`Must have at least ${passwordValidations.minLength} characters`,
                  maxLength: t`You can not type in more than ${passwordValidations.maxLength} characters`
                }}
                required
                className={classes.field}
                label={t`Password`}
            />
            {/* <a class="g-link" data-bind="click: recoverPassword, restext: 'ForgotPassword'">Forgot password?</a> */}
            {/* <Link href="#" onClick={preventDefault}> */}
            <Link className={classes.alignRight} href={forgotPasswordLink}>Forgot your password?</Link>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  // inputProps={{
                    name='remember'
                    id='remember'
                  // }}
                  // onChange={this.handleChange.bind(this)}
                  // name="rememberMe"
                  value={rememberMe}
                  color="primary"
                />
              }
              label={t`Remember me`}
            />
            {
              loginFailed && <LoginRegisterError message={loginFailed}/>
            }

            <div className={classes.actions}>
              <Button type="submit"
                      fullWidth
                      variant="outlined" //color="primary"
                      disabled={!canSubmit}>
                      <Trans 
                      id='LoginForm.SubmitButton.Log_in'
                      >Log in</Trans>
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

  submit = (model) => {
    if (this.props.onLogin) {
      // this.disableSubmit();
      this.props.onLogin(model);
      // setTimeout(() => this.enableSubmit(), 5000);
    }
  }

}

export default withStyles(styles)(LocalUserLogin);
