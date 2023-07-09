import React from 'react';
import { GameStage } from '../GameStage';
import withSnackbar from '../withSnackbar';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { t } from "@lingui/macro";

import {OptionsButton} from '../Options';

// const stage = t`Stage 1`;
export class Stage1 extends GameStage {
  render(){
  const stage = t`Stage 1`;
  return (
      <>
      <Grid container style={{marginLeft: 'auto', margiRight: 0}}>
        <Grid item xs={11}>
        </Grid>
        <Grid item xs={1}>
        <OptionsButton {...this.state} 
        onAcceptOptionChanges={this.handleAcceptOptionChanges.bind(this)}/>
        </Grid>
      </Grid>
      </>
)}
}
export default withSnackbar(Stage1);