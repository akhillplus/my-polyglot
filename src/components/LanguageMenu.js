import React, {Component} from 'react';
import { connect } from "react-redux";

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LanguageIcon from '@material-ui/icons/Language';

import Langs from '../data/langs';
import { changeInterfaceLang } from '../actions';
import { setLocaleCookie, devMode} from '../lib/stringLib';
import { i18n } from "@lingui/core";
// import { useLingui } from "@lingui/react"
import { dynamicActivate } from '../i18n.ts';
// import { useCookies } from 'react-cookie';
// import { withCookies, Cookies } from 'react-cookie';

import { withStyles } from '@material-ui/core/styles';


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
    button: {
      color: 'white'
    }
});

class LangMenu extends Component {

    constructor(props){
      super(props);
      this.state = this.initialState;
    }

    get initialState() {
      return {
        langMenuAnchorEl: null,
      };
    }

    handleClickLangIcon(event) {
        this.setState({langMenuAnchorEl: event.currentTarget});
    }
    
    handleLangMenuItemClick = (value) => () => {
      // const { i18n } = useLingui();
    if (value !== i18n.locale){
        window.saveStateBeforeRerender = true; // the tree will be rerendered after the new locale activation
        // if (devMode) window.saveStateBeforeRerender = 2; // due to double constructor call
        // this.props.cookies.set('locale', value, { path: '/' });
        // document.cookie='locale=' + value;
        setLocaleCookie(value);
        // this.props.handleChangeInterfaceLang(value);
        dynamicActivate(value);

        // this.props.enqueueSnackbar('Interface lang is changed.');
    }
    this.handleCloseLangMenu();
    }

    handleCloseLangMenu() {
        this.setState({langMenuAnchorEl: null});
    }

    render() {
        const {
                langMenuAnchorEl,
                } = this.state,
                { classes,
                // interfaceLang 
                } = this.props;
                return (
                <>
                <IconButton className={classes.button} 
                aria-label="Select language"
                onClick={this.handleClickLangIcon.bind(this)}
                >
                <Badge color="secondary" badgeContent={<b>{i18n.locale}</b>} className={classes.margin}>
                <LanguageIcon />
                </Badge>
                </IconButton>
                <Menu
                id="interfaceLangMenu"
                anchorEl={langMenuAnchorEl}
                keepMounted
                open={Boolean(langMenuAnchorEl)}
                onClose={this.handleCloseLangMenu.bind(this)}
                >
                {Langs.filter(item => item.interface === true).map((option, index) => (
                    <MenuItem
                    key={index}
                    // disabled={index === 0}
                    selected={option.value === i18n.locale}
                    onClick={this.handleLangMenuItemClick(option.value)}
                    >
                    {option.name}
                    </MenuItem>
                ))}
                </Menu>
                </>
                );
        }
}

// const ConnectedMenu = connect(
//   (state) =>
//   ({
//     interfaceLang: state.interfaceLang,
//   }), null
//   // (dispatch) =>
//   // ({
//   //   handleChangeInterfaceLang(value) {
//   //     dispatch(changeInterfaceLang(value));
//   //   },
//   // })
//   )(LangMenu);

// export default withStyles(styles)(ConnectedMenu);
export default withStyles(styles)(LangMenu);
  // export default withStyles(styles)(withCookies(ConnectedMenu));
