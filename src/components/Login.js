import React, {Component/*, Fragment*/} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ProviderChoices from "./ProviderChoices";
import LocalUserLogin from "./LocalUserLogin";
import { Trans } from '@lingui/macro';
// import _ from 'lodash';

const styles = theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  or: {
    textAlign: 'center'
  }
});

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
    onLoginWithProvider: PropTypes.func,
    providers: PropTypes.arrayOf(PropTypes.string),
    loginFailed: PropTypes.string,
    disableLocal: PropTypes.bool,
    // isSubmitted: PropTypes.bool,
    rememberMe: PropTypes.bool,
    forgotPasswordLink: PropTypes.string
  };

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isSubmitted: props.isSubmitted
  //   }
  // }

  render() {
    const {
      classes,
      onLogin,
      onLoginWithProvider,
      loginFailed,
      providers,
      disableLocal,
      rememberMe,
      forgotPasswordLink
      // isSubmitted
    } = this.props;

    // const {isSubmitted} = this.state;

    return (
        <div className={classes.root}>
          {
            !disableLocal &&
            <LocalUserLogin onLogin={onLogin} loginFailed={loginFailed} rememberMe={rememberMe} forgotPasswordLink={forgotPasswordLink}  
              // isSubmitted={isSubmitted}
            />
          }

          {
            !disableLocal && providers.length !== 0/*_.isEmpty(providers)*/ &&
            <div className={classes.or}><em><Trans>or with</Trans></em></div>
          }

          {providers.length !== 0/*!_.isEmpty(providers)*/ &&
            <ProviderChoices login
                             onChoice={onLoginWithProvider}
                             providers={providers}
            />
          }
        </div>
    );
  }
}

export default withStyles(styles)(Login);
