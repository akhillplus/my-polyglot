import React, { Component } from 'react'
import { connect } from "react-redux";

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ReverseIcon from '@material-ui/icons/Autorenew';

import { Trans } from '@lingui/macro';

import LangSelect from './LangSelect';

import { withStyles/*, MuiThemeProvider, createMuiTheme */} from '@material-ui/core/styles';

const styles = theme => ({	
    formControl: { 
        margin: "8px 8px 8px 50px",
        //theme.spacing(2), 
        // margin: '12px 0', 
        minWidth: 160, fontSize: '2rem', // width: '100%' 
    },
    fontSizeLarge: {
      fontSize: 40,
    },

});

// class LangPair extends Component {

//     constructor(props){
//         super(props);
//         this.state = this.initialState;
//       }
  
//     get initialState() {
//         return {
//             // lang1: this.props.lang1,
//             // lang2: this.props.lang2,
//         };
//     }

//     // handleReverseLangs() {
//     //     let tempLang = this.state.lang1;
//     //     this.setState({ lang1: this.state.lang1, lang2: tempLang, isChanged: true });    
//     //     };

function LangPair(props){
    // render() {

        const // { lang1, lang2, } = this.state, 
        { classes, revButtonEnabled, lang1, lang2, langId1, langId2, noneItemText, onChange, disabled } = props;
        const langLabel1=<Trans>Learned Language</Trans>;
        const langLabel2=<Trans>Mother Language</Trans>;
        // console.log('langPair :',lang1, lang2);
        return (
        <Grid container
        // justify='space-between'
        spacing={2}
        // className={classes.demo}
        // alignItems="center" 
        alignContent='space-between'
        direction={window.outerWidth < 550 ? "column" : "row"}
        // direction='row'//"column"
        // justify="center"
        // justify="space-evenly"
        justify="space-between" //"space-around"
        >
        <Grid item xs={12} sm={4} style={{textAlign: "center"}}>
        {/* <Paper style={{maxWidth: 246}}> */}
            <LangSelect langLabel={langLabel1} lang={lang1} 
            selectInputProps={{
            name: langId1,
            id: langId1,
            }} 
            noneItem={noneItemText}
            onChange={onChange}
            disabled={disabled}
            />
        {/* </Paper> */}
        </Grid>
          <Grid item xs={12} sm={2} style={{textAlign: "center"}}>
          <span className="parent-span">
          <IconButton /*onClick={this.handleReverseLangs.bind(this)} */
          disabled={!revButtonEnabled}
          aria-label="Reverse" /*className={classes.margin}*/>
          {revButtonEnabled &&
          <ReverseIcon fontSize="large"
          // color={uDicIsSelected === "false" ? "action" : ""} 
          // hoverColor={uDicIsSelected === "false" ? "grey" : "green"} 
          classes={{
            // reveseIconSize: {
              fontSizeLarge: classes.fontSizeLarge,
              // colorAction: classes.colorAction
            }}
            // className={classes.reveseIconSize}
          />
          }
          </IconButton>
          </span>
          </Grid>
          <Grid item xs={12} sm={4} style={{textAlign: "center"}}>
          {/* <Paper style={{maxWidth: 246}}> */}
          <LangSelect langLabel={langLabel2} lang={lang2} 
            selectInputProps={{
            name: langId2,
            id: langId2,
            }} 
            noneItem={noneItemText}
            onChange={onChange}
            disabled={disabled}
            />
          {/* </Paper> */}
          </Grid>
          </Grid>
        );
}

export default withStyles(styles)(LangPair);