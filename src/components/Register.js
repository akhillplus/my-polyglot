import React, {Component/*, Fragment*/} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';

// import { isEmpty } from 'lodash';

import ProviderChoices from "./ProviderChoices";
import LocalUserRegister from "./LocalUserRegister";

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

class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func,
    onRegisterWithProvider: PropTypes.func,
    providers: PropTypes.arrayOf(PropTypes.string),
    registerFailed: PropTypes.string,
    disableLocal: PropTypes.bool,
    disableRegisterProviders: PropTypes.bool,
    // isSubmitted: PropTypes.bool
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
      onRegister,
      onRegisterWithProvider,
      registerFailed,
      providers,
      disableLocal,
      disableRegisterProviders,
      // isSubmitted
    } = this.props;

    // const {isSubmitted} = this.state;

    const showProviders = providers.length !== 0 //!_.isEmpty(providers)
      && !disableRegisterProviders;
    const showOr = !disableLocal && showProviders;

    return (
        <div className={classes.root}>
          {
            !disableLocal &&
            <LocalUserRegister onRegister={onRegister} registerFailed={registerFailed} 
              // isSubmitted={isSubmitted} 
            />
          }

          {
            showOr &&
            <div className={classes.or}><em><Trans>or with</Trans></em></div>
          }

          {
            showProviders &&
            <ProviderChoices register
                             onChoice={onRegisterWithProvider}
                             providers={providers}
            />
          }
        </div>
    );
  }
}

export default withStyles(styles)(Register);
