
import React, {Component} from 'react';
// import { withStyles/*, MuiThemeProvider, createMuiTheme */} from '@material-ui/core/styles';

import axios from '../lib/asyncRouts';

// import curlirize from 'axios-curlirize';
import { Trans } from '@lingui/macro';

// import PropTypes from 'prop-types';
// import classNames from 'classnames';
import withSnackbar from './withSnackbar';
import {CircularIndeterminate, AlertMessage} from './CustomElements';

const Screen = (props) =>  {
  let Action = function () {return <CircularIndeterminate/>;}
  if (props.hasOwnProperty('message') && props.message) {
    if (typeof props.message === 'object'){
    // const { message, ...params} = props.message;
    //  props.enqueueSnackbar(message, {params});
     Action = function () {return <AlertMessage message={props.message}/>;};
    }
    else props.enqueueSnackbar(props.message);
  }
    return (
    <> 
        {/* <FormHeader /> */}
        <Action />
    </>
  );
}

// export default withStyles(styles)(withSnackbar(Screen));
export default withSnackbar(Screen);
