import React, {Component} from 'react';
import { i18n } from "@lingui/core";
import { Trans, t } from '@lingui/macro';

import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

import TabContent from './TabContent';
import Login from './Login';
import Register from './Register';
import RegIcon from '@material-ui/icons/HowToRegOutlined';
import LoginIcon from '@material-ui/icons/VpnKeyOutlined';

export const PROVIDER_FACEBOOK = 'facebook';
export const PROVIDER_INSTAGRAM = 'instagram';
export const PROVIDER_TWITTER = 'twitter';
export const PROVIDER_GOOGLE = 'google';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    boxShadow: 'none',
    // padding: 8
    // margin: 8
  },
  card: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25rem',
      flexGrow: 0
    },
        padding: 8
  },
  tabRoot: {
    // textTransform: "initial",
    // width: "100%",
    // display: "block",
    opacity: 0.45,

    "&:hover": {
      color: "green",
      opacity: 1,
      // textTransform: "initial"
    },
    "&$tabSelected": {
      color: "green",
      fontWeight: theme.typography.fontWeightMedium,
      // textTransform: "capitalize"
    },
    "&:focus": {
      color: "green",
      // textTransform: "capitalize"
    }
  },
  tabSelected: {},
});

class LoginRegister extends Component {

  static propTypes = {
    transitionTimeout: PropTypes.number,
    header: PropTypes.element,
    footer: PropTypes.element,
    onLogin: PropTypes.func,
    loginFailed: PropTypes.string,
    registerFailed: PropTypes.string,
    onRegister: PropTypes.func,
    onLoginWithProvider: PropTypes.func,
    onRegisterWithProvider: PropTypes.func,
    tab: PropTypes.number,
    rememberMe: PropTypes.bool,
    // loginLabel: PropTypes.string,
    // registerLabel: PropTypes.string,
    // isSubmitted: PropTypes.bool,
    providers: PropTypes.arrayOf(PropTypes.oneOf([
      PROVIDER_FACEBOOK,
      PROVIDER_INSTAGRAM,
      PROVIDER_TWITTER,
      PROVIDER_GOOGLE
    ])),
    disableLocal: PropTypes.bool,
    disableRegister: PropTypes.bool,
    disableRegisterProviders: PropTypes.bool
  };

  static defaultProps = {
    transitionTimeout: 1000,
    providers: [
      PROVIDER_FACEBOOK,
      PROVIDER_INSTAGRAM,
      PROVIDER_TWITTER,
      PROVIDER_GOOGLE
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: props.tab,
      // isSubmitted: props.isSubmitted
    }
  }

  render() {
    const {
      classes,
      transitionTimeout,
      header,
      footer,
      onLogin,
      onLoginWithProvider,
      onRegister,
      onRegisterWithProvider,
      loginFailed,
      registerFailed,
      providers,
      disableLocal,
      disableRegister,
      disableRegisterProviders,
      // tab,
      rememberMe,
      forgotPasswordLink,
      // loginLabel,
      // registerLabel
      // isSubmitted
    } = this.props;

    const {tab/*, isSubmitted*/} = this.state;

    let activeTab;
    switch (tab) {
      case 1:
      default:
        activeTab =
          <TabContent>
            <Login onLogin={onLogin}
                   onLoginWithProvider={onLoginWithProvider}
                   providers={providers}
                   loginFailed={loginFailed}
                   disableLocal={disableLocal}
                  //  isSubmitted={isSubmitted}
                  rememberMe={rememberMe}
                  forgotPasswordLink={forgotPasswordLink || window.location.origin + '/password/request'}
            />
          </TabContent>;
        break;

      case 0:
        activeTab =
          <TabContent>
            <Register onRegister={onRegister}
                      onRegisterWithProvider={onRegisterWithProvider}
                      providers={providers}
                      registerFailed={registerFailed}
                      disableLocal={disableLocal}
                      disableRegisterProviders={disableRegisterProviders}
                      // isSubmitted={isSubmitted}
            />
          </TabContent>;
        break;
    }

    return (
      <div className={classes.root}>
        <Card className={classes.card}>

          {header && <div>{header}</div>}

          {
            (!disableLocal && !disableRegister) &&
            <Tabs
              value={tab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
            >
              {
                !disableRegister &&
                <Tab label={t({id:'LoginRegister.TabLabel.Register', message:`Register`})} icon={<RegIcon />} classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected }}/>
              }
              <Tab label={t({id:'LoginRegister.TabLabel.Login', message:`Login`})} icon={<LoginIcon />} classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}/>
            </Tabs>
          }

          {
            transitionTimeout > 0 ?
              <Fade key={tab} in={true} timeout={transitionTimeout}>
                {activeTab}
              </Fade>
              : activeTab
          }

          {footer && <div>{footer}</div>}
        </Card>
      </div>
    );
  }

  handleTabChange = (event, value) => {
    this.setState({tab: value});
  }
}

export default withStyles(styles)(LoginRegister); 