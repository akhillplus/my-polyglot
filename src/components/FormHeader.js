import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
// import { t } from "@lingui/macro";
// import { Trans } from '@lingui/macro';

import LanguageMenu from './LanguageMenu';

// import classNames from 'classnames';

import FaviconSvg from '../images/mfavicon2.png';

const styles = theme => ({
    root: {
      // display: 'flex',
      flexGrow: 1,
      marginBottom: 30 
    },
    title: {
      flexGrow: 1,
      textTransform: 'uppercase',
      color: 'white'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    button: {
      color: 'green'
      // fill: 'white'
    },
});

// const Favicon = (props) => ( <img src={FaviconSvg} alt='' {...props}/> );

class Header extends Component {

    constructor(props){
      super(props);
      this.state = this.initialState;
    }
  
    get initialState() {
      return {
        langMenuAnchorEl: null,
        tab: this.props.tab,
      };
    }

    render() {
        const //{
                //} = this.state,
                { classes } = this.props;
                return (
            <div className={classes.root}>
            <Toolbar className={classes.toolbar}>
            {/* <Favicon width="3.5%" height="2.5%" //margin-right="20px"
            className={classNames(
            classes.logo)}
            /> */}
            <Typography
            component="h1"
            variant="h4"
            color="secondary"
            noWrap
            className={classes.title}
            // 
            >
            <Link href={window.location.origin} 
            underline='none'/*onClick={preventDefault}*/>
            {process.env.REACT_APP_NAME}
            </Link>
            </Typography>
            {this.props.children}
            <LanguageMenu classes={{button: classes.button}}/>
            </Toolbar>
            </div>
        );
    }
}

// const FormHeader = connect(
//   (state) =>
//   ({
//     interfaceLang: state.interfaceLang,
//     user: state.user
//   }),
//   (dispatch) =>
//   ({
//     handleChangeInterfaceLang(value) {
//       dispatch(changeInterfaceLang(value));
//     },
//     handleChangeUser(user) {
//       dispatch(changeUser(user));
//     }
//   })
//   )(Header);

export default withStyles(styles)(Header);