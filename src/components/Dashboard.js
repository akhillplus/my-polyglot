import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from 'axios';
// import curlirize from 'axios-curlirize';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSnackbar from './withSnackbar';
// import SnackbarProvider from './SnackbarProvider';

// import LoginRegister from './LoginRegister';
import { makeOptions } from '../lib/async';
import { changeInterfaceLang, changeUser } from '../actions';
import { withStyles } from '@material-ui/core/styles';

import { Trans } from '@lingui/macro';
// import green from '@material-ui/core/colors/green';
// import purple from '@material-ui/core/colors/purple';
// import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import List /*ListItem, MakeSelectable */ from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import RegisterIcon from '@material-ui/icons/HowToRegOutlined';
import LoginIcon from '@material-ui/icons/VpnKeyRounded'; //VpnKeyOutlined';

import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import PlayArea from './PlayArea';
import FaviconSvg from '../images/mfavicon2.png';
import LanguageMenu from './LanguageMenu';
import Link from '@material-ui/core/Link';

// import AssignmentIcon from '@material-ui/icons/Assignment';

import { handleDrawer, changeSelectedTab } from '../actions';
import { defaultRejecter, defaultFinally} from '../lib/async';
import { modalLoading} from './ModalLoading';
import C from '../constants';
import { DisableBlock } from './CustomElements';

const { RETCODE_OK, RETCODE_ERROR } = C; 

const drawerWidth = 240, closedDrawerWidth = 60;

const styles = theme => ({
  root: {
    display: 'flex',
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
  appBar: {
    // color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  button: {
    marginLeft: 20,
    color: 'white'
    // fill: 'white'
  },
  menuButton: {
    marginLeft: 6,
    marginRight: 36,
    color: 'white'
  },
  menuButtonHidden: {
    display: 'none',
  },
  logo: {
    marginLeft: 6,
    marginRight: 16,
    // color: 'white'
  },

  title: {
    flexGrow: 1,
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: closedDrawerWidth,//theme.spacing(7.5),
    [theme.breakpoints.up('xs')]: { // sm
      width: closedDrawerWidth,// theme.spacing(7),
    },
    // width: 60
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // height: '100vh',
    // overflow: 'auto', causes flickering of scrollbars
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(0.5)
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
    color: 'white',
    // padding: '4px 4px 4px 4px'
    maxWidth: 150
  },
  avatarRoot: {
    margin: '4px 10px 4px 4px',
    width: '36px',
    height: '36px'
  }
});

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = this.initialState;
    // drawerOpen=true, selectedTabIndex=1, handleRequestChange=f=>f,handleDrawerOpen=f=>f
  }

  get initialState() {
    return {
      isLoginRegisterTime: false,
      // isLogoutTime: false,
      langMenuAnchorEl: null,
      // screenWidth: window.outerWidth,
      // screenHeight: window.outerHeight,
      isSubmitted: false
    };
  }

  invokeRegister() {
    window.location.replace(window.location.origin + '/register');

  }

  invokeLogin() {
    window.location.replace(window.location.origin + '/login');

  }

  resolver = (res) => {
    // this.handleRequestCloseLoginLogoutRegister();

      if (res.data.code === RETCODE_OK) {
        // this.props.enqueueSnackbar('success.logout.success');
        this.props.handleChangeUser(null);
        if( res.data.intended) window.location.replace(res.data.intended);
        else window.location.replace(window.location.origin);
      } else if (res.data.code === RETCODE_ERROR) {
        return {message:'error.logout.failure'};
      }
      else 
      return {message:'error.response.status', status: res.status};
    }

  handleLogout = content => {
    // content.apiKey = getApiKey(content);
    return axios(makeOptions('/logout', content))
          .then(this.resolver.bind(this))
          .catch(defaultRejecter)
          .then(defaultFinally.bind(this));
  };

  // updateDimensions() {
  //   this.setState({screenWidth: window.outerWidth, screenHeight: window.outerHeight});
  // }

  // componentWillMount() {
  //     this.updateDimensions();
  // }

  render() {
  const 
  { classes,
    drawerOpen, 
    selectedTabIndex, 
    handleRequestChange,
    handleDrawerOpen,
    gameEnabled,
    user } = this.props;
    return (
        // <>
        <div id='modalTransitions0' className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => handleDrawerOpen(true)}
              className={classNames(
                classes.menuButton,
                drawerOpen && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            {/* <Favicon width="3.5%" height="2.5%" //margin-right="20px"
            className={classNames(
              classes.logo)}
            /> */}
            {/* <Typography
              component="h1"
              variant="h3"
              color="primary"
              noWrap
              className={classes.title}
            > */}
            <Link href={window.location.origin} 
            TypographyClasses={{root: classes.title}}
            // className={classes.button}
            underline='none'
            // component='h1'
            >
            {process.env.REACT_APP_NAME}
            </Link>
            {/* </Typography> */}
            {(user === null || window.saction === '/demo') && 
            <Button className={classes.button} /*variant="contained"*/ size="small"
              onClick={this.invokeRegister.bind(this)}>
            <RegisterIcon className={classes.leftIcon} />
            <Trans>Register</Trans>
            </Button> 
            }
            {(user === null || window.saction === '/demo') && 
            <Button className={classes.button} /*variant="contained"*/ size="small"
              onClick={this.invokeLogin.bind(this)}>
            <LoginIcon className={classes.leftIcon} />
            <Trans>Login</Trans>
            </Button> 
            }
            {(user && window.saction !== '/demo') && <div className={classes.avatarBox}>
              <Avatar className={classes.avatarRoot}>
                {user.avatar ? user.avatar : user.name ? user.name.substring(0, 1).toUpperCase():null}
              </Avatar>
              <div><Typography>{user.name}</Typography>
              <Typography variant='body2'>{user.email}</Typography>
              </div></div>}
            {(user && window.saction !== '/demo') && 
            <Button className={classes.button} /*variant="contained"*/ size="small"
            onClick={modalLoading(this.handleLogout.bind(this), this)}>
            <LogoutIcon className={classes.leftIcon}/>
            <Trans>Logout</Trans>
            </Button> 
            }
            <LanguageMenu classes={{ button: classes.button }}/>
            </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => handleDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
          <ListItem button
          selected={selectedTabIndex === 1}
          onClick={() => handleRequestChange(1)}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* <div>{<> */}
          <ListItem button
          selected={selectedTabIndex === 2}
          onClick={() => {handleRequestChange(2);}}
          disabled={!gameEnabled}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders"/>
          </ListItem>
          <ListItem button
          selected={selectedTabIndex === 3}
          onClick={() => handleRequestChange(3)}
          disabled={!gameEnabled}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button
          selected={selectedTabIndex === 4}
          onClick={() => handleRequestChange(4)}
          disabled={!gameEnabled}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button
          selected={selectedTabIndex === 5}
          onClick={() => handleRequestChange(5)}
          disabled={!gameEnabled}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
          {/* <DisableBlock /></> }</div> */}
          </List>
          {/* <Divider />
          <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <div className='logoBG' />
          <PlayArea />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  // selectedTabIndex: PropTypes.number.isRequired,
  // interfaceLang: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
};

// function getParent() {
//   return document.querySelector('#modalTransitions0');
// }

const AppDashboard = connect(
  (state) =>
  ({
    drawerOpen: state.drawerOpen,
    selectedTabIndex: state.tab,
    // interfaceLang: state.interfaceLang,
    gameEnabled: state.uDicIsSelected ? state.uDicPath !== '' : state.dicHalfPath !== '',
    user: state.user
  }),
  (dispatch) =>
  ({
    handleRequestChange(index) {
      dispatch(changeSelectedTab(index));
    },
    handleDrawerOpen(open) {
      dispatch(handleDrawer(open));
    },
    // handleChangeInterfaceLang(value) {
    //   dispatch(changeInterfaceLang(value));
    // },
    handleChangeUser(user) {
      dispatch(changeUser(user));
    },
    // handleStateIsLoading
  })
  )(Dashboard);

export default withStyles(styles)(withSnackbar(AppDashboard));
// export default withStyles(styles)(AppDashboard);