import React, {Component} from 'react';
import { i18n } from "@lingui/core";
import { Trans, t } from '@lingui/macro';

import Formsy from 'formsy-react';

import Card from '@material-ui/core/Card';
import ContactMailIcon from '@material-ui/icons/MailOutline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import Fade from '@material-ui/core/Fade';
// import PropTypes from 'prop-types';

import TabContent from './TabContent';


import {withStyles} from '@material-ui/core/styles';

// import LocalLinkRequest from './LocalLinkRequest';

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
    button: {
      textTransform: 'none'
    }
  });
  
class Form extends Component {
//     constructor(props) { 
//     super(props); 
//  }

render() {
    const {
      classes,
      // onSend,
      resent
    //   transitionTimeout,
    } = this.props;

    return (
      <div className={classes.root}>
          <Formsy className={classes.form}
          // onValid={this.enableSubmit} onInvalid={this.disableSubmit}
          onValidSubmit={this.submit}>

        <Card className={classes.card}>
            <Tabs
              value={0}
            //   onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
            >

            <Tab label={t({ id:'VerificationNotice.TabLabel.VerifyYourEmailAddress', message:`Verify Your Email Address`})}
                icon={<ContactMailIcon />} 
                classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}/>
            </Tabs>
            <TabContent>
            {/* <LocalLinkRequest onSend={onSend}/> */}
            <br />
            <Typography /*variant="button"*/ component="p">
              { resent && <Trans>A fresh verification link has been sent to your email address.</Trans>}
              { resent && <br />}
              <Trans>Before proceeding, please check your email for a verification link.</Trans><br />
              <br />
              <Trans>If you did not receive the email,</Trans>{' '}
              
            <Button type="submit"
              // fullWidth
              variant="outlined" 
            //   color="primary"
            size='small'
            // variant="text"
              >
              <Trans 
              id='VerificationNotice.SubmitButton.clickHereToRequstAnother'
              >click here to request another</Trans>
              </Button>
              </Typography>
            </TabContent>
        </Card>
        </Formsy>
      </div>
    );
  }
  
  submit = model => {
    if (this.props.onSend) {
      // this.enableSubmitted();
      this.props.onSend(model);
    }
  }

}

export default withStyles(styles)(Form); 