import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import { Trans } from '@lingui/macro';
import DictionaryControl from '../DictionaryControl';
import withSnackbar from '../withSnackbar';
//https://material-ui.com/demos/selects/
//https://material-ui.com/demos/selection-controls/
//https://material-ui.com/demos/expansion-panels/
//https://material.io/tools/icons
//https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js
const Settings = (props) => 

<> 
<DictionaryControl 
    playAreaState={window.saveStateBeforeRerender ? props.stateCache.playAreaState : undefined}/>
</>
    
export default withSnackbar(Settings);