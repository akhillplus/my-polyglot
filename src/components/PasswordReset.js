import React, {Component} from 'react';
import { i18n } from "@lingui/core";
import { Trans, t } from '@lingui/macro';

import Card from '@material-ui/core/Card';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import TabContent from './TabContent';

import {withStyles} from '@material-ui/core/styles';

import LocalPasswordReset from './LocalPasswordReset';

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
  
class Form extends Component {

render() {
    const {
      classes,
      onReset,
      email
    //   transitionTimeout,
    } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
            <Tabs
              value={0}
            //   onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
            >

            <Tab label={t({ id:'PasswordReset.TabLabel.ResetPassword', message:`Reset Password`})} icon={<PermIdentityIcon />} classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}/>
            </Tabs>
            <TabContent>
            <LocalPasswordReset onReset={onReset} email={email}/>
            </TabContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Form); 